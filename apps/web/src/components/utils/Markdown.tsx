import ReactMarkdown, { type Options } from "react-markdown";
import rehypeRaw from "rehype-raw";

type MarkdownProps = Options & {
  children: string;
};

export const Markdown = ({ children, ...rest }: MarkdownProps) => {
  const content = children;
  const regex = /<iframe\s+[^>]*src="([^"]*\.pdf)"[^>]*/gi;
  const cleanContent: string = content.replace(regex, '<iframe src="$1#view=fitH"');
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        iframe: ({ ...props }) => (
          <div className="fr-video-container">
            <iframe {...props} />
          </div>
        ),
        img: ({ ...props }) => <img className="fr-fluid-img" {...props} />,
        a: ({ node, children, ...props }) => {
          if (props.href?.includes("http")) {
            props.target = "_blank";
            props.rel = "noreferrer";
          }
          return <a {...props}>{children}</a>;
        },
      }}
      {...rest}
    >
      {cleanContent}
    </ReactMarkdown>
  );
};
