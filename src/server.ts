import app from "./app";
import sequelize from "./database/connection";

const PORT = process.env.PORT || 8000;

sequelize
  .authenticate()
  .then(() => console.log("connected sucessfully"))
  .catch((err) => console.error(err));

app.listen(PORT, async () => {
  console.log(`App listening on port: ${PORT}`);
});
