const {
  SUMMARY_TITLE,
  TEST_PLAN_TITLE,
  BREAKING_CHANGES_TITLE,
  TITLE_SECTIONS_COUNT,
  BODY_SECTIONS_COUNT,
} = require('./constants');

const quality = message => {
  let sum = 0;

  sum += message.title.typeTag
    ? message.title.typeTag.length
    : -message.title.value.length / TITLE_SECTIONS_COUNT;
  sum += message.title.sectionTag
    ? message.title.sectionTag.length
    : -message.title.value.length / TITLE_SECTIONS_COUNT;
  sum += message.title.value.length;

  sum += message.body.summary.trim().length;

  sum += message.body.testPlan
    ? message.body.testPlan.trim().length
    : -message.body.summary.length / BODY_SECTIONS_COUNT -
      SUMMARY_TITLE.length -
      TEST_PLAN_TITLE.length;

  sum += message.body.breakingChanges
    ? message.body.breakingChanges.trim().length
    : -(message.body.testPlan || message.body.summary).length /
        BODY_SECTIONS_COUNT -
      BREAKING_CHANGES_TITLE.length;

  return sum;
};

const comparator = (a, b) => quality(b) - quality(a);

module.exports = {
  rank: results => Array.from(results).sort(comparator),
  quality,
  comparator,
};
