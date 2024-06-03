import { fastify } from "fastify";
//import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

//const database = new DatabaseMemory();

const database = new DatabasePostgres();

server.get("/videos", async (request, reply) => {
  const search = request.query.search;

  console.log(search);

  const videos = await database.list(search);

  return videos;
});

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send({ title, description, duration });
});

server.put("/videos/:id", (request, reply) => {
  const videosId = request.params.id;

  const { title, description, duration } = request.body;

  const video = database.update(videosId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", (request, reply) => {
  const videosId = request.params.id;

  database.delete(videosId);

  return reply.status(204).send();
});

server.listen({
  port: 3333,
});
