import { NotFoundException } from '@nestjs/common';
import {
  IQueryPagination,
  IPaginateOutput,
} from 'src/interfaces/query-pagination.interface';
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

export const paginate = (
  query: IQueryPagination,
): { skip: number; take: number } => {
  const size = Math.abs(parseInt(query.limit)) || DEFAULT_PAGE_SIZE;
  const page = Math.abs(parseInt(query.page)) || DEFAULT_PAGE_NUMBER;
  return {
    skip: size * (page - 1),
    take: size,
  };
};

export const paginateOutput = <T>(
  data: T[],
  total: number,
  query: IQueryPagination,
  //   page: number,
  //   limit: number,
): IPaginateOutput<T> => {
  const page = Math.abs(parseInt(query.page)) || DEFAULT_PAGE_NUMBER;
  const size = Math.abs(parseInt(query.limit)) || DEFAULT_PAGE_SIZE;

  const lastPage = Math.ceil(total / size);

  // if data is empty, return empty array
  if (!data.length) {
    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        totalPerPage: size,
        prevPage: null,
        nextPage: null,
      },
    };
  }

  // if page is greater than last page, throw an error
  if (page > lastPage) {
    throw new NotFoundException(
      `Page ${page} not found. Last page is ${lastPage}`,
    );
  }

  return {
    data,
    meta: {
      total,
      lastPage,
      currentPage: page,
      totalPerPage: size,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < lastPage ? page + 1 : null,
    },
  };
};
