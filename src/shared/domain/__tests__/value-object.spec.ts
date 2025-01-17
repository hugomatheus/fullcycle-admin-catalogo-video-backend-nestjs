import { ValueObject } from "../value-object";

class StubStringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class StubComplexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super();
  }
}

describe("ValueObject Unit Tests", () => {
  test("should be equals", () => {
    const valueObjet1 = new StubStringValueObject("test");
    const valueObjet2 = new StubStringValueObject("test");
    expect(valueObjet1.equals(valueObjet2)).toBeTruthy();

    const complexValueObject1 = new StubComplexValueObject("test", 1);
    const complexValueObject2 = new StubComplexValueObject("test", 1);
    expect(complexValueObject1.equals(complexValueObject2)).toBeTruthy();
  });

  test("should not be equals", () => {
    const valueObjet1 = new StubStringValueObject("test1");
    const valueObjet2 = new StubStringValueObject("test2");
    expect(valueObjet1.equals(valueObjet2)).toBeFalsy();
    expect(valueObjet1.equals(null as any)).toBeFalsy();
    expect(valueObjet1.equals(undefined as any)).toBeFalsy();

    const complexValueObject1 = new StubComplexValueObject("test", 1);
    const complexValueObject2 = new StubComplexValueObject("test", 2);
    const complexValueObject3 = new StubComplexValueObject("test2", 1);
    expect(complexValueObject1.equals(complexValueObject2)).toBeFalsy();
    expect(complexValueObject1.equals(complexValueObject3)).toBeFalsy();
    expect(complexValueObject1.equals(null as any)).toBeFalsy();
    expect(complexValueObject1.equals(undefined as any)).toBeFalsy();
  });
});
