Blog API Project
This project is a RESTful Blog API with authentication, developed to provide a backend service for managing blog posts and user interactions.

Features
· User Authentication: Secure user registration and login functionality.
· CRUD Operations: Create, read, update, and delete blog posts.
· Commenting System: Users can add comments to blog posts.
· Pagination: Efficient handling of large sets of blog posts.

Technologies Used
· Node.js: JavaScript runtime environment.
· Express.js: Web application framework for Node.js.
· MongoDB: NoSQL database for data storage.
· Mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js.
· JSON Web Tokens (JWT): For securing API endpoints.

Installation
1. Clone the repository: git clone https://github.com/EmmanuelM0147/blog-api-project-1.git
2. Navigate to the project directory: cd blog-api-project-1
3. Install dependencies: npm install
4. Set up environment variables: Create a .env file in the root directory and add the following:
· PORT=5000
· MONGODB_URI=your_mongodb_connection_string
· JWT_SECRET=your_jwt_secret
· Start the server:
· npm start
NB: The API will be accessible at http://localhost:5000.

API Endpoints
Authentication:

POST /api/register - Register a new user.
POST /api/login - Authenticate a user and receive a token.
Blog Posts:

GET /api/posts - Retrieve all blog posts.
POST /api/posts - Create a new blog post.
GET /api/posts/:id - Retrieve a single blog post by ID.
PUT /api/posts/:id - Update a blog post by ID.
DELETE /api/posts/:id - Delete a blog post by ID.

POST /api/posts/:id/comments - Add a comment to a blog post.
GET /api/posts/:id/comments - Retrieve comments for a blog post.
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.
