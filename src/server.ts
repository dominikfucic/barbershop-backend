import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 8000;

(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/barbershop");
})();

app.listen(PORT, async () => {
  console.log(`App listening on port: ${PORT}`);
});
