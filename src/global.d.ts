import { Response, Request, NextFunction } from "express";
import { ObjectId } from "mongodb";

declare module "express-session" {
  interface SessionData {
    user: any;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE_NAME: string;
      SESSION_SECRET: string;
    }
  }

  type Controller = (req: Request, res: Response, next: NextFunction) => void;

  interface Barber {
    _id: ObjectId;
    userId: {
      firstName: string;
      lastName: string;
    };
  }

  interface BarberResponse {
    _id: ObjectId;
    firstName: string;
    lastName: string;
  }
}


export {};
