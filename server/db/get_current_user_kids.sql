SELECT * FROM child
JOIN schedule on schedule.id = child.schedule_id
WHERE parent_id = $1;
