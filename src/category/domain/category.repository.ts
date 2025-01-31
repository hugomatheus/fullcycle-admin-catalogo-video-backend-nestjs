import { ISeachableRepository } from "../../shared/domain/repository/repository.interface";
import { Uuid } from "../../shared/domain/value-objects/uuid.value-object";
import { Category } from "./category.entity";

export interface ICategoryRepository extends ISeachableRepository<Category, Uuid> {}
