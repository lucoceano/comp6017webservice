#!/bin/bash

sqlite3 storage.db <<EOS

insert into question values
(1, "question 1"),
(2, "question 2"),
(3, "question 3"),
(4, "question 4"),
(5, "question 5");

insert into answer values
(1, "answer 1", 1),
(2, "answer 2", 1),
(3, "answer 3", 1),
(4, "answer 1", 2),
(5, "answer 2", 2),
(6, "answer 1", 3);

insert into comment values
(1, "comment 1", 1, NULL),
(2, "comment 2", NULL, 1),
(3, "comment 3", 2, NULL),
(4, "comment 1", NULL, 2),
(5, "comment 2", NULL, 2),
(6, "comment 1", 5, NULL),
(7, "comment 1", NULL, 4);