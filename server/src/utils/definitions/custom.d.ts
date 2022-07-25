//we are storing user object on request so we need to declare it globally

import User from "./resources/user/user.interface";

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
