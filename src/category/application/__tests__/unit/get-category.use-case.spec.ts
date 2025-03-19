import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import {
  InvalidUuidError,
  Uuid,
} from "../../../../shared/domain/value-objects/uuid.value-object";
import { Category } from "../../../domain/category.entity";
import { CategoryInMemoryRepository } from "../../../infra/db/in-memory/category-in-memory.repository";
import { GetCategoryUseCase } from "../../get-category.use-case";

describe('GetCategoryUseCase Units tests', () => {
  let repository: CategoryInMemoryRepository;
  let useCase: GetCategoryUseCase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
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
