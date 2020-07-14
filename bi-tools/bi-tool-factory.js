class ParserFactory {
  constructor() {
    this.parserTypes = {
      tableau: new TableauClient(),
    };
  }

  getParserByType(type) {
    return this.parserTypes[type];
  }
}

module.exports = ParserFactory;
