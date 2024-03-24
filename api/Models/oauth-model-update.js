const mongoose = require("mongoose");
const UserOAuth = mongoose.Schema(
  {
    discordId: { type: String, unique: true },
    UID: String,
    username: { type: String, unique: true },
    avatar: { type: String, unique: true },
    clubs: {
      type: [{ clubName: String }],
      default: [], // Initialize with an empty array
    },
    qrcode: String,
  },
  {
    collection: "main",
  }
);
/*
UserOAuth.statics.isThisDiscordIdPresent = async function(username) {
  try {
    const user = await this.findOne({ username: username });

    console.log(user);
    if (user) {
      return false;
    } else {
      return true;
    }

    return true;
  } catch (error) {
    console.log("error inside try", error.message);
  }
};
// collection specifies where the schema is inserted
// bu default uses users collection in Mongo
// Specified to main collection inside of the iNflux-main DB
*/
const oauthModelU = mongoose.model("oauthModel", UserOAuth);
module.exports = oauthModelU;
