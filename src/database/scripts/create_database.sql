CREATE DATABASE bookstore_db;

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author_id INTEGER NOT NULL,
  quantity_available INTEGER NOT NULL DEFAULT 0,
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE RESTRICT
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(15),
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loans (
  id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  loan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  return_date TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE RESTRICT,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT
);


CREATE INDEX idx_books_author ON books(author_id);
CREATE INDEX idx_book_loans ON loans(book_id);
CREATE INDEX idx_client_loans ON loans(client_id);