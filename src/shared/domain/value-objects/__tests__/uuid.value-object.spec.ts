import { InvalidUuidError, Uuid } from "../uuid.value-object";
import { validate as uuidValidate } from "uuid";

describe("Uuid Unit Test", () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");
  test("should throw error when uuid is invalid", () => {
    expect(() => {
      new Uuid('test');
    }).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("should create a valid uuid", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("should accept a valid uuid", () => {
    const id = "fdc50e49-6f9d-4733-b878-8e456d8e3665";
    const uuid = new Uuid(id);
    expect(uuid.id).toBe(id);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  describe("create command", () => {
    test("should create a valid uuid by create command", () => {
      const uuid = Uuid.create();
      expect(uuid.id).toBeDefined();
      expect(uuidValidate(uuid.id)).toBeTruthy();
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should accept a valid uuid by create command", () => {
      const id = "fdc50e49-6f9d-4733-b878-8e456d8e3665";
      const uuid = Uuid.create(id);
      expect(uuid.id).toBe(id);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should throw error when uuid is invalid by create command", () => {
      expect(() => Uuid.create('test-uuid')).toThrow(new InvalidUuidError());
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });
});