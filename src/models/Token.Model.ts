import { sequelize } from "../config/Database";
import { Model, DataTypes } from "sequelize";

class Token extends Model { }

Token.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiry: {
        type: DataTypes.DATE,
        allowNull: false
    }

}, {
    sequelize, modelName: 'Token'
});

export default Token