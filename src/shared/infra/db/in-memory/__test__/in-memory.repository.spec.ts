import { Entity } from "../../../../domain/entity";
import { NotFoundError } from "../../../../domain/errors/not-found.error";
import { ValueObject } from "../../../../domain/value-object";
import { Uuid } from "../../../../domain/value-objects/uuid.value-object";
import { InMemoryRepository } from "../in-memory.repository";

type StubEntityConstructorProps = {
  stubId?: Uuid;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  stubId: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityConstructorProps) {
    super();
    this.stubId = props.stubId || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }
  get entityId(): ValueObject {
    return this.stubId;
  }
  toJSON() {
    return {
      stubId: this.stubId.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe("InMemoryRespository Unit Tests", () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  test("should insert a new entity", async () => {
    const entity = new StubEntity({
      stubId: new Uuid(),
      name: "Test",
      price: 100,
    });

    await repository.insert(entity);
    expect(repository.items.length).toBe(1);
    expect(repository.items[0]).toBe(entity);
  });

  test("should bulk insert entities", async () => {
    const entities = [
      new StubEntity({
        stubId: new Uuid(),
        name: "Test",
        price: 100,
      }),
      new StubEntity({
        stubId: new Uuid(),
        name: "Test2",
        price: 34,
      }),
    ];
    await repository.bulkInsert(entities);
    expect(repository.items.length).toBe(2);
    expect(repository.items[0]).toBe(entities[0]);
    expect(repository.items[1]).toBe(entities[1]);
  });

  test("should throws error on update when entity not found", () => {
    const entity = new StubEntity({
      name: "Test",
      price: 100,
    });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entityId, StubEntity)
    );
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.stubId.id, StubEntity)
    );
  });

  test("should updates an entity", () => {
    const entity = new StubEntity({
      name: "Test",
      price: 100,
    });
    repository.insert(entity);
    const entityUpdated = new StubEntity({
      stubId: entity.stubId,
      name: "Test Edit",
      price: 3,
    });
    repository.update(entityUpdated);
    expect(repository.items[0]).toStrictEqual(entityUpdated);
  });

  test("should throws error on delete when entity not found", () => {
    const entity = new StubEntity({
      name: "Test",
      price: 100,
    });
    expect(repository.delete(entity.stubId)).rejects.toThrow(
      new NotFoundError(entity.stubId, StubEntity)
    );
  });

  test("should deletes an entity", async () => {
    const entity = new StubEntity({
      name: "Test",
      price: 100,
    });
    await repository.insert(entity);
    await repository.delete(entity.stubId);
    expect(repository.items).toHaveLength(0);
    expect(repository.items.length).toBe(0);
  });

  test("should returns all entities", async () => {
    const entity = new StubEntity({
      stubId: new Uuid(),
      name: "Test",
      price: 100,
    });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities.length).toBe(1);
    expect(entities).toStrictEqual([entity]);
  });
});
