const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const concertRouter = require("../routes/concert");

const app = express();
app.use(bodyParser.json());
app.use("/concert", concertRouter);

describe("Concert API", () => {
  let concertId;

  it("should create a new concert", async () => {
    const response = await request(app)
      .post("/concert")
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
  });

  it("should fetch all concerts", async () => {
    const response = await request(app).get("/concert");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Concerts Fetched Successfully");
    expect(response.body.concerts.length).toBeGreaterThan(0);
  });

  it("should fetch a single concert", async () => {
    const response = await request(app).get(`/concert/${concertId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Concert Fetched Successfully");
    expect(response.body.concert.id).toBe(concertId);
  });

  it("should update a concert", async () => {
    const response = await request(app)
      .put(`/concert/${concertId}`)
      .send({
        name: "Updated Concert",
        date: "2023-12-02",
        time: "20:00",
        location: "Updated Venue",
        ticket_price: 60,
        available_tickets: 150,
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Concert Information Update Successfully");
  });

  it("should delete a concert", async () => {
    const response = await request(app).delete(`/concert/${concertId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Concert Deleted Successfully");
  });
});
