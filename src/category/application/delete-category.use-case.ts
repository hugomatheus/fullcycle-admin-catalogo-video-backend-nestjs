import { IUseCase } from "../../shared/application/use-case.interface";
import { Uuid } from "../../shared/domain/value-objects/uuid.value-object";
import { ICategoryRepository } from "../domain/category.repository";

export class DeleteCategoryUseCase
  implements IUseCase<DeleteCategoryInput, DeleteCategoryOutput>
{
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(input: DeleteCategoryInput): Promise<void> {
    const uuid = new Uuid(input.id);
    await this.categoryRepository.delete(uuid);
  }
}

export type DeleteCategoryInput = {
  id: string;
};

type DeleteCategoryOutput = void;
