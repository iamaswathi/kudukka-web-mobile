import { Router } from 'express';
import * as goalsController from '../controllers/goals.controller.js';

const router = Router();

router.get('/', goalsController.listGoals);
router.get('/:id', goalsController.getGoal);
router.post('/', goalsController.createGoal);
router.patch('/:id', goalsController.updateGoal);
router.delete('/:id', goalsController.deleteGoal);
router.post('/:id/contributions', goalsController.addContribution);

export default router;