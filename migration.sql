DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id serial PRIMARY KEY,
    age integer,
    kind text,
    name text
);


INSERT INTO pets(age, kind, name) VALUES (7, 'rainbow', 'fido');
INSERT INTO pets(age, kind, name) VALUES (5, 'snake', 'buttons');
INSERT INTO pets(age, kind, name) VALUES (3, 'parakeen', 'cornpuff');
INSERT INTO pets(age, kind, name) VALUES (8, 'rain', 'boomer');