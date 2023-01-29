import { NextFunction, Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";
import crypto from "node:crypto";
import User from "../models/User";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt = crypto.randomBytes(16);

    const hashedPassword = crypto.pbkdf2Sync(
      req.body.password,
      salt,
      310000,
      32,
      "sha256"
    );

    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      salt: salt,
    });

    req.session.regenerate((err) => {
      if (err) throw new Error("Failed to regenerate session");
      req.session.user = user;
      const { id, email, firstName, lastName } = user;
      res.status(201).json({ id, email, firstName, lastName });
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({ message: "Email already exists!" });
    }
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const row = await User.findOne({
      where: { email: req.body.email },
    })

    if (!row) return res.status(404).json({ message: "User not found" });

    const user = row as User

    const hashedPassword = crypto.pbkdf2Sync(
      req.body.password,
      user.salt,
      310000,
      32,
      "sha256"
    );

    if (crypto.timingSafeEqual(user.password, hashedPassword)) {
      req.session.regenerate((err) => {
        if (err) throw new Error("Failed to regenerate the session");
        req.session.user = user;
        const { id, email, firstName, lastName } = user;
        res.status(200).json({ id, email, firstName, lastName });
      });
    } else {
      return res.status(401).json({ message: "Wrong password" });
    }
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.session.destroy((err) => {
      if (err) throw new Error("Failed to destroy the session");
      res.status(200).json({ message: "User logged out" });
    });
  } catch (err) {
    next(err);
  }
};
