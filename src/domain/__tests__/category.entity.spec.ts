import { Category } from "../category.entity";

describe("Category Unit Tests", () => {
  test("constructor", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.categoryId).toBeUndefined();
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

    expect(category.categoryId).toBeUndefined();
    expect(category.name).toBe('Movie');
    expect(category.description).toBe('Movie description');
    expect(category.isActive).toBeFalsy();
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.createdAt).toBe(createdAt);

    category = new Category({
      name: 'Movie',
      description: 'Movie description',
    });

    expect(category.categoryId).toBeUndefined();
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
      expect(category.categoryId).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
    });

    test('should create a category with description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'some description',
      });
      expect(category.categoryId).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('some description');
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
    });

    test('should create a category with is_active', () => {
      const category = Category.create({
        name: 'Movie',
        isActive: false,
      });
      expect(category.categoryId).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.isActive).toBe(false);
      expect(category.createdAt).toBeInstanceOf(Date);
    });
  });

  test('should change name', () => {
    const category = Category.create({
      name: 'Movie',
    });
    category.changeName('other name');
    expect(category.name).toBe('other name');
  });

  test('should change description', () => {
    const category = Category.create({
      name: 'Movie',
    });
    category.changeDescription('some description');
    expect(category.description).toBe('some description');
  });

  test('should active a category', () => {
    const category = Category.create({
      name: 'Filmes',
      isActive: false,
    });
    category.activate();
  });

  test('should disable a category', () => {
    const category = Category.create({
      name: 'Filmes',
      isActive: true,
    });
    category.deactivate();
  });
});
