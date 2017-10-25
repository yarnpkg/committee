const moo = require('moo');

const {FIX_KEYWORDS, TYPES} = require('./constants');

module.exports = moo.states({
  title: {
    changeType: {match: /^\w+(?=[(:])/},
    changeScope: {match: /\(\w+\)(?=:)/, value: scope => scope.slice(1, -1)},
    titleTagEnd: /:\s*/,
    text: /.+/,
    titleEnd: {match: /\r?\n/, lineBreaks: true, push: 'body'},
  },
  body: {
    newline: {match: /\r?\n/, lineBreaks: true},
    sectionTitle: /^[A-Z-#~*.=].{0,38}[^.\n\r]$/,
    fix: {
      match: /[a-zA-Z]+(?= #\d+)/,
      keywords: {
        fixKeyword: FIX_KEYWORDS,
      },
      push: 'issueRef',
    },
    char: /.+?/,
  },
  issueRef: {
    issueId: {
      match: / #\d+/,
      value: id => id.slice(2),
      pop: true,
    },
  },
});
