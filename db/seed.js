import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createPost } from "#db/queries/posts";
import { createTag } from "#db/queries/tags";
import { createBookmark } from "#db/queries/bookmarks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  function random() {
    const random = Math.floor(Math.random() * 10 + 1);
    return random;
  }
  for (let i = 1; i < 11; i++) {
    await createTag("tag #" + i);
  }

  for (let i = 1; i < 6; i++) {
    const user = await createUser("user" + i, "password" + i);
    for (let j = 1; j < 3; j++) {
      const timestamp = new Date();
      const array = [random(), random(), random()];
      const tags = [...new Set(array)];
      await createPost("post title", "a great idea", user.id, timestamp, tags);
    }
  }

  for (let i = 1; i < 6; i++) {
    const post_id = random();
    await createBookmark(i, post_id);
  }
}
