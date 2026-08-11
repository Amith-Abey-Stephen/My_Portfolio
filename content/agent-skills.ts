export const CONTENT_SIGNALS_SKILL = `# Implement Content Signals

Declare AI content usage preferences in your robots.txt using [Content Signals](https://contentsignals.org/).

## Requirements

- Add \`Content-Signal\` directives to your robots.txt under the relevant \`User-agent\` block
- Declare preferences for \`ai-train\`, \`search\`, and \`ai-input\`
- Example: \`Content-Signal: ai-train=no, search=yes, ai-input=yes\`
`;

export const MARKDOWN_NEGOTIATION_SKILL = `# Implement Markdown Content Negotiation

Support \`Accept: text/markdown\` content negotiation so agents can request markdown versions of your pages.

## Requirements

- When a request includes \`Accept: text/markdown\`, return a markdown representation of the page
- Set \`Content-Type: text/markdown\` on the response
- HTML remains the default for requests without the markdown accept header
- Include an \`x-markdown-tokens\` header with the token count
`;
