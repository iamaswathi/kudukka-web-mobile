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

export const updateGoal = asyncHandler( async(req, res) =>{
    const updatedGoal = await goalService.updateGoal(req.params.id, req.body);
    res.json(updatedGoal);
});

export const deleteGoal = asyncHandler( async(req, res) =>{
    await goalService.deleteGoal(req.params.id);
    res.status(204).send(); // 204 No Content
});

export const addContribution = asyncHandler( async(req, res) => {
    const updatedGoal = await goalService.addContribution(req.params.id, req.body.amount);
    res.json(updatedGoal);
});