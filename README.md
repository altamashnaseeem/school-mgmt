# Setup Instructions

## Step 1: Clone the Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

## Step 2: Install Dependencies
npm install

## step 3: Start the Application
npm run dev

# API Endpoints
`Method           Endpoint                         description                      Authentication required`

`-- for signup and login--`

`POST         /api/user/login	                     Login a user        	                No`
`POST	        /api/user/register	              Register a new user	                    No`

`--For class--`

`POST     	    /api/class/create	                  create a class	                    Yes`
`PUT	          /api/class/assign/:classId          Assign teacher	                    Yes`
`GET	          /api/class/all/:page/:limit         Get All classes	                    Yes`
`PUT	          /api/class/update/:classId	        Update a class	                    Yes`
`Delete        /api/class/delete/:classId          Delete a class                       Yes`

 `--For teacher--`

`POST     	    /api/teacher/add                    Add a teacher	                      Yes`
`GET	          /api/teacher/all                    Get all teacher                     Yes`
`GET	          /api/teacher/:teacherId           Get single teacher                    Yes`
`PUT	          /api/teacher/:teacherId	          Update a teacher                      Yes`
`Delete        /api/teacher/:teacherId           Delete a teacher                       Yes`

`--For student--`

`POST     	    /api/student/add	                 Add a student	                      Yes`
`GET	          /api/student/all                   Get all student	                    Yes`
`GET	          /api/student/:studentId           Get single student	                  Yes`
`PUT	         /api/student/:studentId	          Update a student	                    Yes`
`Delete       /api/student/:studentId            Delete a student                       Yes`

`-- For Attendance--`
`POST     	    /api/attendance	                   Mark attendance	                    Yes`
`GET	          /api/attendance/:classId         Get attendance by class	              Yes`

`-- For Exam--`
`POST     	    /api/exam/create	                 Create a Exam	                      Yes`

`--For Result--`
`POST     	    /api/result/add	                   Add a result	                        Yes`
`GET	          /api/result/classId               Get result by class	                  Yes`

`--For Report--`
`GET     	    /api/report/:classId             Generate class report	                  Yes`


