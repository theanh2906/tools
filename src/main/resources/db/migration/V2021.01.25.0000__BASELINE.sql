CREATE TABLE IF NOT EXISTS ROLES
(
    ID   INT,
    NAME VARCHAR(50),
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS USERS
(
    ID       VARCHAR(36)        NOT NULL UNIQUE,
    USERNAME VARCHAR(20) UNIQUE NOT NULL,
    PASSWORD VARCHAR(200)       NOT NULL,
    EMAIL    VARCHAR(50) UNIQUE NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS USER_ROLES
(
    USER_ID VARCHAR(36),
    ROLE_ID INT
);

CREATE TABLE IF NOT EXISTS CATEGORY_NOTE
(
    NOTE_ID     VARCHAR(36),
    CATEGORY_ID VARCHAR(36)
);

CREATE TABLE IF NOT EXISTS EVENTS
(
    ID         VARCHAR(36) NOT NULL UNIQUE,
    ALL_DAY    BOOLEAN,
    START_DATE VARCHAR(15),
    END_DATE   VARCHAR(15),
    TITLE      VARCHAR(100),
    USER_ID    VARCHAR(36),
    PRIMARY KEY (ID),
    FOREIGN KEY (USER_ID) REFERENCES USERS (ID)
);

CREATE TABLE IF NOT EXISTS NOTES
(
    ID                 VARCHAR(36) UNIQUE NOT NULL,
    CONTENT            TEXT,
    CREATED_DATE       BIGINT,
    LAST_MODIFIED_DATE BIGINT,
    TITLE              VARCHAR(100)       NOT NULL,
    USER_ID            VARCHAR(36),
    PRIMARY KEY (ID),
    FOREIGN KEY (USER_ID) REFERENCES USERS (ID)
);

CREATE TABLE IF NOT EXISTS CATEGORIES
(
    ID                 VARCHAR(36) UNIQUE NOT NULL,
    NAME               TEXT,
    COLOR              VARCHAR(20),
    CREATED_DATE       BIGINT,
    LAST_MODIFIED_DATE BIGINT,
    PRIMARY KEY (ID)
);


CREATE TABLE IMAGES
(
    ID           VARCHAR(255) NOT NULL,
    CREATED_DATE TIMESTAMP,
    DATA         BYTEA,
    IMAGE_TYPE   VARCHAR(255),
    NAME         VARCHAR(255),
    SIZE         BIGINT,
    PRIMARY KEY (ID)
)
