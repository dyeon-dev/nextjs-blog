import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        DaYeonKim Portfolio
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

      <h1 className="mt-8 text-xl font-semibold tracking-tighter">
        Activities & Education
      </h1>
      <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 mt-4">
        <p className="text-neutral-600 dark:text-neutral-400 w-[150px] tabular-nums">
          {`2024.06~2024.12`}
        </p>
        <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
          {`LG U+ 유레카 SW교육과정 프론트엔드 1st`}
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 mt-4">
        <p className="text-neutral-600 dark:text-neutral-400 w-[150px] tabular-nums">
          {`2023.08~2024.01`}
        </p>
        <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
          {`Naonworks an Ahnlab intern`}
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 mt-4">
        <p className="text-neutral-600 dark:text-neutral-400 w-[150px] tabular-nums">
          {`2022.03~2022.08`}
        </p>
        <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
          {`D.Lab Coding Academy instructor`}
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 mt-4">
        <p className="text-neutral-600 dark:text-neutral-400 w-[150px] tabular-nums">
          {`2020.03~2024.02`}
        </p>
        <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
          {`광운대학교 소프트웨어융합대학 정보융합학부`}
        </p>
      </div>

      <h1 className="mt-8 text-xl font-semibold tracking-tighter">
        Awards & Certificate
      </h1>
      <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 mt-4">
        <p className="text-neutral-600 dark:text-neutral-400 w-[90px] tabular-nums">
          {`2024.11`}
        </p>
        <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
          {`LG U+ 종합 프로젝트 최우수상`}
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 mt-4">
        <p className="text-neutral-600 dark:text-neutral-400 w-[90px] tabular-nums">
          {`2023.11`}
        </p>
        <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
          {`소프트웨어융합대학 졸업작품 전시회 장려상`}
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 mt-4">
        <p className="text-neutral-600 dark:text-neutral-400 w-[90px] tabular-nums">
          {`2024.09`}
        </p>
        <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
          {`정보처리기사`}
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 mt-4">
        <p className="text-neutral-600 dark:text-neutral-400 w-[90px] tabular-nums">
          {`2024.04`}
        </p>
        <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
          {`SQLD`}
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 mt-4">
        <p className="text-neutral-600 dark:text-neutral-400 w-[90px] tabular-nums">
          {`2021.09`}
        </p>
        <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
          {`ADsP`}
        </p>
      </div>

      <h1 className="mt-12 text-xl font-semibold tracking-tighter">
        Blog Post
      </h1>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
