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

describe("Concert, Ticket, and Auth API - GET", () => {
  let concertId;
  let ticketId;
  let authToken;

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

  it("should fetch all concerts", async () => {
    const response = await request(app)
      .get("/concert")
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Concerts Fetched Successfully");
    expect(response.body.concerts.length).toBeGreaterThan(0);
  }, 10000);

  it("should fetch all tickets", async () => {
    const response = await request(app)
      .get("/ticket")
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Tickets Fetched Successfully");
    expect(response.body.tickets.length).toBeGreaterThan(0);
  }, 10000);

  afterAll(async () => {
    await request(app)
      .delete(`/ticket/${ticketId}`)
      .set("Authorization", `Bearer ${authToken}`);
    await request(app)
      .delete(`/concert/${concertId}`)
      .set("Authorization", `Bearer ${authToken}`);
  });
});
