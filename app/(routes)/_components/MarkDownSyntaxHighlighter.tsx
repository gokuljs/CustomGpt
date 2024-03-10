import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

interface MarkDownSyntaxHighlighterProps {
  content: string;
}
const MarkDownSyntaxHighlighter: React.FC<MarkDownSyntaxHighlighterProps> = ({
  content,
}) => {
  if (!content || content.length === 0) return;
  return (
    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
  );
};

export default MarkDownSyntaxHighlighter;
