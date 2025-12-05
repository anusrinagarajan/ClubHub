-- EVENT LOCATIONS
INSERT IGNORE INTO Event_Location (lid, virtual_link, location, room_number) VALUES
(1, NULL, 'Engineering', 101),
(2, NULL, 'Zoom Meeting Room', NULL),
(3, NULL, 'Student Union', 201),
(4, NULL, 'Science Building', 305),
(5, NULL, 'Campus Gym', 1),
(6, NULL, 'Library', 210),
(7, NULL, 'Art Studio', 12),
(8, NULL, 'Business Center', 102),
(9, NULL, 'Outdoor Quad', NULL),
(10, 'https://zoom.us/j/1234567890', 'Online - Zoom', NULL),
(11, 'https://discord.gg/example', 'Online - Discord', NULL);

-- CLUB EVENTS
INSERT IGNORE INTO Club_Event (eid, lid, flyer_url, description, start_time, end_time, event_name) VALUES
(1, 1, 'https://plus.unsplash.com/premium_photo-1663091699742-70ca6f835197?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
 'Start of the semester meeting to meet members and officers', '2025-03-13 17:00:00', '2025-03-13 19:00:00', 'Welcome Social'),
(2, 2, 'https://plus.unsplash.com/premium_photo-1682088318236-8c4958076b34?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
 'Gain a brief understanding about machine learning basics', '2025-02-10 10:00:00', '2025-02-10 11:30:00', 'Intro to ML'),
-- ML Club (cid 1)
(3, 1, 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1170',
 'Kickoff for semester long ML project teams', '2025-03-27 18:00:00', '2025-03-27 20:00:00', 'ML Project Kickoff'),
-- Game Development Club (cid 2)
(4, 3, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1170',
 'Form teams and brainstorm game ideas for the monthly jam', '2025-02-18 17:00:00', '2025-02-18 19:00:00', 'Game Jam Kickoff'),
(5, 10, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1170',
 'Hands on intro to a game engine for beginners', '2025-03-05 18:00:00', '2025-03-05 20:00:00', 'Intro to Game Engine Workshop'),
-- Responsible Computing Club (cid 3)
(6, 3, 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1170',
 'Panel discussion on ethics in AI and tech policy', '2025-03-10 16:00:00', '2025-03-10 18:00:00', 'Ethics in AI Panel'),
-- Society of Women Engineers (cid 4)
(7, 3, 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1170',
 'Meet other SWE members and learn about spring events', '2025-02-12 18:00:00', '2025-02-12 20:00:00', 'SWE Spring Social'),
(8, 8, 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1170',
 'Resume and LinkedIn review with industry mentors', '2025-03-03 17:30:00', '2025-03-03 19:00:00', 'SWE Career Prep Night'),
-- Physics and Astronomy Club (cid 5)
(9, 9, 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1170',
 'Nighttime stargazing with telescopes on the quad', '2025-02-21 20:00:00', '2025-02-21 23:00:00', 'Stargazing on the Quad'),
(10, 4, 'https://images.unsplash.com/photo-1447433819943-74a20887a81e?auto=format&fit=crop&w=1170',
 'Student talks about recent discoveries in astrophysics', '2025-03-17 16:00:00', '2025-03-17 18:00:00', 'Astrophysics Research Talks'),
-- Computer Science Club (cid 6)
(11, 1, 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1170',
 'Lightning talks on cool CS side projects', '2025-02-19 17:00:00', '2025-02-19 19:00:00', 'Project Showcase Night'),
(12, 10, 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1170',
 'Introduction to Git, GitHub, and collaboration workflows', '2025-03-24 18:00:00', '2025-03-24 20:00:00', 'Git and GitHub Workshop'),
-- Film Production Society (cid 7)
(13, 7, 'https://images.unsplash.com/photo-1516031190212-da133013de50?auto=format&fit=crop&w=1170',
 'Plan short film ideas and form production crews', '2025-02-15 15:00:00', '2025-02-15 17:00:00', 'Short Film Planning Session'),
