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

describe("Concert, Ticket, and Auth API - POST", () => {
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
  }, 30000);

  it("should login the user", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login Successfull");
    authToken = response.body.idToken;
  }, 10000);

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
  }, 10000);

  it("should create a new ticket", async () => {
    const response = await request(app)
      .post("/ticket")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        concertID: concertId,
        ticket_types: "VIP",
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Ticket Created Successfully");
    ticketId = response.body.ticketData.id;
  }, 10000);

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
