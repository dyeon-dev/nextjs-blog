import { baseUrl } from 'app/sitemap'

import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // 모든 웹 크롤러(검색 엔진 로봇)에게 동일한 규칙을 적용 ex) 예: Googlebot, Bingbot 등
      }, 
    ],
    sitemap: `${baseUrl}/sitemap.xml`, // 크롤러가 sitemap.xml을 참고하여 웹사이트의 구조를 이해하고 URL을 효율적으로 크롤링한다
  }
}