(14, 7, 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1170',
 'Hands on workshop covering camera basics and framing', '2025-03-08 13:00:00', '2025-03-08 15:00:00', 'Camera Basics Workshop'),
-- Hoplite (cid 8)
(15, 1, 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1170',
 'Live mock interviews and feedback from peers', '2025-02-22 10:00:00', '2025-02-22 12:00:00', 'Technical Mock Interview Session'),
(16, 10, 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1170',
 'Practice solving medium level coding problems together', '2025-03-29 11:00:00', '2025-03-29 13:00:00', 'LeetCode Practice Meetup'),
-- Book Club (cid 9)
(17, 6, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1170',
 'Discuss the monthly book selection with snacks', '2025-02-14 17:00:00', '2025-02-14 18:30:00', 'February Book Discussion'),
(18, 6, 'https://images.unsplash.com/photo-1455884981818-54cb785db6fc?auto=format&fit=crop&w=1170',
 'Bring any book and share recommendations', '2025-03-21 17:00:00', '2025-03-21 18:30:00', 'Open Book Share Night'),
-- Marketing Association (cid 10)
(19, 8, 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1170',
 'Workshop on building a personal brand and elevator pitch', '2025-02-25 16:00:00', '2025-02-25 18:00:00', 'Personal Branding Workshop'),
(20, 8, 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1170',
 'Networking mixer with local marketing professionals', '2025-03-26 18:00:00', '2025-03-26 20:00:00', 'Marketing Networking Mixer'),
-- Baking Club (cid 11)
(21, 3, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1170',
 'Share your favorite cookie recipes and taste test', '2025-02-13 16:00:00', '2025-02-13 18:00:00', 'Cookie Swap Social'),
(22, 3, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1170',
 'Learn basic bread baking techniques', '2025-03-19 16:00:00', '2025-03-19 18:00:00', 'Bread Baking Workshop'),
-- Public Health Student Association (cid 12)
(23, 3, 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=1170',
 'Panel on careers and grad school in public health', '2025-02-27 17:00:00', '2025-02-27 19:00:00', 'Public Health Careers Panel'),
(24, 10, 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=1170',
 'Online seminar about campus wellness resources', '2025-03-31 15:00:00', '2025-03-31 16:30:00', 'Campus Wellness Info Session'),
-- Art & Design Society (cid 13)
(25, 7, 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1170',
 'Collaborative figure drawing and sketching session', '2025-02-16 14:00:00', '2025-02-16 16:00:00', 'Open Studio Sketch Night'),
(26, 7, 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1170',
 'Bring your portfolio for feedback from peers', '2025-03-23 13:00:00', '2025-03-23 15:00:00', 'Portfolio Review Day'),
-- Spartan Fitness (cid 14)
(27, 5, 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1170',
 'Intro workout session focused on form and safety', '2025-02-11 18:00:00', '2025-02-11 19:30:00', 'Beginner Strength Training'),
(28, 9, 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=1170',
 'Group cardio and stretching workout outdoors', '2025-03-09 09:00:00', '2025-03-09 10:30:00', 'Outdoor Conditioning Session'),
-- Anime Club (cid 15)
(29, 3, 'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1170',
 'Watch and discuss a mix of classic and new anime episodes', '2025-02-20 18:00:00', '2025-02-20 21:00:00', 'Anime Screening Night'),
(30, 11, 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1170',
 'Online meetup to chat about current season shows', '2025-03-27 19:00:00', '2025-03-27 21:00:00', 'Seasonal Anime Discussion'),
-- Psychology Community (cid 16)
(31, 6, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1170',
 'Intro to research opportunities in psychology for undergrads', '2025-02-24 15:00:00', '2025-02-24 17:00:00', 'Psych Research Info Session'),
(32, 3, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1170',
 'Discussion circle about stress and study life balance', '2025-03-18 16:00:00', '2025-03-18 17:30:00', 'Mental Health Discussion Circle'),
