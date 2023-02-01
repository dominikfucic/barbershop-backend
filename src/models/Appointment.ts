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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    barberId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.UUID,
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

Appointment.hasOne(Service);
Appointment.hasOne(Barber);
Appointment.hasOne(User);

Appointment.sync();

export default Appointment;
