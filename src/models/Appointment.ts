import sequelize from "../database/connection";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from "sequelize";
import Service from "./Service";
import Barber from "./Barber";
import User from "./User";

class Appointment extends Model<
  InferAttributes<Appointment>,
  InferCreationAttributes<Appointment>
> {
  declare id: CreationOptional<string>;
  declare barberId: string;
  declare userId: string;
  declare serviceId: string;
  declare startDateTime: Date;
  declare endDateTime: Date;
}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    barberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize }
);

Service.hasOne(Appointment);
Barber.hasOne(Appointment);
User.hasOne(Appointment);

// Appointment.sync();

export default Appointment;
