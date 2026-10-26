import { AppError } from '../utils/AppError.js';
import { pool } from '../db/pool.js';

const GOAL_COLUMNS = `
    id,
    name,
    description,
    target_amount::float8 AS "targetAmount",
    current_amount::float8 AS "currentAmount",
    is_completed AS "isCompleted",
    created_at AS "createdAt"
`;

const parseId = (id) => {
  const n = Number(id);
  if (!Number.isInteger(n) || n <= 0) throw new AppError('Invalid goal id', 400);
  return n;
};

export const getAllGoals = async() => {
    const { rows } = await pool.query(`SELECT ${GOAL_COLUMNS} FROM goals ORDER BY id`);
    return rows;
}

export const getGoalById = async(id) => {
    const { rows } = await pool.query(`SELECT ${GOAL_COLUMNS} FROM goals WHERE id = $1`, [parseId(id)]);
    if( rows.length === 0 ) {
        throw new AppError('Goal not found', 404);
    }
    return rows[0];
}

export const createGoal = async({name, description,targetAmount, currentAmount = 0} = {}) => {
    if( typeof name !== 'string' || name.trim() === '') {
        throw new AppError('Name is required and must not be an empty string', 400);
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

export const updateGoal = async(id, updates = {})=> {
    const existingGoal = await getGoalById(id); //throws 404 if missing
    const name = updates.name ?? existingGoal.name;
    const description = updates.description ?? existingGoal.description;
    const target = Number(updates.targetAmount ?? existingGoal.targetAmount);
    const current = Number(updates.currentAmount ?? existingGoal.currentAmount);

    if( typeof name !== 'string' || name.trim() === '') {
        throw new AppError('Name is required and must not be an empty string', 400);
    }
    if (!Number.isFinite(target) || target <= 0) {
        throw new AppError('Target amount must be a number greater than 0', 400);
    }
    if (!Number.isFinite(current) || current < 0) {
        throw new AppError('Current amount must be a number of 0 or more', 400);
    }

    const { rows } = await pool.query(
         `UPDATE goals
     SET name = $1, description = $2, target_amount = $3,
            current_amount = $4, is_completed = $5
     WHERE id = $6
     RETURNING ${GOAL_COLUMNS}`,
        [name.trim(), description, target, current, current >= target, existingGoal.id]
    );
    return rows[0];
};

export const deleteGoal = async(id) => {
    const { rowCount } = await pool.query(
        `DELETE FROM goals WHERE id = $1`, [parseId(id)]
    )
    if (rowCount === 0) {
        throw new AppError('Goal not found', 404);
    }
    return { message: 'Goal deleted successfully' };
}

export const addContribution = async(id, amount) => {
    const newAmount = Number(amount);
    if (!Number.isFinite(newAmount) || newAmount <= 0) {
        throw new AppError('Contribution amount must be a number greater than 0', 400);
    }

    const { rows } = await pool.query(
        `UPDATE goals
        SET current_amount = current_amount + $1,
            is_completed = (current_amount + $1) >= target_amount
        WHERE id = $2
        RETURNING ${GOAL_COLUMNS}`,
        [newAmount, parseId(id)]
    );

    if (rows.length === 0) {
        throw new AppError('Goal not found', 404);
    }
    return rows[0];
};