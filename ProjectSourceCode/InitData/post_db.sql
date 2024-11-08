CREATE TABLE posts
(
    post_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    body TEXT,
    upvotes INT,
    downvotes INT,
    time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users (username)
);

CREATE TABLE comments
(
    comment_id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    body TEXT,
    upvotes INT,
    downvotes INT,
    time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users (username),
    FOREIGN KEY (post_id) REFERENCES posts (post_id) ON DELETE CASCADE
);
