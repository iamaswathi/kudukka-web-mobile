import { AppError } from '../utils/AppError.js';

const goals = [{
    id: 1,
    name: 'Goal 1',
    targetAmount: 500000,
    savedAmount: 270000
}];

let nextId = 2;

const GOAL_COLUMNS = `
  id,
  name,
  description,
  target_amount AS "targetAmount",
  current_amount AS "currentAmount",
  is_completed AS "isCompleted",
  created_at AS "createdAt"
`;

export const getAllGoals = async() => {
    const { rows } = await pool.query('SELECT * FROM goals ORDER BY id');
    return rows;
}

export const getGoalById = async(id) => {
    const { rows } = await pool.query('SELECT * FROM goals WHERE id = $1', [id]);
    if( rows.length === 0 ) {
        throw new AppError('Goal not found', 404);
    }
    return rows[0];
}

export const createGoal = async({name, description,targetAmount, currentAmount = 0} = {}) => {
    if( typeof name !== 'string' || name.trim() === '') {
        throw new AppError('Name is required and must not be anempty string', 400);
    }

    const target = Number(targetAmount);
    const current = Number(currentAmount);
    if (targetAmount === undefined || !Number.isFinite(target) || target <= 0) {
        throw new AppError('Target amount must be a number greater than 0', 400);
    }
    if (!Number.isFinite(current) || current < 0) {
        throw new AppError('Current amount must be a number of 0 or more', 400);
    }
    const isCompleted = current >= target;

    const { rows } = await pool.query(
        `INSERT INTO goals (name, description, target_amount, current_amount, is_completed)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING ${GOAL_COLUMNS}`,
        [name.trim(), description?.trim() || null, target, current, isCompleted]
    );

    return rows[0];
}