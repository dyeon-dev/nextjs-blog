import { formatDate, getSeriesBlogs } from "app/blog/utils";
import Link from "next/link";

// 정적 사이트 생성(SSG)을 위해 모든 블로그 게시물의 slug를 반환
export async function generateStaticParams() {
  let posts = getSeriesBlogs();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 시리즈 블로그 게시물의 상세 페이지를 렌더링
export default async function Blog() {
  let seriesBlogs = getSeriesBlogs();

  return (
    <div className="mt-16">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Series Post
      </h1>

      <div className="flex items-center space-x-10">
        {seriesBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((series) => (
            <>
              <p className="text-neutral-900 dark:text-neutral-100 text-xl w-[200px] tabular-nums">
                {series.title}
              </p>

              <div className="border-l pl-4">
                {series.files.map((file) => (
                  <Link
                    key={series.slug}
                    className="flex flex-col space-y-1 mb-4 gap-3"
                    href={`/blog/${file.slug}`}
                  >
                    <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-4">
                      <p className="text-neutral-600 dark:text-neutral-400 w-[90px] tabular-nums">
                        {formatDate(file.metadata.publishedAt)}
                      </p>
                      <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                        {file.metadata.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ))}
      </div>
    </div>
  );
}
