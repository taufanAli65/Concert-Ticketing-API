# Concert Ticketing System

This project is a concert ticketing system that allows users to create, retrieve, update, and delete concert and ticket information. The system also supports user authentication.

## Features

- User registration and login
- Create, retrieve, update, and delete concerts
- Create, retrieve, update, and delete tickets
- Fetch user-specific tickets

## How to Use

### 1. Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/taufanAli65/Concert-Ticketing-API
   cd concert-ticketing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure you have Node.js installed (version 20 or higher is recommended).

4. Set up your Firebase service account key:
   - Download your `serviceAccountKey.json` from Firebase Console.
   - Place the `serviceAccountKey.json` file in the root directory of the project.

5. Set up environment variables in a `.env` file:
   ```env
   APP_PORT=3000
   FIREBASE_API_KEY=your_firebase_web_api
   ```

6. Start the server:
   ```bash
   npm start
   ```

### 2. API Endpoints

#### Authentication

- **Register**: `POST /auth/register`
  ```json
  {
    "email": "testuser@example.com",
    "password": "password123",
    "name": "Test User"
  }
  ```
  - **Response**:
    ```json
    {
      "message": "User Created Successfully",
      "email": "testuser@example.com",
      "name": "Test User"
    }
    ```

- **Login**: `POST /auth/login`
  ```json
  {
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```
  - **Response**:
    ```json
    {
      "message": "Login Successful",
      "idToken": "your_id_token"
    }
    ```

#### Concerts

- **Create Concert**: `POST /concert`
  ```json
  {
    "name": "Concert 1",
    "date": "2023-12-01",
    "time": "19:00",
    "location": "Venue 1",
    "ticket_price": 50,
    "available_tickets": 100
  }
  ```
  - **Response**:
    ```json
    {
      "message": "New Concert Added Successfully",
      "concertData": {
        "id": "concertId",
        "name": "Concert 1",
        "date": "2023-12-01",
        "time": "19:00",
        "location": "Venue 1",
        "ticket_price": 50,
        "available_tickets": 100
      }
    }
    ```

- **Get All Concerts**: `GET /concert`
  - **Response**:
    ```json
    {
      "message": "Concerts Fetched Successfully",
      "concerts": [
        {
          "id": "concertId",
          "name": "Concert 1",
          "date": "2023-12-01",
          "time": "19:00",
          "location": "Venue 1",
          "ticket_price": 50,
          "available_tickets": 100
        }
      ]
    }
    ```

- **Get Concert by ID**: `GET /concert/:id`
  - **Response**:
    ```json
    {
      "message": "Concert Fetched Successfully",
      "concert": {
        "id": "concertId",
        "name": "Concert 1",
        "date": "2023-12-01",
        "time": "19:00",
        "location": "Venue 1",
        "ticket_price": 50,
        "available_tickets": 100
      }
    }
    ```

- **Update Concert**: `PUT /concert/:id`
  ```json
  {
    "name": "Updated Concert",
    "date": "2023-12-02",
    "time": "20:00",
    "location": "Updated Venue",
    "ticket_price": 60,
    "available_tickets": 150
  }
  ```
  - **Response**:
    ```json
    {
      "message": "Concert Information Updated Successfully",
      "concert": {
        "id": "concertId",
        "name": "Updated Concert",
        "date": "2023-12-02",
        "time": "20:00",
        "location": "Updated Venue",
        "ticket_price": 60,
        "available_tickets": 150
      }
    }
    ```

- **Delete Concert**: `DELETE /concert/:id`
  - **Response**:
    ```json
    {
      "message": "Concert Deleted Successfully"
    }
    ```

#### Tickets

- **Create Ticket**: `POST /ticket`
  ```json
  {
    "concertID": "concertId",
    "ticket_types": ["VIP", "Regular"]
  }
  ```
  - **Response**:
    ```json
    {
      "message": "Ticket Created Successfully",
      "ticketData": {
        "id": "ticketId",
        "concertID": "concertId",
        "userID": "userId",
        "ticket_types": ["VIP", "Regular"],
        "purchase_timestamp": "2023-12-01T19:00:00Z"
      }
    }
    ```

- **Get All Tickets**: `GET /ticket`
  - **Response**:
    ```json
    {
      "message": "Tickets Fetched Successfully",
      "tickets": [
        {
          "id": "ticketId",
          "concertID": "concertId",
          "userID": "userId",
          "ticket_types": ["VIP", "Regular"],
          "purchase_timestamp": "2023-12-01T19:00:00Z"
        }
      ]
    }
    ```

- **Get Ticket by ID**: `GET /ticket/:id`
  - **Response**:
    ```json
    {
      "message": "Ticket Fetched Successfully",
      "ticket": {
        "id": "ticketId",
        "concertID": "concertId",
        "userID": "userId",
        "ticket_types": ["VIP", "Regular"],
        "purchase_timestamp": "2023-12-01T19:00:00Z"
      }
    }
    ```

- **Update Ticket**: `PUT /ticket/:id`
  ```json
  {
    "concertID": "concertId",
    "ticket_types": ["VIP", "Regular", "Balcony"]
  }
  ```
  - **Response**:
    ```json
    {
      "message": "Ticket Updated Successfully",
      "ticket": {
        "id": "ticketId",
        "concertID": "concertId",
        "userID": "userId",
        "ticket_types": ["VIP", "Regular", "Balcony"],
        "purchase_timestamp": "2023-12-01T19:00:00Z"
      }
    }
    ```

- **Delete Ticket**: `DELETE /ticket/:id`
  - **Response**:
    ```json
    {
      "message": "Ticket Deleted Successfully"
    }
    ```

#### Users

- **Get User Info**: `GET /user`
  - **Response**:
    ```json
    {
      "message": "Retrieve User Information Success",
      "user": {
        "uid": "userId",
        "email": "testuser@example.com",
        "name": "Test User"
      }
    }
    ```

### 3. Running Tests

To run the integration tests, use the following command:
```bash
npm test
```

This will execute the tests defined in `src/test/concert-ticket-auth.test.js`.

## Conclusion

This documentation provides an overview of the changes made to the concert ticketing system and instructions on how to set up and use the updated features. If you have any questions or issues, please feel free to open an issue on the repository.