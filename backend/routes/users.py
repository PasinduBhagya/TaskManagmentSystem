from flask import Blueprint, jsonify, request
import mysql.connector
from datetime import datetime
from models import connectToDatabase, fetchFromDatabase

bp = Blueprint('users', __name__)

@bp.route('/<int:id>', methods=['GET'])
def get_user_byid(id):
    try:
        database = connectToDatabase()
        dbcursor = database.cursor(dictionary=True)
        
        sql_query = "SELECT * FROM usersinfo WHERE id = %s"
        dbcursor.execute(sql_query, (id,))
        data = dbcursor.fetchone()
        
        if data:
            return jsonify(data)
        else:
            return jsonify({'error': 'User not found'}), 404
    
    except mysql.connector.Error as e:
        return jsonify({'error': f'Database error: {e}'}), 500
    except Exception as e:
        return jsonify({'error': f'Error: {e}'}), 500
    finally:
        if database.is_connected():
            database.close()

@bp.route('', methods=['GET'])
def get_users():
    users = fetchFromDatabase("SELECT id, firstname, lastname, email FROM usersinfo ORDER BY id DESC")
    return jsonify(users)

@bp.route('', methods=['POST'])
def add_user():
    new_user = request.get_json()
    
    # Validate input fields
    required_fields = ['firstname', 'lastname', 'password', 'email', 'assignedrole', 'addedgroups', 'apikey', 'jirauserid']
    for field in required_fields:
        if field not in new_user:
            return jsonify({'error': f'Missing field: {field}'}), 400

    # Handle optional fields
    password = new_user.get('password', None)
    if not password:
        return jsonify({'error': 'Password is required'}), 400

    try:
        database = connectToDatabase()
        dbcursor = database.cursor()

        sql_query = """
            INSERT INTO usersinfo (firstname, lastname, password, email, assignedrole, addedgroups, apikey, jirauserid)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            new_user['firstname'],
            new_user['lastname'],
            new_user['password'],  # Assuming password is hashed before being sent
            new_user['email'],
            new_user['assignedrole'],
            new_user['addedgroups'],
            new_user['apikey'],
            new_user['jirauserid']
        )

        dbcursor.execute(sql_query, values)
        database.commit()

        new_user['id'] = dbcursor.lastrowid

    except mysql.connector.Error as e:
        return jsonify({'error': f'Database error: {e}'}), 500
    except Exception as e:
        return jsonify({'error': f'Error: {e}'}), 500
    finally:
        if database.is_connected():
            database.close()

    return jsonify(new_user), 201

@bp.route('/<int:id>', methods=['PUT'])
def update_user(id):
    updated_user = request.get_json()

    # Validate input fields
    required_fields = ['firstname', 'lastname', 'password', 'email', 'assignedrole', 'addedgroups', 'apikey', 'jirauserid']
    for field in required_fields:
        if field not in updated_user:
            return jsonify({'error': f'Missing field: {field}'}), 400

    try:
        database = connectToDatabase()
        dbcursor = database.cursor()

        sql_query = """
            UPDATE usersinfo
            SET firstname = %s, lastname = %s, password = %s, email = %s, assignedrole = %s, addedgroups = %s, apikey = %s, jirauserid = %s
            WHERE id = %s
        """
        values = (
            updated_user['firstname'],
            updated_user['lastname'],
            updated_user['password'],  # Assuming password is hashed before being sent
            updated_user['email'],
            updated_user['assignedrole'],
            updated_user['addedgroups'],
            updated_user['apikey'],
            updated_user['jirauserid'],
            id
        )

        dbcursor.execute(sql_query, values)
        database.commit()

        if dbcursor.rowcount == 0:
            return jsonify({'error': 'User not found'}), 404

    except mysql.connector.Error as e:
        return jsonify({'error': f'Database error: {e}'}), 500
    except Exception as e:
        return jsonify({'error': f'Error: {e}'}), 500
    finally:
        if database.is_connected():
            database.close()

    return jsonify({'id': id, **updated_user}), 200

@bp.route('/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        database = connectToDatabase()
        dbcursor = database.cursor()

        sql_query = "DELETE FROM usersinfo WHERE id = %s"
        dbcursor.execute(sql_query, (id,))
        database.commit()

        if dbcursor.rowcount == 0:
            return jsonify({'error': 'User not found'}), 404

    except mysql.connector.Error as e:
        return jsonify({'error': f'Database error: {e}'}), 500
    except Exception as e:
        return jsonify({'error': f'Error: {e}'}), 500
    finally:
        if database.is_connected():
            database.close()

    return jsonify({'message': 'User deleted successfully'}), 200
