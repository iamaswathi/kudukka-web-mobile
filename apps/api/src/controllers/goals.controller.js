import * as goalService from '../services/goals.service.js';

export function listGoals(req, res) {
    const goals = goalService.getAllGoals();
    res.json(goals);
}

export function getGoal(req, res) {
    const goal = goalService.getGoalById(req.params.id);
    res.json(goal);
}

export function createGoal(req, res) {
    const { name, targetAmount } = req.body;
    const newGoal = goalService.createGoal({ name, targetAmount });
    res.status(201).json(newGoal);
}