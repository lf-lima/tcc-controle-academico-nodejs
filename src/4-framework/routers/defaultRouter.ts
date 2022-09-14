import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { DefaultOperation } from '#gateway/operations/default/defaultOperation'

export class DefaultRouter extends ExpressRouter {
  constructor () {
    super('/', [
      {
        routeName: 'default',
        method: 'get',
        routePath: '',
        operation: new DefaultOperation()
      }
    ])
  }
}
