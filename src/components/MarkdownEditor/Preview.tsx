import Markdown from "react-markdown";
import { CodeBlock, Pre } from "./CodeBlock";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeExternalLinks from "rehype-external-links";

type Props = {
  source: string;
};
export default function Preview({ source }: Props) {
  return (
    <div className="py-6 pl-4 w-full border border-[#373737] bg-secondary-black transition-all duration-150 border-t-0 rouded-t-none rouded-b-lg overflow-y-scroll">
      <Markdown
        components={{ code: CodeBlock, pre: Pre }}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSanitize,
          [rehypeExternalLinks, { content: { type: "text", value: "🔗" } }]
        ]}
        className="prose prose-invert min-w-full h-[649px]"
      >
        {source}
      </Markdown>
    </div>
  );
}
