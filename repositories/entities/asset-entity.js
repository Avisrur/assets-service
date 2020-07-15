class AssetEntity {
  buildAssetEntity(viewDetails, workbookDetails, viewData) {
    return {
      view_id: viewDetails.view_id,
      view_name: viewDetails.view_name,
      project_name: workbookDetails.project_name,
      workbook_id: workbookDetails.workbook_id,
      workbook_name: workbookDetails.workbook_name,
      owner_id: workbookDetails.owner_id,
      owner_name: workbookDetails.owner_name,
    };
  }
}

module.exports = AssetEntity;
