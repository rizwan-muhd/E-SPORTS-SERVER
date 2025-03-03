import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/Database"; // Import your Sequelize instance

// Define an interface for the Wishlist attributes
interface WishlistAttributes {
    id: number;
    userId: number;
    productId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define an optional interface for creation (id auto-generated)
interface WishlistCreationAttributes extends Optional<WishlistAttributes, "id"> { }

// Define the Wishlist model
class Wishlist extends Model<WishlistAttributes, WishlistCreationAttributes> implements WishlistAttributes {
    public id!: number;
    public userId!: number;
    public productId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the Wishlist model
Wishlist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: "Wishlist",
        tableName: "wishlists",
        timestamps: true, // Ensures createdAt & updatedAt are automatically handled
    }
);

// Export the model
export default Wishlist;
