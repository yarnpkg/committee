@{%
const {FIX_KEYWORDS, TYPES} = require('./constants');

const moo = require("moo");
const lexer = moo.states({
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
  }
});

const coalesce = data => data.filter(Boolean).reduce((res, curr) => res.concat(curr), []);

%}

@lexer lexer

message -> title body %newline:* {% data => ({type: TYPES.message, title: data[0], body: data[1] }) %}

title -> titlePrefix:? %text %titleEnd {% data => ({ type: TYPES.title, value: data[1], ...(data[0] || {})}) %}

titlePrefix -> %changeType %changeScope:? %titleTagEnd {% data => ({changeType: data[0], changeScope: data[1]}) %}

body -> section:+ {% data => ({type: TYPES.body, sections: data[0]}) %}
        | description {% data => ({type: TYPES.body, sections: [{type: TYPES.section, title: '', description: data[0]}]}) %}

section -> %newline:+ %sectionTitle %newline:+ description {% data => ({type: TYPES.section, title: data[1], description: data[3]}) %}

fix -> %fixKeyword %issueId {% data => ({type: TYPES.fix, keyword: data[0].value, id: data[1].value, value: `${data[0].value} #${data[1].value}`}) %}

text -> %char {% id %}
        | fix {% id %}

line -> text:+ {% data => data[0].reduce((res, node) => {
    const last = res[res.length - 1];
    if (node.type === TYPES.fix) {
        res.push(node);
    } else if (last && last.type === TYPES.text) {
        last.value += node.value;
    } else {
        res.push({
            type: TYPES.text,
            value: node.value,
        });
    }
    return res;
}, []) %}

description -> line {% id %}
               | line %newline:+ description {% coalesce %}
