"use server";

import { neon } from "@neondatabase/serverless";
import { unstable_noStore as noStore } from "next/cache";

// serverless neon 연결
const sql = neon(`${process.env.DATABASE_URL}`);
// 조회수 데이터
export async function getViewsCount(): Promise<
  { slug: string; count: number }[]
> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  noStore();

  const rows = await sql("SELECT slug, count FROM views");

  return rows.map((row: { slug: string; count: number }) => ({
    slug: row.slug,
    count: row.count,
  }));
}
// 조회수 증가
export const incrementView = async (slug: string) => {
  
  noStore();

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  // 'views' 테이블에 slug를 삽입하거나 count를 업데이트
  await sql(
    `
  INSERT INTO views (slug, count)
  VALUES ($1, 1)
  ON CONFLICT (slug) DO UPDATE SET count = views.count + 1
  `,
    [slug]
  );
};