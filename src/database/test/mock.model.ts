/* eslint-disable @typescript-eslint/no-unused-vars */
export abstract class MockModel<T> {
  protected abstract entityStub: T;

  constructor(createDto: T) {
    this.constructorSpy(createDto);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructorSpy(_createDto: T): void {}

  async find(): Promise<T[]> {
    return [this.entityStub];
  }

  async findById(): Promise<T> {
    return this.entityStub;
  }

  async findByIdAndDelete(): Promise<T> {
    return this.entityStub;
  }

  async findByIdAndUpdate(): Promise<T> {
    return this.entityStub;
  }

  async save(): Promise<T> {
    return this.entityStub;
  }
}
