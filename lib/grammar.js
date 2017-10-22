// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

const {FIX_KEYWORDS, TYPES} = require('./constants');

const moo = require("moo");
const lexer = moo.states({
  title: {
      changeType: {match: /^\w+(?=[(:])/},
      changeScope: {match: /\(\w+\)(?=:)/, value: scope => scope.slice(1, -1)},
      titleTagEnd: /:\s*/,
      text: /.+/,
      titleEnd: {match: /(?:\r?\n)+/, lineBreaks: true, push: 'body'},
  },
  body: {
    newline: {match: /\r?\n/, lineBreaks: true},
    sectionTitle: /^[A-Z-#~*.=].{1,39}$/,
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

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "message", "symbols": ["title", "body"], "postprocess": data => ({type: TYPES.message, title: data[0], body: data[1] })},
    {"name": "title$ebnf$1", "symbols": ["titlePrefix"], "postprocess": id},
    {"name": "title$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "title", "symbols": ["title$ebnf$1", (lexer.has("text") ? {type: "text"} : text), (lexer.has("titleEnd") ? {type: "titleEnd"} : titleEnd)], "postprocess": data => ({ type: TYPES.title, value: data[1], ...(data[0] || {})})},
    {"name": "titlePrefix$ebnf$1", "symbols": [(lexer.has("changeScope") ? {type: "changeScope"} : changeScope)], "postprocess": id},
    {"name": "titlePrefix$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "titlePrefix", "symbols": [(lexer.has("changeType") ? {type: "changeType"} : changeType), "titlePrefix$ebnf$1", (lexer.has("titleTagEnd") ? {type: "titleTagEnd"} : titleTagEnd)], "postprocess": data => ({changeType: data[0], changeScope: data[1]})},
    {"name": "body", "symbols": ["section"], "postprocess": data => ({type: TYPES.body, sections: [data[0]]})},
    {"name": "body$ebnf$1", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline)]},
    {"name": "body$ebnf$1", "symbols": ["body$ebnf$1", (lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "body", "symbols": ["section", "body$ebnf$1", "body"], "postprocess": data => ({type: TYPES.body, sections: [data[0], ...data[2].sections]})},
    {"name": "body", "symbols": ["description"], "postprocess": data => ({type: TYPES.body, sections: [{type: TYPES.section, title: '', description: data[0]}]})},
    {"name": "section$ebnf$1", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline)]},
    {"name": "section$ebnf$1", "symbols": ["section$ebnf$1", (lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "section", "symbols": [(lexer.has("sectionTitle") ? {type: "sectionTitle"} : sectionTitle), "section$ebnf$1", "description"], "postprocess": data => ({type: TYPES.section, title: data[0], description: data[2]})},
    {"name": "fix", "symbols": [(lexer.has("fixKeyword") ? {type: "fixKeyword"} : fixKeyword), (lexer.has("issueId") ? {type: "issueId"} : issueId)], "postprocess": data => ({type: TYPES.fix, keyword: data[0].value, id: data[1].value, value: `${data[0].value} #${data[1].value}`})},
    {"name": "text", "symbols": [(lexer.has("char") ? {type: "char"} : char)], "postprocess": id},
    {"name": "text", "symbols": ["fix"], "postprocess": id},
    {"name": "line$ebnf$1", "symbols": ["text"]},
    {"name": "line$ebnf$1", "symbols": ["line$ebnf$1", "text"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "line", "symbols": ["line$ebnf$1"], "postprocess":  data => data[0].reduce((res, node) => {
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
        }, []) },
    {"name": "description", "symbols": ["line"], "postprocess": id},
    {"name": "description$ebnf$1", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline)]},
    {"name": "description$ebnf$1", "symbols": ["description$ebnf$1", (lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "description", "symbols": ["line", "description$ebnf$1", "description"], "postprocess": coalesce}
]
  , ParserStart: "message"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
