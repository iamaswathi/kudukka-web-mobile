import { AppError } from '../utils/AppError.js';

const goals = [{
    id: 1,
    name: 'Goal 1',
    targetAmount: 500000,
    savedAmount: 270000
}];

let nextId = 2;

export function getAllGoals() {
    return goals;
}

export function getGoalById(id) {
    const goal = goals.find(goal => goal.id === Number(id));
    if(!goal) {
        throw new AppError('Goal not found', 404);
    }
    return goal;
}

export function createGoal({name, targetAmount}) {
    const newGoal = {
        id: nextId++,
        name,
        targetAmount,
        savedAmount: 0
    };
    goals.push(newGoal);
    return newGoal;
}