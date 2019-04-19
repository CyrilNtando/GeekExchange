const mongoose = require("mongoose");
const User = require("./User");
mongoose.set("debug", true);
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },

  company: {
    type: String
  },

  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },

      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },

      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],

  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

ProfileSchema.pre("remove", async function(next) {
  try {
    let user = await User.findByIdAndDelete(this.user);
    return next();
  } catch (error) {
    return next(error);
  }
});
module.exports = Profile = mongoose.model("profile", ProfileSchema);
