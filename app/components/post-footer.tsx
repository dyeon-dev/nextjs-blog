import Link from "next/link";

export type Post = {
  title: string;
  slug: string; // 필요한 다른 속성 추가 가능
};

export type PostFooterProps = {
  prevPost: Post | null; // 이전 포스트는 Post 객체 또는 null
  nextPost: Post | null; // 다음 포스트는 Post 객체 또는 null
};

export default function PostFooter({ prevPost, nextPost }) {
  return (
    <div className="flex justify-between space-x-4 mt-8">
      {prevPost && (
        <Link href={`/blog/${prevPost.slug}`} className="group flex-1">
          <div className="flex items-center p-4 border rounded-md shadow-sm hover:shadow-md hover:bg-gray-100 transition">
            <svg
              viewBox="0 0 3 6"
              className="h-4 w-4 overflow-visible text-gray-500 group-hover:text-black"
            >
              <path
                d="M3 0L0 3L3 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="ml-3">
              <span className="text-xs text-gray-500">Previous</span>
              <div className="text-base font-semibold text-gray-900 dark:text-neutral-300 group-hover:text-black">
                {prevPost.metadata.title}
              </div>
            </div>
          </div>
        </Link>
      )}

      {nextPost && (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="group flex-1 text-right"
        >
          <div className="flex items-center justify-end p-4 border rounded-md shadow-sm hover:shadow-md hover:bg-gray-100 transition">
            <div className="mr-3">
              <span className="text-xs text-gray-500">Next</span>
              <div className="text-base font-semibold text-neutral-900 dark:text-neutral-300 group-hover:text-black">
                {nextPost.metadata.title}
              </div>
            </div>
            <svg
              viewBox="0 0 3 6"
              className="h-4 w-4 overflow-visible text-gray-500 group-hover:text-black"
            >
              <path
                d="M0 0L3 3L0 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
      )}
    </div>
  );
}
