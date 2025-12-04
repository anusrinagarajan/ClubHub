INSERT IGNORE INTO Event_Location (lid, virtual_link, location, room_number) VALUES
(1, NULL, 'Engineering', 101),
(2, NULL, 'Zoom Meeting Room', NULL);

INSERT IGNORE INTO Club_Event (eid, lid, flyer_url, description, start_time, end_time, event_name) VALUES
(1, 1, 'https://plus.unsplash.com/premium_photo-1663091699742-70ca6f835197?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Start of the semester meeting to meet members and officers', '2025-03-13 17:00:00', '2025-03-13 19:00:00', 'Welcome Social'),
(2, 2, 'https://plus.unsplash.com/premium_photo-1682088318236-8c4958076b34?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
', 'Gain a brief understanding about machine learning basics', '2025-02-10 10:00:00', '2025-02-10 11:30:00', 'Intro to ML');

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
(3, 'Social');

INSERT IGNORE INTO Club (cid, club_name, description, image) VALUES
(1, 'AI Club', 'Club focused on AI education and projects', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1170'),
(2, 'Robotics Club', 'Hands-on robotics projects and workshops', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1170'
),
(3, 'ML Society', 'Community interested in machine learning concepts', 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=1170'
);

INSERT IGNORE INTO Club_to_Category (cat_id, cid) VALUES
(1, 1),
(2, 1),
(1, 2),
(3, 3);

INSERT IGNORE INTO Club_to_ClubEvent (cid, eid) VALUES
(1, 1),
(3, 2);

INSERT IGNORE INTO Socials (platform, cid, link) VALUES
('Instagram', 1, 'https://www.google.com/'),
('Discord', 2, 'https://www.google.com/'),
('Discord', 3, 'https://www.google.com/');

INSERT IGNORE INTO User (uid, first_name, last_name, college_year, email, username, password, is_Club_Officer, is_Admin) VALUES
(1, 'First', 'Last', 3, 'first.last@sjsu.edu', 'User', 'pw', FALSE, FALSE),
(2, 'Jane', 'Doe', 3, 'jane.doe@sjsu.edu', 'janed', 'pw', TRUE, FALSE),
(3, 'John', 'Smith', 2, 'john.smith@sjsu.edu', 'johns', 'pw', FALSE, TRUE);

INSERT IGNORE INTO Favorite (cid, uid) VALUES
(1, 2),
(2, 1);

INSERT IGNORE INTO Club_to_Club_Officer (uid, cid) VALUES
(2, 1),
(2, 2);