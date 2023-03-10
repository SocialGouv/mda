import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const Markdown = ({ children }: { children: string }) => (
  <ReactMarkdown
    rehypePlugins={[rehypeRaw]}
    components={{
      iframe: ({ node, ...props }) => (
        <div className="fr-video-container">
          <iframe {...props} />
        </div>
      ),
    }}
  >
    {children}
  </ReactMarkdown>
);
