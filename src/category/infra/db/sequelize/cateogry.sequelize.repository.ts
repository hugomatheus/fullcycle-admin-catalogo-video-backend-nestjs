import { Entity } from "../../../../shared/domain/entity";
import { SearchParams } from "../../../../shared/domain/repository/search-params";
import { SearchResult } from "../../../../shared/domain/repository/search-result";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.value-object";
import { Category } from "../../../domain/category.entity";
import { ICategoryRepository } from "../../../domain/category.repository";
import { CategoryModel } from "./category.model";

export class CategorySequelizeRepository implements ICategoryRepository {
  sortableFields: string[] = ["name", "createdAt"];

  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create({
      categoryId: entity.categoryId.id,
      name: entity.name,
      description: entity.description,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    });
  }

  async bulkInsert(entities: Category[]): Promise<void> {
    await this.categoryModel.bulkCreate(
      entities.map((entity) => ({
        categoryId: entity.categoryId.id,
        name: entity.name,
        description: entity.description,
        isActive: entity.isActive,
        createdAt: entity.createdAt,
      }))
    );
  }

  update(entity: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(entityId: Uuid): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findById(entityId: Uuid): Promise<Category | null> {
    const categoryModel = await this.categoryModel.findByPk(entityId.id);
    return new Category({
      categoryId: new Uuid(categoryModel.id),
      name: categoryModel.name,
      description: categoryModel.description,
      isActive: categoryModel.isActive,
      createdAt: categoryModel.createdAt,
    });
  }

  async findAll(): Promise<Category[]> {
    const categoriesModel = await this.categoryModel.findAll();
    return categoriesModel.map(
      (categoryModel) =>
        new Category({
          categoryId: new Uuid(categoryModel.id),
          name: categoryModel.name,
          description: categoryModel.description,
          isActive: categoryModel.isActive,
          createdAt: categoryModel.createdAt,
        })
    );
  }

  search(props: SearchParams<string>): Promise<SearchResult<Entity>> {
    throw new Error("Method not implemented.");
  }

  getEntity(): new (...args: any[]) => Category {
    throw new Error("Method not implemented.");
  }
}
