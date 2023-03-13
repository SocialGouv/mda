import ReactMarkdown, { type Options } from "react-markdown";
import rehypeRaw from "rehype-raw";

type MarkdownProps = Options & {
  children: string;
};

export const Markdown = ({ children, ...rest }: MarkdownProps) => (
  <ReactMarkdown
    rehypePlugins={[rehypeRaw]}
    components={{
      iframe: ({ node, ...props }) => (
        <div className="fr-video-container">
          <iframe {...props} />
        </div>
      ),
    }}
    {...rest}
  >
    {children}
  </ReactMarkdown>
);
