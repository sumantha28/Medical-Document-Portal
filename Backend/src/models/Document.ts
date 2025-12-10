import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.config';

interface DocumentAttributes {
  id: number;
  filename: string;
  filepath: string;
  filesize: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DocumentCreationAttributes extends Optional<DocumentAttributes, 'id'> {}

class Document extends Model<DocumentAttributes, DocumentCreationAttributes> 
  implements DocumentAttributes {
  public id!: number;
  public filename!: string;
  public filepath!: string;
  public filesize!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Document.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    filepath: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    filesize: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'documents',
    timestamps: true,
    underscored: true
  }
);

export default Document;

