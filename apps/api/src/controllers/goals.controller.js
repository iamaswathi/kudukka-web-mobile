import * as goalService from '../services/goals.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listGoals = asyncHandler( async(req, res) => {
    const goals = await goalService.getAllGoals();
    res.json(goals);
});

export const getGoal = asyncHandler( async(req, res) => {
    const goal = await goalService.getGoalById(req.params.id);
    res.json(goal);
});

export const createGoal = asyncHandler( async(req, res) =>{
    const newGoal = await goalService.createGoal(req.body);
    res.status(201).json(newGoal);
});