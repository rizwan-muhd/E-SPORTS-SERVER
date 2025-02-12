import { DataTypes, Model } from "sequelize";
import {sequelize} from "../config/Database";
import Order from "./Order.Model";

class Payment extends Model {}

Payment.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    orderId: { type: DataTypes.UUID, references: { model: Order, key: "id" }, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    method: { type: DataTypes.STRING, allowNull: false },
    transactionId: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.ENUM("pending", "completed", "failed"), defaultValue: "pending" },
  },
  { sequelize, modelName: "Payment" }
);

export default Payment;
