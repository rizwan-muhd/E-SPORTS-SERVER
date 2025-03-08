import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/Database';

class Category extends Model {
    public id!: string;
    public name!: string;
}

Category.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: "Category"
});

export default Category;
