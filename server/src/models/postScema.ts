import mongoose, { Schema } from "mongoose";

interface IPost extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: number;
}

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trime: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "General",
    },
    readTime: {
      type: Number, // minutes
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

postSchema.pre<IPost>("save", function () {
  if (this.description) {
    const words = this.description.split(" ").length;
    console.log(words);

    const minutes = Math.ceil(words / 200);
    this.readTime = minutes;
  }
});

const Post = mongoose.model("posts", postSchema);
export default Post;
