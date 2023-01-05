# :books: CoursesDB with MERN stack and NextJS :books:

This project helped me create my first ever fullstack viable application. I learnt NextJS, MongoDB and NodeJS thanks to it. I learnt the basis of SEO and TailwindCSS (making me realize that pure CSS might be the most optimized solution most of the time).

# **Landing page**

Dynamic landing page where the fields available are displayed. These fields can be created in the Admin page in Category / Tags.

![image](frontend\public\images\readme\CoursesDB-index.png "index page")

# **Sign in / Sign out page**
The sign in and sign out pages verify that the user is present in the database and act accordingly to the response given. When a user signs up, a random id is created, and the password is encrypted using JWT. SendGrid is also used with the "Forgot password ?" function as it sends email with a token giving the permission to change password.

![image](frontend\public\images\readme\CoursesDB-signin.png "signin page")

# **Admin page**
Simple Admin dashboard where the admins can create new fields and prerequisites, create courses, manage courses and update its profile. Simple users can also update their profile. 

![image](frontend\public\images\readme\CoursesDB-Admin.png "admin page")

# **Create course page**
React Quill is used for the form of the page. The admin can write a course and used little tips on the right side to "crack" the form and improve the look of the page when viewing the course. The whole form, as well as the title and the fields / prerequisites are sent as FormData that is then sent to the backend server and into the database.

![image](frontend\public\images\readme\CoursesDB-create.png "create course page")

# **Course page**
The tips on the create course page result in this type of UI. The body of the FormData is parsed into HTML, and the created / updated date is displayed using moment. There is also a comment section at the end added with Disqus.

![image](frontend\public\images\readme\CoursesDB-course.png "course page")
