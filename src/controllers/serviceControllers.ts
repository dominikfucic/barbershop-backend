import Service from "../models/Service";

export const getServices: Controller = async (req, res, next) => {
  try {
    const services = await Service.findAll();
    if (services.length === 0) {
      return res.status(404).json({ message: "There are no services." });
    }
    res.status(200).json({ services: services });
  } catch (err) {
    next(err);
  }
};
