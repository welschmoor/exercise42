const mongoose = require("mongoose")
const url = process.env.MONGODB_URI

console.log("connecting to", url)
mongoose.connect(url)
  .then((result) => {
    console.log("connected to MongoDB")
  }).catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const blogSchema = new mongoose.Schema({
  title: {type: String, required: true, minlength: 1},
  author: {type: String, required: true, minlength: 2},
  url: String,
  likes: Number,
  date: Date,
  user: {    type: mongoose.Schema.Types.ObjectId,    ref: 'User'  }
})

blogSchema.set("toJSON", { // this is to return id as string and to delete __v from being returned to frontend
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Blog", blogSchema)
