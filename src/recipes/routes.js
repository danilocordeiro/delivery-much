import { Router } from 'express';
import { ingredientsValidator } from './middlewares';
import controller from './controller';

const router = Router();

router.get('/', ingredientsValidator(), controller.getRecipes);

export default router;
