import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { ExpressOperationAdapter } from '#framework/adapters/operation/expressOperationAdapter'
import { DefaultOperation } from '#gateway/operations/default/defaultOperation'

export class DefaultRouter extends ExpressRouter {
  constructor () {
    super('/', [
      {
        method: 'get',
        routePath: '',
        operationAdapter: new ExpressOperationAdapter(
          new DefaultOperation()
        )
      }
    ])
  }
}
