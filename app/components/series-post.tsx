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
            <div className="relative h-90 w-50 select-none rounded-l px-8 pt-8 pb-12 shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl">
              <img src={series.metadata.image} alt={series.title} />
              <h2 className="font-semibold text-xl">{series.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
