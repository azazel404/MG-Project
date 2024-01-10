export interface CustomerPayload {
  sub: number;
  name: string;
  email: string;
  role: string;
}

export interface UserPayload {
  sub: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
}
