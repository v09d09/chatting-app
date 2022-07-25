import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpsException from "../../utils/exceptions/http.exception";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "./user.validation";
import UserService from "./user.service";
import authenticatedMiddleware from "../../middleware/authenticated.middleware";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    );
    this.router.get(this.path, authenticatedMiddleware, this.getUser);
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { username, email, password } = req.body;

      const token = await this.UserService.register(
        username.trim(),
        email.trim().toLowerCase(),
        password,
        "user"
      );

      res.status(201).json({ token });
    } catch (error: any) {
      next(new HttpsException(400, error.message));
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { username, password } = req.body;
      const token = await this.UserService.login(username, password);
      res.status(200).json({ token });
    } catch (error: any) {
      next(new HttpsException(400, error.message));
    }
  };

  private getUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    if (!req.user) {
      return next(new HttpsException(404, "Not found"));
    }
    const { username, email } = req.user;
    res.status(200).json({ user: { username, email } });
  };
}

export default UserController;
