import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { ExpressOperationAdapter } from '#gateway/adapters/operation/express/expressOperationAdapter'
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
