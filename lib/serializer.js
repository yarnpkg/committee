const wrap = require('word-wrap');

const {TYPES, DEFAULT_TYPE_TAG, WRAP_SETTINGS} = require('./constants');

/**
 * Flattens all lines starting with an alpha numeric character and ending with
 * either with an alphanumeric character, whitespace or punctuation.
 * NOTE: this may mess up code examples in commit logs.
 */
const flatten = text => text.replace(/(^\w)(.*)([\w\s.,?!])\r?\n/gm, '$1$2$3 ');

const DEFAULT_SERIALIZER = node => node.value;
const serializers = new Map();
const serialize = node =>
  (serializers.get(node.type) || DEFAULT_SERIALIZER)(node);

serializers.set(TYPES.title, node =>
  `${node.changeType.value || DEFAULT_TYPE_TAG}${node.changeScope
    ? `(${node.changeScope.value})`
    : ''}: ${node.value.value.trim()}`.slice(0, WRAP_SETTINGS.width),
);

serializers.set(TYPES.body, node =>
  node.sections.map(section => serialize(section)).join('\n\n'),
);

serializers.set(TYPES.section, node => {
  let result = flatten(
    node.description
      .map(serialize)
      .join('')
      .trim(),
  );
  if (node.title) {
    result = node.title.value + '\n\n' + result;
  }

  return wrap(result, WRAP_SETTINGS);
});

serializers.set(TYPES.message, node =>
  `${serialize(node.title)}

${serialize(node.body)}
`.trim(),
);

module.exports = {
  serializers,
  serialize,
};
