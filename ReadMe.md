# Task Management Application

## Introduction
Daily standup meetings are essential for engineering teams to track progress and ensure everyone is on the same page. However, the traditional methods of recording and tracking tasks can be cumbersome and inefficient. Engineers often must manually create JIRA tickets, update task sheets, and navigate through previous tasks, which can be time-consuming. To address these challenges, I have designed an application to streamline task management, improve efficiency, and enhance the overall standup meeting experience.

## Identified Issues
The existing task recording system presents several challenges:
1. **Manual JIRA Creation:** Engineers must create JIRA tickets manually.
2. **Daily Task Sheet Recreation:** Every day, an engineer must manually update the task sheet by removing completed tasks and carrying forward incomplete tasks.
3. **Difficult Navigation:** Finding previously completed tasks, tasks assigned to different users, and tasks with various statuses is tedious.

## About the Application
To resolve these issues, I developed a task management application using a MySQL database to store task information, user data, and other application-related information. The backend is built with the Flask framework, and the frontend is designed with JavaScript, HTML, and CSS.

## Key Features
The main page of the application consists of three areas:

1. **Top Section:**
   
   ![Top Section](https://github.com/user-attachments/assets/8c3fe71e-24d2-455b-8d77-5f14741515fa)

   - **Load Tasks Button:** Refreshes and loads the current tasks from the database.
   - **Settings Button:** Provides access to the application settings.
     - **User Registration:** Allows the registration of new users.
       
       ![User Registration](https://github.com/user-attachments/assets/4b80a7a3-149f-4a12-a116-9d1d4377587e)

     - **Application Settings:** Enables changes to application settings.
       
       ![Application Settings](https://github.com/user-attachments/assets/426c55a1-69f7-4a38-9a8d-fe359767c79d)



3. **Main Window:**
   - Displays all incomplete tasks up to the current date, providing a clear view of pending tasks and new task adding section.
     
     ![image](https://github.com/user-attachments/assets/56e69e9a-7ca1-419c-b4f9-0f28aa4b9378)


4. **Left-Hand Side Filtering Options:**
   - Offers three filtering options that can be used together for detailed task management:
     
     ![Status Filter](https://github.com/user-attachments/assets/8f5919ab-01f3-4e9b-b214-572d0a56705a)
     
     - **User Filter:** Filters tasks by specific users.
     - **Status Filter:** Filters tasks by their status.
     
     ![History Filter](https://github.com/user-attachments/assets/4f134c83-39b3-4263-b411-8c34210814b8)

     - **History Filter:** Filters tasks based on their completion date, making it easy to find historical data.

## Benefits
- **Efficiency:** Automates the creation of JIRA tickets and updates to the task sheet, saving engineers valuable time.
- **Simplified Navigation:** Provides intuitive filtering options for easy access to tasks based on user, status, and completion date.
- **Improved Task Management:** Offers a comprehensive view of all incomplete tasks, ensuring nothing is overlooked.
