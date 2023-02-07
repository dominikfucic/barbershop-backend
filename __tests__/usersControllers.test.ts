import { Request, Response, NextFunction } from "express";
import { logout, login, signup } from "../src/controllers/usersControllers";
import crypto, { sign } from "node:crypto";
import User from "../src/models/User";
import { MongoServerError } from "mongodb";

describe("api/users", () => {
  describe("POST /logout", () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
      req = { session: { destroy: jest.fn((cb) => cb()) } } as any as Request;
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as any as Response;
      next = jest.fn() as NextFunction;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should destroy the session and return 200 status with message", async () => {
      await logout(req, res, next);
      expect(req.session.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "User logged out" });
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next with error if session destroying failed", async () => {
      const error = new Error("Failed to destroy the session");
      req = {
        session: {
          destroy: jest.fn().mockImplementationOnce((cb) => cb(error)),
        },
      } as any as Request;

      await logout(req, res, next);
      expect(req.session.destroy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("POST /login", () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
      req = {
        body: { email: "test@email.com", password: "testpassword" },
        session: { regenerate: jest.fn((cb) => cb()) },
      } as any as Request;
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as any as Response;
      next = jest.fn() as NextFunction;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return 404 if user not found", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      await login(req, res, next);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 if password is wrong", async () => {
      User.findOne = jest.fn().mockReturnValue({});
      crypto.pbkdf2Sync = jest.fn();
      jest.spyOn(crypto, "timingSafeEqual").mockReturnValueOnce(false);
      await login(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Wrong password" });
      expect(next).not.toHaveBeenCalled();
    });

    it("should login user and return user with 200 response", async () => {
      jest.spyOn<any, any>(User, "findOne").mockReturnValueOnce({
        id: "1",
        email: "test@mail.com",
        firstName: "Test",
        lastName: "User",
      });
      crypto.pbkdf2Sync = jest.fn();
      jest.spyOn(crypto, "timingSafeEqual").mockReturnValueOnce(true);
      await login(req, res, next);
      expect(req.session.regenerate).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: "1",
        email: "test@mail.com",
        firstName: "Test",
        lastName: "User",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("POST /signup", () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
      req = {
        body: {
          email: "test@email.com",
          password: "testpassword",
          firstName: "Test",
          lastName: "User",
          role: "client",
        },
        session: { regenerate: jest.fn((cb) => cb()) },
      } as any as Request;
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as any as Response;
      next = jest.fn() as NextFunction;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should create user and return 201 status code with user", async () => {
      const error = new Error("Failed to regenerate session");
      req = {
        ...req,
        session: {
          regenerate: jest.fn().mockImplementationOnce((cb) => cb(error)),
        },
      } as any as Request;
      User.create = jest.fn();
      await signup(req, res, next);
      expect(req.session.regenerate).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should register the user and return 201 response with user", async () => {
      jest.spyOn<any, any>(User, "create").mockResolvedValueOnce({
        id: "1",
        firstName: "Test",
        lastName: "User",
        email: "test@mail.com",
        password: "testpassword",
      });
      await signup(req, res, next);
      expect(req.session.regenerate).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: "1",
        firstName: "Test",
        lastName: "User",
        email: "test@mail.com",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return error with status 409 if the email exists", async () => {
      const error = new MongoServerError({ code: 11000 });
      User.create = jest.fn().mockRejectedValueOnce(error);
      await signup(req, res, next);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        message: "Email already exists!",
      });
      expect(req.session.regenerate).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });
  });
});
