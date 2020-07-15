const tableName = "assets_table";

module.exports = {
  createAssets: (db, assets) => db(tableName).insert(assets),
  getAllAssets: (db) => db(tableName).select(),
  getAssetsBySearch: (db, searchingString) => db(tableName).where("tags", "like", searchingString + "%"),
};
