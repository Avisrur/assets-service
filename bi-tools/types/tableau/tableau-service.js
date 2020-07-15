const TableauClient = require("./tableau-client");
const AssetEntity = require("../../../repositories/entities/asset-entity");
const { createAssets } = require("../../../repositories/assets-repository");

class TableauService {
  constructor() {
    this.tableauClient = new TableauClient();
  }

  async handleCatalogedAssets(db, catalog) {
    let assetsList = [];
    for (const [workbookName, workbookValues] of Object.entries(catalog)) {
      let newHandledAssets = this.handleWorkbookViews(workbookValues.views, workbookValues.workbookDetails);
      assetsList = [...assetsList, ...newHandledAssets];
    }
    await createAssets(db, assetsList);
  }

  handleWorkbookViews(views, workbookDeatails) {
    return views.map((view) => {
      return new AssetEntity().buildAssetEntity(view, workbookDeatails);
    });
  }

  async generateCatalogedAssets(workbooks, token, siteId) {
    let catalog = {};
    for (let workbook of workbooks) {
      catalog[workbook.name] = {};
      catalog[workbook.name]["views"] = await this.tableauClient.getAllViewsOfWorkbook(workbook.id, token, siteId);
      catalog[workbook.name]["workbookDetails"] = workbook;
    }
    return catalog;
  }
}

module.exports = TableauService;
