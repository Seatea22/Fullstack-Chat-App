DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS active_users CASCADE;

CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE active_users (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    session_key TEXT
);

INSERT INTO users(username, email, password)	
        VALUES ('lebron_james23', 'lebronsjames23@gmail.com', 'bc547750b92797f955b36112cc9bdd5cddf7d0862151d03a167ada8995aa24a9ad24610b36a68bc02da24141ee51670aea13ed6469099a4453f335cb239db5da'),
               ('calebTHEboss22', 'calebprettycool@hotmail.com', '92a891f888e79d1c2e8b82663c0f37cc6d61466c508ec62b8132588afe354712b20bb75429aa20aa3ab7cfcc58836c734306b43efd368080a2250831bf7f363f'),
               ('bowserRAWR', 'bowserkillsmario@yahoo.com', '2a64d6563d9729493f91bf5b143365c0a7bec4025e1fb0ae67e307a0c3bed1c28cfb259fc6be768ab0a962b1e2c9527c5f21a1090a9b9b2d956487eb97ad4209');
        -- password1/2/3 respectively