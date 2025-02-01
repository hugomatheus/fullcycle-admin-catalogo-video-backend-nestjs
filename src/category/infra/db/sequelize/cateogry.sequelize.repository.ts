import { Op } from "sequelize";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.value-object";
import { Category } from "../../../domain/category.entity";
import {
  CategorySearchParams,
  CategorySearchResult,
  ICategoryRepository,
} from "../../../domain/category.repository";
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

  async update(entity: Category): Promise<void> {
    const id = entity.categoryId.id;
    const categoryModel = await this.categoryModel.findByPk(id);
    if (!categoryModel) {
      throw new NotFoundError(id, this.getEntity());
    }

    await this.categoryModel.update(
      {
        categoryId: id,
        name: entity.name,
        description: entity.description,
        isActive: entity.isActive,
        createdAt: entity.createdAt,
      },
      { where: { categoryId: id } }
    );
  }

  async delete(entityId: Uuid): Promise<void> {
    const categoryModel = await this.categoryModel.findByPk(entityId.id);
    if (!categoryModel) {
      throw new NotFoundError(entityId.id, this.getEntity());
    }
    this.categoryModel.destroy({ where: { categoryId: entityId.id } });
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

  async search(props: CategorySearchParams): Promise<CategorySearchResult> {
    const { rows, count } = await this.categoryModel.findAndCountAll({
      ...(props.filter && {
        where: {
          name: { [Op.like]: `%${props.filter}%` },
        },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? {
            order: [[props.sort, props.sortDir]],
          }
        : { order: [["createdAt", "desc"]] }),
      offset: (props.page - 1) * props.perPage,
      limit: props.perPage,
    });

    return new CategorySearchResult({
      items: rows.map(
        (categoryModel) =>
          new Category({
            categoryId: new Uuid(categoryModel.id),
            name: categoryModel.name,
            description: categoryModel.description,
            isActive: categoryModel.isActive,
            createdAt: categoryModel.createdAt,
          })
      ),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
    });
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}
