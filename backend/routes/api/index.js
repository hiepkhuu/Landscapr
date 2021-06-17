const router = require('express').Router();


//to test your routes
router.post ('/test', function(req, res){
  res.json({requestBody: req.body})
})

module.exports = router;


//test fetch request to the browser
// fetch('api/test', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'XSRF-TOKEN': ``
//   },
//   body: JSON.stringify({hello: 'world'})
// }).then(res => res.json()).then(data => console.log(data))
