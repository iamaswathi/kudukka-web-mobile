export const up = (pgm) => {
  pgm.createTable('goals', {
    id: 'id', // SERIAL PRIMARY KEY
    name: { type: 'text', notNull: true },
    description: { type: 'text' },
    target_amount: { type: 'numeric(12,2)', notNull: true, check: 'target_amount > 0' },
    current_amount: { type: 'numeric(12,2)', notNull: true, default: 0, check: 'current_amount >= 0' },
    is_completed: { type: 'boolean', notNull: true, default: false },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });
};

export const down = (pgm) => {
  pgm.dropTable('goals');
};