-- insert into parent
--   (fname, lname, address, phone, email)
-- values
--   ('Debbie', 'Hancock', '10282 South 1000 West', '801-598-9199', 'deb@gmail.com');


insert into parent
  (fname, lname, address, phone, email, loggenInStatus)
values
  ($1, $2, $3, $4, $5);
