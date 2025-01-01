const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const ticketRouter = require("../routes/ticket");
const concertRouter = require("../routes/concert");

const app = express();
app.use(bodyParser.json());
app.use("/ticket", ticketRouter);
app.use("/concert", concertRouter);

describe("Ticket API", () => {
  let ticketId;
  let concertId;

  beforeAll(async () => {
    const concertResponse = await request(app).post("/concert").send({
      name: "Concert 1",
      date: "2023-12-01",
      time: "19:00",
      location: "Venue 1",
      ticket_price: 50,
      available_tickets: 100,
    });
    concertId = concertResponse.body.concertData.id;
  });

  it("should create a new ticket", async () => {
    const response = await request(app).post("/ticket").send({
      concert_id: concertId,
      userID: "user123",
      seat_info: "A1",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Ticket Created Successfully");
    ticketId = response.body.ticketData.id;
  }, 20000); // 20 seconds timeout

  it("should fetch all tickets", async () => {
    const response = await request(app).get("/ticket");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Tickets Fetched Successfully");
    expect(response.body.tickets.length).toBeGreaterThan(0);
  }, 20000); // 20 seconds timeout

  it("should fetch a single ticket", async () => {
    const response = await request(app).get(`/ticket/${ticketId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Ticket Fetched Successfully");
    expect(response.body.ticket.id).toBe(ticketId);
  }, 20000); // 20 seconds timeout

  it("should update a ticket", async () => {
    const response = await request(app).put(`/ticket/${ticketId}`).send({
      concert_id: concertId,
      userID: "user123",
      seat_info: "A2",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Ticket Updated Successfully");
  }, 20000); // 20 seconds timeout

  it("should delete a ticket", async () => {
    const response = await request(app).delete(`/ticket/${ticketId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Ticket Deleted Successfully");
  }, 20000); // 20 seconds timeout

  it("should delete the concert data that needed for this test", async () => {
    await request(app).delete(`/concert/${concertId}`); //delete the concert data needed for the test
  });
});
