INSERT IGNORE INTO Event_Location (lid, virtual_link, location, room_number) VALUES
(1, NULL, 'Engineering', 101),
(2, NULL, 'Zoom Meeting Room', NULL);

INSERT IGNORE INTO Club_Event (eid, lid, flyer_url, description, start_time, end_time, event_name) VALUES
(1, 1, 'https://plus.unsplash.com/premium_photo-1663091699742-70ca6f835197?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Start of the semester meeting to meet members and officers', '2025-03-13 17:00:00', '2025-03-13 19:00:00', 'Welcome Social'),
(2, 2, 'https://plus.unsplash.com/premium_photo-1682088318236-8c4958076b34?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Gain a brief understanding about machine learning basics', '2025-02-10 10:00:00', '2025-02-10 11:30:00', 'Intro to ML');

INSERT IGNORE INTO Club_EventTags (tid, tag_name) VALUES
(1, 'Social'),
(2, 'Workshop'),
(3, 'Online');

INSERT IGNORE INTO Club_Event_to_Club_EventTags (eid, tid) VALUES
(1, 1),
(2, 2),
(2, 3);

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
(12,'Travel/Outdoor Adventures'),
(13,'Literature/Writing'),
(14,'Film/Media'),
(15, 'Professional Development');


INSERT IGNORE INTO Club (cid, club_name, description, image) VALUES
(1, 'ML Club', 'A community of ML enthusiasts who build collaborative projects tackling diverse and interesting problems.', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1170'),
(2, 'Game Development Club', 'Learn how to make your own games.', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1170'),
(3, 'Responsible Computing Club', 'Welcoming students from all majors interested in Responsible AI. Partnered with Mozilla, Firefox, and CIRCLE.', 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=1170'),
(4, 'Society of Women Engineers', 'Empower women and allies to achieve their fullest potentials as engineers and leaders', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170'),
(5, 'Physics and Astronomy Club', 'Learning and exploring all things astronomy and physics.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170'),
(6, 'Computer Science Club', 'A hub for students interested in Computer Science to learn, research, and collaborate with like-minded students.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170'),
(7, 'Film Production Society', 'Love movies and creating movies.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170'),
(8, 'Hoplite', 'Master technical interviews through mock sessions and hands-on coding practice.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170'),
(9, 'Book Club', 'Appreciating and analyzing books from various genres.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170'),
(10, 'Marketing Association', 'Pairs members with opportunities for professional development, leadership, and networking in business careers.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170'),
(11, 'Baking Club', 'Sharing and talking about what we bake.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170'),
(12, 'Public Health Student Association', 'Building a network of peers interested in Public Health.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170'),
(13, 'Art & Design Society', 'A positive space created for uplifting designers, creatives, and artists through skill-building experiences and explorations of creativity.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170'),
(14, 'Spartan Fitness', 'Community of students interested in working out and learning from each other to reach fitness goals', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170'),
(15, 'Anime Club', 'Everything and anything anime and manga', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170'),
(16, 'Psychology Community', 'Dedicated to providing resources, hosting weekly events, and sharing new and exciting ideas within Psychology.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170'),
(17, 'HIKE Club', 'Student-led hiking club.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170');

INSERT IGNORE INTO Club_to_Category (cat_id, cid) VALUES
(1, 1),
(2, 1),
(9, 2),
(1,3),
(2,3),
(1,4),
(2,4),
(8,5),
(1,6),
(2,6),
(14,7),
(15,8),
(13,9),
(4,10),
(15,10),
(11,11),
(10,12),
(5,13),
(6,14),
(3,15),
(13,15),
(14,15),
(10,16),
(6,17),
(12,17);

INSERT IGNORE INTO Club_to_ClubEvent (cid, eid) VALUES
(1, 1),
(3, 2);

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

INSERT IGNORE INTO User (first_name, last_name, college_year, email, username, password, is_Club_Officer, is_Admin) VALUES
('First', 'Last', 3, 'first.last@sjsu.edu', 'User', 'pw', FALSE, FALSE),
('Jane', 'Doe', 3, 'jane.doe@sjsu.edu', 'janed', 'pw', TRUE, FALSE),
('John', 'Smith', 2, 'john.smith@sjsu.edu', 'johns', 'pw', FALSE, TRUE);

INSERT IGNORE INTO Favorite (cid, uid) VALUES
(1, 2),
(2, 1);

INSERT IGNORE INTO Club_to_Club_Officer (uid, cid) VALUES
(2, 1),
(2, 2);