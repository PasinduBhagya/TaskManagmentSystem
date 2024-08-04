-- Table structures

CREATE TABLE tasksinfo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    assigneeid INT,
    name VARCHAR(255),
    project VARCHAR(50),
    status VARCHAR(50),
    jiraid VARCHAR(50),
    createddate DATE,
    completeddate DATE
);

CREATE TABLE usersinfo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),   -- Added the data type for password
    email VARCHAR(255),
    assignedrole VARCHAR(50),
    addedgroups VARCHAR(50),
    apikey VARCHAR(300),
    jirauserid VARCHAR(50)
);

CREATE TABLE groupsinfo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    members TEXT,
    projects TEXT
);

CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    values TEXT
);



-- Inserting more sample data into usersinfo table with dummy hashed passwords
-- INSERT INTO usersinfo (firstname, lastname, username, password, email, assignedrole, addedgroups, apikey, jirauserid) VALUES
-- ('Alice', 'Johnson', 'alicejohnson', '$2b$12$e1XvL7rH9G4JKolrZ7RP.uIgJ2SBPz0aaKiH5T/4ujol7tZQnqzJS', 'alice.johnson@example.com', 'admin', 'Marketing', 'jkl012apikey', 'AJ789'),
-- ('Bob', 'Williams', 'bobwilliams', '$2b$12$Q0ox9iK2X3zF1wZx0ErtDuWWJlVVH2g0.CFce9e5M84tmJ3Qxfl3u', 'bob.williams@example.com', 'user', 'Sales', 'mno345apikey', 'BW234'),
-- ('Carol', 'Davis', 'caroldavis', '$2b$12$eF0i/ZyRssy2.d8MbNc8m.Yv8gxt9FQxGzqv7hUp9F19wdmXzmbm6', 'carol.davis@example.com', 'moderator', 'Support', 'pqr678apikey', 'CD567'),
-- ('David', 'Miller', 'davidmiller', '$2b$12$5GgT0dIkWy5A5m5B3u7BzO4lkpFzD8bC5KK3M9l1E7LtjLXgGQOfW', 'david.miller@example.com', 'admin', 'Engineering', 'stu901apikey', 'DM345'),
-- ('Emily', 'Wilson', 'emilywilson', '$2b$12$2fM3GddVZ5WUtU7cbIgs..sN5SK3MO8KkYZy5C.6SOq5JcdUsRvH.', 'emily.wilson@example.com', 'user', 'Finance', 'vwx234apikey', 'EW678'),
-- ('Frank', 'Taylor', 'franktaylor', '$2b$12$2PhIrLb.ycMpfLecY07DZ.9A9LclE0MJ2pt1wCezsJvjChxdrzRWu', 'frank.taylor@example.com', 'moderator', 'HR', 'yz1234apikey', 'FT901'),
-- ('Grace', 'Anderson', 'graceanderson', '$2b$12$7PvK4hsdOl1A2U2EKF12BOcQuk0afA0uDRqE7h3T3F1h1SPkpSxK6', 'grace.anderson@example.com', 'user', 'Operations', 'abc567apikey', 'GA234'),
-- ('Henry', 'Thomas', 'henrythomas', '$2b$12$ZtPMtxkz4p6Ki7eY6y0U4OHlS/1T8/Ns8f2khxZ/nRsOUut9Zk/7W', 'henry.thomas@example.com', 'admin', 'IT', 'def890apikey', 'HT567');


