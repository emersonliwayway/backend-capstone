DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS bookmarks;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE tags (
  id serial PRIMARY KEY,
  name text UNIQUE
);

CREATE TABLE post_tags (
  id serial PRIMARY KEY,
  user_id int REFERENCES users(id) ON DELETE CASCADE,
  tag_id int []
);

CREATE TABLE posts (
  id serial PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL,
  user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamp,
  post_tags int UNIQUE REFERENCES post_tags(id) ON DELETE CASCADE
);

CREATE TABLE bookmarks (
  id SERIAL PRIMARY KEY,
  user_id int REFERENCES users(id) ON DELETE CASCADE,
  post_id int REFERENCES posts(id) ON DELETE CASCADE,
  UNIQUE (user_id, post_id)
);
