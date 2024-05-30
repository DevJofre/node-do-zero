import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();

const database = new DatabaseMemory();

server.get("/videos", () => {
  const videos = database.list();

  return videos;
});

server.post("/videos", (request, reply) => {
  const { title, description, duration } = request.body;

  database.create({
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

server.delete("/video/:id", () => {
  return "hello world";
});

server.listen({
  port: 3333,
});
