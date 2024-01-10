import {
  Injectable,
  CanActivate,
  ExecutionContext,
  //   UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/common/decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const result = this.matchRoles(roles, user.role);
    return result;
  }

  private matchRoles(roles: string[], userRole: string): boolean {
    if (roles.includes(userRole)) {
      return true;
    }
    return false;
  }
}
