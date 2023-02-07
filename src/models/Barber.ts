import mongoose from "mongoose";
const { Schema } = mongoose;

const barberSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  firstName: String,
  lastName: String,
});

const Barber = mongoose.model("Barber", barberSchema);

export default Barber;
