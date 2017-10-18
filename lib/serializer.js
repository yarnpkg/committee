const {
  SUMMARY_TITLE,
  TEST_PLAN_TITLE,
  TITLE_SECTIONS_COUNT,
  BODY_SECTIONS_COUNT,
} = require('./constants');

const serializers = new Map();
const serialize = node => serializers.get(node.type)(node);

serializers.set(
  'title',
  node =>
    `${node.typeTag || 'feature'}${node.sectionTag
      ? `(${node.sectionTag})`
      : ''}: ${node.value.trim()}`,
);

serializers.set(
  'body',
  node =>
    node.summary.trim()
      ? `

${SUMMARY_TITLE}${node.summary.trim()}${TEST_PLAN_TITLE}${node.testPlan
          ? node.testPlan.trim()
          : 'N/A'}`
      : '',
);

serializers.set(
  'message',
  node => `${serialize(node.title)}${serialize(node.body)}`,
);

module.exports = {
  serializers,
  serialize,
};
