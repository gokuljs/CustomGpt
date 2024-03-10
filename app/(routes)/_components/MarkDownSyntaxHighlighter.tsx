import React from "react";
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
  React.useEffect(() => {
    if (theme === "light") {
      require("highlight.js/styles/darcula.css");
    } else {
      require("highlight.js/styles/github.css");
    }
  }, [theme]);
  if (!content || content.length === 0) return;

  return (
    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
  );
};

export default MarkDownSyntaxHighlighter;
