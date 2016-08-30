create table child(
  c_id serial primary key not null,
  name varchar(34),
  birthdate date,
  parent_id integer references parent,
  schedule_id integer references schedule,
  month_age integer
);
create table parent (
  id serial primary key not null,
  name varchar(30),
  phone varchar(12),
  email varchar(100) UNIQUE,
  password varchar(50),
  facebook_id varchar(255),
  new_user boolean default true,
  reg_fee_paid boolean default false,
  amount_due money
);
create table schedule(
  id serial primary key not null,
  start_date date,
  class_time varchar(50),
  class_day varchar(20)
);


create table mailing(
  id serial primary key not null,
  email varchar(100) UNIQUE
);
