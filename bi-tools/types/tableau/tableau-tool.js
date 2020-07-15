const TableauClient = require("./tableau-client");
const TableauService = require("./tableau-service");

class TableauTool {
  constructor() {
    this.tableauClient = new TableauClient();
    this.tableauService = new TableauService();
  }

  signin(username, password) {
    return this.tableauClient.signin(username, password);
  }

  async importAssets(db, token, siteId) {
    const workbooks = await this.tableauClient.getWorkbooks(token, siteId);
    const catalogedAssetsByWorkbooks = await this.tableauService.generateCatalogedAssets(workbooks, token, siteId);
    await this.tableauService.handleCatalogedAssets(db, catalogedAssetsByWorkbooks, token, siteId);
    return catalogedAssetsByWorkbooks;
  }
}

module.exports = TableauTool;
