import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/Database';
import Wallet from './Wallet.Model';

interface WalletTransactionAttributes {
    id: number,
    wallet_id: number,
    type: 'CREDIT' | 'DEBIT',
    amount: number,
    description: string,
    createdAt?: Date,
}

interface WalletTransactionCreationAttributes extends Optional<WalletTransactionAttributes, "id"> { }

class WalletTransaction extends Model<WalletTransactionAttributes, WalletTransactionCreationAttributes> implements WalletTransactionAttributes {
    public id!: number;
    public wallet_id!: number;
    public type!: "CREDIT" | "DEBIT";
    public amount!: number;
    public description!: string;

    public readonly createdAt!: Date;
}

WalletTransaction.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    wallet_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Wallet,
            key: 'id',
        }
    },
    type: {
        type: DataTypes.ENUM('CREDIT', 'DEBIT'),
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }

}, {
    sequelize,
    modelName: 'WalletTransaction',
    tableName: 'WalletTransaction'
})
Wallet.hasMany(WalletTransaction, { foreignKey: 'wallet_id' });
WalletTransaction.belongsTo(Wallet, { foreignKey: 'wallet_id' });

export default WalletTransaction;