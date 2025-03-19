import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.value-object";
import { setupSequelize } from "../../../../shared/infra/testing/helpers.sequelize";
import { Category } from "../../../domain/category.entity";
import { CategoryInMemoryRepository } from "../../../infra/db/in-memory/category-in-memory.repository";
import { CategoryModel } from "../../../infra/db/sequelize/category.model";
import { CategorySequelizeRepository } from "../../../infra/db/sequelize/category.sequelize.repository";
import { UpdateCategoryInput, UpdateCategoryUseCase } from "../../update-category.use-case";

describe('UpdateCategoryUseCase Integration Test', () => {
    let repository: CategorySequelizeRepository;
    let useCase: UpdateCategoryUseCase;

    setupSequelize({ models: [CategoryModel] });


    beforeEach(() => {
        repository = new CategorySequelizeRepository(CategoryModel);
        useCase = new UpdateCategoryUseCase(repository);
    });

    it('should throw NotFoundError', async () => {
        const input: UpdateCategoryInput = {
            id: new Uuid().id,
            name: 'Movie'
        };
        await expect(useCase.execute(input)).rejects.toThrow(new NotFoundError(input.id, Category));
    });

    it('should update a category', async () => {
        const spyUpdate = jest.spyOn(repository, 'update');
        const entity = Category.create({ name: 'Movie' });
        repository.insert(entity);

        const input: UpdateCategoryInput = {
            id: entity.categoryId.id,
            name: 'test',
        };

        let output = await useCase.execute(input);
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: entity.categoryId.id,
            name: 'test',
            description: null,
            isActive: true,
            createdAt: entity.createdAt,
        });

        const arrange: Arrange[] = [
            {
                input: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                },
                expected: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                    isActive: true,
                    createdAt: entity.createdAt,
                },
            },
            {
                input: {
                    id: entity.categoryId.id,
                    name: "test",
                },
                expected: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                    isActive: true,
                    createdAt: entity.createdAt,
                },
            },
            {
                input: {
                    id: entity.categoryId.id,
                    name: "test",
                    isActive: false,
                },
                expected: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                    isActive: false,
                    createdAt: entity.createdAt,
                },
            },
            {
                input: {
                    id: entity.categoryId.id,
                    name: "test",
                },
                expected: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                    isActive: false,
                    createdAt: entity.createdAt,
                },
            },
            {
                input: {
                    id: entity.categoryId.id,
                    name: "test",
                    isActive: true,
                },
                expected: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                    isActive: true,
                    createdAt: entity.createdAt,
                },
            },
            {
                input: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                    isActive: false,
                },
                expected: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                    isActive: false,
                    createdAt: entity.createdAt,
                },
            },
        ];

        for (const i of arrange) {
            output = await useCase.execute(i.input);
            expect(output).toStrictEqual(i.expected);
            const entityUpdated = await repository.findById(new Uuid(i.input.id));
            expect({
                id: entityUpdated.categoryId.id,
                name: entityUpdated.name,
                description: entityUpdated.description,
                isActive: entityUpdated.isActive,
                createdAt: entityUpdated.createdAt
            }).toStrictEqual(i.expected);
        }
    });
});