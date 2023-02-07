import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import { usersRouter } from "./routes/users";
import { appointmentsRouter } from "./routes/appointments";
import { servicesRouter } from "./routes/services";
import { barbersRouter } from "./routes/barbers";
import MongoStore from "connect-mongo";

const app = express();

app.use(morgan("common"));
app.use(cors({ origin: "http://localhost:5173" }));

if (process.env.NODE_ENV === "development") app.use(cors());

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: "mongodb://127.0.0.1:27017/barbershop" }),
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use("/api/users", usersRouter);
app.use("/api/services", servicesRouter);
app.use("/api/barbers", barbersRouter);
app.use("/api/appointments", appointmentsRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send("Something went wrong!");
});

// 404 routes
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

export default app;
