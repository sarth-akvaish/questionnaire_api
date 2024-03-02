# Questionnaire System Backend API

This backend API provides endpoints for creating questionnaires, managing users, and submitting answers to questionnaires.

## Installation

1. Clone the repository:

   git clone https://github.com/sarth-akvaish/questionnaire_api.git

2. Install dependencies:
   cd questionnaire-system
   npm install

3. Create a .env file in the root directory with the following variables:

- PORT=5000
- MONGODB_URI=your_mongodb_connection_string

4. Start the server using npm start

5. Endpoints

- POST /register: Register a new admin user. Requires a request body with username and password fields.

- POST /login: Log in with existing user credentials. Returns a JWT token for authentication.

- POST /createQuestionnaire: Create a new questionnaire. Requires authentication token in the Authorization header. Request body should contain an array of questions.

- GET /getQuestionnaire/:id: Get a questionnaire by its ID. Requires authentication token in the Authorization header. Supports pagination with a page query parameter.

- POST /submitAnswers/:id: Submit answers to a questionnaire. Request body should contain an array of answers.

6. Technologies Used

- Node.js
- Bcrypt.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication
