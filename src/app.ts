import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import storeBuilder from "connect-session-sequelize";
import cors from "cors";
import morgan from "morgan";
import sequelize from "./database/connection";
import { usersRouter } from "./routes/users";
import { appointmentsRouter } from "./routes/appointments";
import { servicesRouter } from "./routes/services";
import { barbersRouter } from "./routes/barbers";

const app = express();
const SequelizeStore = storeBuilder(session.Store);
const store = new SequelizeStore({ db: sequelize });

app.use(morgan("common"));
app.use(cors({ origin: "http://localhost:3000" }));

if (process.env.NODE_ENV === "development") app.use(cors());

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

store.sync();

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
