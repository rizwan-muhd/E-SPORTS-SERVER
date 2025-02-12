import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/Database";
import Order from "./Order.Model";
import Product from "./Product.Model";

class OrderItem extends Model {}

OrderItem.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    orderId: { type: DataTypes.UUID, references: { model: Order, key: "id" }, allowNull: false },
    productId: { type: DataTypes.UUID, references: { model: Product, key: "id" }, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize, modelName: "OrderItem" }
);

export default OrderItem;
