import { SearchParams } from "../../../shared/domain/repository/search-params";
import { Uuid } from "../../../shared/domain/value-objects/uuid.value-object";
import { InMemorySearchableRepository } from "../../../shared/infra/db/in-memory/in-memory.repository";
import { Category } from "../../domain/category.entity";

export class CategoryInMemoryRepository extends InMemorySearchableRepository<
  Category,
  Uuid
> {
  sortableFields: string[] = ["name", "createdAt"];
  protected async applyFilter(
    items: Category[],
    filter: string
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
    sort: SearchParams["sort"],
    sortDir: SearchParams["sortDir"]
  ): Category[] {
    return sort
      ? super.applySort(items, sort, sortDir)
      : super.applySort(items, "createdAt", "desc");
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}
