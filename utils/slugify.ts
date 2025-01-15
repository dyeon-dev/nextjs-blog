export default function slugify(str) {
  if (!str) return "";

  return str
    .toString()
    .toLowerCase()
    .trim() // 문자열 양쪽 공백 제거
    .replace(/\s+/g, "-") // 공백을 '-'로 변환
    .replace(/&/g, "-and-") // '&'를 '-and-'로 변환
    .replace(/[^\w\-가-힣]+/g, "") // 한글, 영문, 숫자, '-' 외 문자 제거
    .replace(/\-\-+/g, "-"); // 연속된 '-'를 단일 '-'로 변환
}