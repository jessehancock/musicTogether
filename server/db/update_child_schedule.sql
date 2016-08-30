UPDATE child
SET schedule_id = $1, month_age = $3
WHERE c_id = $2;
