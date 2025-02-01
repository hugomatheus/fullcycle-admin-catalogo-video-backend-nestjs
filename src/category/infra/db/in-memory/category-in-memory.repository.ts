import { SearchParams } from "../../../../shared/domain/repository/search-params";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.value-object";
import { InMemorySearchableRepository } from "../../../../shared/infra/db/in-memory/in-memory.repository";
import { Category } from "../../../domain/category.entity";
import { CategoryFilter, CategorySearchParams, ICategoryRepository } from "../../../domain/category.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category, Uuid>
  implements ICategoryRepository
{
  sortableFields: string[] = ["name", "createdAt"];
  protected async applyFilter(
    items: Category[],
    filter: CategoryFilter
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected applySort(
    items: Category[],
    sort: CategorySearchParams["sort"],
    sortDir: CategorySearchParams["sortDir"]
  ): Category[] {
    return sort
      ? super.applySort(items, sort, sortDir)
      : super.applySort(items, "createdAt", "desc");
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}
