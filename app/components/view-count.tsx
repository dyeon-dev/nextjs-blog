import { getViewsCount, incrementView } from "queries/db";

type Props = {
  slug: string;
};

export const ViewCount = async ({ slug }: Props) => {
  // 조회수 증가 후
  await incrementView(slug);
  // 조회수 가져오기
  const views = await getViewsCount();
  const view = views.find((view) => view.slug === slug);
  const count = view ? view.count : 0;

  return (
    <p className="text-sm text-neutral-600 dark:text-neutral-400">
      {count.toLocaleString()} views
    </p>
  );
};
