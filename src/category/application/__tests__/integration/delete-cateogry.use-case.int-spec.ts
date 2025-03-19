import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.value-object";
import { setupSequelize } from "../../../../shared/infra/testing/helpers.sequelize";
import { Category } from "../../../domain/category.entity";
import { CategoryModel } from "../../../infra/db/sequelize/category.model";
import { CategorySequelizeRepository } from "../../../infra/db/sequelize/category.sequelize.repository";
import { DeleteCategoryUseCase } from "../../delete-category.use-case";

describe("DeleteCategoryUseCase Integration tests", () => {
  let repository: CategorySequelizeRepository;
  let useCase: DeleteCategoryUseCase;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new DeleteCategoryUseCase(repository);
  });

  it("should throw delete a category", async () => {
    const uuid = new Uuid();
    await expect(useCase.execute({id: uuid.id})).rejects.toThrow(
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
  });
});
