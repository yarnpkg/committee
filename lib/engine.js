const longest = require('longest');
const rightPad = require('right-pad');
const {types} = require('conventional-commit-types');

const {serialize} = require('./serializer');

module.exports = options => {
  const typeKeys = Object.keys(types);

  const length = longest(typeKeys).length + 1;
  const choices = typeKeys.map(type => ({
    name: `${rightPad(`${type}:`, length)} ${types[type].description}`,
    value: type,
  }));

  return {
    // When a user runs `git cz`, prompter will
    // be executed. We pass you cz, which currently
    // is just an instance of inquirer.js. Using
    // this you can ask questions and get answers.
    //
    // The commit callback should be executed when
    // you're ready to send back a commit template
    // to git.
    //
    // By default, we'll de-indent your commit
    // template and will keep empty lines.
    prompter(cz, commit) {
      console.log(
        '\nTitle will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n',
      );

      // Let's ask some questions of the user
      // so that we can populate our commit
      // template.
      //
      // See inquirer.js docs for specifics.
      // You can also opt to use another input
      // collection library if you prefer.
      cz
        .prompt([
          {
            type: 'list',
            name: 'type',
            message: "Select the type of change that you're committing:",
            choices: choices,
          },
          {
            type: 'input',
            name: 'scope',
            message:
              'Write the scope of this change with a single word (tests, compiler, etc.):\n',
          },
          {
            type: 'input',
            name: 'subject',
            message: 'Write a brief title for the change:\n',
          },
          {
            type: 'input',
            name: 'summary',
            message: 'Provide summary for the change:\n',
          },
          {
            type: 'input',
            name: 'testPlan',
            message: 'Provide the test plan for the change:\n',
          },
          {
            type: 'input',
            name: 'breaking',
            message: 'List any breaking changes (leave empty if none):\n',
          },
          {
            type: 'input',
            name: 'fixes',
            message: 'List any issues closed by this change:\n',
          },
        ])
        .then(answers => {
          commit(
            serialize({
              type: 'message',
              title: {
                type: 'title',
                typeTag: answers.type,
                scopeTag: answers.scope.trim() || null,
                value: answers.subject,
              },
              body: {
                type: 'body',
                summary: answers.summary,
                testPlan: answers.testPlan,
                breakingChanges: answers.breakingChanges,
                fixes: answers.fixes
                  .split(/,? +|, */)
                  .map(issue => issue.replace(/^#?(\d+)$/, '$1')),
              },
            }),
          );
        });
    },
  };
};
