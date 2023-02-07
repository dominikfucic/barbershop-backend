import mongoose from "mongoose";
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  barberId: { type: Number, unique: true, required: true },
  userId: { type: Number, unique: true, required: true  },
  serviceId: { type: Number , unique: true, required: true },
  startDateTime: { type: Date, unique: true, required: true  },
  endDateTime: { type: Date , unique: true, required: true },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
