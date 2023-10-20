import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownViewer({ contents }) {
  return <ReactMarkdown children={contents} remarkPlugins={[remarkGfm]} />;
}
