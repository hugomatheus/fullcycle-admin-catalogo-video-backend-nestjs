import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../category.model";
import { Category } from "../../../../domain/category.entity";

describe("CategoryModel Integration Tests", () => {
  test("should create a category", async () => {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [CategoryModel],
    });
    await sequelize.sync({ force: true });

    const category = Category.fake().aCategory().build();
    CategoryModel.create({
      ...category,
      categoryId: category.categoryId.id,
    });
  });
});
