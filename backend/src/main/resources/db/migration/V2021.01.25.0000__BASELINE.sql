CREATE TABLE IF NOT EXISTS ROLES
(
    ID   INT,
    NAME VARCHAR(50),
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS USERS
(
    ID       INT GENERATED BY DEFAULT AS IDENTITY,
    USERNAME VARCHAR(20) UNIQUE NOT NULL,
    PASSWORD VARCHAR(200)       NOT NULL,
    EMAIL    VARCHAR(50) UNIQUE NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS USER_ROLES
(
    USER_ID INT,
    ROLE_ID INT
);

CREATE TABLE IF NOT EXISTS EVENTS
(
    ID         UUID NOT NULL UNIQUE,
    ALL_DAY    BOOLEAN,
    START_DATE VARCHAR(15),
    END_DATE   VARCHAR(15),
    TITLE      VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS NOTES
(
    ID                 UUID UNIQUE  NOT NULL,
    CONTENT            TEXT,
    CREATED_DATE       VARCHAR(30),
    LAST_MODIFIED_DATE VARCHAR(30),
    TITLE              VARCHAR(100) NOT NULL
);