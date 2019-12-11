
DROP FUNCTION get_program(integer);
CREATE OR REPLACE FUNCTION get_program(program_id int) 
RETURNS TABLE(id int, program_name varchar) as
$BODY$   
    select p.id, p.program_name from core_program p where p.id = program_id; 
$BODY$
LANGUAGE sql;
      
select get_program(3);
      
--

create or replace function get_program_detail(program_id int)
returns table(exercise_id int, exercise_name text, exercise_description text, 
exercise_set_detail_id int, sets int, reps int) as
$BODY$   
    select e.id exercise_id, e.exercise_name, e.exercise_description, 
es.id exercise_set_detail_id, es.sets, es.reps from core_exercisesetdetail es join core_exercise e on es.exercise_id = e.id where es.program_id = program_id;

$BODY$
LANGUAGE sql;
    
select get_program_detail(25);



