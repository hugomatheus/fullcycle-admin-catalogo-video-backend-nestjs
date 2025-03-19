import { IUseCase } from "../../shared/application/use-case.interface";
import { NotFoundError } from "../../shared/domain/errors/not-found.error";
import { Uuid } from "../../shared/domain/value-objects/uuid.value-object";
import { Category } from "../domain/category.entity";
import { ICategoryRepository } from "../domain/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "./common/category.output";

export class UpdateCategoryUseCase implements IUseCase<UpdateCategoryInput, UpdateCategoryOutput> {
    constructor(private categoryRepository: ICategoryRepository) { }
    async execute(input: UpdateCategoryInput): Promise<CategoryOutput> {
        const uuid = new Uuid(input.id);
        const category = await this.categoryRepository.findById(uuid);

        if (!category) {
            throw new NotFoundError(input.id, Category);
        }

        input.name && category.changeName(input.name);

        if ("description" in input) {
            category.changeDescription(input.description);
        }

        if (input.isActive === true) {
            category.activate();
        }

        if (input.isActive === false) {
            category.deactivate();
        }

        await this.categoryRepository.update(category);
        return CategoryOutputMapper.toOutput(category);
    }

}


export type UpdateCategoryInput = {
    id: string;
    name: string;
    description?: string;
    isActive?: boolean;
}

export type UpdateCategoryOutput = CategoryOutput;