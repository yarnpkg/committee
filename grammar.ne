message -> title newline:+ body {% data => ({type: 'message', title: data[0], body: data[2] }) %}

title -> typeTag "(" sectionTag "): " chars {% data => ({ type: 'title', typeTag: data[0], sectionTag: data[2], value: data[4] }) %}
         | typeTag ": " chars {% data => ({ type: 'title', typeTag: data[0], sectionTag: null, value: data[2] }) %}
         | chars {% data => ({ type: 'title', typeTag: null, sectionTag: null, value: data[0].trim() }) %}

typeTag -> letters {% data => data[0] %}

sectionTag -> letters {% data => data[0] %}

body -> summary newline:+ testPlan {% data => ({type: 'body', summary: data[0], testPlan: data[2] }) %}
        | [\s\S]:+ {% data => ({type: 'body', summary: data[0].join('').trim(), testPlan: ''}) %}

summary -> "**Summary**" newline:+ [\s\S]:+ {% data => data[2].join('') %}

testPlan -> "**Test plan**" newline:+ [\s\S]:+ {% data => data[2].join('') %}

chars -> [^\n\r]:+ {% data => data[0].join('') %}

letters -> [\w]:+ {% data => data[0].join('') %}

newline -> "\n" | "\r\n"