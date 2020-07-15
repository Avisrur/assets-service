const express = require("express");
const router = express.Router();
const SearchService = require("../services/search-service");
const BiToolFactory = require("../bi-tools/bi-tool-factory");
const { getAllAssets } = require("../repositories/assets-repository");
const { getDB } = require("../utils/getter");

router.get("/", getAllAssets);
router.get("/catalog", catalog);
router.post("/search", search);

module.exports = router;

async function catalog(req, res, next) {
  const { biToolType, token, siteId } = req.body;
  try {
    const catalog = await getBiTool(biToolType).importAssets(token, siteId);
    res.json(catalog);
  } catch (error) {
    next(error);
  }
}

async function getAllAssets(req, res, next) {
  try {
    const rows = await getAllAssets(getDB(req));
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

async function search(req, res, next) {
  const { searchingKeywords } = req.body;
  try {
    const results = await new SearchService().handleSearchingKeywords(searchingKeywords);
    res.json(results);
  } catch (error) {
    next(error);
  }
}

const getBiTool = (type) => new BiToolFactory().getBiToolByType(type);
