import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";
import { ViewCount } from "app/components/view-count";
import { Suspense } from "react";
import TocBanner from "app/components/toc-banner";

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

  if (!post) {
    notFound();
  }

  return (
    <>
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
        <h1 className="title font-semibold text-2xl tracking-tighter">
          {post.metadata.title}
        </h1>
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
      </section>
      <div className="ml-auto">
        <div className="fixed ml-24 top-[120px] hidden min-w-[280px] max-w-[260px] self-start lg:block">
          <TocBanner headings={post.headings} />
        </div>
      </div>
    </>
  );
}
