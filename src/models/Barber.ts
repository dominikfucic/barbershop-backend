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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize }
);

User.hasOne(Barber);

Barber.sync();

export default Barber;
