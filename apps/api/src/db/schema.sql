DROP TABLE IF EXISTS goals;

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    target_amount NUMERIC(12,2) NOT NULL CHECK (target_amount > 0),
    current_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (current_amount >= 0),
    completed BOOLEAN NOT NULL DEFAULT false,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO goals (name, description, target_amount, current_amount, completed)
VALUES ('Emergency fund', 'Save for unexpected expenses', 10000, 2500, false);