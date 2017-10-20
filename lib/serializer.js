const wrap = require('word-wrap');

const {
  SUMMARY_TITLE,
  TEST_PLAN_TITLE,
  BREAKING_CHANGES_TITLE,
  FIX_PREFIX,
  TITLE_SECTIONS_COUNT,
  BODY_SECTIONS_COUNT,
  DEFAULT_TYPE_TAG,
  DEFAULT_TEST_PLAN,
  WRAP_SETTINGS,
} = require('./constants');

/**
 * Flattens all lines starting with an alpha numeric character and ending with
 * either with an alphanumeric character, whitespace or punctutation.
 * NOTE: it may still mess up code examples in commit logs.
 */
const flatten = text => text.replace(/(^\w)(.*)([\w\s.,?!])\r?\n/gm, '$1$2$3 ');

const serializers = new Map();
const serialize = node => serializers.get(node.type)(node);

serializers.set('title', node =>
  `${node.typeTag || DEFAULT_TYPE_TAG}${node.scopeTag
    ? `(${node.scopeTag})`
    : ''}: ${node.value.trim()}`.slice(0, WRAP_SETTINGS.width),
);

serializers.set('body', node => {
  let summary = flatten(node.summary.trim());
  const testPlan = node.testPlan && flatten(node.testPlan.trim());
  const breakingChanges =
    node.breakingChanges && flatten(node.breakingChanges.trim());
  const fixes = node.fixes;

  if (!summary && !testPlan && !breakingChanges && fixes.length === 0) {
    return '';
  }

  const fixesText = fixes.map(fix => `${FIX_PREFIX}${fix}`).join(', ');
  if (fixesText) {
    summary = fixesText[0].toUpperCase() + fixesText.slice(1) + '. ' + summary;
  }

  let result = `${SUMMARY_TITLE}${summary}${TEST_PLAN_TITLE}${testPlan ||
    DEFAULT_TEST_PLAN}`;

  if (breakingChanges) {
    result += `${BREAKING_CHANGES_TITLE}${breakingChanges}`;
  }
  return wrap(result, WRAP_SETTINGS);
});

serializers.set('message', node =>
  `${serialize(node.title)}

${serialize(node.body)}`.trim(),
);

module.exports = {
  serializers,
  serialize,
};
