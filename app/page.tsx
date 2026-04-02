import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section className="mt-16">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        FullStack Web Developer
      </h1>
      <p className="mb-4">
        📌 '왜?'라는 질문을 통해 <strong>근거 있는 설계</strong>를 지향합니다.
      </p>
      <p className="mb-4">
        설계에는 논리를 담지만 완벽한 코드는 없기 때문에 <strong>테스트 코드</strong>와 <strong>코드 리뷰</strong>의 중요성을 깨달아가고 있습니다.
      </p>
      <p className="mb-4">공부한 내용을 정리하고, 여러 사람들과의 공유와 스스로의 이해를 위해 <strong>개발일지</strong>를 작성합니다.</p>
      <p className="mb-4">단순히 기능 구현에 그치지 않고, 수치로 증명되는 <strong>성능 개선</strong>에 집요하게 파고듭니다.</p>
      <p className="mb-4">또한 <strong>개발자 경험(DX)</strong>의 향상이 곧 <strong>사용자 경험(UX)</strong>의 품질로 이어진다고 믿으며,
비효율적인 프로세스를 점진적으로 개선해 나가는 것을 즐깁니다.</p>

      <h1 className="mt-8 text-xl font-semibold tracking-tighter">Skills</h1>
      <p className="mt-4">{`React, TypeScript, React-Query, Node.js, NestJS, MySQL, MongoDB`}</p>

      <div className="my-4">
        <BlogPosts />
      </div>
    </section>
  );
}
