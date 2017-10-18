// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "message$ebnf$1", "symbols": ["newline"]},
    {"name": "message$ebnf$1", "symbols": ["message$ebnf$1", "newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "message", "symbols": ["title", "message$ebnf$1", "body"], "postprocess": data => ({type: 'message', title: data[0], body: data[2] })},
    {"name": "title$string$1", "symbols": [{"literal":")"}, {"literal":":"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "title", "symbols": ["typeTag", {"literal":"("}, "sectionTag", "title$string$1", "chars"], "postprocess": data => ({ type: 'title', typeTag: data[0], sectionTag: data[2], value: data[4] })},
    {"name": "title$string$2", "symbols": [{"literal":":"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "title", "symbols": ["typeTag", "title$string$2", "chars"], "postprocess": data => ({ type: 'title', typeTag: data[0], sectionTag: null, value: data[2] })},
    {"name": "title", "symbols": ["chars"], "postprocess": data => ({ type: 'title', typeTag: null, sectionTag: null, value: data[0].trim() })},
    {"name": "typeTag", "symbols": ["letters"], "postprocess": data => data[0]},
    {"name": "sectionTag", "symbols": ["letters"], "postprocess": data => data[0]},
    {"name": "body$ebnf$1", "symbols": ["newline"]},
    {"name": "body$ebnf$1", "symbols": ["body$ebnf$1", "newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "body", "symbols": ["summary", "body$ebnf$1", "testPlan"], "postprocess": data => ({type: 'body', summary: data[0].value, testPlan: data[2], breakingChanges: null, fixes: data[0].fixes})},
    {"name": "body$ebnf$2", "symbols": ["newline"]},
    {"name": "body$ebnf$2", "symbols": ["body$ebnf$2", "newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "body$ebnf$3", "symbols": ["newline"]},
    {"name": "body$ebnf$3", "symbols": ["body$ebnf$3", "newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "body", "symbols": ["summary", "body$ebnf$2", "testPlan", "body$ebnf$3", "breakingChanges"], "postprocess": data => ({type: 'body', summary: data[0].value, testPlan: data[2], breakingChanges: data[4], fixes: data[0].fixes})},
    {"name": "body", "symbols": ["description"], "postprocess": data => ({type: 'body', summary: data[0], testPlan: null, breakingChanges: null, fixes: []})},
    {"name": "summary$string$1", "symbols": [{"literal":"*"}, {"literal":"*"}, {"literal":"S"}, {"literal":"u"}, {"literal":"m"}, {"literal":"m"}, {"literal":"a"}, {"literal":"r"}, {"literal":"y"}, {"literal":"*"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "summary$ebnf$1", "symbols": ["newline"]},
    {"name": "summary$ebnf$1", "symbols": ["summary$ebnf$1", "newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "summary", "symbols": ["summary$string$1", "summary$ebnf$1", "description"], "postprocess": data => ({value: data[2], fixes: []})},
    {"name": "summary$string$2", "symbols": [{"literal":"*"}, {"literal":"*"}, {"literal":"S"}, {"literal":"u"}, {"literal":"m"}, {"literal":"m"}, {"literal":"a"}, {"literal":"r"}, {"literal":"y"}, {"literal":"*"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "summary$ebnf$2", "symbols": ["newline"]},
    {"name": "summary$ebnf$2", "symbols": ["summary$ebnf$2", "newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "summary$ebnf$3", "symbols": [/[\s]/]},
    {"name": "summary$ebnf$3", "symbols": ["summary$ebnf$3", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "summary", "symbols": ["summary$string$2", "summary$ebnf$2", "fixes", "summary$ebnf$3", "description"], "postprocess": data => ({value: data[4], fixes: data[2]})},
    {"name": "testPlan$string$1", "symbols": [{"literal":"*"}, {"literal":"*"}, {"literal":"T"}, {"literal":"e"}, {"literal":"s"}, {"literal":"t"}, {"literal":" "}, {"literal":"p"}, {"literal":"l"}, {"literal":"a"}, {"literal":"n"}, {"literal":"*"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "testPlan$ebnf$1", "symbols": ["newline"]},
    {"name": "testPlan$ebnf$1", "symbols": ["testPlan$ebnf$1", "newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "testPlan", "symbols": ["testPlan$string$1", "testPlan$ebnf$1", "description"], "postprocess": data => data[2]},
    {"name": "breakingChanges$string$1", "symbols": [{"literal":"*"}, {"literal":"*"}, {"literal":"B"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}, {"literal":"k"}, {"literal":"i"}, {"literal":"n"}, {"literal":"g"}, {"literal":" "}, {"literal":"c"}, {"literal":"h"}, {"literal":"a"}, {"literal":"n"}, {"literal":"g"}, {"literal":"e"}, {"literal":"s"}, {"literal":"*"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "breakingChanges$ebnf$1", "symbols": ["newline"]},
    {"name": "breakingChanges$ebnf$1", "symbols": ["breakingChanges$ebnf$1", "newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "breakingChanges", "symbols": ["breakingChanges$string$1", "breakingChanges$ebnf$1", "description"], "postprocess": data => data[2]},
    {"name": "fixes", "symbols": ["initialFix", {"literal":"."}], "postprocess": data => [data[0]]},
    {"name": "fixes$ebnf$1", "symbols": ["subsequentFix"]},
    {"name": "fixes$ebnf$1", "symbols": ["fixes$ebnf$1", "subsequentFix"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "fixes", "symbols": ["initialFix", "fixes$ebnf$1", {"literal":"."}], "postprocess": data => [data[0]].concat(data[1])},
    {"name": "initialFix$string$1", "symbols": [{"literal":"F"}, {"literal":"i"}, {"literal":"x"}, {"literal":"e"}, {"literal":"s"}, {"literal":" "}, {"literal":"#"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "initialFix$ebnf$1", "symbols": [/[\d]/]},
    {"name": "initialFix$ebnf$1", "symbols": ["initialFix$ebnf$1", /[\d]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "initialFix", "symbols": ["initialFix$string$1", "initialFix$ebnf$1"], "postprocess": data => data[1].join('')},
    {"name": "subsequentFix$string$1", "symbols": [{"literal":","}, {"literal":" "}, {"literal":"f"}, {"literal":"i"}, {"literal":"x"}, {"literal":"e"}, {"literal":"s"}, {"literal":" "}, {"literal":"#"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subsequentFix$ebnf$1", "symbols": [/[\d]/]},
    {"name": "subsequentFix$ebnf$1", "symbols": ["subsequentFix$ebnf$1", /[\d]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "subsequentFix", "symbols": ["subsequentFix$string$1", "subsequentFix$ebnf$1"], "postprocess": data => data[1].join('')},
    {"name": "description", "symbols": ["chars"], "postprocess": data => data[0]},
    {"name": "description$ebnf$1", "symbols": ["newline"]},
    {"name": "description$ebnf$1", "symbols": ["description$ebnf$1", "newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "description", "symbols": ["chars", "description$ebnf$1", "chars"], "postprocess": data => data[0] + data[1].join('') + data[2]},
    {"name": "description$ebnf$2", "symbols": ["newline"]},
    {"name": "description$ebnf$2", "symbols": ["description$ebnf$2", "newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "description", "symbols": ["chars", "description$ebnf$2", "description"], "postprocess": data => data[0] + data[1].join('') + data[2]},
    {"name": "chars$ebnf$1", "symbols": [/[^\n\r]/]},
    {"name": "chars$ebnf$1", "symbols": ["chars$ebnf$1", /[^\n\r]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "chars", "symbols": [/[^\s]/, "chars$ebnf$1"], "postprocess": data => data[0] + data[1].join('')},
    {"name": "nonWhitespace$ebnf$1", "symbols": [/[^\s]/]},
    {"name": "nonWhitespace$ebnf$1", "symbols": ["nonWhitespace$ebnf$1", /[^\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "nonWhitespace", "symbols": ["nonWhitespace$ebnf$1"], "postprocess": data => data[0].join('')},
    {"name": "letters$ebnf$1", "symbols": [/[\w]/]},
    {"name": "letters$ebnf$1", "symbols": ["letters$ebnf$1", /[\w]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "letters", "symbols": ["letters$ebnf$1"], "postprocess": data => data[0].join('')},
    {"name": "newline", "symbols": [{"literal":"\n"}]},
    {"name": "newline$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "newline", "symbols": ["newline$string$1"]}
]
  , ParserStart: "message"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
