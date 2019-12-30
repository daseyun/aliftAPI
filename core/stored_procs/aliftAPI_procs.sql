
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
exercise_set_detail_id int, sets int, reps int, exercise_order int, program_id int) as
$BODY$   
    SELECT 
    	e.id exercise_id, e.exercise_name, e.exercise_description, 
		es.id exercise_set_detail_id, es.sets, es.reps, es.exercise_order, es.program_id
	FROM core_exercisesetdetail es 
	JOIN core_exercise e ON es.exercise_id = e.id 
	WHERE es.program_id = input_program_id
	ORDER BY es.exercise_order;

$BODY$
LANGUAGE sql;
      
select get_program_detail(25);
select get_program_detail(1);

-- 

DROP FUNCTION get_exercises();
CREATE or REPLACE FUNCTION get_exercises()
RETURNS TABLE(exercise_id int, exercise_name text, exercise_description text) AS
$BODY$
	SELECT
		id, exercise_name, exercise_description
	FROM core_exercise;
$BODY$
LANGUAGE SQL;

select get_exercises();
select * from core_exercisesetdetail;
select * from core_program;


-- try to make this accept array of json . rn update one at a time
DROP FUNCTION update_exercise_set_detail(int, int, int, int, int, int);
CREATE OR REPLACE FUNCTION update_exercise_set_detail(
	i_exercise_id int, 
	i_exercise_set_detail_id int, 
	i_sets int, 
	i_reps int, 
	i_exercise_order int, 
	i_program_id int)
RETURNS TABLE(exercise_id int, exercise_name text, exercise_description text, 
exercise_set_detail_id int, sets int, reps int, exercise_order int, program_id int) as
$BODY$
	UPDATE core_exercisesetdetail
	SET 
		sets = i_sets,
		reps = i_reps,
		exercise_id = i_exercise_id,
		program_id = i_program_id,
		exercise_order = i_exercise_order
	WHERE id = i_exercise_set_detail_id;
		
	SELECT get_program_detail(i_program_id);
$BODY$
LANGUAGE SQL;

select get_program_detail(25);
select update_exercise_set_detail(2, 2, 9, 3019, 3, 25);


---- test
--
--create or replace function example_function(jsondata jsonb)
--returns void language plpgsql as $$
--begin
--    raise notice 'json array: %', jsondata;
--    raise notice 'json array first element: %', jsondata->0;
--end $$;
--
--select example_function('[{"a":1}, {"b":2}]');



-- INSERT
DROP FUNCTION insert_exercise_set_detail(int, int, int, int, int);
CREATE OR REPLACE FUNCTION insert_exercise_set_detail(
	i_exercise_id int, 
	i_sets int, 
	i_reps int, 
	i_exercise_order int, 
	i_program_id int)
RETURNS TABLE(exercise_id int, exercise_name text, exercise_description text, 
exercise_set_detail_id int, sets int, reps int, exercise_order int, program_id int) as
$BODY$

	INSERT INTO core_exercisesetdetail (
		exercise_id, sets, reps, exercise_order, program_id) 
	VALUES
		(i_exercise_id, i_sets, i_reps, i_exercise_order, i_program_id);
	
		
	SELECT get_program_detail(i_program_id);
$BODY$
LANGUAGE SQL;

select get_program_detail(25);
select insert_exercise_set_detail(2, 9, 10, 4, 25);

select * from core_exercisesetdetail where program_id = 25;


-- DELETE
DROP FUNCTION delete_exercise_set_detail(int);
CREATE OR REPLACE FUNCTION delete_exercise_set_detail(i_exercise_set_detail_id int)
RETURNS void 
$BODY$

	DELETE FROM core_exercisesetdetail
	WHERE id = i_exercise_set_detail_id;

$BODY$
LANGUAGE sql;

DROP FUNCTION delete_exercise_set_detail(int);
CREATE OR REPLACE FUNCTION delete_exercise_set_detail(i_exercise_set_detail_id int)
RETURNS INT AS $$
    #variable_conflict use_variable
    BEGIN
        DELETE FROM core_exercisesetdetail
		WHERE id = i_exercise_set_detail_id;
		
    END;
$$ LANGUAGE plpgsql;

select delete_exercise_set_detail(7);
