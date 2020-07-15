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
