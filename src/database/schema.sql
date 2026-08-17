CREATE TABLE IF NOT EXISTS authors (
    id SERIAL PRIMARY KEY,                   
    name VARCHAR(150) NOT NULL,               
    nationality VARCHAR(100),                
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO authors (name, nationality) VALUES
    ('Machado de Assis', 'Brasileiro'),
    ('Paulo Coelho', 'Brasileiro'),
    ('J.K. Rowling', 'Britânica'),
    ('George R.R. Martin', 'Americana'),
    ('Clarice Lispector', 'Brasileira')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,              
    genre VARCHAR(100),                       
    publication_year INTEGER,                 
    available_quantity INTEGER NOT NULL DEFAULT 1, 
    author_id INTEGER NOT NULL,               
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  
    CONSTRAINT fk_book_author
        FOREIGN KEY (author_id)
        REFERENCES authors(id)
        ON DELETE RESTRICT
);

INSERT INTO books (title, genre, publication_year, available_quantity, author_id) VALUES
    ('Dom Casmurro', 'Romance', 1899, 3, 1),
    ('Memórias Póstumas de Brás Cubas', 'Romance', 1881, 2, 1),
    ('Quincas Borba', 'Romance', 1891, 1, 1),
    ('O Alquimista', 'Ficção', 1988, 5, 2),
    ('Zahir', 'Romance', 2005, 2, 2),
    ('O Peregrino', 'Ficção', 1987, 1, 2),
    ('Harry Potter e a Pedra Filosofal', 'Fantasia', 1997, 4, 3),
    ('Harry Potter e a Câmara Secreta', 'Fantasia', 1998, 3, 3),
    ('A Guerra dos Tronos', 'Fantasia', 1996, 2, 4),
    ('Choque de Reis', 'Fantasia', 1998, 1, 4),
    ('A Hora da Estrela', 'Romance', 1977, 2, 5),
    ('Paixão Segundo G.H.', 'Romance', 1964, 1, 5)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,               
    email VARCHAR(150) UNIQUE,                
    phone VARCHAR(20),                        
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO clients (name, email, phone) VALUES
    ('Ana Silva', 'ana.silva@email.com', '11999998888'),
    ('Bruno Costa', 'bruno.costa@email.com', '11999997777'),
    ('Carlos Mendes', 'carlos.mendes@email.com', '11999996666'),
    ('Diana Oliveira', 'diana.oliveira@email.com', '11999995555'),
    ('Eduardo Santos', 'eduardo.santos@email.com', '11999994444'),
    ('Fernanda Lima', 'fernanda.lima@email.com', '11999993333'),
    ('Gabriel Ferreira', 'gabriel.ferreira@email.com', '11999992222'),
    ('Helena Rocha', 'helena.rocha@email.com', '11999991111')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS loans (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    loan_date DATE NOT NULL DEFAULT CURRENT_DATE,
    return_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 
    CONSTRAINT fk_loan_book
        FOREIGN KEY (book_id)
        REFERENCES books(id)
        ON DELETE RESTRICT,
 
    CONSTRAINT fk_loan_client
        FOREIGN KEY (client_id)
        REFERENCES clients(id)
        ON DELETE RESTRICT
);
 
INSERT INTO loans (book_id, client_id, loan_date, return_date) VALUES
    
    (1, 1, CURRENT_DATE - INTERVAL '15 days', NULL),      
    (3, 2, CURRENT_DATE - INTERVAL '8 days', NULL),       
    (7, 3, CURRENT_DATE - INTERVAL '5 days', NULL),       
    (9, 4, CURRENT_DATE - INTERVAL '3 days', NULL),       
    (11, 5, CURRENT_DATE - INTERVAL '1 day', NULL),          
    (2, 6, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE - INTERVAL '25 days'), 
    (4, 7, CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE - INTERVAL '15 days'), 
    (6, 8, CURRENT_DATE - INTERVAL '14 days', CURRENT_DATE - INTERVAL '10 days'), 
    (8, 1, CURRENT_DATE - INTERVAL '22 days', CURRENT_DATE - INTERVAL '18 days'), 
    (10, 2, CURRENT_DATE - INTERVAL '16 days', CURRENT_DATE - INTERVAL '12 days') 
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS loans (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    loan_date DATE NOT NULL DEFAULT CURRENT_DATE,
    return_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 
    CONSTRAINT fk_loan_book
        FOREIGN KEY (book_id)
        REFERENCES books(id)
        ON DELETE RESTRICT,
 
    CONSTRAINT fk_loan_client
        FOREIGN KEY (client_id)
        REFERENCES clients(id)
        ON DELETE RESTRICT
);
 
INSERT INTO loans (book_id, client_id, loan_date, return_date) VALUES    
    (1, 1, CURRENT_DATE - INTERVAL '15 days', NULL),
    (3, 2, CURRENT_DATE - INTERVAL '8 days', NULL),
    (7, 3, CURRENT_DATE - INTERVAL '5 days', NULL),
    (9, 4, CURRENT_DATE - INTERVAL '3 days', NULL),
    (11, 5, CURRENT_DATE - INTERVAL '1 day', NULL),
    (2, 6, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE - INTERVAL '25 days'),
    (4, 7, CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE - INTERVAL '15 days'),
    (6, 8, CURRENT_DATE - INTERVAL '14 days', CURRENT_DATE - INTERVAL '10 days'),  
    (8, 1, CURRENT_DATE - INTERVAL '22 days', CURRENT_DATE - INTERVAL '18 days'),  
    (10, 2, CURRENT_DATE - INTERVAL '16 days', CURRENT_DATE - INTERVAL '12 days')  
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO employees (name, email, password)
VALUES
    ('Admin Sistema', 'admin@bookstore.com', 'admin123'),
    ('Maria Silva', 'maria@bookstore.com', 'maria123'),
    ('João Santos', 'joao@bookstore.com', 'joao123')
ON CONFLICT (email) DO NOTHING;