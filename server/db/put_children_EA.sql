UPDATE child
SET name = $2, birthdate = $3
WHERE c_id = $1;
