import {Router} from 'express'
import { validateUser } from '../../middlewares/validateUser'
import { CreateUserController } from '../../useCases/CreateUser'
import { FindUserByIdController } from '../../useCases/FindUserById'
import { RefreshTokenUserController } from '../../useCases/RefreshToken'
import { SessionController } from '../../useCases/Session'

export const accountsRoutes = Router()

const findUserByIdController = new FindUserByIdController()
const createUserController = new CreateUserController()
const sessionController = new SessionController()
const refreshTokenUserController = new RefreshTokenUserController()

accountsRoutes.post('/create', validateUser,  createUserController.handle)
accountsRoutes.get('/getAll', findUserByIdController.handle)
accountsRoutes.post('/session', sessionController.handle)
accountsRoutes.post('/refresh', refreshTokenUserController.handle)