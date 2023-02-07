import { Request, Response, NextFunction } from "express";
import { getFreeSlots } from "../src/controllers/barberControllers";
import Appointment from "../src/models/Appointment";

describe("api/barbers", () => {
  describe("GET /get_time", () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;
    beforeEach(() => {
      req = {
        params: { barberId: "123" },
        query: { startTime: "2023-02-06T08:00:00.000Z", duration: "30" },
      } as any as Request;

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any as Response;

      next = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should get available free time slots", async () => {
      const mockFind = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue([]),
      });

      Appointment.find = mockFind;
      await getFreeSlots(req, res, next);
      expect(Appointment.find).toHaveBeenCalledWith({ barberId: "123" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          startDateTime: new Date("2023-02-06T08:00:00.000Z"),
          endDateTime: new Date("2023-02-06T08:30:00.000Z"),
        },
        {
          startDateTime: new Date("2023-02-06T08:30:00.000Z"),
          endDateTime: new Date("2023-02-06T09:00:00.000Z"),
        },
        {
          startDateTime: new Date("2023-02-06T09:00:00.000Z"),
          endDateTime: new Date("2023-02-06T09:30:00.000Z"),
        },
        {
          startDateTime: new Date("2023-02-06T09:30:00.000Z"),
          endDateTime: new Date("2023-02-06T10:00:00.000Z"),
        },
        {
          startDateTime: new Date("2023-02-06T10:00:00.000Z"),
          endDateTime: new Date("2023-02-06T10:30:00.000Z"),
        },
        {
          startDateTime: new Date("2023-02-06T10:30:00.000Z"),
          endDateTime: new Date("2023-02-06T11:00:00.000Z"),
        },
        {
          startDateTime: new Date("2023-02-06T11:00:00.000Z"),
          endDateTime: new Date("2023-02-06T11:30:00.000Z"),
        },
        {
          startDateTime: new Date("2023-02-06T11:30:00.000Z"),
          endDateTime: new Date("2023-02-06T12:00:00.000Z"),
        },
        {
          startDateTime: new Date("2023-02-06T12:00:00.000Z"),
          endDateTime: new Date("2023-02-06T12:30:00.000Z"),
        },
        {
          startDateTime: new Date("2023-02-06T12:30:00.000Z"),
          endDateTime: new Date("2023-02-06T13:00:00.000Z"),
        },
        {
          startDateTime: new Date("2023-02-06T13:00:00.000Z"),
          endDateTime: new Date("2023-02-06T13:30:00.000Z"),
        },
        {
          startDateTime: new Date("2023-02-06T13:30:00.000Z"),
          endDateTime: new Date("2023-02-06T14:00:00.000Z"),
        },
        {
          startDateTime: new Date("2023-02-06T14:00:00.000Z"),
          endDateTime: new Date("2023-02-06T14:30:00.000Z"),
        },
        {
          startDateTime: new Date("2023-02-06T14:30:00.000Z"),
          endDateTime: new Date("2023-02-06T15:00:00.000Z"),
        },
        {
          startDateTime: new Date("2023-02-06T15:00:00.000Z"),
          endDateTime: new Date("2023-02-06T15:30:00.000Z"),
        },
      ]);
      expect(next).not.toHaveBeenCalled();
    });
  });
});
