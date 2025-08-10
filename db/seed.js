import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createPost } from "#db/queries/posts";
import { createTag } from "#db/queries/tags";
import { createTagList, addTagToList } from "#db/queries/tag_list";

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
      const list = await createTagList(random());
      await createPost(
        "post title",
        "a great idea",
        user.user_id,
        timestamp,
        list.list_id
      );
    }
  }
}
