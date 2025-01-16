import { BlogPosts } from "app/components/posts";
import { SeriesPosts } from "app/components/series-post";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="mt-16">
      <h1 className="font-semibold text-4xl mb-8 tracking-tighter">
        dyeon-dev's Blog
      </h1>
      <SeriesPosts />
      <BlogPosts />
    </section>
  );
}
