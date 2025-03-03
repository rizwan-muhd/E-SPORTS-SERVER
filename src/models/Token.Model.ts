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
    type: {
        type: DataTypes.ENUM('ACCESS_TOKEN', 'REFRESH_TOKEN', 'RESET_TOKEN'),
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: false
    },
    blacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    sequelize, modelName: 'Token'
});

export default Token