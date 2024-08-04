from flask import Blueprint, jsonify, request
import mysql.connector
from datetime import datetime
from models import connectToDatabase
from .createjira import createJIRA


bp = Blueprint('tasks', __name__)

# Fetch all data
@bp.route('', methods=['GET'])
def get_data():
    try:
        database = connectToDatabase()
        dbcursor = database.cursor(dictionary=True)
        
        # Get Todays date
        
        sql_query = f''' SELECT  
                        t.id AS task_id,
                        t.assigneeid AS task_assigneeid,
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
                        t.assigneeid = u.id
                    WHERE 
                        t.status != 'Completed' 
                    OR 
                        t.completeddate = '{datetime.now().strftime('%Y-%m-%d')}'
                    ORDER BY 
                        t.id DESC;
                            '''
        dbcursor.execute(sql_query)
        data = dbcursor.fetchall()
        
        return jsonify(data)
    
    except mysql.connector.Error as e:
        return jsonify({'error': f'Database error: {e}'}), 500
    except Exception as e:
        return jsonify({'error': f'Error: {e}'}), 500
    finally:
        if database.is_connected():
            database.close()

# Add a new item
@bp.route('', methods=['POST'])
def add_item():
    new_item = request.get_json()
    
    if new_item['createjiraforme']:
        taskname = new_item['name']
        project = new_item['project']
        # data = createJIRA(taskname)
        # {'assigneeid': '12', 'name': 'dddd', 'status': 'New Task', 'project': 'SampleApp', 'createjiraforme': True}
        # get JIRA U ID of assigneeid
        # data = createJIRA(taskname, project, assingeejirauid)
        data = createJIRA(taskname, project, new_item['assigneeid'])
        jirakey = data['jirakey']
        jiracreated = datetime.strptime(data['jiracreated'], '%Y-%m-%dT%H:%M:%S.%f%z').strftime('%Y-%m-%d')
     
    else:
        jirakey = "Not Created"
        jiracreated = datetime.now().strftime('%Y-%m-%d')

    required_fields = ['assigneeid', 'name', 'project', 'status']
    for field in required_fields:
        if field not in new_item:
            return jsonify({'error': f'Missing field: {field}'}), 400
        
    try:
        database = connectToDatabase()
        dbcursor = database.cursor()

        sql_query = """
            INSERT INTO tasksinfo (assigneeid, name, project, status, jiraid, createddate, completeddate)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            new_item['assigneeid'],
            new_item['name'],
            new_item['project'],
            new_item['status'],
            jirakey,
            jiracreated,
            datetime.now().strftime('%Y-%m-%d') if new_item['status'] == "Completed" else "Not Completed"
        )

        dbcursor.execute(sql_query, values)
        database.commit()

        new_item['id'] = dbcursor.lastrowid

        return jsonify(new_item), 201

    except mysql.connector.Error as e:
        return jsonify({'error': f'Database error: {e}'}), 500
    except Exception as e:
        return jsonify({'error': f'Error: {e}'}), 500
    finally:
        if database.is_connected():
            database.close()
            
            
# Fetch specific data by ID
@bp.route('/<int:id>', methods=['GET'])
def get_data_byid(id):
    try:
        database = connectToDatabase()
        dbcursor = database.cursor(dictionary=True)
        
        sql_query = ''' SELECT  
                            t.id AS task_id,
                            t.name AS task_name,
                            t.assigneeid AS task_assingeeid,
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
                            t.assigneeid = u.id
                        WHERE t.id = %s;
                    '''
        dbcursor.execute(sql_query, (id,))
        data = dbcursor.fetchone()
        
        if data:
            return jsonify(data)
        else:
            return jsonify({'error': 'Task not found'}), 404
    
    except mysql.connector.Error as e:
        return jsonify({'error': f'Database error: {e}'}), 500
    except Exception as e:
        return jsonify({'error': f'Error: {e}'}), 500
    finally:
        if database.is_connected():
            database.close()

@bp.route('/bydate/<string:date>', methods=['GET'])
def get_data_by_date(date):
    try:
        database = connectToDatabase()
        dbcursor = database.cursor(dictionary=True)
        
        # Get Todays date
        
        sql_query = f'''SELECT  
                        t.id AS task_id,
                        t.assigneeid AS task_assigneeid,
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
                        t.assigneeid = u.id
                    WHERE 
                        t.status = 'Completed' 
                    AND 
                        t.completeddate = '{date}'
                    ORDER BY 
                        t.assigneeid DESC;
                            '''
        dbcursor.execute(sql_query)
        data = dbcursor.fetchall()
        
        return jsonify(data)
    
    except mysql.connector.Error as e:
        return jsonify({'error': f'Database error: {e}'}), 500
    except Exception as e:
        return jsonify({'error': f'Error: {e}'}), 500
    finally:
        if database.is_connected():
            database.close()



# Update an existing item
@bp.route('/<int:id>', methods=['PUT'])
def update_item(id):
    updated_item = request.get_json()
    print(updated_item)
    
    required_fields = ['assigneeid', 'name', 'project', 'status', 'jiraid']
    for field in required_fields:
        if field not in updated_item:
            return jsonify({'error': f'Missing field: {field}'}), 400


    try:
        database = connectToDatabase()
        dbcursor = database.cursor()

        sql_query = """
            UPDATE tasksinfo
            SET assigneeid = %s, name = %s, project = %s, status = %s, jiraid = %s, completeddate = %s
            WHERE id = %s
        """
        values = (
            updated_item['assigneeid'],
            updated_item['name'],
            updated_item['project'],
            updated_item['status'],
            updated_item['jiraid'],
            datetime.now().strftime('%Y-%m-%d') if updated_item['status'] == "Completed" else "Not Completed",
            id
        )

        dbcursor.execute(sql_query, values)
        database.commit()

        if dbcursor.rowcount == 0:
            return jsonify({'error': 'Task not found'}), 404

        return jsonify({'id': id, **updated_item}), 200

    except mysql.connector.Error as e:
        return jsonify({'error': f'Database error: {e}'}), 500
    except Exception as e:
        return jsonify({'error': f'Error: {e}'}), 500
    finally:
        if database.is_connected():
            database.close()

# Delete an item
@bp.route('/<int:id>', methods=['DELETE'])
def delete_item(id):
    try:
        database = connectToDatabase()
        dbcursor = database.cursor()

        sql_query = "DELETE FROM tasksinfo WHERE id = %s"
        dbcursor.execute(sql_query, (id,))
        database.commit()

        if dbcursor.rowcount == 0:
            return jsonify({'error': 'Task not found'}), 404

        return jsonify({'message': 'Task deleted successfully'}), 200

    except mysql.connector.Error as e:
        return jsonify({'error': f'Database error: {e}'}), 500
    except Exception as e:
        return jsonify({'error': f'Error: {e}'}), 500
    finally:
        if database.is_connected():
            database.close()
