const express = require("express");
const router = express.Router();

router.get("/catalog", catalog);
router.post("/search", search);

module.exports = router;

async function catalog(req, res, next) {
  //get all workbooks from site
  //get all views from workbooks
  //enrich all views with tags from workbook data and view's data
  //catalog data by
  //if succeed return token and site id
  //if not return bad request
}

async function search(req, res, next) {
  //search in in tags of assets by startswith for each input(client side would seperate words to array)
}
