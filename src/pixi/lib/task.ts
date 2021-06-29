export abstract class Task {
  protected _resolve: (value: unknown) => void = () => {}
  protected _reject: (reason?: any) => void = () => {}
  abstract createTaskPromise(): Promise<unknown>
  abstract start(): this
  abstract pause(): this
  abstract resolve(): void
  abstract reject(): void
}
