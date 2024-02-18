# employee-attendance-system
---
### Steps to initialize the project:
1. After cloning the project. create a postgres database in your local with suitable name.There are few scripts in the scripts.sql file run those scripts. It will create required tables for the project.
2. Now create .env file and add the environment variables(refer .env.example)
3. Make sure you have installed node and npm (refer [Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))
4. If node and npm are installed run  `npm install` it will install all the dependencies.
5. Run `node app.js` (make sure port 3000 is empty before running)
6. You can hit api endpoints to interact.

### Api Documenation:
1. `/v1/create-user`: will create user `name` and `email` are required fields
2. `/v1/checkin`: will check-in the instructor `checkInTime`(HH:MM) and `instructorId` are required fields in the request body
3. `/v1/chckout`:will check-out the instructor `checkOutTime`(HH:MM) and `instructorId` are required fields in the request body
4. `/v1/monthly-report`:will get the total hours worked by each user. `month` and `year` are mandatory fields
5. `/v1/regularize`: will give ability to update check-in or check-out or both for an existing entry past. And also will give ability to make a new entry for past dates.
a. **To update any checkIn or checkOut entry**:
    `id` (i.e., id of thr entry to be edited), `instructorsId`,`date`(YYYY-MM-DD),`checkInTime`(HH:MM),`checkOutTime`(HH:MM)
b. **To create a new entry**
`instructorsId`,`date`(YYYY-MM-DD),`checkInTime`(HH:MM),`checkOutTime`(HH:MM)
c. Example request body: 
{
  "instructorId": 1,
  "date": "2024-02-17",
  "checkInTime":"15:00",
  "checkOutTime": "18:30"
}
or
{
  "id":4,
  "instructorId": 3,
  "date": "2024-02-17",
  "checkInTime":"15:00",
}
contact: rahulvemula03@gmail.com, 7093328593