const nearley = require('nearley');
const grammar = require('./lib/grammar');
const {serialize} = require('./lib/serializer');
const rank = require('./lib/rank');

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

process.stdin.on('data', data => parser.feed(data.toString('utf8')));
process.stdin.on('end', () => {
  const rankedResults = rank(parser.results);
  console.log(serialize(rankedResults[0]));
});
