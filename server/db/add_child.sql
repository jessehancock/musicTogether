-- insert into child
--   (name, age_years, age_months, parent_id, schedule_id)
-- values
-- ('jesse', 27, 8, 1, 1)


insert into child
  (name, age_years, age_months, parent_id, schedule_id)
values
  ($1, $2, $3, $4, $5);
