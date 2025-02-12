import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/Database'

class User extends Model {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: string;
    public phone!: string;
    public address!: string;
    public status!: string
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('user', "admin"),
            allowNull: false,
            defaultValue: "user"
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('active', 'in-active', 'blocked'),
            allowNull: false,
            defaultValue: 'active'
        }
    },
    {
        sequelize, modelName: "User"
    }
);
export default User;