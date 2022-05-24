import PLazy from 'p-lazy';

export default class Defer implements PromiseLike<void> {
  private array: PLazy<unknown>[] = [];
  private promise: Promise<void> = Promise.resolve();

  public deferPromise<TResult1 = unknown>(
    executor: (
      resolve: (value: TResult1 | PromiseLike<TResult1>) => void,
      reject: (reason?: any) => void,
    ) => void,
  ) {
    this.array.push(new PLazy<TResult1>(executor));
  }

  public defer<TResult1 = unknown>(
    executor: () => TResult1 | PromiseLike<TResult1>,
  ) {
    this.array.push(PLazy.from(executor));
  }

  public then<TResult1 = unknown, TResult2 = never>(
    onfulfilled?:
      | ((value: void) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null,
  ): PromiseLike<TResult1 | TResult2> {
    return this.getPromise().then(onfulfilled, onrejected);
  }

  private getPromise() {
    while (this.array.length) {
      const lazy = this.array.pop();
      this.promise = this.promise.finally(() => lazy);
    }
    return this.promise;
  }
}
