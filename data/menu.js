// Menu hierarchy verified on 2026-10-15. DOM IDs are supplementary identifiers.
window.JJSTAR_MENU = [
  {
    "title": "JJSTAR 이용 가이드",
    "miniLabel": "메인 가이드",
    "code": "L01INIT",
    "path": "pages/L01INIT.html",
    "enabled": true,
    "children": [
      {
        "title": "JJSTAR 메인화면",
        "miniLabel": "메인 화면",
        "code": "L02MAIN",
        "path": "pages/L02MAIN.html",
        "enabled": true,
        "children": []
      },
      {
        "title": "제이제이랑 JJSTAR 여행하기",
        "miniLabel": "JJSTAR 가이드북",
        "code": "L02JEJE",
        "path": "pages/L02JEJE.html",
        "enabled": true,
        "children": []
      },
      {
        "title": "One-Stop 서비스란?",
        "miniLabel": "원스톱 서비스",
        "code": "L02OSTP",
        "path": "pages/L02OSTP.html",
        "enabled": true,
        "children": []
      },
      {
        "title": "RAG + AI 검색서비스",
        "miniLabel": "JJ GPT",
        "code": "L02SRCH",
        "path": "pages/L02SRCH.html",
        "enabled": true,
        "children": []
      }
    ]
  },
  {
    "title": "STAR 지원",
    "miniLabel": "STAR 지원",
    "code": "L02SUPP",
    "path": "pages/L02SUPP.html",
    "enabled": true,
    "hideInNav": false,
    "generatedOverview": true,
    "children": [
      {
        "title": "정보조회",
        "miniLabel": "정보조회",
        "code": "L03INFO",
        "path": "pages/L03INFO.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"학사일정","miniLabel":"학사 일정","code":"L04ACSC","path":"pages/L04ACSC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020406","sourceMenuPath":["STAR 지원","정보조회","학사일정"],"sourceRow":11,"description":"전주대 스케줄","guideStatus":"existing"},
          {"title":"교원 시간표 조회","miniLabel":"교원 시간표","code":"L04PRTS","path":"pages/L04PRTS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019963","sourceMenuPath":["STAR 지원","정보조회","교원 시간표 조회"],"sourceRow":12,"description":"교수님 시간표 확인","guideStatus":"existing"},
          {"title":"교육과정조회","miniLabel":"교육 과정","code":"L04CURV","path":"pages/L04CURV.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020405","sourceMenuPath":["STAR 지원","정보조회","교육과정조회"],"sourceRow":13,"description":"교육 과정 관련 도움말","guideStatus":"existing"},
          {"title":"교육과정편람","miniLabel":"교과 편람","code":"L04EDCRB","path":"pages/L04EDCRB.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019965","sourceMenuPath":["STAR 지원","정보조회","교육과정편람"],"sourceRow":14,"description":"입학년도별 졸업까지의 전체 교육일정","contentPath":"pages/L03STMG.html","contentAnchor":"L04EDCRB","guideStatus":"embedded"},
          {"title":"수강편람","miniLabel":"수강 편람","code":"L04SGGD","path":"pages/L04SGGD.html","enabled":true,"hideInNav":true,"sourceDomId":"M000021007","sourceMenuPath":["STAR 지원","정보조회","수강편람"],"sourceRow":15,"description":"이번 학기 개설과목 리스트","contentPath":"pages/L03STMG.html","contentAnchor":"L04SGGD","guideStatus":"embedded"}
        ],
        "overviewPath": "pages/L03STMG.html"
      },
      {
        "title": "등록관리",
        "miniLabel": "등록 관리",
        "code": "L03REGI",
        "path": "pages/L03REGI.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"등록금 고지서","miniLabel":"등록금 고지서","code":"L04TUIB","path":"pages/L04TUIB.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019972","sourceMenuPath":["STAR 지원","등록관리","등록금 고지서"],"sourceRow":16,"description":"이번 학기 납부할 등록금 고지서","contentPath":"pages/L03REGI.html","contentAnchor":"L04TUIB","guideStatus":"embedded"},
          {"title":"분할납부 신청","miniLabel":"분할 납부","code":"L04INST","path":"pages/L04INST.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019973","sourceMenuPath":["STAR 지원","등록관리","분할납부 신청"],"sourceRow":17,"description":"등록금 일시 납부가 어려운 경우 분납 신청","guideStatus":"existing"},
          {"title":"등록금 납부 내역","miniLabel":"납부 내역","code":"L04TUHI","path":"pages/L04TUHI.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019974","sourceMenuPath":["STAR 지원","등록관리","등록금 납부 내역"],"sourceRow":18,"description":"전체 등록금 납부 결과 및 확인서 출력","contentPath":"pages/L03REGI.html","contentAnchor":"L04TUHI","guideStatus":"embedded"},
          {"title":"교육비 납입 증명서 출력","miniLabel":"납입 증명서","code":"L04PAYC","path":"pages/L04PAYC.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019975","sourceMenuPath":["STAR 지원","등록관리","교육비 납입 증명서 출력"],"sourceRow":19,"description":"소득공제 등을 위한 교육비 납입 증명서 출력","contentPath":"pages/L03REGI.html","contentAnchor":"L04PAYC","guideStatus":"embedded"},
          {"title":"등록금 환불요청","miniLabel":"환불","code":"L04REFD","path":"pages/L04REFD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019976","sourceMenuPath":["STAR 지원","등록관리","등록금 환불요청"],"sourceRow":20,"description":"휴학 등으로 인한 등록금 환불","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03REGI.html"
      },
      {
        "title": "장학관리",
        "miniLabel": "장학 관리",
        "code": "L03SCHL",
        "path": "pages/L03SCHL.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"장학 공지사항","miniLabel":"장학 공지","code":"L04SCHN","path":"pages/L04SCHN.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019967","sourceMenuPath":["STAR 지원","장학관리","장학 공지사항"],"sourceRow":21,"description":"장학금과 관련된 공지와 안내","contentPath":"pages/L03SCHL.html","contentAnchor":"L04SCHN","guideStatus":"embedded"},
          {"title":"장학금 조회","miniLabel":"장학금 조회","code":"L04SCHQ","path":"pages/L04SCHQ.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021781","sourceMenuPath":["STAR 지원","장학관리","장학금 조회"],"sourceRow":22,"guideStatus":"pending"},
          {"title":"장학금 지급계좌관리","miniLabel":"계좌 관리","code":"L04SCHA","path":"pages/L04SCHA.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019969","sourceMenuPath":["STAR 지원","장학관리","장학금 지급계좌관리"],"sourceRow":23,"description":"장학금을 지급받을 계좌 정보 등록·수정","guideStatus":"existing"},
          {"title":"장학금 수혜현황","miniLabel":"수혜 현황","code":"L04SCHS","path":"pages/L04SCHS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019970","sourceMenuPath":["STAR 지원","장학관리","장학금 수혜현황"],"sourceRow":24,"description":"재학 중 받은 장학금 내역","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03SCHL.html"
      },
      {
        "title": "공동체",
        "miniLabel": "공동체 활동",
        "code": "L03COMM",
        "path": "pages/L03COMM.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"사제동행교수선택","miniLabel":"사제 동행","code":"L04SAJE","path":"pages/L04SAJE.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019964","sourceMenuPath":["STAR 지원","공동체","사제동행교수선택"],"sourceRow":25,"description":"지도교수 선택 및 선정내역","guideStatus":"existing"},
          {"title":"My MAP","miniLabel":"MY MAP","code":"L04MYMP","path":"pages/L04MYMP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020822","sourceMenuPath":["STAR 지원","공동체","My MAP"],"sourceRow":26,"description":"나의 대학생활 성과를 담은 포트폴리오 맵 조회","guideStatus":"existing"},
          {"title":"공동체구성 및 활동내역","miniLabel":"공동체 구성&활동","code":"L04CMAC","path":"pages/L04CMAC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020862","sourceMenuPath":["STAR 지원","공동체","공동체구성 및 활동내역"],"sourceRow":27,"description":"소속 공동체 팀원 정보 및 활동 현황 확인","guideStatus":"existing"},
          {"title":"공동체 활동 결과보고","miniLabel":"활동 결과보고","code":"L04CMRP","path":"pages/L04CMRP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020863","sourceMenuPath":["STAR 지원","공동체","공동체 활동 결과보고"],"sourceRow":28,"description":"활동 종료 후 결과보고서 온라인 작성 및 제출","guideStatus":"existing"},
          {"title":"공동체 멘토상담 입력","miniLabel":"멘토 상담","code":"L04CMMT","path":"pages/L04CMMT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020864","sourceMenuPath":["STAR 지원","공동체","공동체 멘토상담 입력"],"sourceRow":29,"description":"멘토 교수님 상담 일지 등록 및 관리","guideStatus":"existing"},
          {"title":"전공상담신청","miniLabel":"전공상담신청","code":"L04MJCN","path":"pages/L04MJCN.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021782","sourceMenuPath":["STAR 지원","공동체","전공상담신청"],"sourceRow":30,"guideStatus":"pending"},
          {"title":"RC설문진단","miniLabel":"RC설문진단","code":"L04RCSU","path":"pages/L04RCSU.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021783","sourceMenuPath":["STAR 지원","공동체","RC설문진단"],"sourceRow":31,"guideStatus":"pending"}
        ],
        "overviewPath": "pages/L03COMM.html"
      },
      {
        "title": "설문조사·인적성검사",
        "miniLabel": "설문조사·인적성검사",
        "code": "L03SURV",
        "path": "pages/L03SURV.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"진단검사 및 만족도조사","miniLabel":"진단검사 및 만족도조사","code":"L04DIAS","path":"pages/L04DIAS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020161","sourceMenuPath":["STAR 지원","설문조사·인적성검사","진단검사 및 만족도조사"],"sourceRow":32,"guideStatus":"pending"},
          {"title":"ABEEK 설문조사","miniLabel":"ABEEK 설문","code":"L04ABEK","path":"pages/L04ABEK.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020039","sourceMenuPath":["STAR 지원","설문조사·인적성검사","ABEEK 설문조사"],"sourceRow":33,"description":"ABEEK 설문 관련 도움말","guideStatus":"existing"},
          {"title":"교직 적/인성 검사","miniLabel":"교직 적/인성","code":"L04PERS","path":"pages/L04PERS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020040","sourceMenuPath":["STAR 지원","설문조사·인적성검사","교직 적/인성 검사"],"sourceRow":34,"description":"교직 적/인성 관련 도움말","guideStatus":"existing"}
        ]
      },
      {
        "title": "커뮤니티",
        "miniLabel": "커뮤니티",
        "code": "L03CMTY",
        "path": "pages/L03CMTY.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"공지사항","miniLabel":"공지","code":"L04IFNT","path":"pages/L04IFNT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020160","sourceMenuPath":["STAR 지원","커뮤니티","공지사항"],"sourceRow":35,"guideStatus":"pending"},
          {"title":"Q&A","miniLabel":"주요 질문","code":"L04QNAA","path":"pages/L04QNAA.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020159","sourceMenuPath":["STAR 지원","커뮤니티","Q&A"],"sourceRow":36,"guideStatus":"pending"}
        ]
      },
      {
        "title": "증명발급",
        "miniLabel": "증명 발급",
        "code": "L03CERTI",
        "path": "pages/L03CERTI.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"인터넷 증명발급 안내","miniLabel":"인터넷 발급","code":"L04CEGD","path":"pages/L04CEGD.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020474","sourceMenuPath":["STAR 지원","증명발급","인터넷 증명발급 안내"],"sourceRow":37,"description":"인터넷 증명발급 서비스 이용 방법과 수수료 안내","contentPath":"pages/L03CERTI.html","contentAnchor":"L04CEGD","guideStatus":"embedded"},
          {"title":"제증명 발급","miniLabel":"제증명 발급","code":"L04CEIS","path":"pages/L04CEIS.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020475","sourceMenuPath":["STAR 지원","증명발급","제증명 발급"],"sourceRow":38,"description":"재학·성적·졸업 등 필요한 증명서 온라인 신청","contentPath":"pages/L03CERTI.html","contentAnchor":"L04CEIS","guideStatus":"embedded"},
          {"title":"제증명 발급내역","miniLabel":"발급 내역","code":"L04CEHI","path":"pages/L04CEHI.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020476","sourceMenuPath":["STAR 지원","증명발급","제증명 발급내역"],"sourceRow":39,"description":"이전에 발급한 보관 증명서 및 영수증 조회","contentPath":"pages/L03CERTI.html","contentAnchor":"L04CEHI","guideStatus":"embedded"}
        ],
        "overviewPath": "pages/L03CERTI.html"
      },
      {
        "title": "JJSTAR 이용 매뉴얼",
        "miniLabel": "JJSTAR 매뉴얼",
        "code": "L03JJMN",
        "path": "pages/L03JJMN.html",
        "enabled": true,
        "hideInNav": true,
        "generatedOverview": true,
        "children": [
          {"title":"웹페이지 이용 매뉴얼","miniLabel":"웹페이지 이용 매뉴얼","code":"L04WEBG","path":"pages/L04WEBG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020416","sourceMenuPath":["STAR 지원","JJSTAR 이용 매뉴얼","웹페이지 이용 매뉴얼"],"sourceRow":40,"guideStatus":"pending"},
          {"title":"대학생활 가이드 (PDF)","miniLabel":"대학생활 가이드 (PDF)","code":"L04PDFG","path":"pages/L04PDFG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020417","sourceMenuPath":["STAR 지원","JJSTAR 이용 매뉴얼","대학생활 가이드 (PDF)"],"sourceRow":41,"guideStatus":"pending"}
        ]
      }
    ],
    "overviewPath": "pages/L02SUPP.html"
  },
  {
    "title": "학사정보",
    "miniLabel": "학사 정보",
    "code": "L02ACAD",
    "path": "pages/L02ACAD.html",
    "enabled": true,
    "hideInNav": false,
    "generatedOverview": true,
    "children": [
      {
        "title": "학사관리",
        "miniLabel": "학사 관리",
        "code": "L03ADMN",
        "path": "pages/L03ADMN.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"학칙개정사항 안내","miniLabel":"학칙 개정","code":"L04RULE","path":"pages/L04RULE.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020427","sourceMenuPath":["학사정보","학사관리","학칙개정사항 안내"],"sourceRow":42,"description":"학칙 개정 관련 도움말","contentPath":"pages/L03ADMN.html","contentAnchor":"L04RULE","guideStatus":"embedded"},
          {"title":"학사관리 FAQ","miniLabel":"학사 FAQ","code":"L04ADFA","path":"pages/L04ADFA.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020426","sourceMenuPath":["학사정보","학사관리","학사관리 FAQ"],"sourceRow":43,"description":"학사 FAQ 관련 도움말","contentPath":"pages/L03ADMN.html","contentAnchor":"L04ADFA","guideStatus":"embedded"}
        ],
        "overviewPath": "pages/L03ADMN.html"
      },
      {
        "title": "교육과정",
        "miniLabel": "교육 과정",
        "code": "L03CURR",
        "path": "pages/L03CURR.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"교양 교육과정 조회","miniLabel":"교양 교과","code":"L04GECR","path":"pages/L04GECR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020428","sourceMenuPath":["학사정보","교육과정","교양 교육과정 조회"],"sourceRow":44,"description":"교양 교과 관련 도움말","guideStatus":"existing"},
          {"title":"전공 교육과정 조회","miniLabel":"전공 교과","code":"L04MJCR","path":"pages/L04MJCR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020429","sourceMenuPath":["학사정보","교육과정","전공 교육과정 조회"],"sourceRow":45,"description":"전공 교과 관련 도움말","guideStatus":"existing"},
          {"title":"교육과정 시뮬레이션","miniLabel":"교과 시뮬","code":"L04CRSM","path":"pages/L04CRSM.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020430","sourceMenuPath":["학사정보","교육과정","교육과정 시뮬레이션"],"sourceRow":46,"description":"교과 시뮬 관련 도움말","guideStatus":"existing"},
          {"title":"My 교육과정 조회","miniLabel":"MY 교과","code":"L04MCRR","path":"pages/L04MCRR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020431","sourceMenuPath":["학사정보","교육과정","My 교육과정 조회"],"sourceRow":47,"description":"MY 교과 관련 도움말","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03CURR.html"
      },
      {
        "title": "수강관리",
        "miniLabel": "수강 관리",
        "code": "L03COUR",
        "path": "pages/L03COUR.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"수강바구니","miniLabel":"수강 바구니","code":"L04BASK","path":"pages/L04BASK.html","enabled":true,"hideInNav":true,"sourceDomId":"M000021002","sourceMenuPath":["학사정보","수강관리","수강바구니"],"sourceRow":48,"description":"수강 바구니 관련 도움말","contentPath":"pages/L03COUR.html","contentAnchor":"L04BASK","guideStatus":"embedded"},
          {"title":"수강신청","miniLabel":"수강 신청","code":"L04ENRA","path":"pages/L04ENRA.html","enabled":true,"hideInNav":true,"sourceDomId":"M000021003","sourceMenuPath":["학사정보","수강관리","수강신청"],"sourceRow":49,"description":"수강 신청 관련 도움말","contentPath":"pages/L03COUR.html","contentAnchor":"L04ENRA","guideStatus":"embedded"},
          {"title":"수강신청 내역","miniLabel":"수강 내역","code":"L04ENRV","path":"pages/L04ENRV.html","enabled":true,"hideInNav":true,"sourceDomId":"M000021004","sourceMenuPath":["학사정보","수강관리","수강신청 내역"],"sourceRow":50,"description":"수강 내역 관련 도움말","contentPath":"pages/L03COUR.html","contentAnchor":"L04ENRV","guideStatus":"embedded"},
          {"title":"강좌시간표/수업계획서 조회","miniLabel":"시간표 & 계획서","code":"L04CLPL","path":"pages/L04CLPL.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020011","sourceMenuPath":["학사정보","수강관리","강좌시간표/수업계획서 조회"],"sourceRow":51,"description":"시간표 & 계획서 관련 도움말","guideStatus":"existing"},
          {"title":"AHA 바로가기","miniLabel":"AHA 링크","code":"L04AHAL","path":"pages/L04AHAL.html","enabled":true,"hideInNav":true,"sourceDomId":"M000021784","sourceMenuPath":["학사정보","수강관리","AHA 바로가기"],"sourceRow":52,"description":"AHA 링크 관련 도움말","contentPath":"pages/L03ADMN.html","contentAnchor":"L04AHAL","guideStatus":"embedded"},
          {"title":"AHA 교육이수증","miniLabel":"AHA 이수증","code":"L04AHAC","path":"pages/L04AHAC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021785","sourceMenuPath":["학사정보","수강관리","AHA 교육이수증"],"sourceRow":53,"description":"AHA 이수증 관련 도움말","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03COUR.html"
      },
      {
        "title": "출결·졸업관리",
        "miniLabel": "출결·졸업",
        "code": "L03GRDM",
        "path": "pages/L03GRDM.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"출결확인","miniLabel":"출결 확인","code":"L04ATTD","path":"pages/L04ATTD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020013","sourceMenuPath":["학사정보","출결·졸업관리","출결확인"],"sourceRow":54,"description":"출결 확인 관련 도움말","guideStatus":"existing"},
          {"title":"출석인정신청","miniLabel":"출석 인정","code":"L04ATAP","path":"pages/L04ATAP.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020014","sourceMenuPath":["학사정보","출결·졸업관리","출석인정신청"],"sourceRow":55,"description":"출석 인정 관련 도움말","contentPath":"pages/L03COUR.html","contentAnchor":"L04ATAP","guideStatus":"embedded"},
          {"title":"졸업이수 기준 정보","miniLabel":"졸업기준 정보","code":"L04GRDI","path":"pages/L04GRDI.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021006","sourceMenuPath":["학사정보","출결·졸업관리","졸업이수 기준 정보"],"sourceRow":56,"guideStatus":"pending"},
          {"title":"졸업예정자 졸업사정 확인","miniLabel":"졸업사정 확인","code":"L04GRDC","path":"pages/L04GRDC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020550","sourceMenuPath":["학사정보","출결·졸업관리","졸업예정자 졸업사정 확인"],"sourceRow":57,"guideStatus":"pending"},
          {"title":"조기졸업 신청","miniLabel":"조기졸업 신청","code":"L04EGRD","path":"pages/L04EGRD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020551","sourceMenuPath":["학사정보","출결·졸업관리","조기졸업 신청"],"sourceRow":58,"guideStatus":"pending"},
          {"title":"학사학위 취득유예 신청","miniLabel":"학사학위 취득유예","code":"L04DEFR","path":"pages/L04DEFR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020552","sourceMenuPath":["학사정보","출결·졸업관리","학사학위 취득유예 신청"],"sourceRow":59,"guideStatus":"pending"}
        ]
      },
      {
        "title": "성적관리·강의평가",
        "miniLabel": "성적·평가",
        "code": "L03GRAD",
        "path": "pages/L03GRAD.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"학기별성적조회","miniLabel":"학기별 성적","code":"L04SEMG","path":"pages/L04SEMG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020026","sourceMenuPath":["학사정보","성적관리·강의평가","학기별성적조회"],"sourceRow":60,"description":"학기별 성적 관련 도움말","guideStatus":"existing"},
          {"title":"강의평가","miniLabel":"최종 강의평가","code":"L04LEVL","path":"pages/L04LEVL.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020028","sourceMenuPath":["학사정보","성적관리·강의평가","강의평가"],"sourceRow":61,"description":"최종 강의평가","guideStatus":"existing"},
          {"title":"중간강의평가","miniLabel":"중간 강의평가","code":"L04MLEV","path":"pages/L04MLEV.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020029","sourceMenuPath":["학사정보","성적관리·강의평가","중간강의평가"],"sourceRow":62,"description":"중간 강의평가","guideStatus":"existing"},
          {"title":"성적이의신청","miniLabel":"성적 이의","code":"L04GREJ","path":"pages/L04GREJ.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020025","sourceMenuPath":["학사정보","성적관리·강의평가","성적이의신청"],"sourceRow":63,"description":"성적 이의 관련 도움말","guideStatus":"existing"},
          {"title":"성적정보분석(AMC5)","miniLabel":"성적 분석","code":"L04AMC5","path":"pages/L04AMC5.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020024","sourceMenuPath":["학사정보","성적관리·강의평가","성적정보분석(AMC5)"],"sourceRow":64,"description":"성적 분석 관련 도움말","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03GRAD.html"
      },
      {
        "title": "학적관리",
        "miniLabel": "학적 관리",
        "code": "L03RECD",
        "path": "pages/L03RECD.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"학적 기초","miniLabel":"학적 기초","code":"L04BASC","path":"pages/L04BASC.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020435","sourceMenuPath":["학사정보","학적관리","학적 기초"],"sourceRow":65,"description":"학적 기초 관련 도움말","guideStatus":"existing"},
          {"title":"전과전공 시뮬레이션","miniLabel":"전과전공 시뮬레이션","code":"L04MJSI","path":"pages/L04MJSI.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021855","sourceMenuPath":["학사정보","학적관리","전과전공 시뮬레이션"],"sourceRow":66,"guideStatus":"pending"},
          {"title":"전과전공 선택 신청 및 확인","miniLabel":"전공 선택","code":"L04CHMJ","path":"pages/L04CHMJ.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020438","sourceMenuPath":["학사정보","학적관리","전과전공 선택 신청 및 확인"],"sourceRow":67,"description":"전공 선택 관련 도움말","guideStatus":"existing"},
          {"title":"휴학신청","miniLabel":"휴학","code":"L04LEAV","path":"pages/L04LEAV.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020440","sourceMenuPath":["학사정보","학적관리","휴학신청"],"sourceRow":68,"description":"휴학 관련 도움말","guideStatus":"existing"},
          {"title":"복학 신청 및 확인","miniLabel":"복학","code":"L04RETN","path":"pages/L04RETN.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020437","sourceMenuPath":["학사정보","학적관리","복학 신청 및 확인"],"sourceRow":69,"description":"복학 관련 도움말","guideStatus":"existing"},
          {"title":"자퇴신청","miniLabel":"자퇴","code":"L04WITH","path":"pages/L04WITH.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020441","sourceMenuPath":["학사정보","학적관리","자퇴신청"],"sourceRow":70,"description":"자퇴 관련 도움말","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03RECD.html"
      },
      {
        "title": "학점인정신청",
        "miniLabel": "학점 인정",
        "code": "L03CRED",
        "path": "pages/L03CRED.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"beSTAR 신청","miniLabel":"beSTAR 신청","code":"L04BEST","path":"pages/L04BEST.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020445","sourceMenuPath":["학사정보","학점인정신청","beSTAR 신청"],"sourceRow":71,"description":"beSTAR 신청 관련 도움말","guideStatus":"existing"},
          {"title":"연계/융합 전공 신청","miniLabel":"연계/융합 전공","code":"L04LINK","path":"pages/L04LINK.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020045","sourceMenuPath":["학사정보","학점인정신청","연계/융합 전공 신청"],"sourceRow":72,"description":"연계/융합 전공 관련 도움말","guideStatus":"existing"},
          {"title":"특별학점","miniLabel":"특별 학점","code":"L04SPCR","path":"pages/L04SPCR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020046","sourceMenuPath":["학사정보","학점인정신청","특별학점"],"sourceRow":73,"description":"특별 학점 관련 도움말","guideStatus":"existing"},
          {"title":"K-MOOC인정신청","miniLabel":"K-MOOC 인정","code":"L04KMOC","path":"pages/L04KMOC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020047","sourceMenuPath":["학사정보","학점인정신청","K-MOOC인정신청"],"sourceRow":74,"description":"K-MOOC 인정 관련 도움말","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03CRED.html"
      },
      {
        "title": "채플관리",
        "miniLabel": "채플 관리",
        "code": "L03CHPL",
        "path": "pages/L03CHPL.html",
        "enabled": true,
        "hideInNav": true,
        "generatedOverview": true,
        "children": [
          {"title":"채플/기독교이수현황","miniLabel":"채플 이수현황","code":"L04CHST","path":"pages/L04CHST.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020043","sourceMenuPath":["학사정보","채플관리","채플/기독교이수현황"],"sourceRow":75,"description":"채플 이수현황","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03CHPL.html"
      },
      {
        "title": "사회봉사",
        "miniLabel": "사회 봉사",
        "code": "L03SERV",
        "path": "pages/L03SERV.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"사회봉사 교과목신청","miniLabel":"사봉 교과목","code":"L04SVAP","path":"pages/L04SVAP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020032","sourceMenuPath":["학사정보","사회봉사","사회봉사 교과목신청"],"sourceRow":76,"description":"사봉 교과목 관련 도움말","guideStatus":"existing"},
          {"title":"사회봉사 신청내역 및 인증 확인","miniLabel":"사봉 내역","code":"L04SVCK","path":"pages/L04SVCK.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020033","sourceMenuPath":["학사정보","사회봉사","사회봉사 신청내역 및 인증 확인"],"sourceRow":77,"description":"사봉 내역 관련 도움말","guideStatus":"existing"},
          {"title":"사회봉사 현황","miniLabel":"사회봉사 현황","code":"L04SVST","path":"pages/L04SVST.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021864","sourceMenuPath":["학사정보","사회봉사","사회봉사 현황"],"sourceRow":78,"guideStatus":"pending"},
          {"title":"사회봉사 활동계획서 제출","miniLabel":"활동 계획서","code":"L04SVPL","path":"pages/L04SVPL.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020034","sourceMenuPath":["학사정보","사회봉사","사회봉사 활동계획서 제출"],"sourceRow":79,"description":"활동 계획서 관련 도움말","guideStatus":"existing"},
          {"title":"사회봉사 결과보고서 제출","miniLabel":"결과 보고서","code":"L04SVRP","path":"pages/L04SVRP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020035","sourceMenuPath":["학사정보","사회봉사","사회봉사 결과보고서 제출"],"sourceRow":80,"description":"결과 보고서 관련 도움말","guideStatus":"existing"},
          {"title":"심폐소생술 교과목 신청","miniLabel":"심폐교과 신청","code":"L04CPRA","path":"pages/L04CPRA.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021786","sourceMenuPath":["학사정보","사회봉사","심폐소생술 교과목 신청"],"sourceRow":81,"description":"심폐교과 신청 관련 도움말","guideStatus":"existing"},
          {"title":"심폐소생술 교과목 신청내역 확인","miniLabel":"심폐교과 신청확인","code":"L04CPRH","path":"pages/L04CPRH.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021787","sourceMenuPath":["학사정보","사회봉사","심폐소생술 교과목 신청내역 확인"],"sourceRow":82,"description":"심폐교과 신청확인 관련 도움말","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03SERV.html"
      },
      {
        "title": "해외봉사",
        "miniLabel": "해외 봉사",
        "code": "L03OVSV",
        "path": "pages/L03OVSV.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"해외봉사 신청","miniLabel":"해봉 신청","code":"L04OVAP","path":"pages/L04OVAP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020073","sourceMenuPath":["학사정보","해외봉사","해외봉사 신청"],"sourceRow":83,"description":"봉사단 파견 참가 온라인 신청","guideStatus":"existing"},
          {"title":"해외봉사 신청 내역 확인","miniLabel":"신청 내역","code":"L04OVCK","path":"pages/L04OVCK.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020074","sourceMenuPath":["학사정보","해외봉사","해외봉사 신청 내역 확인"],"sourceRow":84,"description":"신청서 심사 진행 및 최종 선발 결과 조회","guideStatus":"existing"},
          {"title":"해외봉사 결과보고서 작성","miniLabel":"결과 보고서","code":"L04OVRP","path":"pages/L04OVRP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020075","sourceMenuPath":["학사정보","해외봉사","해외봉사 결과보고서 작성"],"sourceRow":85,"description":"파견 종료 후 활동 결과서 및 소감문 제출","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03OVSV.html"
      }
    ],
    "overviewPath": "pages/L02ACAD.html"
  },
  {
    "title": "역량강화",
    "miniLabel": "역량 강화",
    "code": "L02COMP",
    "path": "pages/L02COMP.html",
    "enabled": true,
    "hideInNav": false,
    "generatedOverview": true,
    "children": [
      {
        "title": "SUPER 핵심역량",
        "miniLabel": "SUPER 핵심역량",
        "code": "L03SUCP",
        "path": "pages/L03SUCP.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"SUPER 핵심역량","miniLabel":"역량 안내","code":"L04SUPE","path":"pages/L04SUPE.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020477","sourceMenuPath":["역량강화","SUPER 핵심역량","SUPER 핵심역량"],"sourceRow":86,"description":"전주대학교 5대 SUPER 핵심역량 체계 안내","contentPath":"pages/L03SUCP.html","contentAnchor":"L04SUPE","guideStatus":"embedded"},
          {"title":"SUPER 핵심역량 인증 정보","miniLabel":"인증 정보","code":"L04SUCI","path":"pages/L04SUCI.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020478","sourceMenuPath":["역량강화","SUPER 핵심역량","SUPER 핵심역량 인증 정보"],"sourceRow":87,"description":"역량인증 요건 및 마일리지 획득 방법","contentPath":"pages/L03SUCP.html","contentAnchor":"L04SUCI","guideStatus":"embedded"},
          {"title":"SUPER 핵심역량 진단검사","miniLabel":"진단 검사","code":"L04SUDG","path":"pages/L04SUDG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020479","sourceMenuPath":["역량강화","SUPER 핵심역량","SUPER 핵심역량 진단검사"],"sourceRow":88,"description":"자가역량 측정 및 평가 설문 참여","guideStatus":"existing"},
          {"title":"SUPER 핵심역량 진단평가 결과 분석","miniLabel":"결과 분석","code":"L04SURS","path":"pages/L04SURS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020480","sourceMenuPath":["역량강화","SUPER 핵심역량","SUPER 핵심역량 진단평가 결과 분석"],"sourceRow":89,"description":"나의 5대 핵심역량 강·약점 분석 및 권장 가이드","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03SUCP.html"
      },
      {
        "title": "starT 프로그램",
        "miniLabel": "starT 프로그램",
        "code": "L03STRT",
        "path": "pages/L03STRT.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"starT 안내 및 혜택","miniLabel":"starT 안내 및 혜택","code":"L04STGD","path":"pages/L04STGD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020483","sourceMenuPath":["역량강화","starT 프로그램","starT 안내 및 혜택"],"sourceRow":90,"guideStatus":"embedded","contentPath":"pages/L03STRT.html","contentAnchor":"L04STBF","description":"starT 프로그램의 주요 혜택 안내"},
          {"title":"starT 신청 현황","miniLabel":"신청 현황","code":"L04STHS","path":"pages/L04STHS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020486","sourceMenuPath":["역량강화","starT 프로그램","starT 신청 현황"],"sourceRow":91,"description":"전체적인 스타T 프로그램 참여 현황 조회","guideStatus":"existing"},
          {"title":"starT 온라인 신청내역","miniLabel":"온라인 신청내역","code":"L04STOH","path":"pages/L04STOH.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020485","sourceMenuPath":["역량강화","starT 프로그램","starT 온라인 신청내역"],"sourceRow":92,"description":"온라인을 통해 접수한 프로그램 신청 상태 조회","guideStatus":"existing"},
          {"title":"starT 활동 인증","miniLabel":"활동 인증","code":"L04STCF","path":"pages/L04STCF.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020487","sourceMenuPath":["역량강화","starT 프로그램","starT 활동 인증"],"sourceRow":93,"description":"프로그램 수료에 따른 스타T 활동 인증 및 증명서 발급","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03STRT.html"
      },
      {
        "title": "비교과 프로그램",
        "miniLabel": "비교과 프로그램",
        "code": "L03NCUR",
        "path": "pages/L03NCUR.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"비교과 참여 신청","miniLabel":"참여 신청","code":"L04NCAP","path":"pages/L04NCAP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020504","sourceMenuPath":["역량강화","비교과 프로그램","비교과 참여 신청"],"sourceRow":94,"guideStatus":"pending"},
          {"title":"비교과 프로그램 추천","miniLabel":"비교과 추천","code":"L04NCRD","path":"pages/L04NCRD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020503","sourceMenuPath":["역량강화","비교과 프로그램","비교과 프로그램 추천"],"sourceRow":95,"guideStatus":"pending"},
          {"title":"비교과 신청현황/만족도 조사","miniLabel":"비교과 신청현황/만족도 조사","code":"L04NCSS","path":"pages/L04NCSS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020506","sourceMenuPath":["역량강화","비교과 프로그램","비교과 신청현황/만족도 조사"],"sourceRow":96,"guideStatus":"pending"},
          {"title":"비교과 활동 증명서","miniLabel":"활동 증명서","code":"L04NCCF","path":"pages/L04NCCF.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020507","sourceMenuPath":["역량강화","비교과 프로그램","비교과 활동 증명서"],"sourceRow":97,"guideStatus":"pending"}
        ]
      },
      {
        "title": "전공역량",
        "miniLabel": "전공 역량",
        "code": "L03MAJC",
        "path": "pages/L03MAJC.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"전공역량 자기평가 진단 검사","miniLabel":"역량 평가","code":"L04MJDG","path":"pages/L04MJDG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020461","sourceMenuPath":["역량강화","전공역량","전공역량 자기평가 진단 검사"],"sourceRow":98,"description":"나의 전공역량 자가진단검사 신청 및 참여","guideStatus":"existing"},
          {"title":"전공역량 자기평가 결과 분석","miniLabel":"결과 분석","code":"L04MJRS","path":"pages/L04MJRS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020462","sourceMenuPath":["역량강화","전공역량","전공역량 자기평가 결과 분석"],"sourceRow":99,"description":"진단검사 결과조회 및 역량별 강·약점 분석","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03MAJC.html"
      },
      {
        "title": "역량개발 프로그램",
        "miniLabel": "역량개발 프로그램",
        "code": "L03CPRG",
        "path": "pages/L03CPRG.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"Together","miniLabel":"투게더 (P)","code":"L04TGTH","path":"pages/L04TGTH.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020524","sourceMenuPath":["역량강화","역량개발 프로그램","Together"],"sourceRow":100,"guideStatus":"pending"},
          {"title":"진로 해시태그(#)","miniLabel":"진로 해시태그(#)","code":"L04CRHT","path":"pages/L04CRHT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021788","sourceMenuPath":["역량강화","역량개발 프로그램","진로 해시태그(#)"],"sourceRow":101,"guideStatus":"pending"}
        ]
      }
    ]
  },
  {
    "title": "진로개발 및 상담",
    "miniLabel": "진로·상담",
    "code": "L02CARE",
    "path": "pages/L02CARE.html",
    "enabled": true,
    "hideInNav": false,
    "generatedOverview": true,
    "children": [
      {
        "title": "커리어로드맵",
        "miniLabel": "커리어 로드맵",
        "code": "L03CRMP",
        "path": "pages/L03CRMP.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"목표직무 탐색","miniLabel":"목표직무 탐색","code":"L04TGJB","path":"pages/L04TGJB.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020140","sourceMenuPath":["진로개발 및 상담","커리어로드맵","목표직무 탐색"],"sourceRow":102,"guideStatus":"pending"},
          {"title":"관심직무 자가진단","miniLabel":"관심직무 자가진단","code":"L04INJB","path":"pages/L04INJB.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020944","sourceMenuPath":["진로개발 및 상담","커리어로드맵","관심직무 자가진단"],"sourceRow":103,"guideStatus":"pending"},
          {"title":"My 직무개발현황","miniLabel":"직무개발 현황","code":"L04MJDV","path":"pages/L04MJDV.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020138","sourceMenuPath":["진로개발 및 상담","커리어로드맵","My 직무개발현황"],"sourceRow":104,"guideStatus":"pending"},
          {"title":"학과별 커리어로드맵","miniLabel":"학과별 로드맵","code":"L04DCRM","path":"pages/L04DCRM.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020142","sourceMenuPath":["진로개발 및 상담","커리어로드맵","학과별 커리어로드맵"],"sourceRow":105,"guideStatus":"pending"},
          {"title":"My 커리어로드맵","miniLabel":"MY 로드맵","code":"L04MCRM","path":"pages/L04MCRM.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020139","sourceMenuPath":["진로개발 및 상담","커리어로드맵","My 커리어로드맵"],"sourceRow":106,"guideStatus":"pending"},
          {"title":"선도학생 커리어패스","miniLabel":"선도학생 커리어패스","code":"L04LEAD","path":"pages/L04LEAD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020141","sourceMenuPath":["진로개발 및 상담","커리어로드맵","선도학생 커리어패스"],"sourceRow":107,"guideStatus":"pending"}
        ]
      },
      {
        "title": "직무탐색",
        "miniLabel": "직무 탐색",
        "code": "L03JOBE",
        "path": "pages/L03JOBE.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"직무역량 소개","miniLabel":"직무역량 소개","code":"L04JBCP","path":"pages/L04JBCP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020508","sourceMenuPath":["진로개발 및 상담","직무탐색","직무역량 소개"],"sourceRow":108,"guideStatus":"pending"},
          {"title":"JJCS 직무탐색","miniLabel":"JJCS 직무탐색","code":"L04JJCS","path":"pages/L04JJCS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020509","sourceMenuPath":["진로개발 및 상담","직무탐색","JJCS 직무탐색"],"sourceRow":109,"guideStatus":"pending"},
          {"title":"JJKECO 직무탐색","miniLabel":"JJKECO 직무탐색","code":"L04JJKE","path":"pages/L04JJKE.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020510","sourceMenuPath":["진로개발 및 상담","직무탐색","JJKECO 직무탐색"],"sourceRow":110,"guideStatus":"pending"},
          {"title":"직무역량 탐색","miniLabel":"직무역량 탐색","code":"L04JBEF","path":"pages/L04JBEF.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020511","sourceMenuPath":["진로개발 및 상담","직무탐색","직무역량 탐색"],"sourceRow":111,"guideStatus":"pending"}
        ]
      },
      {
        "title": "진로·진단검사",
        "miniLabel": "진로 진단",
        "code": "L03TEST",
        "path": "pages/L03TEST.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"직업흥미검사(STRONG)","miniLabel":"직업흥미 STRONG","code":"L04STRG","path":"pages/L04STRG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020520","sourceMenuPath":["진로개발 및 상담","진로·진단검사","직업흥미검사(STRONG)"],"sourceRow":112,"description":"직무&현장 흥미도 기반 진로 추천","guideStatus":"existing"},
          {"title":"성격검사(MBTI)","miniLabel":"성격 MBTI","code":"L04MBTI","path":"pages/L04MBTI.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020518","sourceMenuPath":["진로개발 및 상담","진로·진단검사","성격검사(MBTI)"],"sourceRow":113,"description":"나의 성격 유형에 따른 공부법 제시","guideStatus":"existing"},
          {"title":"학습유형검사(U&I)","miniLabel":"학습유형 U&I","code":"L04UITY","path":"pages/L04UITY.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020519","sourceMenuPath":["진로개발 및 상담","진로·진단검사","학습유형검사(U&I)"],"sourceRow":114,"description":"개인 학습스타일에 맞는 효율적인 학습법 제시","guideStatus":"existing"},
          {"title":"카운슬링센터 심리검사","miniLabel":"카운슬링 진단","code":"L04PSYC","path":"pages/L04PSYC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020521","sourceMenuPath":["진로개발 및 상담","진로·진단검사","카운슬링센터 심리검사"],"sourceRow":115,"description":"전주대가 제공하는 정밀 심리 검사","guideStatus":"existing"},
          {"title":"우리대학 기타 진단검사","miniLabel":"기타 검사","code":"L04ETCT","path":"pages/L04ETCT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020517","sourceMenuPath":["진로개발 및 상담","진로·진단검사","우리대학 기타 진단검사"],"sourceRow":116,"description":"맞춤서비스를 위한 각종 검사","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03TEST.html"
      },
      {
        "title": "상담",
        "miniLabel": "상담",
        "code": "L03COUN",
        "path": "pages/L03COUN.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"상담안내","miniLabel":"상담 안내","code":"L04CNGD","path":"pages/L04CNGD.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020512","sourceMenuPath":["진로개발 및 상담","상담","상담안내"],"sourceRow":117,"description":"상담 신청 및 진행 안내","contentPath":"pages/L03COUN.html","contentAnchor":"L04CNGD","guideStatus":"embedded"},
          {"title":"1:1 상담","miniLabel":"1:1 상담","code":"L04CN11","path":"pages/L04CN11.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020513","sourceMenuPath":["진로개발 및 상담","상담","1:1 상담"],"sourceRow":118,"description":"전문 상담사의 1대1 코칭","guideStatus":"existing"},
          {"title":"멘토링","miniLabel":"선후배 멘토링","code":"L04MENT","path":"pages/L04MENT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020514","sourceMenuPath":["진로개발 및 상담","상담","멘토링"],"sourceRow":119,"description":"선배 멘토에게 얻어가는 꿀팁","guideStatus":"existing"},
          {"title":"온라인 상담 신청","miniLabel":"온라인 상담","code":"L04ONCN","path":"pages/L04ONCN.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020515","sourceMenuPath":["진로개발 및 상담","상담","온라인 상담 신청"],"sourceRow":120,"description":"방문 없이 온라인으로 간편 상담","guideStatus":"existing"},
          {"title":"카운슬링센터 심리 상담","miniLabel":"카운슬링센터 심리 상담","code":"L04PSCN","path":"pages/L04PSCN.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020516","sourceMenuPath":["진로개발 및 상담","상담","카운슬링센터 심리 상담"],"sourceRow":121,"guideStatus":"pending"}
        ],
        "overviewPath": "pages/L03COUN.html"
      }
    ]
  },
  {
    "title": "취·창업지원",
    "miniLabel": "취·창업",
    "code": "L02JOBS",
    "path": "pages/L02JOBS.html",
    "enabled": true,
    "hideInNav": false,
    "generatedOverview": true,
    "children": [
      {
        "title": "창업",
        "miniLabel": "창업",
        "code": "L03STUP",
        "path": "pages/L03STUP.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"사업참여이력","miniLabel":"사업 참여이력","code":"L04BIZH","path":"pages/L04BIZH.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020532","sourceMenuPath":["취·창업지원","창업","사업참여이력"],"sourceRow":122,"guideStatus":"pending"},
          {"title":"창업 장학금 신청","miniLabel":"창업 장학금","code":"L04STSC","path":"pages/L04STSC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020533","sourceMenuPath":["취·창업지원","창업","창업 장학금 신청"],"sourceRow":123,"guideStatus":"pending"}
        ]
      },
      {
        "title": "취업정보",
        "miniLabel": "취업 정보",
        "code": "L03EMPI",
        "path": "pages/L03EMPI.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"교내 채용 정보","miniLabel":"교내 채용","code":"L04INJP","path":"pages/L04INJP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020534","sourceMenuPath":["취·창업지원","취업정보","교내 채용 정보"],"sourceRow":124,"guideStatus":"pending"},
          {"title":"기업 정보","miniLabel":"기업 정보","code":"L04COMP","path":"pages/L04COMP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020535","sourceMenuPath":["취·창업지원","취업정보","기업 정보"],"sourceRow":125,"guideStatus":"pending"},
          {"title":"맞춤형 채용정보","miniLabel":"맞춤형 채용","code":"L04MTJP","path":"pages/L04MTJP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020536","sourceMenuPath":["취·창업지원","취업정보","맞춤형 채용정보"],"sourceRow":126,"guideStatus":"pending"},
          {"title":"기관요청 채용정보","miniLabel":"기관 채용","code":"L04REQJ","path":"pages/L04REQJ.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020537","sourceMenuPath":["취·창업지원","취업정보","기관요청 채용정보"],"sourceRow":127,"guideStatus":"pending"},
          {"title":"채용포털 채용정보","miniLabel":"채용 포털","code":"L04PTJP","path":"pages/L04PTJP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020538","sourceMenuPath":["취·창업지원","취업정보","채용포털 채용정보"],"sourceRow":128,"guideStatus":"pending"},
          {"title":"취업정보","miniLabel":"취업정보","code":"L04JBIN","path":"pages/L04JBIN.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021865","sourceMenuPath":["취·창업지원","취업정보","취업정보"],"sourceRow":129,"guideStatus":"pending"},
          {"title":"대외활동","miniLabel":"대외활동","code":"L04EXAC","path":"pages/L04EXAC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021789","sourceMenuPath":["취·창업지원","취업정보","대외활동"],"sourceRow":130,"guideStatus":"pending"},
          {"title":"취업성공기","miniLabel":"취업성공기","code":"L04JBST","path":"pages/L04JBST.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021790","sourceMenuPath":["취·창업지원","취업정보","취업성공기"],"sourceRow":131,"guideStatus":"pending"}
        ]
      },
      {
        "title": "현장실습학기제",
        "miniLabel": "현장실습 학기제",
        "code": "L03INTR",
        "path": "pages/L03INTR.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"서약서 작성/개인정보 동의","miniLabel":"서약서 작성/개인정보 동의","code":"L04INAG","path":"pages/L04INAG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020541","sourceMenuPath":["취·창업지원","현장실습학기제","서약서 작성/개인정보 동의"],"sourceRow":132,"guideStatus":"pending"},
          {"title":"현장실습학기제 참여 신청","miniLabel":"참여 신청","code":"L04INAP","path":"pages/L04INAP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020543","sourceMenuPath":["취·창업지원","현장실습학기제","현장실습학기제 참여 신청"],"sourceRow":133,"guideStatus":"pending"},
          {"title":"현장실습학기제 참여 내역","miniLabel":"참여 내역","code":"L04INHI","path":"pages/L04INHI.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020544","sourceMenuPath":["취·창업지원","현장실습학기제","현장실습학기제 참여 내역"],"sourceRow":134,"guideStatus":"pending"},
          {"title":"만족도 평가","miniLabel":"만족도 평가","code":"L04INSV","path":"pages/L04INSV.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020545","sourceMenuPath":["취·창업지원","현장실습학기제","만족도 평가"],"sourceRow":135,"guideStatus":"pending"},
          {"title":"중도 포기 신청","miniLabel":"중도 포기","code":"L04INDR","path":"pages/L04INDR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020546","sourceMenuPath":["취·창업지원","현장실습학기제","중도 포기 신청"],"sourceRow":136,"guideStatus":"pending"},
          {"title":"FAQ","miniLabel":"주요 질문","code":"L04INFA","path":"pages/L04INFA.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020539","sourceMenuPath":["취·창업지원","현장실습학기제","FAQ"],"sourceRow":137,"guideStatus":"pending"}
        ]
      }
    ]
  },
  {
    "title": "대학생활",
    "miniLabel": "대학 생활",
    "code": "L02LIFE",
    "path": "pages/L02LIFE.html",
    "enabled": true,
    "hideInNav": false,
    "generatedOverview": true,
    "children": [
      {
        "title": "학생회 활동",
        "miniLabel": "학생회 활동",
        "code": "L03STCN",
        "path": "pages/L03STCN.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"총학생회 선거","miniLabel":"선거","code":"L04ELCT","path":"pages/L04ELCT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020079","sourceMenuPath":["대학생활","학생회 활동","총학생회 선거"],"sourceRow":138,"description":"온라인 투표를 통한 학생 자치기구 선거 참여","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03STCN.html"
      },
      {
        "title": "원격교육 TA 운영",
        "miniLabel": "TA",
        "code": "L03TAOP",
        "path": "pages/L03TAOP.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"TA 근무일지 입력","miniLabel":"일지 입력","code":"L04TALG","path":"pages/L04TALG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020488","sourceMenuPath":["대학생활","원격교육 TA 운영","TA 근무일지 입력"],"sourceRow":139,"description":"원격교육 조교(TA) 일일 근무 내용 입력 및 보관","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03TAOP.html"
      },
      {
        "title": "산학협력활동",
        "miniLabel": "산학 협력",
        "code": "L03INDS",
        "path": "pages/L03INDS.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"산학협력 연구 참여 확인서","miniLabel":"참여 확인서","code":"L04INDC","path":"pages/L04INDC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020164","sourceMenuPath":["대학생활","산학협력활동","산학협력 연구 참여 확인서"],"sourceRow":140,"guideStatus":"pending"}
        ]
      },
      {
        "title": "통학버스",
        "miniLabel": "통학 버스",
        "code": "L03BUSS",
        "path": "pages/L03BUSS.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"통학버스 노선도","miniLabel":"버스 노선도","code":"L04BUSM","path":"pages/L04BUSM.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019984","sourceMenuPath":["대학생활","통학버스","통학버스 노선도"],"sourceRow":141,"description":"지역별 버스 노선과 정류장 위치 확인","contentPath":"pages/L03BUSS.html","contentAnchor":"L04BUSM","guideStatus":"embedded"},
          {"title":"통학버스 신청","miniLabel":"탑승 신청","code":"L04BUSA","path":"pages/L04BUSA.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019985","sourceMenuPath":["대학생활","통학버스","통학버스 신청"],"sourceRow":142,"description":"통학버스 이용신청 방법","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03BUSS.html"
      },
      {
        "title": "시설 예약/신고",
        "miniLabel": "시설 예약",
        "code": "L03ETAC",
        "path": "pages/L03ETAC.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"강의실 잔류 신청","miniLabel":"잔류 신청","code":"L04ROOMS","path":"pages/L04ROOMS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020466","sourceMenuPath":["대학생활","시설 예약/신고","강의실 잔류 신청"],"sourceRow":143,"description":"야간이나 방과 후 기자재 사용 등을 위한 강의실 잔류 허가 신청","guideStatus":"existing"},
          {"title":"시설 관련 요청","miniLabel":"시설 관련 요청","code":"L04FREQ","path":"pages/L04FREQ.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020554","sourceMenuPath":["대학생활","시설 예약/신고","시설 관련 요청"],"sourceRow":144,"guideStatus":"pending"}
        ],
        "overviewPath": "pages/L03ETAC.html"
      },
      {
        "title": "학생생활관",
        "miniLabel": "기숙사 생활",
        "code": "L03DORM",
        "path": "pages/L03DORM.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"학생생활관 입사 신청","miniLabel":"입사","code":"L04DMAP","path":"pages/L04DMAP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020002","sourceMenuPath":["대학생활","학생생활관","학생생활관 입사 신청"],"sourceRow":145,"description":"온라인 기숙사 입사신청","guideStatus":"existing"},
          {"title":"입사서약서 작성","miniLabel":"서약서 작성","code":"L04DMPG","path":"pages/L04DMPG.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020001","sourceMenuPath":["대학생활","학생생활관","입사서약서 작성"],"sourceRow":146,"description":"기숙사 입사를 위한 서약서 작성","contentPath":"pages/L03DORM.html","contentAnchor":"L04DMPG","guideStatus":"embedded"},
          {"title":"관실신청","miniLabel":"관실 신청","code":"L04ROOM","path":"pages/L04ROOM.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019993","sourceMenuPath":["대학생활","학생생활관","관실신청"],"sourceRow":147,"description":"원하는 방(관실) 신청","guideStatus":"existing"},
          {"title":"학생생활관비 납입고지서","miniLabel":"납입 고지서","code":"L04DMBI","path":"pages/L04DMBI.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019998","sourceMenuPath":["대학생활","학생생활관","학생생활관비 납입고지서"],"sourceRow":148,"description":"해당학기 기숙사비 납부고지서 확인","contentPath":"pages/L03DORM.html","contentAnchor":"L04DMBI","guideStatus":"embedded"},
          {"title":"학생생활관비 납부확인서","miniLabel":"납부 확인서","code":"L04DMCF","path":"pages/L04DMCF.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019994","sourceMenuPath":["대학생활","학생생활관","학생생활관비 납부확인서"],"sourceRow":149,"description":"전체 기숙사비 납부 결과 및 확인서 출력","contentPath":"pages/L03DORM.html","contentAnchor":"L04DMCF","guideStatus":"embedded"},
          {"title":"늦은귀사신청","miniLabel":"늦은 귀사","code":"L04LATR","path":"pages/L04LATR.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019995","sourceMenuPath":["대학생활","학생생활관","늦은귀사신청"],"sourceRow":150,"description":"통금시간 이후 귀사 필요시 신청","contentPath":"pages/L03DORM.html","contentAnchor":"L04LATR","guideStatus":"embedded"},
          {"title":"상벌점조회","miniLabel":"상벌점 조회","code":"L04PNTS","path":"pages/L04PNTS.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019997","sourceMenuPath":["대학생활","학생생활관","상벌점조회"],"sourceRow":151,"description":"기숙사 유지를 위한 상벌점 조회","contentPath":"pages/L03DORM.html","contentAnchor":"L04PNTS","guideStatus":"embedded"},
          {"title":"외박신청","miniLabel":"외박","code":"L04OUTS","path":"pages/L04OUTS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020000","sourceMenuPath":["대학생활","학생생활관","외박신청"],"sourceRow":152,"description":"기숙사 외 숙박 필요시 신청","guideStatus":"existing"},
          {"title":"조기 취침 신청","miniLabel":"조기 취침","code":"L04SLEP","path":"pages/L04SLEP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020003","sourceMenuPath":["대학생활","학생생활관","조기 취침 신청"],"sourceRow":153,"description":"특별 사유로 취침 필요시 신청","guideStatus":"existing"},
          {"title":"불편사항 신청","miniLabel":"불편 사항","code":"L04INCV","path":"pages/L04INCV.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019996","sourceMenuPath":["대학생활","학생생활관","불편사항 신청"],"sourceRow":154,"description":"기숙사 내 시설 고장 등 불편사항 건의","guideStatus":"existing"},
          {"title":"퇴사 신청","miniLabel":"퇴사","code":"L04LEVD","path":"pages/L04LEVD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020004","sourceMenuPath":["대학생활","학생생활관","퇴사 신청"],"sourceRow":155,"description":"기숙사 퇴사 신청 및 동의서 작성","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03DORM.html"
      },
      {
        "title": "해외연수",
        "miniLabel": "해외 연수",
        "code": "L03OVTR",
        "path": "pages/L03OVTR.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"해외 연수 신청","miniLabel":"연수 신청","code":"L04TRAP","path":"pages/L04TRAP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020463","sourceMenuPath":["대학생활","해외연수","해외 연수 신청"],"sourceRow":156,"description":"어학연수, 교환학생 등 대학 해외 연수 프로그램 참가 신청","guideStatus":"existing"},
          {"title":"해외 입·출국 신고","miniLabel":"입출국 신고","code":"L04TRDG","path":"pages/L04TRDG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020464","sourceMenuPath":["대학생활","해외연수","해외 입·출국 신고"],"sourceRow":157,"description":"연수 파견 전 출국 신고 및 복귀 후 입국 신고 접수","guideStatus":"existing"}
        ],
        "overviewPath": "pages/L03OVTR.html"
      },
      {
        "title": "캡스톤디자인",
        "miniLabel": "캡스톤 디자인",
        "code": "L03CAPS",
        "path": "pages/L03CAPS.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"캡스톤디자인 서약서동의","miniLabel":"서약서 동의","code":"L04CPAG","path":"pages/L04CPAG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020126","sourceMenuPath":["대학생활","캡스톤디자인","캡스톤디자인 서약서동의"],"sourceRow":158,"guideStatus":"pending"},
          {"title":"신청확인 및 관리","miniLabel":"신청 확인","code":"L04CPMG","path":"pages/L04CPMG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020127","sourceMenuPath":["대학생활","캡스톤디자인","신청확인 및 관리"],"sourceRow":159,"guideStatus":"pending"},
          {"title":"카드대여","miniLabel":"카드 대여","code":"L04CARD","path":"pages/L04CARD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020128","sourceMenuPath":["대학생활","캡스톤디자인","카드대여"],"sourceRow":160,"guideStatus":"pending"}
        ]
      },
      {
        "title": "개인(팀) 프로젝트",
        "miniLabel": "개인(팀) 프로젝트",
        "code": "L03PJCT",
        "path": "pages/L03PJCT.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"개인(팀) 프로젝트","miniLabel":"개인/팀 프로젝트","code":"L04PRJT","path":"pages/L04PRJT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020523","sourceMenuPath":["대학생활","개인(팀) 프로젝트","개인(팀) 프로젝트"],"sourceRow":161,"guideStatus":"pending"}
        ]
      }
    ],
    "overviewPath": "pages/L02LIFE.html"
  },
  {
    "title": "My Page",
    "miniLabel": "My Page",
    "code": "L02MYPG",
    "path": "pages/L02MYPG.html",
    "enabled": true,
    "hideInNav": false,
    "generatedOverview": true,
    "children": [
      {
        "title": "나의정보",
        "miniLabel": "나의 정보",
        "code": "L03MYIN",
        "path": "pages/L03MYIN.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"My 정보","miniLabel":"MY 정보","code":"L04MYIF","path":"pages/L04MYIF.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020007","sourceMenuPath":["My Page","나의정보","My 정보"],"sourceRow":162,"guideStatus":"pending"},
          {"title":"희망학과 선택","miniLabel":"희망 학과","code":"L04HMJR","path":"pages/L04HMJR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020404","sourceMenuPath":["My Page","나의정보","희망학과 선택"],"sourceRow":163,"description":"희망학과롤 찾고 선택 (전공자율선택제 적용 학과 전용)","guideStatus":"existing"},
          {"title":"학과 선택","miniLabel":"학과 선택","code":"L04DEPT","path":"pages/L04DEPT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020439","sourceMenuPath":["My Page","나의정보","학과 선택"],"sourceRow":164,"description":"학과 선택 관련 도움말","guideStatus":"existing"},
          {"title":"학부모 학사정보조회 승인","miniLabel":"학부모 조회승인","code":"L04PAPR","path":"pages/L04PAPR.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020444","sourceMenuPath":["My Page","나의정보","학부모 학사정보조회 승인"],"sourceRow":165,"description":"학부모 조회승인 관련 도움말","guideStatus":"existing"},
          {"title":"학생예비군 신청","miniLabel":"학생예비군 신청","code":"L04RESV","path":"pages/L04RESV.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021791","sourceMenuPath":["My Page","나의정보","학생예비군 신청"],"sourceRow":166,"guideStatus":"pending"}
        ]
      },
      {
        "title": "취업역량",
        "miniLabel": "취업역량",
        "code": "L03EMPC",
        "path": "pages/L03EMPC.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"My 대학생활 로드맵","miniLabel":"MY 로드맵","code":"L04MYLF","path":"pages/L04MYLF.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020558","sourceMenuPath":["My Page","취업역량","My 대학생활 로드맵"],"sourceRow":167,"guideStatus":"pending"},
          {"title":"My 역량개발","miniLabel":"MY 역량개발","code":"L04MYCP","path":"pages/L04MYCP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020556","sourceMenuPath":["My Page","취업역량","My 역량개발"],"sourceRow":168,"guideStatus":"pending"},
          {"title":"My 직무역량","miniLabel":"MY 직무역량","code":"L04MYJB","path":"pages/L04MYJB.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020557","sourceMenuPath":["My Page","취업역량","My 직무역량"],"sourceRow":169,"guideStatus":"pending"},
          {"title":"My 커리어","miniLabel":"MY 커리어","code":"L04MYCR","path":"pages/L04MYCR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020559","sourceMenuPath":["My Page","취업역량","My 커리어"],"sourceRow":170,"guideStatus":"pending"},
          {"title":"My 포트폴리오","miniLabel":"My 포트폴리오","code":"L04PORT","path":"pages/L04PORT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021792","sourceMenuPath":["My Page","취업역량","My 포트폴리오"],"sourceRow":171,"guideStatus":"pending"}
        ]
      },
      {
        "title": "수상·인증 내역",
        "miniLabel": "수상·인증",
        "code": "L03AWCT",
        "path": "pages/L03AWCT.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"교내 수상내역","miniLabel":"교내 수상","code":"L04AWIN","path":"pages/L04AWIN.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020468","sourceMenuPath":["My Page","수상·인증 내역","교내 수상내역"],"sourceRow":172,"description":"재학 중 교내 대회 및 공모전 등의 수상 내역 조회","contentPath":"pages/L03AWAR.html","contentAnchor":"L04AWIN","guideStatus":"embedded"},
          {"title":"성적우수상내역","miniLabel":"성적 우수상","code":"L04AWRD","path":"pages/L04AWRD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020449","sourceMenuPath":["My Page","수상·인증 내역","성적우수상내역"],"sourceRow":173,"description":"성적 우수상","guideStatus":"existing"},
          {"title":"학습경험 인증 현황","miniLabel":"학습경험 인증현황","code":"L04EXCH","path":"pages/L04EXCH.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020561","sourceMenuPath":["My Page","수상·인증 내역","학습경험 인증 현황"],"sourceRow":174,"guideStatus":"pending"},
          {"title":"마이크로 전공 인증서","miniLabel":"micro전공 인증서","code":"L04MCRT","path":"pages/L04MCRT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020037","sourceMenuPath":["My Page","수상·인증 내역","마이크로 전공 인증서"],"sourceRow":175,"description":"micro전공 인증서","guideStatus":"existing"}
        ]
      }
    ],
    "sourceAliases": ["SUPER STAR"]
  }
];
