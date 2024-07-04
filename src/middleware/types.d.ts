declare namespace Express {
  interface IUser {
    userId: string;
    email: string;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
  }
  export interface Request {
    user?: IUser | any;
  }
  export interface Response {
    user?: IUser | any;
  }
}
