import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({ tableName: "categories", timestamps: false })
export class CategoryModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, field: "category_id" })
  declare categoryId: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string | null;

  @Column({ type: DataType.BOOLEAN, field: 'is_active', allowNull: false })
  declare isActive: boolean;

  @Column({ type: DataType.DATE(3), field: 'created_at', allowNull: false })
  declare createdAt: Date;
}
