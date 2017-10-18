const {
  SUMMARY_TITLE,
  TEST_PLAN_TITLE,
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

  sum += message.body.summary.length;

  sum += message.body.testPlan
    ? message.body.testPlan.length
    : -message.body.summary.length / BODY_SECTIONS_COUNT -
      SUMMARY_TITLE.length -
      TEST_PLAN_TITLE.length;

  return sum;
};

const comparator = (a, b) => quality(b) - quality(a);

module.exports = results => Array.from(results).sort(comparator);
