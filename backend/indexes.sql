/* Club_Event: idx_event_eid */
SET @index_name := 'idx_event_eid';
SET @table_name := 'Club_Event';

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1
      FROM information_schema.STATISTICS
      WHERE table_schema = DATABASE()
        AND table_name = @table_name
        AND index_name = @index_name
    ),
    'SELECT 1',  -- index exists, do nothing
    'CREATE INDEX idx_event_eid ON Club_Event(eid);'
  )
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


/* Club_Event: idx_event_lid */
SET @index_name := 'idx_event_lid';
SET @table_name := 'Club_Event';

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1
      FROM information_schema.STATISTICS
      WHERE table_schema = DATABASE()
        AND table_name = @table_name
        AND index_name = @index_name
    ),
    'SELECT 1',
    'CREATE INDEX idx_event_lid ON Club_Event(lid);'
  )
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


/* Club_Event: idx_event_start_time */
SET @index_name := 'idx_event_start_time';
SET @table_name := 'Club_Event';

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1
      FROM information_schema.STATISTICS
      WHERE table_schema = DATABASE()
        AND table_name = @table_name
        AND index_name = @index_name
    ),
    'SELECT 1',
    'CREATE INDEX idx_event_start_time ON Club_Event(start_time);'
  )
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


/* Club_to_ClubEvent: idx_c2ce_eid */
SET @index_name := 'idx_c2ce_eid';
SET @table_name := 'Club_to_ClubEvent';

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1
      FROM information_schema.STATISTICS
      WHERE table_schema = DATABASE()
        AND table_name = @table_name
        AND index_name = @index_name
    ),
    'SELECT 1',
    'CREATE INDEX idx_c2ce_eid ON Club_to_ClubEvent(eid);'
  )
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


/* Club_Event_to_Club_EventTags: idx_eventtags_tid */
SET @index_name := 'idx_eventtags_tid';
SET @table_name := 'Club_Event_to_Club_EventTags';

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1
      FROM information_schema.STATISTICS
      WHERE table_schema = DATABASE()
        AND table_name = @table_name
        AND index_name = @index_name
    ),
    'SELECT 1',
    'CREATE INDEX idx_eventtags_tid ON Club_Event_to_Club_EventTags(tid);'
  )
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


/* Socials: idx_socials_cid */
SET @index_name := 'idx_socials_cid';
SET @table_name := 'Socials';

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1
      FROM information_schema.STATISTICS
      WHERE table_schema = DATABASE()
        AND table_name = @table_name
        AND index_name = @index_name
    ),
    'SELECT 1',
    'CREATE INDEX idx_socials_cid ON Socials(cid);'
  )
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


/* Club_to_Category: idx_c2c_cid */
SET @index_name := 'idx_c2c_cid';
SET @table_name := 'Club_to_Category';

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1
      FROM information_schema.STATISTICS
      WHERE table_schema = DATABASE()
        AND table_name = @table_name
        AND index_name = @index_name
    ),
    'SELECT 1',
    'CREATE INDEX idx_c2c_cid ON Club_to_Category(cid);'
  )
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;