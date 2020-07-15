const { siteName } = require("../../../config/tableau-config");

class XmlRequestBuilder {
  createSignInRequest(username, password) {
    return `<tsRequest>
	            <credentials name="${username}" password="${password}">
		            <site contentUrl="${siteName}" />
	            </credentials>
            </tsRequest>`;
  }
}

module.exports = XmlRequestBuilder;
