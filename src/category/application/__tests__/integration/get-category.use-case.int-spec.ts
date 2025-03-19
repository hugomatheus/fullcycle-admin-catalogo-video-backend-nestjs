import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import {
  InvalidUuidError,
  Uuid,
} from "../../../../shared/domain/value-objects/uuid.value-object";
import { setupSequelize } from "../../../../shared/infra/testing/helpers.sequelize";
import { Category } from "../../../domain/category.entity";
import { CategoryModel } from "../../../infra/db/sequelize/category.model";
import { CategorySequelizeRepository } from "../../../infra/db/sequelize/category.sequelize.repository";
import { GetCategoryUseCase } from "../../get-category.use-case";

describe('GetCategoryUseCase Integration tests', () => {
  let repository: CategorySequelizeRepository;
  let useCase: GetCategoryUseCase;

  setupSequelize({models: [CategoryModel]});

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new GetCategoryUseCase(repository);
  });

  it('should throw error a category', async () => {
    await expect(useCase.execute({ id: "fake-id" })).rejects.toThrow(
      new InvalidUuidError()
    );
    const uuid = new Uuid();
    await expect(useCase.execute({ id: uuid.id })).rejects.toThrow(
      new NotFoundError(uuid.id, Category)
    );
  });

  it('should get a category', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const entity = Category.create({name: 'Movie'});
    await repository.insert(entity);

    const output = await useCase.execute({id: entity.categoryId.id});
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
        id: entity.categoryId.id,
        name: 'Movie',
        description: null,
        isActive: true,
        createdAt: entity.createdAt,
    });
  });
});
