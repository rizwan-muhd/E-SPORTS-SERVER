import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/Database';

class Product extends Model{ }

Product.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull:true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull:false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imageUrls: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue:[]
    },
},
    { sequelize, modelName: "Product" }
);

export default Product;