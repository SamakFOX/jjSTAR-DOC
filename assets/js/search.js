/**
 * JJSTAR Guide - Search Engine
 * Phase 2: 지능형 검색 및 내비게이션 고도화
 */

const Hangul = {
  CHO: [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ],
  isHangul: function(char) {
    const code = char.charCodeAt(0);
    return code >= 0xAC00 && code <= 0xD7AF;
  },
  getChosung: function(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (this.isHangul(char)) {
        const code = char.charCodeAt(0) - 0xAC00;
        const choIndex = Math.floor(code / (21 * 28));
        result += this.CHO[choIndex];
      } else {
        result += char;
      }
    }
    return result;
  }
};

/**
 * 키워드 하이라이팅 처리 (HTML 태그 보존)
 */
function highlightText(text, keyword) {
  if (!keyword || !text) return text;
  
  // 초성 검색인 경우 하이라이팅 생략 (텍스트 매칭이 어려움)
  if (isChosung(keyword)) return text;

  const regex = new RegExp(`(${keyword})`, 'gi');
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}

/**
 * 입력값이 초성으로만 이루어져 있는지 확인
 */
function isChosung(str) {
  const choRegex = /^[ㄱ-ㅎ]+$/;
  return choRegex.test(str);
}

/**
 * 메뉴 데이터 필터링 로직 (초성 지원)
 */
function filterMenu(menuData, keyword) {
  if (!keyword) return menuData;
  
  const lowerKeyword = keyword.toLowerCase();
  const isCho = isChosung(lowerKeyword);

  return menuData.map(cat => {
    // 카테고리 제목 매칭
    const catTitle = cat.title.toLowerCase();
    const catCho = Hangul.getChosung(catTitle);
    const catMatch = isCho ? catCho.includes(lowerKeyword) : catTitle.includes(lowerKeyword);

    const filteredMids = cat.children.map(mid => {
      const midTitle = mid.title.toLowerCase();
      const midCho = Hangul.getChosung(midTitle);
      const midMatch = isCho ? midCho.includes(lowerKeyword) : midTitle.includes(lowerKeyword);

      const filteredSmalls = mid.children.filter(small => {
        const smallTitle = small.title.toLowerCase();
        const smallCho = Hangul.getChosung(smallTitle);
        const smallMatch = isCho ? smallCho.includes(lowerKeyword) : smallTitle.includes(lowerKeyword);
        return smallMatch;
      });

      if (midMatch) {
        return { ...mid, children: [...mid.children], _match: true };
      } else if (filteredSmalls.length > 0) {
        return { ...mid, children: filteredSmalls, _childMatch: true };
      }
      return null;
    }).filter(Boolean);

    if (catMatch) {
      return { ...cat, children: [...cat.children], _match: true };
    } else if (filteredMids.length > 0) {
      return { ...cat, children: filteredMids, _childMatch: true };
    }
    return null;
  }).filter(Boolean);
}

window.JJSTAR_SEARCH = {
  Hangul,
  highlightText,
  filterMenu,
  isChosung
};
