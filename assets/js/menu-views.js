window.JJSTAR_MENU_VIEWS = (() => {
  const hiddenCodes = new Set([
    'L04ADFA', // 학사관리 FAQ
    'L04AHAC', // AHA 교육이수증
    'L04AMC5', // 성적정보분석(AMC5)
    'L04ATTD', // 출결확인
    'L04AWRD', // 성적우수상내역
    'L04BEST', // beSTAR 신청
    'L04CEHI', // 제증명 발급내역
    'L04CEIS', // 제증명 발급
    'L04CMMT', // 공동체 멘토상담 입력
    'L04CMRP', // 공동체 활동 결과보고
    'L04CN11', // 1:1 상담
    'L04CPMG', // 신청확인 및 관리
    'L04CPRA', // 심폐소생술 교과목 신청
    'L04CRAP', // 학점인정신청
    'L04CRSM', // 교육과정 시뮬레이션
    'L04DBMJ', // 복수/부 전공 신청
    'L04EDCR', // 교육과정조회
    'L04EDCRB', // 교육과정편람
    'L04ELCT', // 총학생회 선거
    'L04GECR', // 교양 교육과정 조회
    'L04GRDC', // 졸업예정자 졸업사정 확인
    'L04GREJ', // 성적이의신청
    'L04GTWY', // GATEWAY 설문
    'L04INAP', // 현장실습학기제 참여 신청
    'L04INCV', // 불편사항 신청
    'L04INDC', // 산학협력 연구 참여 확인서
    'L04INDR', // 중도 포기 신청
    'L04INJB', // 관심직무 자가진단
    'L04JBST', // 취업성공기
    'L04KMOC', // K-MOOC인정신청
    'L04LCVT', // 로컬벤처
    'L04LEAV', // 휴학신청
    'L04LEVD', // 퇴사 신청
    'L04LVLB', // 리빙랩
    'L04MCRR', // My 교육과정 조회
    'L04MCRT', // 마이크로 전공 인증서
    'L04MENT', // 멘토링
    'L04MJCR', // 전공 교육과정 조회
    'L04MJDG', // 전공역량 자기평가 진단 검사
    'L04MJSI', // 전과전공 시뮬레이션
    'L04MLEV', // 중간강의평가
    'L04MYCP', // My 역량개발
    'L04MYMP', // My MAP
    'L04NCCF', // 비교과 활동 증명서
    'L04NCRD', // 비교과 프로그램 추천
    'L04NVCR', // Navigation 비교과 프로그램 추천
    'L04OPTB', // 오픈테이블
    'L04OVRP', // 해외봉사 결과보고서 작성
    'L04PLEX', // 입학 전 학습경험 등록
    'L04PRJT', // 개인(팀) 프로젝트
    'L04PRVC', // 개인정보 동의내역
    'L04READ', // 재입학 신청
    'L04ROOM', // 관실신청
    'L04RULE', // 학칙개정사항 안내
    'L04SDMJ', // 자기설계전공 신청
    'L04SGGD', // 수강편람
    'L04SLEP', // 조기 취침 신청
    'L04STID', // 학생증
    'L04SURS', // SUPER 핵심역량 진단평가 결과 분석
    'L04SVAP', // 사회봉사 교과목신청
    'L04SVPL', // 사회봉사 활동계획서 제출
    'L04SVRP', // 사회봉사 결과보고서 제출
    'L04TALG', // TA 근무일지 입력
    'L04TGTH', // Together
    'L04WITH', // 자퇴신청
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
