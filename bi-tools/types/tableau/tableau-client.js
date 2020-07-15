const request = require("request");
const XmlRequestBuilder = require("./xml-request-builder");
const { signinUrl, workbooksOnSiteUrl, viewsOnWorkbooksUrl, viewDataUrl } = require("../../../config/tableau-config");

class TableauClient {
  constructor() {
    this.xmlRequestBuilder = new XmlRequestBuilder();
  }

  async signin(username, password) {
    try {
      const response = await request.post(signinUrl, buildSignInRequest(username, password), buildHeader());
      return response.credentials;
    } catch (error) {
      throw Error(error);
    }
  }

  async getWorkbooks(token, siteId) {
    try {
      const response = await request.get(buildWorkbookOnSiteUrl(siteId), this.buildHeader(token));
      return response;
    } catch (error) {
      throw Error(error);
    }
  }

  async getAllViewsOfWorkbook(workbookId, token, siteId) {
    try {
      const response = await request.get(buildViewsOnWorkbookUrl(workbookId, siteId), this.buildHeader(token));
      return response;
    } catch (error) {
      throw Error(error);
    }
  }

  async getViewData(viewId, token, siteId) {
    try {
      const response = await request.get(buildViewsDataUrl(viewId, siteId), this.buildHeader(token));
      return response;
    } catch (error) {
      throw Error(error);
    }
  }

  buildWorkbookOnSiteUrl(siteId) {
    return workbooksOnSiteUrl.replace("{SITE_ID}", siteId);
  }

  buildViewsOnWorkbookUrl(workbookId, siteId) {
    return viewsOnWorkbooksUrl.replace("{SITE_ID}", siteId).replace("{WORKBOOK_ID}", workbookId);
  }

  buildViewsDataUrl(viewId, siteId) {
    return viewDataUrl.replace("{SITE_ID}", siteId).replace("{VIEW_ID}", viewId);
  }

  buildSignInRequest(username, password) {
    return this.xmlRequestBuilder.createSignInRequest(username, password);
  }

  buildHeader(token = undefined) {
    if (token) return { headers: { "X-Tableau-Auth": token } };
    return { headers: { "Content-Type": "text/xml" } };
  }
}

module.exports = TableauClient;
