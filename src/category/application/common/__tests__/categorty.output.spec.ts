import { Category } from "../../../domain/category.entity";
import { CategoryOutputMapper } from "../category.output";

describe('CategoryOutputMapper Unit Test', () => {
    it('should convert a category in output', () => {
        const entity = Category.create({
            name: 'Movie',
            description: 'Movie description',
            isActive: true,
        });
        const spyToJson = jest.spyOn(entity, 'toJSON');
        const output = CategoryOutputMapper.toOutput(entity);
        expect(spyToJson).toHaveBeenCalled();
        expect(output).toStrictEqual({
            id: entity.categoryId.id,
            name: 'Movie',
            description: 'Movie description',
            isActive: true,
            createdAt: entity.createdAt,
        });
    });
});