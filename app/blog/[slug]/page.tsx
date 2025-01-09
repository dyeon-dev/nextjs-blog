import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";
import { neon } from "@neondatabase/serverless";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// serverless neon 연결
const sql = neon(`${process.env.DATABASE_URL}`);
// 조회수 데이터
export async function getViewsCount(): Promise<
  { slug: string; count: number }[]
> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  const rows = await sql("SELECT slug, count FROM views");

  return rows.map((row: { slug: string; count: number }) => ({
    slug: row.slug,
    count: row.count,
  }));
}
// 조회수 증가
const incrementView = async (slug: string) => {
  "use server";

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  // 'views' 테이블에 slug를 삽입하거나 count를 업데이트
  await sql(
    `
  INSERT INTO views (slug, count)
  VALUES ($1, 1)
  ON CONFLICT (slug) DO UPDATE SET count = views.count + 1
  `,
    [slug]
  );
};

export default async function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  await incrementView(params.slug);

  const views = await getViewsCount();
  const view = views.find((view) => view.slug === params.slug);
  const count = view ? view.count : 0;

  if (!post) {
    notFound();
  }

  return (
    <section>
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
              name: "My Portfolio",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {count.toLocaleString()} views
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
