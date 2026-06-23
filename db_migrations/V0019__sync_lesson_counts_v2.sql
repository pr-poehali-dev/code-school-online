UPDATE courses c SET lessons = (
    SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id
) WHERE EXISTS (SELECT 1 FROM lessons l WHERE l.course_id = c.id);

UPDATE courses SET hours = 24 WHERE id IN ('python','javascript','html-css','sql','react','git');