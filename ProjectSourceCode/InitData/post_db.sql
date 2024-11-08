CREATE TABLE posts
(
    post_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    body TEXT,
    upvotes INT,
    downvotes INT,
    time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE
);

