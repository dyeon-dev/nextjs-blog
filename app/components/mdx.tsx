import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";
import slugify from "utils/slugify";
import remarkGfm from "remark-gfm";

function Table({ data }) {
  if (!data || !data.headers) return null;
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  const srcStr = typeof props.src === "string" ? props.src : props.src?.src;
  const isGif = srcStr && srcStr.toLowerCase().endsWith(".gif");
  return <Image alt={props.alt} className="rounded-lg" unoptimized={isGif} {...props} />;
}

function Code({ children, className, ...props }) {
  if (!children) return "";
  
  const isText = className === "language-text";

  return (
    <span
      style={{
        overflow: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {isText ? (
        <code className={className} {...props}>
          {children}
        </code>
      ) : (
        <code dangerouslySetInnerHTML={{ __html: highlight(children) }} className={className} {...props} />
      )}
    </span>
  );
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

function CheckList({ children }) {
  const isChecked = /^\[x\]/i.test(children); // [x]로 시작하면 체크된 상태
  const content = children.replace(/^\[.\]\s*/, ""); // 체크박스 마크다운 제거

  return (
    <li className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={isChecked}
        disabled
        className="w-4 h-4 cursor-pointer"
      />
      <span>{content}</span>
    </li>
  );
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  // GFM 파이프 테이블 렌더링을 위한 HTML 요소 컴포넌트
  table: (props) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-neutral-100 dark:bg-neutral-800" {...props} />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr className="border-b border-neutral-200 dark:border-neutral-700" {...props} />,
  th: (props) => (
    <th
      className="px-4 py-2 text-left font-semibold text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="px-4 py-2 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
      {...props}
    />
  ),
  li: (props) => {
    const { children } = props;
    if (/^\[.\]/.test(children)) {
      // 체크박스가 포함된 경우 CheckList 사용
      return <CheckList>{children}</CheckList>;
    }
    return <li {...props} />;
  },
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