-- INSERT INTO tasksinfo (id, assigneeid, name, project, status, jiraid, createddate, completeddate) VALUES
-- (1, 1, "Complete the design and layout of the homepage, including responsiveness and cross-browser compatibility", "Homepage Redesign", "Completed", "JIRA-101", '2024-07-01', '2024-07-10'),
-- (2, 1, "Develop the API endpoints for user authentication and authorization, and ensure thorough testing", "User Authentication", "On Hold", "JIRA-102", '2024-07-11', NULL),
-- (3, 2, "Resolve the critical bug #101 affecting user login functionality and verify the fix with extensive testing", "Bug Fixes", "Completed", "JIRA-103", '2024-07-05', '2024-07-12'),
-- (4, 3, "Implement a robust authentication system including multi-factor authentication for enhanced security", "Security", "On Hold", "JIRA-104", '2024-07-10', NULL),
-- (5, 1, "Write comprehensive unit tests for the newly developed features and ensure code coverage is above 90%", "Testing", "Completed", "JIRA-105", '2024-07-15', '2024-07-20'),
-- (6, 4, "Set up a continuous integration and deployment (CI/CD) pipeline to automate build and deployment processes", "CI/CD", "New Task", "JIRA-106", '2024-07-20', NULL),
-- (7, 3, "Review and approve pull requests from team members, ensuring code quality and adherence to coding standards", "Code Review", "New Task", "JIRA-107", '2024-07-22', NULL),
-- (8, 2, "Deploy the application to the production environment and monitor for any immediate issues or anomalies", "Deployment", "Completed", "JIRA-108", '2024-07-25', '2024-07-30'),
-- (9, 5, "Create detailed documentation for API endpoints, including usage examples and error handling", "Documentation", "New Task", "JIRA-109", '2024-07-28', NULL),
-- (10, 2, "Update all project dependencies to their latest versions and ensure compatibility with existing codebase", "Dependencies", "Completed", "JIRA-110", '2024-07-30', '2024-08-01'),
-- (11, 1, "Fix the UI bugs reported in the latest user feedback and ensure consistency across all devices", "UI/UX", "Completed", "JIRA-111", '2024-08-01', '2024-08-05'),
-- (12, 6, "Improve the performance of the application by optimizing key components and reducing load times", "Performance", "On Hold", "JIRA-112", '2024-08-02', NULL),
-- (13, 2, "Refactor the existing codebase to enhance readability, maintainability, and scalability", "Refactoring", "Completed", "JIRA-113", '2024-08-05', '2024-08-10'),
-- (14, 3, "Optimize database queries to improve performance and reduce the response time of the application", "Database", "On Hold", "JIRA-114", '2024-08-07', NULL),
-- (15, 1, "Add user analytics to track engagement and gather insights for improving the user experience", "Analytics", "Completed", "JIRA-115", '2024-08-10', '2024-08-15'),
-- (16, 5, "Design API endpoints for the new feature, including detailed specifications and expected responses", "New Feature", "New Task", "JIRA-116", '2024-08-12', NULL),
-- (17, 2, "Test the newly implemented features to ensure they function correctly and integrate seamlessly with the existing system", "Testing", "New Task", "JIRA-117", '2024-08-15', NULL),
-- (18, 2, "Set up a staging environment that mirrors the production environment for testing and QA purposes", "Staging", "Completed", "JIRA-118", '2024-08-18', '2024-08-20'),
-- (19, 7, "Create user guides and help documents to assist end-users in understanding and utilizing the application", "User Guides", "New Task", "JIRA-119", '2024-08-22', NULL),
-- (20, 5, "Monitor system performance and health metrics to identify and address any potential issues proactively", "Monitoring", "Completed", "JIRA-120", '2024-08-25', '2024-08-28'),
-- (21, 1, "Fix identified security issues in the application to ensure compliance with security standards and best practices", "Security", "Completed", "JIRA-121", '2024-08-28', '2024-08-30'),
-- (22, 8, "Update the user interface based on recent user feedback to improve usability and aesthetic appeal", "UI Updates", "On Hold", "JIRA-122", '2024-08-30', NULL),
-- (23, 2, "Prepare and distribute release notes highlighting new features, bug fixes, and known issues in the latest release", "Release Notes", "Completed", "JIRA-123", '2024-09-01', '2024-09-03'),
-- (24, 3, "Integrate a payment gateway for handling transactions securely and ensuring smooth payment processing", "Payment Gateway", "On Hold", "JIRA-124", '2024-09-05', NULL),
-- (25, 6, "Develop the new feature X with detailed specifications and ensure it aligns with project requirements", "Feature X", "Completed", "JIRA-125", '2024-09-08', '2024-09-12'),
-- (26, 5, "Fix deployment issues encountered during the last release and ensure a smooth deployment process", "Deployment Issues", "New Task", "JIRA-126", '2024-09-10', NULL),
-- (27, 3, "Conduct a thorough code review to identify and address any potential issues before merging changes", "Code Review", "New Task", "JIRA-127", '2024-09-12', NULL),
-- (28, 2, "Optimize frontend performance to enhance loading times and responsiveness for users", "Frontend Optimization", "Completed", "JIRA-128", '2024-09-15', '2024-09-18'),
-- (29, 2, "Enhance security measures to protect user data and prevent potential vulnerabilities", "Security Enhancement", "New Task", "JIRA-129", '2024-09-18', NULL),
-- (30, 5, "Finalize and compile all project documentation, including technical specifications and user manuals", "Documentation", "Completed", "JIRA-130", '2024-09-20', '2024-09-22'),
-- (31, 2, "Design and implement a new feature for user notifications with real-time updates", "Notifications", "New Task", "JIRA-131", '2024-09-22', NULL),
-- (32, 7, "Develop a comprehensive testing strategy to ensure all aspects of the application are thoroughly tested", "Testing Strategy", "Completed", "JIRA-132", '2024-09-25', '2024-09-27'),
-- (33, 6, "Address performance issues identified during user load testing and optimize the application accordingly", "Performance Optimization", "On Hold", "JIRA-133", '2024-09-28', NULL),
-- (34, 9, "Implement a new user feedback system to gather insights and improve application usability", "User Feedback", "New Task", "JIRA-134", '2024-09-30', NULL),
-- (35, 10, "Develop and integrate a search functionality to improve user navigation and content discovery", "Search Functionality", "Completed", "JIRA-135", '2024-10-02', '2024-10-05'),
-- (36, 11, "Enhance the mobile app version with additional features and ensure synchronization with the web version", "Mobile App Enhancement", "On Hold", "JIRA-136", '2024-10-05', NULL),
-- (37, 12, "Conduct a security audit to identify and mitigate potential vulnerabilities in the application", "Security Audit", "New Task", "JIRA-137", '2024-10-08', NULL),
-- (38, 10, "Update the application’s privacy policy and terms of service to comply with new regulations", "Privacy Policy", "Completed", "JIRA-138", '2024-10-10', '2024-10-12'),
-- (39, 8, "Set up user role management features to support different access levels and permissions within the application", "User Roles", "New Task", "JIRA-139", '2024-10-12', NULL),
-- (40, 12, "Refactor legacy code to improve maintainability and integrate with new features seamlessly", "Legacy Code Refactor", "On Hold", "JIRA-140", '2024-10-15', NULL);

-- INSERT INTO groupsinfo (name, members, projects) VALUES
-- ('Developers', 'Alice, Bob, Carol', 'Project A, Project B'),
-- ('Marketing Team', 'David, Emily, Grace', 'Campaign X, Campaign Y'),
-- ('HR Department', 'Frank, Henry', 'Onboarding, Recruitment'),
-- ('Sales Team', 'John, Lisa, Tom', 'Q1 Sales, Q2 Sales'),
-- ('Support Squad', 'Anna, Mike, Julia', 'Issue Tracking, Customer Service');
