import { Router } from 'express';
import * as goalsController from '../controllers/goals.controller.js';

const router = Router();

router.get('/', goalsController.listGoals);
router.get('/:id', goalsController.getGoal);
router.post('/', goalsController.createGoal);

export default router;