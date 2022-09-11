import { DefaultRouter } from '#framework/routers/defaultRouter'
import { UserRouter } from '#framework/routers/userRouter'

export const routers = [new DefaultRouter(), new UserRouter()]
