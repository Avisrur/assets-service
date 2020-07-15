class AssetEntity {
  buildAssetEntity(viewDetails, workbookDetails) {
    return {
      view_id: viewDetails.id,
      view_name: viewDetails.name,
      project_name: workbookDetails.project.name,
      workbook_id: workbookDetails.id,
      workbook_name: workbookDetails.name,
      owner_id: workbookDetails.owner.id,
      owner_name: workbookDetails.owner.name,
    };
  }
}

module.exports = AssetEntity;
