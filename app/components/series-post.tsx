import Link from "next/link";
import { getSeriesBlogs } from "app/blog/utils";

export function SeriesPosts() {
  let seriesBlogs = getSeriesBlogs();

  return (
    <div className="mt-16">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Series Post ({seriesBlogs.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {seriesBlogs.map((series) => (
          <Link
            key={series.slug}
            className="flex flex-col space-y-1"
            href={`/blog/${series.slug}`}
          >
            <div className="relative h-full w-full select-none rounded-xl p-6 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col items-center text-center">
              <img
                src={series.metadata.image}
                alt={series.title}
                className="w-full h-auto object-cover rounded-lg mb-4"
              />
              <h2 className="font-semibold text-lg">{series.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
