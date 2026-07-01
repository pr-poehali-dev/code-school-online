-- Таблицы заказов для Robokassa (пополнение баланса)
CREATE TABLE IF NOT EXISTS t_p80207328_code_school_online.orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES t_p80207328_code_school_online.users(id),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_phone VARCHAR(50),
    amount DECIMAL(10, 2) NOT NULL,
    robokassa_inv_id INTEGER UNIQUE,
    status VARCHAR(20) DEFAULT 'pending',
    payment_url TEXT,
    delivery_address TEXT,
    order_comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p80207328_code_school_online.order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES t_p80207328_code_school_online.orders(id),
    product_id VARCHAR(100),
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_robokassa_inv_id ON t_p80207328_code_school_online.orders(robokassa_inv_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON t_p80207328_code_school_online.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON t_p80207328_code_school_online.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON t_p80207328_code_school_online.order_items(order_id);