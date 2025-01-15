import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="mt-16">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        dyeon-dev Blog
      </h1>
      <BlogPosts />
    </section>
  );
}
