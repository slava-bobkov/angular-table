import { Pure } from "./pure";

describe("Pure", () => {
  it("calls getter only once and then sets result as a value property on the object", () => {
    let count = 0;

    class TestClass {
      @Pure
      get someGetter(): string {
        count++;

        return "test";
      }
    }

    const testObject = new TestClass();

    expect(count).toBe(0);
    expect(testObject.someGetter).toBe("test");
    expect(count).toBe(1);
    expect(testObject.someGetter).toBe("test");
    expect(testObject.someGetter).toBe("test");
    expect(count).toBe(1);
  });

  it("memoizes function result", () => {
    const name = "Petya";
    const age = 18;

    class TestClass {
      @Pure
      combine(name: string, age: number): [string, number] {
        return [name, age];
      }
    }

    const testObject = new TestClass();
    const result = testObject.combine(name, age);

    expect(testObject.combine(name, age)).toBe(result);
  });

  it("has access to this", () => {
    const name = "Petya";
    const age = 18;

    class TestClass {
      constructor(readonly prefix: string) {}

      @Pure
      combine(name: string, age: number): [string, string, number] {
        return [this.prefix, name, age];
      }
    }

    const testObject = new TestClass("awesome");
    const result = testObject.combine(name, age);

    expect(testObject.combine(name, age)).toBe(result);
  });
});
