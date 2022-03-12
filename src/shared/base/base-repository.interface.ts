export interface IBaseRepository<T> {
  getById(id: string): Promise<T>;
  getAll(): Promise<T[]>;
  create(schema: T): Promise<T>;
  update(schema: T): Promise<void>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
