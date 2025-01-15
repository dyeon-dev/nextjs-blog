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

// 지정된 디렉토리에서 .mdx 확장자를 가진 파일만 필터링
function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

// 파일 경로에서 내용을 읽어와 Frontmatter와 본문을 파싱
function readMDXFile(filePath) {
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
function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))
    let headings = extractHeadings(content);

    return {
      metadata,
      slug,
      content,
      headings,
    }
  })
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'posts'))
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
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
