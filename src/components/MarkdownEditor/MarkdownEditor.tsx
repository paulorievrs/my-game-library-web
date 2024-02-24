import clsx from "clsx";
import React, { useState } from "react";
import EditorButton from "./EditorButton";
import Quote from "../icons/Quote";
import Link from "../icons/Link";
import ImageIcon from "../icons/Image";
import List from "../icons/List";
import Preview from "./Preview";
import { TextArea } from "../TextArea/TextArea";

type MarkdownProps = {
  label?: string;
  getValue: () => string;
  setValue: (value: string) => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type MarkdownButton = {
  name: string;
  syntax: string;
  icon?: React.ReactNode;
};

const markdownButtons: MarkdownButton[] = [
  { name: "B", syntax: "**Bold**" },
  { name: "I", syntax: "*Italic*" },
  { name: "S", syntax: "~Strikethrough~" },
  { name: "H1", syntax: "# " },
  { name: "H2", syntax: "## " },
  { name: "H3", syntax: "### " },
  {
    name: "Quote",
    syntax: "> ",
    icon: <Quote color="#EBEBEB" className="scale-75 hover:opacity-50" />
  },
  { name: "Link", syntax: "[Text](URL)", icon: <Link color="#EBEBEB" /> },
  {
    name: "Image",
    syntax: "![Alt](URL)",
    icon: <ImageIcon color="#EBEBEB" className="scale-75" />
  },
  { name: "List", syntax: "- ", icon: <List color="#EBEBEB" /> },
  { name: "Task", syntax: "- [ ]" }
];

// eslint-disable-next-line react/display-name
export const MarkdownEditor = React.forwardRef(
  (
    { label, className, getValue, setValue, ...props }: MarkdownProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    const [source, setSource] = useState("");
    const [showPreview, setShowPreview] = useState(false);

    const handlePreview = () => {
      setShowPreview(!showPreview);
      if (showPreview) return;
      setSource(getValue());
    };

    const handleAddSyntax = (syntax: string) => {
      const text = `${getValue()} ${syntax}`;
      setValue(text);
    };

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="pl-1 text-primary font-bold text-sm">{label}</label>
        )}
        <div className="relative">
          <div className="border border-[#373737] bg-secondary-black border-b-gray-100 p-4 flex flex-row justify-between overflow-x-scroll md:overflow-x-hidden">
            <div className="flex flex-row gap-2 mr-2 items-center md:mr-0">
              {markdownButtons.map((button, index) => {
                const Icon = button.icon;
                return (
                  <EditorButton
                    key={index}
                    label={Icon ?? button.name}
                    disabled={showPreview}
                    onClick={() => handleAddSyntax(button.syntax)}
                  />
                );
              })}
            </div>

            <EditorButton
              onClick={handlePreview}
              label="Preview"
              className={showPreview ? "text-primary" : "text-slate-300"}
            />
          </div>
          {showPreview ? (
            <Preview source={source} />
          ) : (
            <TextArea
              {...props}
              ref={ref}
              className={clsx("rounded-b-lg", className)}
            />
          )}
        </div>
      </div>
    );
  }
);
