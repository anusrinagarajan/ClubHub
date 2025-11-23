-- wipe old database
DROP DATABASE IF EXISTS clubsdb;

-- create fresh database
CREATE DATABASE clubsdb;
USE clubsdb;

-- drop tables in reverse dependency order
DROP TABLE IF EXISTS Club_to_Club_Officer;
DROP TABLE IF EXISTS Favorite;
DROP TABLE IF EXISTS Socials;
DROP TABLE IF EXISTS Club_to_ClubEvent;
DROP TABLE IF EXISTS Club_to_Category;
DROP TABLE IF EXISTS Club;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Club_Event_to_Club_EventTags;
DROP TABLE IF EXISTS Club_EventTags;
DROP TABLE IF EXISTS Club_Event;
DROP TABLE IF EXISTS Event_Location;
DROP TABLE IF EXISTS User;


CREATE TABLE Event_Location (
	lid INTEGER,
	virtual_link VARCHAR(200),
	location VARCHAR(200),
	room_number INTEGER,
	PRIMARY KEY(lid)
);

CREATE TABLE Club_Event (
	eid INTEGER,
	lid INTEGER NOT NULL,
	flyer_url VARCHAR(200),
    description VARCHAR(200),
	start_time DATETIME,
	end_time DATETIME,
	event_name VARCHAR(300),
	PRIMARY KEY(eid),
	FOREIGN KEY(lid) REFERENCES Event_Location(lid)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);

CREATE TABLE Club_EventTags (
	tid INTEGER,
	tag_name VARCHAR(200),
	PRIMARY KEY(tid)
);

CREATE TABLE Club_Event_to_Club_EventTags(
	eid INTEGER,
	tid INTEGER,
	PRIMARY KEY(eid, tid),
	FOREIGN KEY(eid) REFERENCES Club_Event(eid)
		ON DELETE CASCADE
		ON UPDATE NO ACTION,
	FOREIGN KEY(tid) REFERENCES Club_EventTags(tid)
		ON DELETE CASCADE
		ON UPDATE NO ACTION
);

CREATE TABLE Category (
	cat_id INTEGER,
	cat_name VARCHAR(200),
	PRIMARY KEY(cat_id)
);

CREATE TABLE Club (
	cid INTEGER,
	club_name VARCHAR(200), 
	description VARCHAR(500),
	PRIMARY KEY(cid)
);

CREATE TABLE Club_to_Category (
	cat_id INTEGER,
	cid INTEGER,
	PRIMARY KEY(cat_id, cid),
	FOREIGN KEY(cat_id) REFERENCES Category(cat_id)
		ON DELETE CASCADE
		ON UPDATE NO ACTION,
	FOREIGN KEY(cid) REFERENCES Club(cid)
		ON DELETE CASCADE
		ON UPDATE NO ACTION
);

CREATE TABLE Club_to_ClubEvent (
	cid INTEGER,
	eid INTEGER,
	PRIMARY KEY(cid, eid),
	FOREIGN KEY(cid) REFERENCES Club(cid)
		ON DELETE CASCADE
		ON UPDATE NO ACTION,
	FOREIGN KEY(eid) REFERENCES Club_Event(eid)
		ON DELETE CASCADE
		ON UPDATE NO ACTION
);

CREATE TABLE Socials (
	platform VARCHAR(200),
	cid INTEGER,
	link VARCHAR(200),
	PRIMARY KEY(platform, cid),
	FOREIGN KEY(cid) REFERENCES Club(cid)
		ON DELETE CASCADE
		ON UPDATE NO ACTION
);

CREATE TABLE User(
	uid INTEGER,
	full_name VARCHAR(200),
	college_year INTEGER,
	email VARCHAR(200),
	username VARCHAR(200),
	password VARCHAR(200),
	is_Club_Officer BOOLEAN,
	is_Admin BOOLEAN,
	PRIMARY KEY(uid)
);

CREATE TABLE Favorite (
	cid INTEGER,
	uid INTEGER,
	PRIMARY KEY(cid, uid),
	FOREIGN KEY(cid) REFERENCES Club(cid)
		ON DELETE CASCADE
		ON UPDATE NO ACTION,
	FOREIGN KEY(uid) REFERENCES User(uid)
		ON DELETE CASCADE
		ON UPDATE NO ACTION
);

CREATE TABLE Club_to_Club_Officer(
	uid INTEGER,
	cid INTEGER,
	PRIMARY KEY(uid, cid),
	FOREIGN KEY(uid) REFERENCES User(uid)
		ON DELETE CASCADE
		ON UPDATE NO ACTION,
	FOREIGN KEY(cid) REFERENCES Club(cid)
		ON DELETE CASCADE
		ON UPDATE NO ACTION
); 

-- populate databases with baseline data
INSERT INTO Event_Location (lid, virtual_link, location, room_number) VALUES
(1, NULL, 'Engineering', 101),
(2, NULL, 'Zoom Meeting Room', NULL);

INSERT INTO Club_Event (eid, lid, flyer_url, description, start_time, end_time, event_name) VALUES
(1, 1, NULL, 'Start of the semester meeting to meet members and officers', '2025-03-13 17:00:00', '2025-03-13 19:00:00', 'Welcome Social'),
(2, 2, NULL, 'Gain a brief understanding about machine learning basics', '2025-02-10 10:00:00', '2025-02-10 11:30:00', 'Intro to ML');

INSERT INTO Club_EventTags (tid, tag_name) VALUES
(1, 'Social'),
(2, 'Workshop'),
(3, 'Online');

INSERT INTO Club_Event_to_Club_EventTags (eid, tid) VALUES
(1, 1),
(2, 2),
(2, 3);

INSERT INTO Category (cat_id, cat_name) VALUES
(1, 'Engineering'),
(2, 'Technology'),
(3, 'Social');

INSERT INTO Club (cid, club_name, description) VALUES
(1, 'AI Club', 'Club focused on AI education and projects'),
(2, 'Robotics Club', 'Hands-on robotics projects and workshops'),
(3, 'ML Society', 'Community interested in machine learning concepts');

INSERT INTO Club_to_Category (cat_id, cid) VALUES
(1, 1),
(2, 1),
(1, 2),
(3, 3);

INSERT INTO Club_to_ClubEvent (cid, eid) VALUES
(1, 1),
(3, 2);

INSERT INTO Socials (platform, cid, link) VALUES
('Instagram', 1, NULL),
('Discord', 2, NULL),
('Discord', 3, NULL);

INSERT INTO User (uid, full_name, college_year, email, username, password, is_Club_Officer, is_Admin) VALUES
(1, 'Jane Doe', 3, 'jane.doe@sjsu.edu', 'janed', NULL, TRUE, FALSE),
(2, 'John Smith', 2, 'john.smith@sjsu.edu', 'johns', NULL, FALSE, FALSE);

INSERT INTO Favorite (cid, uid) VALUES
(1, 2),
(2, 1);

INSERT INTO Club_to_Club_Officer (uid, cid) VALUES
(1, 1),
(1, 2);


