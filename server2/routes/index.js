var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next){
	//res.render("index.html")
	res.send({ response: "I am alive" }).status(200);
}); 

module.exports = router;