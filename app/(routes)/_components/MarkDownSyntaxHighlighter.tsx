import React, { useInsertionEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { useTheme } from "next-themes";

interface MarkDownSyntaxHighlighterProps {
  content: string;
}
const MarkDownSyntaxHighlighter: React.FC<MarkDownSyntaxHighlighterProps> = ({
  content,
}) => {
  const { theme } = useTheme();
  useInsertionEffect(() => {
    require("highlight.js/styles/sunburst.css"); // Dark theme with vibrant color highlights
  }, [theme]);
  if (!content || content.length === 0) return;

  return (
    <ReactMarkdown className="break-words" rehypePlugins={[rehypeHighlight]}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkDownSyntaxHighlighter;
