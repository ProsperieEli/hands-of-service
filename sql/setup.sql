-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS games;

CREATE TABLE games(
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    price INT NOT NULL
);

DROP TABLE IF EXISTS movies;

CREATE TABLE movies(
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    main_star TEXT NOT NULL
);

DROP TABLE IF EXISTS animals;

CREATE TABLE animals(
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    type TEXT NOT NULL,
    species TEXT NOT NULL
);

DROP TABLE IF EXISTS technologies;

CREATE TABLE technologies(
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    price INT NOT NULL,
    brand TEXT NOT NULL
);

DROP TABLE IF EXISTS foods;

CREATE TABLE foods(
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    type TEXT NOT NULL,
    food_group TEXT NOT NULL
);