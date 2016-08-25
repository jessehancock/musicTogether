select * from child
JOIN schedule on child.schedule_id = schedule.id
where child.parent_id =  $1;
