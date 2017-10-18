const nearley = require('nearley');
const grammar = require('./lib/grammar');
const {serialize} = require('./lib/serializer');
const {rank, quality} = require('./lib/rank');
const engine = require('./lib/engine');

if (require.main === module) {
  // Create a Parser object from our grammar.
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  process.stdin.on('data', data => parser.feed(data.toString('utf8')));
  process.stdin.on('end', () => {
    const rankedResults = rank(parser.results);
    // console.log(rankedResults.map(quality).toString());
    // console.log(require('util').inspect(rankedResults, {depth: 10}));

    console.log(serialize(rankedResults[0]));
  });
} else {
  module.exports = engine();
}
