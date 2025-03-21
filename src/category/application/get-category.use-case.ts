import { IUseCase } from "../../shared/application/use-case.interface";
import { NotFoundError } from "../../shared/domain/errors/not-found.error";
import { Uuid } from "../../shared/domain/value-objects/uuid.value-object";
import { Category } from "../domain/category.entity";
import { ICategoryRepository } from "../domain/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "./common/category.output";

export class GetCategoryUseCase
  implements IUseCase<GetCategoryInput, GetCategoryOutput>
{
  constructor(private categoryRepository: ICategoryRepository) {}
  async execute(input: GetCategoryInput): Promise<CategoryOutput> {
    const uuid = new Uuid(input.id);
    const category = await this.categoryRepository.findById(uuid);

    if (!category) {
      throw new NotFoundError(input.id, Category);
    }

    return CategoryOutputMapper.toOutput(category);
  }
}

export type GetCategoryInput = {
  id: string;
};

export type GetCategoryOutput = CategoryOutput;
