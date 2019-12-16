CREATE DATABASE reviews;

USE reviews;


CREATE TABLE user_reviews (
    id VARCHAR(36),
    username VARCHAR(30),
    review_title text,
    review text,
    rating VARCHAR(1)
);