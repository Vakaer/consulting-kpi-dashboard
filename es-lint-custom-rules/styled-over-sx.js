export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Use styled if sx properties are more than 2',
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name === 'sx') {
          const properties =
            node.value.expression?.properties ??
            node.value.expression?.body?.properties;

          if (properties?.length > 2) {
            context.report({
              node,
              message: 'Use styled if sx properties are more than 2',
            });
          }
        }
      },
    };
  },
};
