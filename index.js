

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const {Schema} = mongoose

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



mongoose.connect("mongodb+srv://zakariyayevmahabbat:LEiok395wrTYlwSp@cluster0.exo3lq7.mongodb.net/mobile1n").then(()=>{
    console.log("Connected to MongoDB server");
})

const PostSchema = new Schema({

  title : String,
  body: String,
  likeCount: String,
})
const Post = mongoose.model("post", PostSchema)

app.post("/api/posts",(req, res) => {
    let body = req.body.body;
    let likeCount = req.body.likeCount;
    let title = req.body.title;
    let newpost = new Post({
        body: body,
        likeCount: likeCount,
        title: title,
    })
    newpost.save()
    res.status(201).json(newpost)

})

app.get("/api/posts", (req, res)=>{
    Post.find()
    .then(data=> res.status(200).json(data))
    .catch(err=> {
        console.log(err)
        res.status(500).json({"messagge": err
        })
    })
})

app.get("/api/posts/:id", (req, res) => {
    let id = req.params.id
  Post.findById(id)
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ messagge: err });
    });
});

app.delete("/api/posts/:id", (req, res) => {
  let id = req.params.id;
  Post.findByIdAndDelete(id)
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ messagge: err });
    });
});

app.put("/api/posts/:id", async (req, res) => {
  let body = req.body.body;
  let likeCount = req.body.likeCount;
  let title = req.body.title;
//   let newpost = {};
  let id = req.params.id;
//   if(body){
//     newpost["body"] = body;
//   }
//   if (likeCount) {
//     newpost["likeCount"] = likeCount;
//   }
//   if (title) {
//     newpost["title"] = title;
//   }
//   console.log(newpost);
  await Post.findByIdAndUpdate(id, { "title": title, "likeCount": likeCount, "body": body})
   Post.findById(id)
  .then((data) => { res.status(200).json(data);});
 
});

app.listen(8000)