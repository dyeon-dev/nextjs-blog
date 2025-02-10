import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts, getSeriesBlog } from "app/blog/utils";
import { baseUrl } from "app/sitemap";
import { ViewCount } from "app/components/view-count";
import { Suspense } from "react";
import TocBanner from "app/components/toc-banner";
import PostFooter from "app/components/post-footer";

// 정적 사이트 생성(SSG)을 위해 모든 블로그 게시물의 slug를 반환
export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug.split("/"), // 중첩된 slug 지원
  }));
}

export default async function Blog({ params }) {
  let slug = params.slug.join("/"); // 배열을 문자열로 변환
  let post = getBlogPosts().find((post) => post.slug === slug);

  let seriesBlogs = getBlogPosts();
  const series = getSeriesBlog(params.slug[0]); // seriesSlug를 인자로 전달하여 시리즈 가져오기
  console.log(params.slug);
  let postIndex = series
    ? series.files.findIndex((p) => p.slug === slug)
    : getBlogPosts().findIndex((p) => p.slug === slug); // 시리즈가 존재할 경우 파일 목록에서 인덱스 찾기
  console.log("Current post index:", postIndex);

  let prevPost = postIndex > 0 ? getBlogPosts()[postIndex - 1] : null; // 이전 포스트 찾기
  let nextPost =
    postIndex < getBlogPosts().length - 1
      ? getBlogPosts()[postIndex + 1]
      : null; // 다음 포스트 찾기

  let prevSeriesPost =
    postIndex > 0 && series ? series.files[postIndex - 1] : null; // 이전 포스트 찾기
  let nextSeriesPost =
    postIndex < series!.files.length - 1 ? series!.files[postIndex + 1] : null; // 다음 포스트 찾기

  if (!post) {
    notFound();
  }

  return (
    <div className="flex justify-between">
      <section className="mt-16">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `${baseUrl}${post.metadata.image}`
                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
              url: `${baseUrl}/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: "dyeon-dev",
              },
            }),
          }}
        />
        <h1 className="title font-semibold text-3xl tracking-tighter">
          {post.metadata.title}
        </h1>
        <h3 className="border-l-4 pl-4 mt-2 font-semibold text-lg">
          {post.metadata.summary}
        </h3>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt, false).fullDateEN}
          </p>
          <Suspense>
            <ViewCount slug={post.slug} />
          </Suspense>
        </div>
        <article className="prose">
          <CustomMDX source={post.content} />
        </article>
        {series ? (
          <PostFooter prevPost={prevSeriesPost} nextPost={nextSeriesPost} />
        ) : (
          <PostFooter prevPost={prevPost} nextPost={nextPost} />
        )}
      </section>
      <div className="ml-auto">
        <div className="ml-24 top-[120px] hidden min-w-[280px] max-w-[280px] self-start lg:block sticky top-0">
          <TocBanner headings={post.headings} />
        </div>
      </div>
    </div>
  );
}
