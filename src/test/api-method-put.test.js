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

describe("Concert, Ticket, and Auth API - PUT", () => {
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

    // Create a concert and ticket for testing
    const concertResponse = await request(app)
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
    concertId = concertResponse.body.concertData.id;

    const ticketResponse = await request(app)
      .post("/ticket")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        concertID: concertId,
        ticket_types: "VIP",
      });
    ticketId = ticketResponse.body.ticketData.id;
  }, 30000);

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
  }, 10000);

  it("should update a ticket", async () => {
    const response = await request(app)
      .put(`/ticket/${ticketId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        concertID: concertId,
        userID: "testuser@example.com",
        ticket_types: "Regular",
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Ticket Updated Successfully");
  }, 10000);

  it("should not allow another user to update the ticket", async () => {
    const response = await request(app)
      .put(`/ticket/${ticketId}`)
      .set("Authorization", `Bearer ${otherAuthToken}`)
      .send({
        concertID: concertId,
        ticket_types: "Balcony",
      });
    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Unauthorized, Cannot Update Other User Ticket!");
  }, 10000);

  afterAll(async () => {
    // Delete the created concert and ticket
    await request(app)
      .delete(`/concert/${concertId}`)
      .set("Authorization", `Bearer ${authToken}`);

    await request(app)
      .delete(`/ticket/${ticketId}`)
      .set("Authorization", `Bearer ${authToken}`);
  });
});
