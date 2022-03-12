export class Result<T> {
  errors: string[];
  data: T | null;

  get isSuccess() {
    return this.errors.length == 0;
  }

  constructor(data: T, errors: string[]) {
    this.data = data;
    this.errors = errors;
  }
}
