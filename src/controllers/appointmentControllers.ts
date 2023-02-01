import Appointment from "../models/Appointment";

export const createAppointment: Controller = async (req, res, next) => {
  try {
    const appointment = await Appointment.create({
      barberId: req.body.barberId,
      userId: req.body.userId,
      serviceId: req.body.serviceId,
      startDateTime: req.body.startDateTime,
      endDateTime: req.body.endDateTime,
    });
    if (!appointment) {
      return res
        .status(400)
        .json({ message: "Failed to make an appointment." });
    }
    res.status(201).json({ message: "Appointment created." });
  } catch (err) {
    next(err);
  }
};
export const updateAppointment: Controller = async (req, res, next) => {
  try {
    const updatedRows = await Appointment.update(
      {
        barberId: req.body.barberId,
        userId: req.body.userId,
        serviceId: req.body.serviceId,
        startDateTime: req.body.startDateTime,
        endDateTime: req.body.endDateTime,
      },
      { where: { id: req.params.id } }
    );

    if (updatedRows[0] === 0) {
      return res
        .status(400)
        .json({ message: "Failed to update an appointment." });
    }
    res.status(200).json({ message: "Appointment updated." });
  } catch (err) {
    next(err);
  }
};
export const cancelAppointment: Controller = async (req, res, next) => {
  try {
    const destroyedRows = await Appointment.destroy({
      where: { id: req.params.id },
    });
    if (destroyedRows === 0) {
      return res
        .status(400)
        .json({ message: "Failed to cancel an appointment." });
    }
    res.status(200).json({ message: "Appointment canceled." });
  } catch (err) {
    next(err);
  }
};
export const getAppointments: Controller = async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll({
      where: { userId: req.params.userId },
    });
    if (appointments.length === 0) {
      return res.status(400).json({ message: "Failed to get appointments." });
    }
    res.status(200).json({ appointments: appointments });
  } catch (err) {
    next(err);
  }
};
