from flask import Blueprint, jsonify, request
import mysql.connector
from models import connectToDatabase, fetchFromDatabase

bp = Blueprint('groups', __name__)

@bp.route('', methods=['GET'])
def get_groups():
    groups = fetchFromDatabase("SELECT * FROM groupsinfo")  # Fetch all groups from the database
    return jsonify(groups)

@bp.route('', methods=['POST'])
def add_group():
    new_group = request.get_json()
    
    # Validate input fields
    required_fields = ['name', 'members', 'projects']
    for field in required_fields:
        if field not in new_group:
            return jsonify({'error': f'Missing field: {field}'}), 400

    try:
        database = connectToDatabase()
        dbcursor = database.cursor()

        sql_query = """
            INSERT INTO groupsinfo (name, members, projects)
            VALUES (%s, %s, %s)
        """
        values = (
            new_group['name'],
            new_group['members'],
            new_group['projects']
        )

        dbcursor.execute(sql_query, values)
        database.commit()

        new_group['id'] = dbcursor.lastrowid

    except mysql.connector.Error as e:
        return jsonify({'error': f'Database error: {e}'}), 500
    except Exception as e:
        return jsonify({'error': f'Error: {e}'}), 500
    finally:
        if database.is_connected():
            database.close()

    return jsonify(new_group), 201

@bp.route('/<int:id>', methods=['PUT'])
def update_group(id):
    updated_group = request.get_json()

    # Validate input fields
    required_fields = ['name', 'members', 'projects']
    for field in required_fields:
        if field not in updated_group:
            return jsonify({'error': f'Missing field: {field}'}), 400

    try:
        database = connectToDatabase()
        dbcursor = database.cursor()

        sql_query = """
            UPDATE groupsinfo
            SET name = %s, members = %s, projects = %s
            WHERE id = %s
        """
        values = (
            updated_group['name'],
            updated_group['members'],
            updated_group['projects'],
            id
        )

        dbcursor.execute(sql_query, values)
        database.commit()

        if dbcursor.rowcount == 0:
            return jsonify({'error': 'Group not found'}), 404

    except mysql.connector.Error as e:
        return jsonify({'error': f'Database error: {e}'}), 500
    except Exception as e:
        return jsonify({'error': f'Error: {e}'}), 500
    finally:
        if database.is_connected():
            database.close()

    return jsonify({'id': id, **updated_group}), 200

@bp.route('/<int:id>', methods=['DELETE'])
def delete_group(id):
    try:
        database = connectToDatabase()
        dbcursor = database.cursor()

        sql_query = "DELETE FROM groupsinfo WHERE id = %s"
        dbcursor.execute(sql_query, (id,))
        database.commit()

        if dbcursor.rowcount == 0:
            return jsonify({'error': 'Group not found'}), 404

    except mysql.connector.Error as e:
        return jsonify({'error': f'Database error: {e}'}), 500
    except Exception as e:
        return jsonify({'error': f'Error: {e}'}), 500
    finally:
        if database.is_connected():
            database.close()

    return jsonify({'message': 'Group deleted successfully'}), 200
