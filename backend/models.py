from config import DATABASE_CONFIG
import mysql.connector

def connectToDatabase():
    return mysql.connector.connect(**DATABASE_CONFIG)

def fetchFromDatabase(sql_query):
    database = connectToDatabase()
    dbcursor = database.cursor(dictionary=True)
    dbcursor.execute(sql_query)
    output = dbcursor.fetchall()
    database.close()
    return output
