import { QueryTypes } from "sequelize";
import sequelize from "../database/connection";
import Barber from "../models/Barber";
import User from "../models/User";

export const getBarbers: Controller = async (req, res, next) => {
  try {
    let barbers: any[] = await Barber.findAll({ include: [User] });

    barbers = barbers.map((barber) => {
      return {
        id: barber.id,
        firstName: barber.User.firstName,
        lastName: barber.User.lastName,
      };
    });

    if (barbers.length === 0) {
      return res.status(404).json({ message: "Barbers not found." });
    }
    res.status(200).json({ barbers: barbers });
  } catch (err) {
    next(err);
  }
};

export const getFreeSlots: Controller = async (req, res, next) => {
  try {
    const freeSlots = await sequelize.query(
      `WITH RECURSIVE freeSlots AS (
        SELECT CAST(:start AS DATETIME) AS startDateTime, CAST(:start AS DATETIME) + INTERVAL :duration MINUTE AS endDateTime
          UNION ALL
        SELECT startDateTime + INTERVAL :duration MINUTE, endDateTime + INTERVAL :duration MINUTE FROM freeSlots WHERE EXTRACT(HOUR FROM endDateTime) < 16
    )
    
    SELECT fs.startDateTime, fs.endDateTime FROM freeSlots AS fs
      WHERE NOT EXISTS (
        SELECT * FROM appointments as a
            WHERE TIME(fs.startDateTime) < a.endDateTime 
          AND TIME(fs.endDateTime) > a.startDateTime
          AND barberId = :barberId
            )
      AND EXTRACT(HOUR FROM fs.startDateTime) >= 8
        AND EXTRACT(HOUR FROM fs.endDateTime) <= 16
    ORDER BY fs.startDateTime;`,
      {
        replacements: {
          barberId: req.params.id,
          start: req.query.start,
          duration: req.query.duration,
        },
        type: QueryTypes.SELECT,
      }
    );

    console.log(freeSlots);
    res.status(200).json(freeSlots);
  } catch (err) {
    next(err);
  }
};
