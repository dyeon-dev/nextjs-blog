import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section className="mt-16">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        DaYeonKim
      </h1>
      <p className="mb-4">
        {`🏃‍♀ 새로운 기술과 도구에 대한 열정으로 끊임없이 성장하는 개발자가 되기 위해 노력합니다.`}
      </p>
      <p className="mb-4">
        {`👩🏻‍💻 사용성 / 사용자 경험(UX)을 중점으로 의미있는 가치를 만들어 나가는 개발자가 되고 싶습니다.`}
      </p>
      <p className="mb-4">{`🌱 언제나 배우고, 나누고, 성장하고 싶습니다.`}</p>

      <h1 className="mt-8 text-xl font-semibold tracking-tighter">Skills</h1>
      <p className="mt-4">{`React, Vue, JavaScript, TypeScript, HTML5, CSS3`}</p>

      <h1 className="mt-12 text-xl font-semibold tracking-tighter">
        Blog Post
      </h1>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
