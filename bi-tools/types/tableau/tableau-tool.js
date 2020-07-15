const TableauClient = require("./tableau-client");
const TableauService = require("./tableau-service");

class TableauTool {
  constructor() {
    this.tableauClient = new TableauClient();
    this.tableauService = new TableauService();
  }

  signin({ username, password }) {
    return this.tableauClient.signin(username, password);
  }

  importAssets({ token, siteId }) {
    const workbooks = await this.tableauClient.getWorkbooks(token, siteId);
    const catalogedAssetsByWorkbooks = generateCatalogedAssets(workbooks, token, siteId);
    await this.tableauService.handleCatalogedAssets(catalogedAssetsByWorkbooks,token,siteId);
    return catalogedAssetsByWorkbooks;
  }

  generateCatalogedAssets(workbooks,token,siteId) {
    workbooks.reduce((catalog, curWorkbook) => {
      catalog[curWorkbook.name]["views"] = this.tableauClient.getAllViewsOfWorkbook(curWorkbook.id,token,siteId);
      catalog[curWorkbook.name]["workbookDetail"] = curWorkbook
    }, {})
  }
}

module.exports = TableauTool;
