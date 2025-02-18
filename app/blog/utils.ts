import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

type Heading = {
  level: number;
  text: string;
};

export type SeriesBlog = {
  title: string;
  summary: string;
  metadata: Metadata;
  slug: string;
  files: SeriesFiles[];
};

export type SeriesFiles = {
  slug: string;
  metadata: Metadata;
}

// 파일 콘텐츠에서 Frontmatter(메타데이터 블록)와 본문을 추출
function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

// 지정된 디렉토리에서 모든 .mdx 파일 경로를 재귀적으로 가져오기
function getMDXFiles(dir: string): string[] {
  let files = fs.readdirSync(dir);
  let mdxFiles: string[] = [];

  files.forEach((file) => {
    let filePath = path.join(dir, file);
    let stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 디렉토리라면 재귀적으로 탐색
      mdxFiles = mdxFiles.concat(getMDXFiles(filePath));
    } else if (path.extname(file) === '.mdx' && file !== 'index.mdx') {
      // .mdx 파일이라면 추가
      mdxFiles.push(filePath);
    }
  });

  return mdxFiles;
}

// 파일 경로에서 내용을 읽어와 Frontmatter와 본문을 파싱
function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

// MDX 본문에서 헤딩을 추출
function extractHeadings(content: string): Heading[] {
  let headingRegex = /^(#{1,6})\s+(.*)$/gm;
  let codeBlockRegex = /```[\s\S]*?```/g; 
  let headings: Heading[] = [];

  // 코드 블록 제거
  let contentWithoutCode = content.replace(codeBlockRegex, (match) => {
    return ''.padEnd(match.length, ' '); // 코드 블록 자리에 같은 길이의 공백을 남겨둠
  });
  
  let match;

  while ((match = headingRegex.exec(contentWithoutCode)) !== null) {
    let [_, hashes, text] = match;
    headings.push({ level: hashes.length, text: text.trim() });
  }

  return headings;
}

// MDX 데이터 가져오기
function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((filePath) => {
    let { metadata, content } = readMDXFile(filePath);
    let slug = path.relative(dir, filePath).replace(/\\/g, '/').replace(/\.mdx$/, ''); // 상대 경로 기반 slug 생성
    let headings = extractHeadings(content);

    return {
      metadata,
      slug,
      content,
      headings,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'posts'))
}

export function getSeriesBlogs() {
  const postsDir = path.join(process.cwd(), 'posts');
  const series: SeriesBlog[] = [];

  function findSeries(dir: string) {
    const files = fs.readdirSync(dir);
    const hasIndexFile = files.includes('index.mdx');

    if (hasIndexFile) {
      // index.mdx 파일의 메타데이터 추출
      const indexFilePath = path.join(dir, 'index.mdx');
      const { metadata: indexMetadata } = readMDXFile(indexFilePath);

      const seriesFiles = files
        .filter((file) => file.endsWith('.mdx') && file !== 'index.mdx')
        .map((file) => {
          const filePath = path.join(dir, file);
          const { metadata } = readMDXFile(filePath);
          return {
            slug: path.relative(postsDir, filePath).replace(/\\/g, '/').replace(/\.mdx$/, ''),
            metadata,
          }
        });

        series.push({
          title: indexMetadata.title || 'Untitled Series',
          summary: indexMetadata.summary || "",
          metadata: indexMetadata,
          slug: path.relative(postsDir, dir).replace(/\\/g, '/'),
          files: seriesFiles,
        });
    }

    // 하위 디렉토리 탐색
    files
      .filter((file) => fs.statSync(path.join(dir, file)).isDirectory())
      .forEach((subDir) => findSeries(path.join(dir, subDir)));
  }

  findSeries(postsDir);
  return series;
}


export function getSeriesBlog(seriesSlug: string): SeriesBlog | null {
  const postsDir = path.join(process.cwd(), 'posts');
  let series: SeriesBlog | null = null;

  function findSeries(dir: string) {
    const files = fs.readdirSync(dir);
    const hasIndexFile = files.includes('index.mdx');

    if (hasIndexFile) {
      const dirSlug = path.relative(postsDir, dir).replace(/\\/g, '/');
      if (dirSlug === seriesSlug) {
        const indexFilePath = path.join(dir, 'index.mdx');
        const { metadata: indexMetadata } = readMDXFile(indexFilePath);

        const seriesFiles = files
          .filter((file) => file.endsWith('.mdx') && file !== 'index.mdx')
          .map((file) => {
            const filePath = path.join(dir, file);
            const { metadata } = readMDXFile(filePath);
            return {
              slug: path.relative(postsDir, filePath).replace(/\\/g, '/').replace(/\.mdx$/, ''),
              metadata,
            };
          });

        series = {
          title: indexMetadata.title || 'Untitled Series',
          summary: indexMetadata.summary || "",
          metadata: indexMetadata,
          slug: dirSlug,
          files: seriesFiles,
        };
      }
    }

    // 하위 디렉토리 탐색
    if (!series) {
      files
        .filter((file) => fs.statSync(path.join(dir, file)).isDirectory())
        .forEach((subDir) => findSeries(path.join(dir, subDir)));
    }
  }

  findSeries(postsDir);
  return series;
}


export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}년 전`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}달 전`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}일 전`
  } else {
    formattedDate = '오늘'
  }

  let fullDateEN = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  let fullDate = targetDate.toLocaleString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '.').replace(',', '').replace(/\.\s*$/, ''); 

  if (!includeRelative) {
    return { fullDateEN, fullDate };
  }

  return {
    fullDateEN,
    fullDate,
    relativeDate: includeRelative ? `${fullDate} (${formattedDate})` : undefined,
  };
}
