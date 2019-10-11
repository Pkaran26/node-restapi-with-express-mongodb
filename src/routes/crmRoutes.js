const routes = (app)=>{
  app.route('/')
  .get((req, res)=>{
    res.send('work')
  })

  .post((req, res)=>{
    res.send('work')
  })

  .put((req, res)=>{
    res.send('work')
  })

  .delete((req, res)=>{
    res.send('work')
  })
}
module.exports = routes;
