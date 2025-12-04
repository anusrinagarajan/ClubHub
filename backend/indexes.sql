-- Club_Event
CREATE INDEX idx_event_eid ON Club_Event(eid);
CREATE INDEX idx_event_lid ON Club_Event(lid);
CREATE INDEX idx_event_start_time ON Club_Event(start_time);

-- Club_to_ClubEvent
CREATE INDEX idx_c2ce_eid ON Club_to_ClubEvent(eid);

-- Club_Event_to_Club_EventTags
CREATE INDEX idx_eventtags_tid ON Club_Event_to_Club_EventTags(tid);

-- Socials
CREATE INDEX idx_socials_cid ON Socials(cid);

-- Club_to_Category
CREATE INDEX idx_c2c_cid ON Club_to_Category(cid);
