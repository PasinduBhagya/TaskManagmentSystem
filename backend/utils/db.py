import time
from models import fetchFromDatabase

data = []

def update_data():
    global data
    while True:
        try:
            data = fetchFromDatabase('''SELECT  
    t.id AS task_id,
    t.name AS task_name,
    t.project AS task_project,
    t.status AS task_status,
    t.jiraid AS task_jiraid,
    t.createddate AS task_createddate,
    t.completeddate AS task_completeddate,
    u.firstname AS assignee_firstname,
    u.lastname AS assignee_lastname
FROM 
    tasksinfo t
JOIN 
    usersinfo u
ON 
    t.assigneeid = u.id;
''')
        except Exception as e:
            print(f"Error fetching data: {e}")
        time.sleep(10)
