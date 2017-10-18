const wrap = require('word-wrap');

const {
  SUMMARY_TITLE,
  TEST_PLAN_TITLE,
  TITLE_SECTIONS_COUNT,
  BODY_SECTIONS_COUNT,
  DEFAULT_TYPE_TAG,
  DEFAULT_TEST_PLAN,
  WRAP_SETTINGS,
} = require('./constants');

const serializers = new Map();
const serialize = node => serializers.get(node.type)(node);

serializers.set('title', node =>
  `${node.typeTag || DEFAULT_TYPE_TAG}${node.sectionTag
    ? `(${node.sectionTag})`
    : ''}: ${node.value.trim()}`.slice(0, WRAP_SETTINGS.width),
);

serializers.set(
  'body',
  node =>
    node.summary.trim()
      ? wrap(
          `${SUMMARY_TITLE}${node.summary.trim()}${TEST_PLAN_TITLE}${node.testPlan
            ? node.testPlan.trim()
            : DEFAULT_TEST_PLAN}`,
          WRAP_SETTINGS,
        )
      : '',
);

serializers.set('message', node =>
  `${serialize(node.title)}

${serialize(node.body)}`.trim(),
);

module.exports = {
  serializers,
  serialize,
};
