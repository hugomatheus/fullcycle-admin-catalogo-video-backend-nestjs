import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import {
  InvalidUuidError,
  Uuid,
} from "../../../../shared/domain/value-objects/uuid.value-object";
import { Category } from "../../../domain/category.entity";
import { CategoryInMemoryRepository } from "../../../infra/db/in-memory/category-in-memory.repository";
import { DeleteCategoryUseCase } from "../../delete-category.use-case";

describe("DeleteCategoryUseCase Units tests", () => {
  let repository: CategoryInMemoryRepository;
  let useCase: DeleteCategoryUseCase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repository);
  });

  it("should throw delete a category", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new InvalidUuidError()
    );

    const uuid = new Uuid();
    await expect(useCase.execute({ id: uuid.id })).rejects.toThrow(
      new NotFoundError(uuid, Category)
    );
  });

  it("should delete a category", async () => {
    const spyDelete = jest.spyOn(repository, "delete");
    const entity = Category.create({ name: "Movie" });
    await repository.insert(entity);

    await useCase.execute({ id: entity.categoryId.id });
    expect(spyDelete).toHaveBeenCalledTimes(1);
    await expect(repository.findById(entity.categoryId)).resolves.toBeNull();
    expect(repository.items).toHaveLength(0);
  });
});
