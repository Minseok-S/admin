// 카드 데이터 타입 정의

/**
 * @interface InteractiveInfoCardData
 *
 * @property {number} id - 카드의 고유 식별자
 * @property {string} title - 카드의 제목
 * @property {string} image - 카드에 표시될 이미지 경로
 * @property {string} tag - 카드의 카테고리 태그
 * @property {string[]} descriptions - 카드에 표시될 설명 텍스트 배열
 * @property {string} link - '자세히 알아보기' 버튼의 링크 주소
 * @property {string} bgColor1 - 카드 상단 원형 배경의 첫 번째 색상
 * @property {string} bgColor2 - 카드의 두 번째 배경 색상 (현재 미사용)
 */
export interface InteractiveInfoCardData {
  id: number;
  title: string;
  image: string;
  tag: string;
  descriptions: string[];
  link: string;
  bgColor1: string;
  bgColor2: string;
}

// 지역 데이터 타입 정의
export interface RegionData {
  id: number;
  name: string;
  x: number;
  y: number;
  count: number;
  leader: string;
  universities: string[];
}

// 통계 데이터 타입 정의
export interface StatData {
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
}
