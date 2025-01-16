import Link from "next/link";
import { getSeriesBlogs } from "app/blog/utils";

export function SeriesPosts() {
  let seriesBlogs = getSeriesBlogs();

  return (
    <div className="mt-16">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Series Post
      </h1>
      <div className="flex items-center space-x-10">
        {seriesBlogs.map((series) => (
          <Link
            key={series.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${series.slug}`}
          >
            <div className="relative h-56 w-40 select-none rounded-lg bg-neutral-200 px-8 pt-8 pb-12 shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl dark:bg-neutral-800">
              <div className="absolute inset-y-0 left-2.5 w-[1px] bg-neutral-100 dark:bg-neutral-700" />
              <h1 className="font-semibold text-2xl">{series.title}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
