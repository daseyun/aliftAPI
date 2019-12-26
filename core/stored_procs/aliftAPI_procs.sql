
DROP FUNCTION get_program(integer);
CREATE OR REPLACE FUNCTION get_program(program_id int) 
RETURNS TABLE(id int, program_name varchar) as
$BODY$   
    select p.id, p.program_name from core_program p where p.id = program_id; 
$BODY$
LANGUAGE sql;
      
select get_program(3);
      
--
DROP FUNCTION get_program_detail(integer);
CREATE or replace function get_program_detail(input_program_id int)
returns table(exercise_id int, exercise_name text, exercise_description text, 
exercise_set_detail_id int, sets int, reps int, exercise_order int) as
$BODY$   
    SELECT 
    	e.id exercise_id, e.exercise_name, e.exercise_description, 
		es.id exercise_set_detail_id, es.sets, es.reps, es.exercise_order
	FROM core_exercisesetdetail es 
	JOIN core_exercise e ON es.exercise_id = e.id 
	WHERE es.program_id = input_program_id
	ORDER BY es.exercise_order;

$BODY$
LANGUAGE sql;
      
select get_program_detail(25);
select get_program_detail(1);
