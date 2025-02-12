import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/Database';
import User from './User.Model';
import Product from './Product.Model';

class Review extends Model{ }

Review.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
    },
    userId: {
        type: DataTypes.UUID,
        references: { model: User, key: "id" },
        allowNull:false,
    },
    productId: {
        type: DataTypes.UUID,
        references: { model: Product, key: "id" },
        allowNull:false,    
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{min:1,max:5}
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull:true
    },
}, {
    sequelize,modelName:"Review"
})

export default Review;