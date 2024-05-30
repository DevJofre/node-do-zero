import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  #videos = new Map();

  //o map funciona como se fosse um objeto no java script, armazena chaves e valor

  list() {
    return Array.from(this.#videos.entries()).map((videosArray) => {
      const id = videosArray[0];
      const data = videosArray[1];

      return {
        id,
        ...data,
      };
    });
  }

  create(video) {
    const videoId = randomUUID();
    //e um metodo  dentro do modulo de crypto do node, para gera  id unicos

    this.#videos.set(videoId, video);
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}
