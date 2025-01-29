import { getSeriesBlog, formatDate, SeriesBlog } from "app/blog/utils";
import Link from "next/link";

export default function Blog({ params }) {
  const series: SeriesBlog | null = getSeriesBlog(params.slug);

  if (!series) return <p>Series not found</p>;

  return (
    <div className="mt-16">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Series Post
      </h1>

      <div className="flex items-center space-x-10">
        <p className="text-neutral-900 dark:text-neutral-100 text-xl w-[350px] tabular-nums">
          {series.title}
        </p>

        <div className="border-l pl-4">
          {series.files.map((file) => (
            <Link key={file.slug} href={`/blog/${file.slug}`}>
              <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-4 mb-4">
                <p className="text-neutral-600 dark:text-neutral-400 w-[90px] tabular-nums">
                  {formatDate(file.metadata.publishedAt).fullDate}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {file.metadata.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
