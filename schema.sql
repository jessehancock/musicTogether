create table parent (
  id serial primary key not null,
  name varchar(30),
  phone varchar(12),
  email varchar(100) UNIQUE,
  password varchar(50),
  facebook_id varchar(255),
  new_user boolean default true
);


create table schedule(
  id serial primary key not null,
  start_date date,
  class_time time,
  class_day varchar(20)
);



create table child(
  id serial primary key not null,
  name varchar(34),
  birthdate date,
  parent_id integer references parent(id),
  schedule_id integer references schedule(id)
);
