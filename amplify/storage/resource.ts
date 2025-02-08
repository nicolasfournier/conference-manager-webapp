import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "amplifyCMDrive",
  access: (allow) => ({
    "media/{entity_id}/*": [
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
  }),
});
