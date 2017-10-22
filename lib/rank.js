const quality = message => {
  let sum = 0;

  sum += message.title.changeType ? 1 : 0;
  sum += message.title.changeScope ? 1 : 0;

  sum += message.body.sections.length;

  return sum;
};

const comparator = (a, b) => quality(b) - quality(a);

module.exports = {
  rank: results => Array.from(results).sort(comparator),
  quality,
  comparator,
};
