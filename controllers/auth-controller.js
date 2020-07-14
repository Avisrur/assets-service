const express = require("express");
const router = express.Router();

router.post("/signin", signin);

module.exports = router;

async function signin(req, res, next) {
  //get bi-tool-type to bi too factory and than sign in
  //if succeed return token and site id
  //if not return bad request
}
