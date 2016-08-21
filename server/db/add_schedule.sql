-- insert into schedule
--   (start_date, class_time, class_day)
-- values
--   ('2016-09-14', '10:15:00', 'Thurs');


insert into schedule
  (start_date, class_time, class_day)
values
  ($1, $2, $3);
