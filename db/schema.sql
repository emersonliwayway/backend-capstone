DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS bookmarks;

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE posts (
  post_id serial PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL,
  user_id int NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  created_at timestamp,
  tag_list int []
);

CREATE TABLE tags (
  tag_id serial PRIMARY KEY,
  tag_name text UNIQUE
);

CREATE TABLE post_tags (
  post_id int REFERENCES posts(post_id) ON DELETE CASCADE,
  tag_id int REFERENCES tags(tag_id) ON DELETE CASCADE
);

CREATE TABLE bookmarks (
  user_id int REFERENCES users(user_id) ON DELETE CASCADE,
  post_id int REFERENCES posts(post_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, post_id)
);
