var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/crmRoutes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });

const BlogSchema = require('./src/models/crmModel');
const blogModel = mongoose.model('blog', BlogSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// const Cat = mongoose.model('Cat', {name: String});
// const kitty = new Cat({name: 'mini'});
// kitty.save().then((res)=>{
//   console.log(res);
// })

//app.use(function(req, res, next){
//  routes(app);
//})

app.post('/newBlog', (req, res)=>{
  let blog = new blogModel(req.body);
  blog.save((err, blogModel)=>{
    if(err){
      res.send(err)
    }else {
      res.json(blog)
    }
  })
})

app.get('/getBlogs', (req, res)=>{
  blogModel.find({}, (err, blogs)=>{
    if(err){
      res.send(err)
    }else {
      res.json(blogs)
    }
  })
})

app.get('/blog/:blogId', (req, res)=>{
  blogModel.findById((req.params.blogId), (err, blogs)=>{
    if(err){
      res.send(err)
    }else {
      res.json(blogs)
    }
  })
})

app.put('/blog/:blogId', (req, res)=>{
  blogModel.findOneAndUpdate({_id: req.params.blogId}, req.body, {new: true}, (err, updateBlog)=>{
    if(err){
      res.send(err)
    }else {
      res.json(updateBlog)
    }
  })
})

app.delete('/blog/:blogId', (req, res)=>{
  blogModel.remove({_id: req.params.blogId}, (err, blogs)=>{
    if(err){
      res.send(err)
    }else {
      res.json({message: 'deleted'})
    }
  })
})

app.listen(PORT, ()=>{
  console.log('server running...');
})
