const TableauClient = require("./tableau-client");
const AssetEntity = require("../../../repositories/entities/asset-entity");
const {createAssets } = require("../../../repositories/assets-repository")

class TableauService {
  constructor() {
    this.tableauClient = new TableauClient();
  }

  async handleCatalogedAssets(catalog,token,siteId) {
    assetsList = []
    for (const [workbookName, workbookValues] of Object.entries(catalog)) {
      newHandledAssets = await handleWorkbookViews(workbookValues.views, workbookValues.workbookDetails,token,siteId);
      assetsList = [...assetsList, ...newHandledAssets];
    }
    await createAssets(assetsList);
  }

  async handleWorkbookViews(views, workbookDeatails,token,siteId) {
    return views.map(view => {
      viewData = await this.tableauClient.getViewData(view.id, token, siteId);
      return new AssetEntity.buildAssetEntity(view, workbookDeatails, viewData);
    })
  }
}

module.exports = TableauService;
