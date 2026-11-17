window.JJSTAR_MENU_VIEWS = (() => {
  const hiddenCodes = new Set([
    'L04ADFA', // 학사관리 FAQ
    'L04AHAC', // AHA 교육이수증
    'L04AHAL', // AHA 바로가기
    'L04ATTD', // 출결확인
    'L04BASK', // 수강바구니
    'L04BEST', // beSTAR 신청
    'L04CARD', // 카드대여
    'L04CEGD', // 인터넷 증명발급
    'L04CEHI', // 제증명 발급내역
    'L04CEIS', // 제증명 발급
    'L04CMMT', // 공동체 멘토상담 입력
    'L04CMRP', // 공동체 활동 결과보고
    'L04CN11', // 1:1 상담
    'L04CPRA', // 심폐소생술 교과목 신청
    'L04CPRH', // 심폐소생술 교과목 신청내역 확인
    'L04CRAP', // 학점인정신청
    'L04CRSM', // 교육과정 시뮬레이션
    'L04DBMJ', // 복수/부 전공 신청
    'L04DMBI', // 학생생활관비 납입고지서
    'L04DMPG', // 입사서약서 작성
    'L04EDCR', // 교육과정조회
    'L04ENRA', // 수강신청
    'L04GECR', // 교양 교육과정 조회
    'L04GTWY', // GATEWAY 설문
    'L04INAP', // 현장실습학기제 참여 신청
    'L04INCV', // 불편사항 신청
    'L04LCVT', // 로컬벤처
    'L04LEAD', // 선도학생 커리어패스
    'L04LEVD', // 퇴사 신청
    'L04LVLB', // 리빙랩
    'L04MCRR', // My 교육과정 조회
    'L04MJCR', // 전공 교육과정 조회
    'L04MJCN', // 전공상담신청
    'L04MJSI', // 전과전공 시뮬레이션
    'L04MYMP', // My MAP
    'L04ONCN', // 온라인 상담 신청
    'L04OPTB', // 오픈테이블
    'L04OUTS', // 외박신청
    'L04OVCK', // 해외봉사 신청 내역 확인
    'L04PDFG', // 대학생활 가이드 (PDF)
    'L04PERS', // 교직 적/인성 검사
    'L04PLEX', // 입학 전 학습경험 등록
    'L04PNTS', // 상벌점
    'L04RCSU', // RC설문진단
    'L04READ', // 재입학 신청
    'L04ROOM', // 관실신청
    'L04SLEP', // 조기 취침 신청
    'L04STID', // 학생증
    'L04SVPL', // 사회봉사 활동계획서 제출
    'L04SVRP', // 사회봉사 결과보고서 제출
    'L04TALG', // TA 근무일지 입력
    'L04TRAP', // 해외 연수 신청
    'L04WEBG', // 웹페이지 이용 매뉴얼
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
