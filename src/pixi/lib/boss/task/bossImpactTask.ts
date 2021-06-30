import { Application } from 'pixi.js'
import { Boss } from '../index'
import { Task } from '../../task'
import { Organization } from '../../container'
export class BossImpactTask extends Task {
  public boss
  public app
  public organization
  constructor(boss: Boss, app: Application, organization: Organization) {
    super()
    this.boss = boss
    this.app = app
    this.organization = organization
  }
  createTaskPromise(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }
  start(): this {
    return this
  }
  pause(): this {
    return this
  }
  resolve(): void {
    this._resolve(true)
  }
  reject(): void {
    this._reject()
  }
}