-- HIKE Club (cid 17)
(33, 9, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1170',
 'Easy morning hike on a local trail', '2025-02-23 08:00:00', '2025-02-23 12:00:00', 'Local Trail Day Hike'),
(34, 9, 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1170',
 'Afternoon hike and picnic with the club', '2025-03-30 12:00:00', '2025-03-30 16:00:00', 'Hike and Picnic Social');

-- EVENT TAGS
INSERT IGNORE INTO Club_EventTags (tid, tag_name) VALUES
(1, 'Social'),
(2, 'Workshop'),
(3, 'Online');

-- EVENT ↔ TAGS
INSERT IGNORE INTO Club_Event_to_Club_EventTags (eid, tid) VALUES
(1, 1),
(2, 2),
(2, 3),
-- ML Club
(3, 2),
-- Game Dev Club
(4, 1),
(5, 2),
(5, 3),
-- Responsible Computing
(6, 2),
-- SWE
(7, 1),
(8, 2),
-- Physics & Astronomy
(9, 1),
(10, 2),
-- CS Club
(11, 1),
(12, 2),
-- Film Production
(13, 1),
(14, 2),
-- Hoplite
(15, 2),
(16, 2),
-- Book Club
(17, 1),
(18, 1),
-- Marketing Association
(19, 2),
(20, 1),
-- Baking Club
(21, 1),
(22, 2),
-- Public Health Student Association
(23, 2),
(24, 3),
-- Art & Design Society
(25, 1),
(26, 2),
-- Spartan Fitness
(27, 1),
(28, 1),
-- Anime Club
(29, 1),
(30, 3),
-- Psychology Community
(31, 2),
(32, 1),
-- HIKE Club
(33, 1),
(34, 1);

-- CATEGORIES
INSERT IGNORE INTO Category (cat_id, cat_name) VALUES
(1, 'Engineering'),
(2, 'Technology'),
(3, 'Social'),
(4, 'Business'),
(5, 'Arts & Culture'),
(6, 'Fitness'),
(7, 'Environment'),
(8, 'Science'),
(9, 'Gaming'),
(10, 'Medicine & Wellness'),
(11, 'Food & Drink'),
(12, 'Travel/Outdoor Adventures'),
(13, 'Literature/Writing'),
(14, 'Film/Media'),
(15, 'Professional Development');

