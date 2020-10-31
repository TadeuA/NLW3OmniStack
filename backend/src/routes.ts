import { Router} from "express"
import multer from 'multer';

import uploadConfig from "./config/upload"
import OrphanageController from "./controllers/OrphanagesController"
import UserController from "./controllers/UsersController"

import authMiddleware from "./middlewares/authMiddleware"

const routes = Router()
const upload = multer(uploadConfig)


routes.get('/orphanages',OrphanageController.index)
routes.get('/orphanages/:id',OrphanageController.show)

routes.post('/orphanages',upload.array('images') ,OrphanageController.create)

routes.post('/user', UserController.create)
routes.get('/authenticate', UserController.auth)
routes.post('/forgot_password', UserController.forgotPassword)
routes.post('/reset_password', UserController.resetPassword)
routes.get('/user', authMiddleware, UserController.show)





export default routes