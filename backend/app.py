from flask import Flask
from routes import tasks, users, groups, settings
from utils.db import update_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(tasks.bp, url_prefix='/api/tasks')
app.register_blueprint(users.bp, url_prefix='/api/users')
app.register_blueprint(groups.bp, url_prefix='/api/groups')
app.register_blueprint(settings.bp, url_prefix='/api/settings')

if __name__ == '__main__':
    from threading import Thread
    data_update_thread = Thread(target=update_data)
    data_update_thread.daemon = True
    data_update_thread.start()
    
    app.run(host='0.0.0.0', port=8080)
