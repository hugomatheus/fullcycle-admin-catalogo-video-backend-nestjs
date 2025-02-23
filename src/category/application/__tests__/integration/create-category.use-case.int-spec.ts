import { Uuid } from "../../../../shared/domain/value-objects/uuid.value-object";
import { setupSequelize } from "../../../../shared/infra/testing/helpers.sequelize";
import { CategoryModel } from "../../../infra/db/sequelize/category.model";
import { CategorySequelizeRepository } from "../../../infra/db/sequelize/category.sequelize.repository";
import { CreateCategoryUseCase } from "../../create-category.use-case";

describe("CreateCategoryUseCase Integration Tests", () => {
  let repository: CategorySequelizeRepository;
  let useCase: CreateCategoryUseCase;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new CreateCategoryUseCase(repository);
  });

  it("should create a category", async () => {
    let output = await useCase.execute({ name: "test" });
    let entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity.categoryId.id,
      name: entity.name,
      description: null,
      isActive: true,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      name: "test",
      description: "some description",
    });

    entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity.categoryId.id,
      name: "test",
      description: "some description",
      isActive: true,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      name: "test",
      description: "some description",
      isActive: true,
    });
    entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity.categoryId.id,
      name: "test",
      description: "some description",
      isActive: true,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      name: "test",
      description: "some description",
      isActive: false,
    });
    entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity.categoryId.id,
      name: "test",
      description: "some description",
      isActive: false,
      createdAt: entity.createdAt,
    });
  });
});
