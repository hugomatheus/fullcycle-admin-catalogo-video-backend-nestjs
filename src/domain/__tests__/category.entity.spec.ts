import { Uuid } from "../../shared/domain/value-objects/uuid.value-object";
import { Category } from "../category.entity";
import { validate as uuidValidate } from "uuid";

describe("Category Unit Tests", () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });
  test("constructor", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.categoryId).toBeDefined();
    expect(category.categoryId).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Movie');
    expect(category.description).toBeNull();
    expect(category.isActive).toBeTruthy();
    expect(category.createdAt).toBeInstanceOf(Date);

    const createdAt = new Date();
    category = new Category({
      name: 'Movie',
      description: 'Movie description',
      isActive: false,
      createdAt,
    });

    expect(category.categoryId).toBeDefined();
    expect(category.categoryId).toBeInstanceOf(Uuid);
    expect(uuidValidate(category.categoryId.id)).toBeTruthy();
    expect(category.name).toBe('Movie');
    expect(category.description).toBe('Movie description');
    expect(category.isActive).toBeFalsy();
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.createdAt).toBe(createdAt);

    category = new Category({
      name: 'Movie',
      description: 'Movie description',
    });

    expect(category.categoryId).toBeDefined();
    expect(category.categoryId).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Movie');
    expect(category.description).toBe('Movie description');
    expect(category.isActive).toBeTruthy();
    expect(category.createdAt).toBeInstanceOf(Date);
  });
  describe('create command', () => {
    test('should create a category', () => {
      const category = Category.create({
        name: 'Movie',
      });
      expect(category.categoryId).toBeDefined();
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should create a category with description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'some description',
      });
      expect(category.categoryId).toBeDefined();
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('some description');
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should create a category with is_active', () => {
      const category = Category.create({
        name: 'Movie',
        isActive: false,
      });
      expect(category.categoryId).toBeDefined();
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.isActive).toBe(false);
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("categoryId field", () => {
    const arrange = [
      {categoryId: null},
      {categoryId: undefined},
      {categoryId: Uuid.create()},
    ];

    test.each(arrange)("id = %j", ({ categoryId }) => {
      const category = new Category({
        name: "Movie",
        categoryId: categoryId as any,
      });

      expect(category.categoryId).toBeInstanceOf(Uuid);
      if (categoryId instanceof Uuid) {
        expect(category.categoryId).toBe(categoryId);
      }
    });
  });

  test('should change name', () => {
    const category = Category.create({
      name: 'Movie',
    });
    category.changeName('other name');
    expect(category.name).toBe('other name');
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test('should change description', () => {
    const category = Category.create({
      name: 'Movie',
    });
    category.changeDescription('some description');
    expect(category.description).toBe('some description');
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test('should active a category', () => {
    const category = Category.create({
      name: 'Filmes',
      isActive: false,
    });
    category.activate();
    expect(category.isActive).toBeTruthy();
  });

  test('should disable a category', () => {
    const category = Category.create({
      name: 'Filmes',
      isActive: true,
    });
    category.deactivate();
    expect(category.isActive).toBeFalsy();
  });
});

describe("Category Validator", () => {
  describe("create command", () => {
    const category = Category.create({
      name: null
    });
  });
});
