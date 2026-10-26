export const up = (pgm) => {
  // Existing rows have no owner, so remove test data before adding NOT NULL
  pgm.sql('DELETE FROM goals');

  pgm.addColumn('goals', {
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users',
      onDelete: 'CASCADE',
    },
  });

  pgm.createIndex('goals', 'user_id');
};

export const down = (pgm) => {
  pgm.dropIndex('goals', 'user_id');
  pgm.dropColumn('goals', 'user_id');
};