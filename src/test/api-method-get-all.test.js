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
});
