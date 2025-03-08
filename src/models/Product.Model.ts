import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/Database';
import Category from './Category.Model';

class Product extends Model {
    public id!: string;
    public name!: string;
    public description!: string;
    public price!: number;
    public category!: string;
    public stock!: number;
    public status!: 'active' | 'in-active' | 'blocked';
    public imageUrls!: string[];
}

Product.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('active', 'in-active', 'blocked'),
        allowNull: false,
        defaultValue: 'active'
    },
    imageUrls: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: []
    },
},
    { sequelize, modelName: "Product" }
);

Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

export default Product;