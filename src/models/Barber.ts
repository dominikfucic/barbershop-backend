import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import sequelize from "../database/connection";
import User from "./User";

class Barber extends Model<
  InferAttributes<Barber>,
  InferCreationAttributes<Barber>
> {
  declare id: CreationOptional<string>;
}

Barber.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
  },
  { sequelize }
);

Barber.belongsTo(User)

// Barber.sync();

export default Barber;
