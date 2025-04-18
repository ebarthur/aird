export class Dto<T> {
  constructor(data: Partial<T>) {
    Object.assign(this, data);
  }
}
