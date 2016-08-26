SELECT *
FROM child
LEFT JOIN schedule ON child.schedule_id = schedule.id
WHERE child.parent_id = $1;