-- CLUBS (images updated & themed)
INSERT IGNORE INTO Club (cid, club_name, description, image) VALUES
(1, 'ML Club',
 'A community of ML enthusiasts who build collaborative projects tackling diverse and interesting problems.',
 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1170'),
(2, 'Game Development Club',
 'Learn how to make your own games.',
 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1170'),
(3, 'Responsible Computing Club',
 'Welcoming students from all majors interested in Responsible AI. Partnered with Mozilla, Firefox, and CIRCLE.',
 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1170'),
(4, 'Society of Women Engineers',
 'Empower women and allies to achieve their fullest potentials as engineers and leaders',
 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170'),
(5, 'Physics and Astronomy Club',
 'Learning and exploring all things astronomy and physics.',
 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1170'),
(6, 'Computer Science Club',
 'A hub for students interested in Computer Science to learn, research, and collaborate with like-minded students.',
 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1170'),
(7, 'Film Production Society',
 'Love movies and creating movies.',
 'https://images.unsplash.com/photo-1516031190212-da133013de50?auto=format&fit=crop&w=1170'),
(8, 'Hoplite',
 'Master technical interviews through mock sessions and hands-on coding practice.',
 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1170'),
(9, 'Book Club',
 'Appreciating and analyzing books from various genres.',
 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1170'),
(10, 'Marketing Association',
 'Pairs members with opportunities for professional development, leadership, and networking in business careers.',
 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1170'),
(11, 'Baking Club',
 'Sharing and talking about what we bake.',
 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1170'),
(12, 'Public Health Student Association',
 'Building a network of peers interested in Public Health.',
 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=1170'),
(13, 'Art & Design Society',
 'A positive space created for uplifting designers, creatives, and artists through skill-building experiences and explorations of creativity.',
 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1170'),
(14, 'Spartan Fitness',
 'Community of students interested in working out and learning from each other to reach fitness goals',
 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1170'),
(15, 'Anime Club',
 'Everything and anything anime and manga',
 'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1170'),
(16, 'Psychology Community',
 'Dedicated to providing resources, hosting weekly events, and sharing new and exciting ideas within Psychology.',
 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1170'),
(17, 'HIKE Club',
 'Student-led hiking club.',
 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1170');

-- CLUB ↔ CATEGORY
INSERT IGNORE INTO Club_to_Category (cat_id, cid) VALUES
(1, 1),
(2, 1),
(9, 2),
(1, 3),
(2, 3),
(1, 4),
(2, 4),
(8, 5),
(1, 6),
(2, 6),
(14, 7),
(15, 8),
(13, 9),
(4, 10),
(15, 10),
(11, 11),
(10, 12),
(5, 13),
(6, 14),
(3, 15),
(13, 15),
(14, 15),
(10, 16),
(6, 17),
(12, 17);

-- CLUB ↔ EVENTS (each club has at least 2 events)
INSERT IGNORE INTO Club_to_ClubEvent (cid, eid) VALUES
(1, 1),
(3, 2),
-- ML Club
(1, 3),
-- Game Dev Club
(2, 4),
(2, 5),
-- Responsible Computing Club
(3, 6),
-- SWE
(4, 7),
(4, 8),
-- Physics & Astronomy
(5, 9),
(5, 10),
-- CS Club
(6, 11),
(6, 12),
-- Film Production Society
(7, 13),
(7, 14),
-- Hoplite
(8, 15),
(8, 16),
-- Book Club
(9, 17),
(9, 18),
-- Marketing Association
(10, 19),
(10, 20),
-- Baking Club
(11, 21),
(11, 22),
-- Public Health Student Association
(12, 23),
(12, 24),
-- Art & Design Society
(13, 25),
(13, 26),
-- Spartan Fitness
(14, 27),
(14, 28),
-- Anime Club
(15, 29),
(15, 30),
-- Psychology Community
(16, 31),
(16, 32),
-- HIKE Club
(17, 33),
(17, 34);

-- SOCIAL LINKS
INSERT IGNORE INTO Socials (platform, cid, link) VALUES
('Instagram', 1, 'https://www.google.com/'),
('Discord', 2, 'https://www.google.com/'),
('Discord', 3, 'https://www.google.com/'),
('Instagram', 4, 'https://www.google.com/'),
('Facebook', 5, 'https://www.google.com/'),
('Instagram', 6, 'https://www.google.com/'),
('Instagram', 7, 'https://www.google.com/'),
('Discord', 8, 'https://www.google.com/'),
('Facebook', 9, 'https://www.google.com/'),
('LinkedIn', 10, 'https://www.google.com/'),
('Instagram', 11, 'https://www.google.com/'),
('Facebook', 12, 'https://www.google.com/'),
('Instagram', 13, 'https://www.google.com/'),
('Instagram', 14, 'https://www.google.com/'),
('Discord', 15, 'https://www.google.com/'),
('Instagram', 16, 'https://www.google.com/'),
('Instagram', 17, 'https://www.google.com/');

-- USERS
INSERT IGNORE INTO User (uid, first_name, last_name, college_year, email, username, password, is_Club_Officer, is_Admin) VALUES
(1, 'First', 'Last', 3, 'first.last@sjsu.edu', 'User', 'pw', FALSE, FALSE),
(2, 'Jane', 'Doe', 3, 'jane.doe@sjsu.edu', 'janed', 'pw', TRUE, FALSE),
(3, 'John', 'Smith', 2, 'john.smith@sjsu.edu', 'johns', 'pw', FALSE, TRUE);

-- FAVORITES
INSERT IGNORE INTO Favorite (cid, uid) VALUES
(1, 2),
(2, 1);

-- CLUB OFFICERS
INSERT IGNORE INTO Club_to_Club_Officer (uid, cid) VALUES
(2, 1),
(2, 2);