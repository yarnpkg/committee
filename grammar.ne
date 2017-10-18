message -> title newline:+ body {% data => ({type: 'message', title: data[0], body: data[2] }) %}

title -> typeTag "(" sectionTag "): " chars {% data => ({ type: 'title', typeTag: data[0], sectionTag: data[2], value: data[4] }) %}
         | typeTag ": " chars {% data => ({ type: 'title', typeTag: data[0], sectionTag: null, value: data[2] }) %}
         | chars {% data => ({ type: 'title', typeTag: null, sectionTag: null, value: data[0].trim() }) %}

typeTag -> letters {% data => data[0] %}

sectionTag -> letters {% data => data[0] %}

body -> summary newline:+ testPlan {% data => ({type: 'body', summary: data[0], testPlan: data[2], breakingChanges: null}) %}
        | summary newline:+ testPlan newline:+ breakingChanges {% data => ({type: 'body', summary: data[0], testPlan: data[2], breakingChanges: data[4]}) %}
        | [\s\S]:+ {% data => ({type: 'body', summary: data[0].join('').trim(), testPlan: null, breakingChanges: null}) %}

summary -> "**Summary**" newline:+ description {% data => data[2] %}

testPlan -> "**Test plan**" newline:+ description {% data => data[2] %}

breakingChanges -> "**Breaking changes**" newline:+ description {% data => data[2] %}

description -> chars {% data => data[0] %}
              | chars newline:+ chars {% data => data.join('') %}
              | chars newline:+ description {% data => data.join('') %}

chars -> [^\n\r]:+ {% data => data[0].join('') %}

letters -> [\w]:+ {% data => data[0].join('') %}

newline -> "\n" | "\r\n"