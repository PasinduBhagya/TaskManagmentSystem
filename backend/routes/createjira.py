import requests
from requests.auth import HTTPBasicAuth
import json
from models import connectToDatabase, fetchFromDatabase

# def createJIRA(taskname, project, assingeejirauid):
def createJIRA(taskname, project, userid):
    try:
        database = connectToDatabase()
        dbcursor = database.cursor(dictionary=True)

        sql_query = '''
                    SELECT parameters AS result 
                    FROM settings 
                    WHERE id = 2 
                    UNION
                    SELECT parameters AS result
                    FROM settings 
                    WHERE id = 4 
                    UNION
                    SELECT parameters AS result
                    FROM settings 
                    WHERE id = 6 
                    UNION
                    SELECT jirauserid AS result 
                    FROM usersinfo
                    WHERE id = %s
        '''

        values = (int(userid),)
        dbcursor.execute(sql_query, values)
        
        data = dbcursor.fetchall()

        base_url = data[0]['result']
        api_token = data[1]['result']
        email = data[2]['result']
        accountId = data[3]['result']
        
        url = f"{base_url}/rest/api/3/issue"

        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }

        payload = json.dumps({
            "fields": {
                "project": {
                    "key": project
                },
                "assignee": {
                    "accountId": accountId
                },
                "summary": taskname,
                "issuetype": {
                    "name": "Task"
                }
            }
        })

        response = requests.post(
            url,
            headers=headers,
            data=payload,
            auth=HTTPBasicAuth(email, api_token)
        )

        if response.status_code == 201:
            issurAPIurl = response.json()['self']
            fullresponse = requests.get(
                issurAPIurl,
                headers=headers,
                auth=HTTPBasicAuth(email, api_token)
            )
            if fullresponse.status_code == 200:
                fulDetails = fullresponse.json()
                return {
                        "jirakey" : fulDetails['key'],
                        "jiracreated": fulDetails['fields']['created']
                }
            else:
                print("Failed to get JIRA data")
                
        else:
            print("Failed to create a JIRA")
        
    except Exception as error:
        print("ERROR: Failed to get the JIRA User ID" + str(error))
    
    