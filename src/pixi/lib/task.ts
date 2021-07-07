export abstract class Task implements Next {
  protected _resolve: (value: unknown) => void = () => {
    // 属性xxx没有初始化表达式，且未在构造函数中明确赋值
  }
  protected _reject: (reason?: unknown) => void = () => {
    // 属性xxx没有初始化表达式，且未在构造函数中明确赋值
  }
  abstract createTaskPromise(): Promise<unknown>
  abstract start(): this
  abstract pause(): this
  abstract next(): this
  abstract resolve(): void
  abstract reject(): void
}
export interface Next {
  next(): this
}
