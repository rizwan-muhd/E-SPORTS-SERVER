import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/Database";
import User from "./User.Model";

class Order extends Model {}

Order.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, references: { model: User, key: "id" }, allowNull: false },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
    paymentStatus: { type: DataTypes.ENUM("pending", "completed", "failed"), defaultValue: "pending" },
    orderStatus: { type: DataTypes.ENUM("processing", "shipped", "delivered", "canceled"), defaultValue: "processing" },
    address: { type: DataTypes.JSON, allowNull: false },
  },
  { sequelize, modelName: "Order" }
);

export default Order;
