declare module 'react-syntax-highlighter' {
  import * as React from 'react';

  // Minimal, permissive typings for this project to avoid build-time errors.
  export const Prism: React.ComponentType<any>;
  export const LightAsync: React.ComponentType<any>;
  const SyntaxHighlighter: React.ComponentType<any>;
  export default SyntaxHighlighter;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  export const okaidia: any;
  export const prism: any;
  export default {} as any;
}

declare module 'react-syntax-highlighter/dist/esm/styles/hljs' {
  const _default: any;
  export default _default;
}
