INSERT INTO ROLES
VALUES (1, 'ROLE_USER');
INSERT INTO ROLES
VALUES (2, 'ROLE_MODERATOR');
INSERT INTO ROLES
VALUES (3, 'ROLE_ADMIN');

INSERT INTO USERS (ID, USERNAME, PASSWORD, EMAIL)
VALUES (1, 'theanh2906@gmail.com', '$2a$12$MDhAKnNnGuUXH1OGzmFPMO1N22YFPrZ1HnQgUyVmL/vETXSZojJpa',
        'theanh2906@gmail.com');
INSERT INTO USERS (ID, USERNAME, PASSWORD, EMAIL)
VALUES (2, 'user', '$2a$10$4kEvhcvoyEyatf6H0YT9r.nwNRfwMEiQP0YiMdjlqnKZNEt9/QO0S', 'user@gmail.com');
INSERT INTO USERS (ID, USERNAME, PASSWORD, EMAIL)
VALUES (3, 'moderator', '$2a$10$RBmwbtGVYT5GGbFJ1ODpXu.fJrKCCMQUpFopKVA7Cqoqdx.CnJUTO', 'moderator@gmail.com');

INSERT INTO USER_ROLES
VALUES (1, 3);
INSERT INTO USER_ROLES
VALUES (2, 1);
INSERT INTO USER_ROLES
VALUES (3, 2);

INSERT INTO EVENTS
VALUES ('76db4c78-8efb-4f4f-b051-e4b267ee01b8', TRUE, '2021-09-17', '2021-09-18', 'Đèn đỏ');
INSERT INTO EVENTS
VALUES ('afb946f7-370b-4eda-9570-f4049a0fc92b', TRUE, '2021-10-12', '2021-10-13', 'Đèn đỏ');
INSERT INTO EVENTS
VALUES ('aedd95a1-9daf-4afd-b77a-e6e85abb128e', TRUE, '2021-11-14', '2021-11-15', 'Đèn đỏ');
INSERT INTO EVENTS
VALUES ('624476db-8c23-431f-b3c7-bccc417e21e2', TRUE, '2021-12-12', '2021-12-13', 'Đèn đỏ');
INSERT INTO EVENTS
VALUES ('d11667a2-1203-4a1d-89a6-fcb141a7eac9', TRUE, '2021-01-12', '2021-01-13', 'Đèn đỏ');
INSERT INTO EVENTS
VALUES ('2ebbfe9f-5fce-4224-9ac1-65ce705829b7', TRUE, '2021-06-29', '2021-06-30', 'Sinh nhật Heo');
INSERT INTO EVENTS
VALUES ('79bf53a9-0f72-4156-ab68-2a5427892041', TRUE, '2021-06-28', '2021-06-29', 'Đèn đỏ');
INSERT INTO EVENTS
VALUES ('4fedbc6a-b7a8-4778-bc05-866327257ef2', TRUE, '2021-08-21', '2021-08-22', 'Đèn đỏ');
INSERT INTO EVENTS
VALUES ('40da560b-192e-4254-a0a6-4e24b3231999', TRUE, '2021-07-22', '2021-07-23', 'Đèn đỏ');
INSERT INTO EVENTS
VALUES ('89e495ed-6101-4e38-b482-6f6f791e3bc6', TRUE, '2021-12-05', '2021-12-06', 'Đèn đỏ');
INSERT INTO EVENTS
VALUES ('fa67d657-08a2-49f9-ba62-f10ebc143984', TRUE, '2021-12-30', '2021-12-31', 'Đèn đỏ');

INSERT INTO NOTES
VALUES ('e365facc-a65b-4ec9-afd2-d30208d2b5cf',
        '<p><a href=\"https://www.facebook.com/108853244232477/posts/387981942986271/?d=n\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.facebook.com/108853244232477/posts/387981942986271/?d=n</a></p><p><a href=\"https://www.facebook.com/188408404669710/posts/1944979082345958/?d=n\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.facebook.com/188408404669710/posts/1944979082345958/?d=n</a></p><p></p>',
        '23/10/2021 1:33:50 AM', '23/10/2021 1:33:50 AM', 'Bánh kem');
INSERT INTO NOTES
VALUES ('37a7c259-096b-4670-a7a2-6a8ee8f2dcb5',
        '<p><a href=\"https://youtu.be/ejQGa2RNBQY\" rel=\"noopener noreferrer\" target=\"_blank\">https://youtu.be/ejQGa2RNBQY</a></p><p><a href=\"https://megaxh.com/videos/brunette-girlfriend-shaves-her-pits-and-her-pussy-xhG80UY\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: rgb(255, 255, 255);\">https://megaxh.com/videos/brunette-girlfriend-shaves-her-pits-and-her-pussy-xhG80UY</a></p><p><a href=\"https://www5.javmost.com/star/Rika%20Aimi/\" rel=\"noopener noreferrer\" target=\"_blank\">https://www5.javmost.com/star/Rika%20Aimi/</a></p><p><a href=\"https://viet69z.com/cap-vu-sieu-pham.html\" rel=\"noopener noreferrer\" target=\"_blank\">https://viet69z.com/cap-vu-sieu-pham.html</a></p>',
        '31/10/2021 2:20:47 AM', '31/10/2021 2:20:47 AM', 'Link');
INSERT INTO NOTES
VALUES ('c4b169c4-da22-465f-a502-f15b7c2e1756',
        '<p><a href=\"https://m.facebook.com/MiwakuPremium/posts/1284719431976546?d=m\" rel=\"noopener noreferrer\" target=\"_blank\">https://m.facebook.com/MiwakuPremium/posts/1284719431976546?d=m</a></p>',
        '2/12/2021 10:41:01 PM', '2/12/2021 10:41:01 PM', 'Địa điểm đẹp');
