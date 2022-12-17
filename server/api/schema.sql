DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS active_users CASCADE;

CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    session_key TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE active_users (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    serial_key TEXT
);

INSERT INTO users(username, password)	
        VALUES ('lebron_james23', 'obewiut4e78ty48a9r83');
                                    -- Bootleg hash :P
INSERT INTO users(username, password)	
        VALUES ('calebTHEboss22', 'fnih48ty48shye8feh8g');
INSERT INTO users(username, password)	
        VALUES ('bowserRAWR', 'ih58y8giihw8rfhew8ff');
    
