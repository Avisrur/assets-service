const express = require("express");
const router = express.Router();
const BiToolFactory = require("../bi-tools/bi-tool-factory");

router.post("/signin", signin);

module.exports = router;

const signin = async (req, res, next) => {
  const { biToolType, username, password } = req.body;
  try {
    const { token, site } = await getBiTool(biToolType).signin(username, password);
    res.json({ token, siteId: site.id });
  } catch (error) {
    next(error);
  }
};

const getBiTool = (type) => new BiToolFactory().getBiToolByType(type);
