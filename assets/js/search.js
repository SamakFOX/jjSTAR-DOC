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

function filterMenu(menuData, keyword) {
  if (!keyword) return menuData;
  
  const lowerKeyword = keyword.toLowerCase();
  const isCho = isChosung(lowerKeyword);

  return menuData.map(cat => {
    const catTitle = cat.title.toLowerCase();
    const catCho = Hangul.getChosung(catTitle);
    const catMatch = isCho ? catCho.includes(lowerKeyword) : catTitle.includes(lowerKeyword);

    // [Step 2] 대분류 매칭 시 하위 모든 중분류 노출 (Phase 2-5)
    const processedMids = cat.children.map(mid => {
      const midTitle = mid.title.toLowerCase();
      const midCho = Hangul.getChosung(midTitle);
      const midMatch = isCho ? midCho.includes(lowerKeyword) : midTitle.includes(lowerKeyword);

      const processedSmalls = mid.children.map(small => {
        const smallTitle = small.title.toLowerCase();
        const smallCho = Hangul.getChosung(smallTitle);
        const smallMatch = isCho ? smallCho.includes(lowerKeyword) : smallTitle.includes(lowerKeyword);
        return { ...small, _directMatch: smallMatch };
      }).filter(s => catMatch || midMatch || s._directMatch); // 부모 매칭 시 모든 자식 노출

      const hasSmallDirectMatch = processedSmalls.some(s => s._directMatch);

      if (catMatch || midMatch || processedSmalls.length > 0) {
        return { 
          ...mid, 
          children: processedSmalls, 
          _directMatch: midMatch, 
          _hasSmallMatch: hasSmallDirectMatch 
        };
      }
      return null;
    }).filter(Boolean);

    if (catMatch || processedMids.length > 0) {
      const hasSmallMatchInCat = processedMids.some(m => m._hasSmallMatch);
      return { 
        ...cat, 
        children: processedMids, 
        _directMatch: catMatch, 
        _hasSmallMatch: hasSmallMatchInCat
      };
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
