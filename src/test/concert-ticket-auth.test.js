const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const concertRouter = require("../routes/concert");
const ticketRouter = require("../routes/ticket");
const authRouter = require("../routes/auth");

const app = express();
app.use(bodyParser.json());
app.use("/concert", concertRouter);
app.use("/ticket", ticketRouter);
app.use("/auth", authRouter);

describe("Concert, Ticket, and Auth API", () => {
  let concertId;
  let ticketId;
  let authToken;
  let otherAuthToken;

  beforeAll(async () => {
    // Register and login the first user
    await request(app).post("/auth/register").send({
      email: "testuser@example.com",
      password: "password123",
      name: "Test User",
    });

    const loginResponse = await request(app).post("/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    authToken = loginResponse.body.idToken;

    // Register and login the second user
    await request(app).post("/auth/register").send({
      email: "otheruser@example.com",
      password: "password123",
      name: "Other User",
    });

    const otherLoginResponse = await request(app).post("/auth/login").send({
      email: "otheruser@example.com",
      password: "password123",
    });
    otherAuthToken = otherLoginResponse.body.idToken;
  }, 30000); // Increase timeout to 30 seconds

  it("should login the user", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login Successfull");
    authToken = response.body.idToken;
  }, 10000); // Increase timeout to 10 seconds

  it("should create a new concert", async () => {
    const response = await request(app)
      .post("/concert")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Concert 1",
        date: "2023-12-01",
        time: "19:00",
        location: "Venue 1",
        ticket_price: 50,
        available_tickets: 100,
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("New Concert Added Succesfully");
    concertId = response.body.concertData.id;
  }, 10000); // Increase timeout to 10 seconds

  it("should create a new ticket", async () => {
    const response = await request(app)
      .post("/ticket")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        concertID: concertId,
        ticket_types: ["VIP", "Regular"],
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Ticket Created Successfully");
    ticketId = response.body.ticketData.id;
  }, 10000); // Increase timeout to 10 seconds

  // GET all concerts and tickets
  it("should fetch all concerts", async () => {
    const response = await request(app)
      .get("/concert")
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Concerts Fetched Successfully");
    expect(response.body.concerts.length).toBeGreaterThan(0);
  }, 10000); // Increase timeout to 10 seconds

  it("should fetch all tickets", async () => {
    const response = await request(app)
      .get("/ticket")
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Tickets Fetched Successfully");
    expect(response.body.tickets.length).toBeGreaterThan(0);
  }, 10000); // Increase timeout to 10 seconds

  // GET by ID
  it("should fetch a single concert", async () => {
    const response = await request(app)
      .get(`/concert/${concertId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Concert Fetched Successfully");
    expect(response.body.concert.id).toBe(concertId);
  }, 10000); // Increase timeout to 10 seconds

  it("should fetch a single ticket", async () => {
    const response = await request(app)
      .get(`/ticket/${ticketId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Ticket Fetched Successfully");
    expect(response.body.ticket.id).toBe(ticketId);
  }, 10000); // Increase timeout to 10 seconds

  // PUT (update)
  it("should update a concert", async () => {
    const response = await request(app)
      .put(`/concert/${concertId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Updated Concert",
        date: "2023-12-02",
        time: "20:00",
        location: "Updated Venue",
        ticket_price: 60,
        available_tickets: 150,
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Concert Information Update Successfully"
    );
  }, 10000); // Increase timeout to 10 seconds

  it("should update a ticket", async () => {
    const response = await request(app)
      .put(`/ticket/${ticketId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        concertID: concertId,
        userID: "testuser@example.com",
        ticket_types: ["VIP", "Regular", "Balcony"],
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Ticket Updated Successfully");
  }, 10000); // Increase timeout to 10 seconds

  // DELETE
  it("should delete a ticket", async () => {
    const response = await request(app)
      .delete(`/ticket/${ticketId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Ticket Deleted Successfully");
  }, 10000); // Increase timeout to 10 seconds

  it("should delete a concert", async () => {
    const response = await request(app)
      .delete(`/concert/${concertId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Concert Deleted Successfully");
  }, 10000); // Increase timeout to 10 seconds

  // POST invalid data for concert
  it("should not create a concert with invalid data", async () => {
    const response = await request(app)
      .post("/concert")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "",
        date: "2023-12-01",
        time: "19:00",
        location: "Venue 1",
        ticket_price: 50,
        available_tickets: 100,
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid input data");
  }, 10000); // Increase timeout to 10 seconds

  // Unauthorized access tests
  it("should not allow another user to fetch the ticket", async () => {
    const response = await request(app)
      .get(`/ticket/${ticketId}`)
      .set("Authorization", `Bearer ${otherAuthToken}`);
    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Unauthorized, Cannot Read Other User Ticket!");
  }, 10000); // Increase timeout to 10 seconds

  it("should not allow another user to update the ticket", async () => {
    const response = await request(app)
      .put(`/ticket/${ticketId}`)
      .set("Authorization", `Bearer ${otherAuthToken}`)
      .send({
        concertID: concertId,
        ticket_types: ["VIP", "Regular", "Balcony"],
      });
    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Unauthorized, Cannot Update Other User Ticket!");
  }, 10000); // Increase timeout to 10 seconds

  it("should not allow another user to delete the ticket", async () => {
    const response = await request(app)
      .delete(`/ticket/${ticketId}`)
      .set("Authorization", `Bearer ${otherAuthToken}`);
    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Unauthorized, Cannot Delete Other User Ticket!");
  }, 10000); // Increase timeout to 10 seconds
});
