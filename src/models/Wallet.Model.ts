// src/models/Wallet.ts
import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/Database";
import User from "./User.Model";

interface WalletAttributes {
    id: number;
    user_id: number;
    balance: number;
}

interface WalletCreationAttributes extends Optional<WalletAttributes, "id"> { }

class Wallet extends Model<WalletAttributes, WalletCreationAttributes> implements WalletAttributes {
    public id!: number;
    public user_id!: number;
    public balance!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Wallet.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
            unique: true, // One wallet per user
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: "Wallet",
        tableName: "Wallets",
    }
);

// Associations
User.hasOne(Wallet, { foreignKey: "user_id" });
Wallet.belongsTo(User, { foreignKey: "user_id" });

export default Wallet;
