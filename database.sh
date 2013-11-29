#!/bin/bash

rm -f storage.db

sqlite3 storage.db <<EOS

CREATE TABLE question (
  id int PRIMARY KEY NOT NULL UNIQUE,
  message text NOT NULL);

CREATE TABLE answer (
  id int PRIMARY KEY NOT NULL UNIQUE,
  message text NOT NULL,
  question int NOT NULL,
  FOREIGN KEY (question) REFERENCES question(id));


CREATE TABLE comment (
  id int PRIMARY KEY NOT NULL UNIQUE,
  message text NOT NULL,
  answer int,
  question int,
  FOREIGN KEY (answer) REFERENCES answer(id),
  FOREIGN KEY (question) REFERENCES question(id));