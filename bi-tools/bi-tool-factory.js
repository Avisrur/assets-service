const TableauTool = require("./types/tableau/tableau-tool");

class BiToolFactory {
  constructor() {
    this.biToolTypes = {
      tableau: new TableauTool(),
    };
  }

  getBiToolByType(type) {
    return this.biToolTypes[type];
  }
}

module.exports = BiToolFactory;
