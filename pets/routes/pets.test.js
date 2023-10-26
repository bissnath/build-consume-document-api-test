import supertest from "supertest";
import server from "../../app";
const requestWithSupertest = supertest(server);

describe('GET "/"', () => {
  test('GET "/" returns all pets', async () => {
    const res = await requestWithSupertest.get("/pets/1");
    const expectedResult = {
      id: 1,
      name: "Rex",
      type: "dog",
      age: 3,
      breed: "labrador",
    };
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual(expectedResult);
  });
});

describe('GET "/:id"', () => {
  test('GET "/:id" returns given pet', async () => {
    const res = await requestWithSupertest.get("/pets/1");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: 1,
      name: "Rex",
      type: "dog",
      age: 3,
      breed: "labrador",
    });
  });
});

describe('PUT "/:id"', () => {
  test('PUT "/:id" updates pet and returns it', async () => {
    const res = await requestWithSupertest.put("/pets/1").send({
      id: 1,
      name: "Rexo",
      type: "dogo",
      age: 4,
      breed: "doberman",
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: 1,
      name: "Rexo",
      type: "dogo",
      age: 4,
      breed: "doberman",
    });
  });
});

describe('POST "/"', () => {
  test('POST "/" adds new pet and returns the added item', async () => {
    const res = await requestWithSupertest.post("/pets").send({
      name: "Salame",
      type: "cat",
      age: 6,
      breed: "pinky",
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: 4,
      name: "Salame",
      type: "cat",
      age: 6,
      breed: "pinky",
    });
  });
});

describe('DELETE "/:id"', () => {
  test('DELETE "/:id" deletes given pet and returns updated list', async () => {
    const res = await requestWithSupertest.delete("/pets/2");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual([
      {
        id: 1,
        name: "Rexo",
        type: "dogo",
        age: 4,
        breed: "doberman",
      },
      {
        id: 3,
        name: "Mittens",
        type: "cat",
        age: 2,
        breed: "tabby",
      },
      {
        id: 4,
        name: "Salame",
        type: "cat",
        age: 6,
        breed: "pinky",
      },
    ]);
  });
});
