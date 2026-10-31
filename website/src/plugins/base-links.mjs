// Sätteri hast plugin: prefixes root-absolute href/src values with the site
// base. Astro rewrites the links it generates itself, but author-written links
// in MDX (markdown links, raw <a>, and <LinkCard>/<LinkButton> props) stay as
// written.

const isExternal = (value) => /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value);

function rewrite(value, base) {
  if (typeof value !== 'string' || !value.startsWith('/') || isExternal(value)) {
    return value;
  }
  if (value === base || value.startsWith(`${base}/`)) return value;
  return `${base}${value}`;
}

function rewriteAttributes(attributes, base) {
  let changed = false;
  const next = attributes.map((attribute) => {
    if (
      attribute.type !== 'mdxJsxAttribute' ||
      (attribute.name !== 'href' && attribute.name !== 'src') ||
      typeof attribute.value !== 'string'
    ) {
      return attribute;
    }
    const value = rewrite(attribute.value, base);
    if (value === attribute.value) return attribute;
    changed = true;
    return { ...attribute, value };
  });
  return changed ? next : attributes;
}

export default function baseLinks({ base = '/' } = {}) {
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  if (!prefix) return { name: 'base-links' };

  const visitElement = (node, ctx) => {
    const key = node.tagName === 'a' ? 'href' : 'src';
    const value = node.properties?.[key];
    const next = rewrite(value, prefix);
    if (next !== value) ctx.setProperty(node, key, next);
  };

  const visitJsx = (node) => {
    const attributes = rewriteAttributes(node.attributes, prefix);
    if (attributes !== node.attributes) return { ...node, attributes };
  };

  return {
    name: 'base-links',
    element: { filter: ['a', 'img'], visit: visitElement },
    mdxJsxFlowElement: { filter: ['LinkCard', 'LinkButton'], visit: visitJsx },
    mdxJsxTextElement: { filter: ['LinkCard', 'LinkButton'], visit: visitJsx },
  };
}
