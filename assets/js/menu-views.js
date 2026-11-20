window.JJSTAR_MENU_VIEWS = (() => {
  const hiddenCodes = new Set([
    'L04ADFA', // 학사관리 FAQ
    'L04ATTD', // 출결확인
    'L04AWRD', // 성적우수상내역
    'L04BEST', // beSTAR 신청
    'L04CEHI', // 제증명 발급내역
    'L04CEIS', // 제증명 발급
    'L04CRAP', // 학점인정신청
    'L04CRSM', // 교육과정 시뮬레이션
    'L04DBMJ', // 복수/부 전공 신청
    'L04EDCR', // 교육과정조회
    'L04EDCRB', // 교육과정편람
    'L04EXCH', // 학습경험 인증 현황
    'L04SGGD', // 수강편람
    'L04GECR', // 교양 교육과정 조회
    'L04LCVT', // 로컬벤처
    'L04LVLB', // 리빙랩
    'L04MCRR', // My 교육과정 조회
    'L04MJCR', // 전공 교육과정 조회
    'L04MJSI', // 전과전공 시뮬레이션
    'L04MYMP', // My MAP
    'L04OPTB', // 오픈테이블
    'L04PERS', // 교직 적/인성 검사
    'L04PLEX', // 입학 전 학습경험 등록
    'L04READ', // 재입학 신청
    'L04STID', // 학생증
  ]);

  const homeHiddenCodes = new Set([
    'L02JEJE',
    'L02SRCH',
  ]);

  const careerCodes = [
    'L04TGJB', 'L04INJB', 'L04MJDV', 'L04DCRM', 'L04MCRM', 'L04LEAD',
    'L04JBCP', 'L04NCSJ', 'L04JJKE', 'L04JBEF',
    'L04STRG', 'L04MBTI', 'L04UITY', 'L04PSYC', 'L04ETCT',
    'L04CN11', 'L04MENT', 'L04ONCN', 'L04PSCN',
    'L04MYLF', 'L04MYCP', 'L04MYJB', 'L04MYCR', 'L04PORT'
  ];

  function select(menu, name) {
    function excludeHidden(nodes) {
      return nodes.filter(node => !hiddenCodes.has(node.code) && !homeHiddenCodes.has(node.code)).flatMap(node => {
        if (!node.children?.length) return [node];
        const children = excludeHidden(node.children);
        return children.length ? [{ ...node, children }] : [];
      });
    }
    menu = excludeHidden(menu);
    if (name !== 'career') return { menu, title: '', count: null };
    const order = new Map(careerCodes.map((code, index) => [code, index]));
    function prune(nodes) {
      return nodes.filter(node => node.enabled !== false).flatMap(node => {
        if (node.children?.length) {
          const children = prune(node.children);
          return children.length ? [{ ...node, children }] : [];
        }
        return order.has(node.code) ? [{ ...node }] : [];
      }).sort((a, b) => firstIndex(a) - firstIndex(b));
    }
    function firstIndex(node) {
      return node.children?.length ? firstIndex(node.children[0]) : order.get(node.code);
    }
    const filtered = prune(menu);
    function countLeaves(nodes) {
      return nodes.reduce((sum, node) => sum + (node.children?.length ? countLeaves(node.children) : 1), 0);
    }
    return { menu: filtered, title: '진로·취업 가이드', count: countLeaves(filtered) };
  }

  return { select };
})();
