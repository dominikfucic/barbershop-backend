import { Document, ObjectId } from "mongoose";
import Appointment from "../models/Appointment";
import Barber from "../models/Barber";
import User from "../models/User";

export const getBarbers: Controller = async (req, res, next) => {
  try {
    const barbers = (await Barber.find().populate(
      "userId",
      "firstName lastName"
    )) as Barber[];

    const _barbers = barbers.map((barber) => {
      return {
        _id: barber._id,
        firstName: barber.userId.firstName,
        lastName: barber.userId.lastName,
      } as BarberResponse;
    });

    if (_barbers.length === 0) {
      return res.status(404).json({ message: "Barbers not found." });
    }

    res.status(200).json({ barbers: _barbers });
  } catch (err) {
    next(err);
  }
};

export const getFreeSlots: Controller = async (req, res, next) => {
  function generateTimeSlots(startTime: Date, endTime: Date, interval: number) {
    let currentTime = new Date(startTime);
    const end = new Date(endTime);
    const timeSlots = [];

    while (currentTime <= end) {
      timeSlots.push({
        startDateTime: new Date(currentTime),
        endDateTime: new Date(
          currentTime.setMinutes(currentTime.getMinutes() + interval)
        ),
      });
    }

    return timeSlots;
  }

  try {
    const bookedTimeSlots = await Appointment.find({
      barberId: req.params.barberId,
    }).select("startDateTime endDateTime");
    const startTime = new Date(req.query.startTime as string);
    const endTime = new Date(
      startTime.getFullYear(),
      startTime.getMonth(),
      startTime.getDate(),
      16,
      0,
      0,
      0
    );
    const interval = Number(req.query.duration);
    let freeSlots = generateTimeSlots(startTime, endTime, interval);
    freeSlots = freeSlots.filter(
      (slot) =>
        !bookedTimeSlots.some(
          (timeSlot) =>
            slot.startDateTime.getTime() === timeSlot.startDateTime.getTime()
        )
    );
    if (freeSlots.length === 0) {
      res.status(400).json({ message: "Couldn't get free slots." });
    } else {
      res.status(200).json(freeSlots);
    }
  } catch (error) {
    next(error);
  }
};
