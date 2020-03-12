import express from 'express';
import * as accountController from '../controllers/account.controller.js';
import coordinatesController from '../controllers/coordinates.controller.js'
import * as adminController from '../controllers/admin.controller.js'
const apiRouter = express.Router();

apiRouter.post('/signup', coordinatesController, accountController.signUp);
apiRouter.post('/signin', accountController.signIn)
apiRouter.get('/admin', adminController.view)
apiRouter.put('/admin', adminController.edit)

export default apiRouter;