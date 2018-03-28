var express = require('express');
var router = express.Router();
const {signIn} = require('../controllers/controller.user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signin',signIn)

module.exports = router;
