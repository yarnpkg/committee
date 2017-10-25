@{%
const {TYPES} = require('./constants');
const coalesce = data => data.filter(Boolean).reduce((res, curr) => res.concat(curr), []);

const lexer = require('./lexer');
%}

@lexer lexer

message -> title body %newline:* {% data => ({type: TYPES.message, title: data[0], body: data[1] }) %}

title -> titlePrefix:? %text %titleEnd {% data => ({ type: TYPES.title, value: data[1], ...(data[0] || {})}) %}

titlePrefix -> %changeType %changeScope:? %titleTagEnd {% data => ({changeType: data[0], changeScope: data[1]}) %}

body -> section:+ {% data => ({type: TYPES.body, sections: data[0]}) %}
        | %newline:* description {% data => ({type: TYPES.body, sections: [{type: TYPES.section, title: '', description: data[1]}]}) %}

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
