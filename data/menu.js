// Menu list with confirmed operating changes from 2026-11-19.
window.JJSTAR_MENU = [
  {
    "title": "JJSTAR 이용 가이드",
    "description": "JJSTAR 서비스와 가이드 안내",
    "miniLabel": "메인 가이드",
    "code": "L01INIT",
    "path": "pages/L01INIT.html",
    "enabled": true,
    "children": [
      {
        "title": "JJSTAR 메인화면",
        "description": "JJSTAR 메인화면 구성 안내",
        "miniLabel": "메인 화면",
        "code": "L02MAIN",
        "path": "pages/L02MAIN.html",
        "enabled": true,
        "children": []
      },
      {
        "title": "제이제이랑 JJSTAR 여행하기",
        "description": "제이제이와 살펴보는 학생 혜택",
        "miniLabel": "JJSTAR 가이드북",
        "code": "L02JEJE",
        "path": "pages/L02JEJE.html",
        "enabled": true,
        "children": []
      },
      {
        "title": "One-Stop 서비스란?",
        "description": "주요 일정과 원스톱 서비스 안내",
        "miniLabel": "원스톱 서비스",
        "code": "L02OSTP",
        "path": "pages/L02OSTP.html",
        "enabled": true,
        "children": []
      },
      {
        "title": "로그인 및 OTP 인증",
        "description": "로그인과 OTP 등록·인증 안내",
        "miniLabel": "로그인·OTP",
        "code": "L02LOGN",
        "path": "pages/L02LOGN.html",
        "directUrl": "https://jjstar.jj.ac.kr/",
        "showDirectLink": false,
        "enabled": true,
        "children": []
      },
      {
        "title": "RAG + AI 검색서비스",
        "description": "교내 정보 질문과 검색 안내",
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
    "description": "등록·장학과 학교생활 기본 지원",
    "miniLabel": "STAR 지원",
    "code": "L02SUPP",
    "path": "pages/L02SUPP.html",
    "enabled": true,
    "hideInNav": false,
    "generatedOverview": true,
    "children": [
      {
        "title": "정보조회",
        "description": "학사일정·시간표·교육과정 확인",
        "miniLabel": "정보조회",
        "code": "L03STMG",
        "path": "pages/L03STMG.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "sourceAliases": [
          "star 관리",
          "star관리"
        ],
        "overviewPath": "pages/L03STMG.html",
        "children": [
          {"title":"학사일정","miniLabel":"학사 일정","code":"L04ACSC","path":"pages/L04ACSC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020406","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","정보조회","학사일정"],"sourceRow":11,"description":"월별 학사일정과 주요 행사 확인","guideStatus":"existing"},
          {"title":"교원 시간표","miniLabel":"교원 시간표","code":"L04PRTS","path":"pages/L04PRTS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019963","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","정보조회","교원 시간표"],"sourceRow":12,"description":"교수별 강의 시간표와 수업정보 확인","guideStatus":"existing","sourceAliases":["교원 시간표 조회"]},
          {"title":"교육과정 및 수강편람","miniLabel":"교육과정 및 수강편람","code":"L04EDGD","path":"pages/L04EDGD.html","enabled":true,"hideInNav":false,"directUrl":"https://jjstar.jj.ac.kr/","guideStatus":"existing","description":"연도·학기별 편람 게시물 확인","sourceMenuPath":["STAR 지원","정보조회","교육과정 및 수강편람"],"sourceDomId":"M000022752"},
          {"title":"교육과정조회","miniLabel":"교육 과정","code":"L04EDCR","path":"pages/L04EDCR.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020405","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","정보조회","교육과정조회"],"sourceRow":13,"sourceAliases":["교육과정"],"description":"단과대학·학과별 교육과정 안내","contentPath":"pages/L03STMG.html","contentAnchor":"L04EDCR","guideStatus":"embedded","operationStatus":"retained"},
          {"title":"교육과정편람","miniLabel":"교과 편람","code":"L04EDCRB","path":"pages/L04EDCRB.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019965","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","정보조회","교육과정편람"],"sourceRow":14,"description":"학과 교육과정과 이수기준·교과목 해설","guideStatus":"existing","operationStatus":"retained"},
          {"title":"수강편람","miniLabel":"수강 편람","code":"L04SGGD","path":"pages/L04SGGD.html","enabled":true,"hideInNav":true,"sourceDomId":"M000021007","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","정보조회","수강편람"],"sourceRow":15,"description":"학기별 개설과목 수강편람 열람","contentPath":"pages/L03STMG.html","contentAnchor":"L04SGGD","guideStatus":"embedded","operationStatus":"retained"}
        ]
      },
      {
        "title": "등록관리",
        "description": "등록금 납부·분납·환불 관리",
        "miniLabel": "등록관리",
        "code": "L03REGI",
        "path": "pages/L03REGI.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03REGI.html",
        "children": [
          {"title":"등록금 고지서","miniLabel":"등록금 고지서","code":"L04TUIB","path":"pages/L04TUIB.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019972","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","등록관리","등록금 고지서"],"sourceRow":16,"description":"등록금 고지·납부 안내와 고지서 출력","contentPath":"pages/L03REGI.html","contentAnchor":"L04TUIB","guideStatus":"embedded"},
          {"title":"분할납부 신청","miniLabel":"분할 납부","code":"L04INST","path":"pages/L04INST.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019973","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","등록관리","분할납부 신청"],"sourceRow":17,"description":"등록금 분납차수 선택과 신청서 제출","guideStatus":"existing"},
          {"title":"등록금 납부 내역","miniLabel":"납부 내역","code":"L04TUHI","path":"pages/L04TUHI.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019974","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","등록관리","등록금 납부 내역"],"sourceRow":18,"description":"등록금 납부내역 확인과 확인서 출력","contentPath":"pages/L03REGI.html","contentAnchor":"L04TUHI","guideStatus":"embedded"},
          {"title":"교육비 납입 증명서 출력","miniLabel":"납입 증명서","code":"L04PAYC","path":"pages/L04PAYC.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019975","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","등록관리","교육비 납입 증명서 출력"],"sourceRow":19,"description":"교육비 납입내역 조회와 증명서 출력","contentPath":"pages/L03REGI.html","contentAnchor":"L04PAYC","guideStatus":"embedded"},
          {"title":"등록금 환불요청","miniLabel":"환불","code":"L04REFD","path":"pages/L04REFD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019976","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","등록관리","등록금 환불요청"],"sourceRow":20,"description":"환불계좌·동의사항 작성과 환불 신청","guideStatus":"existing"}
        ]
      },
      {
        "title": "장학관리",
        "description": "장학금 검색·신청과 수혜 관리",
        "miniLabel": "장학관리",
        "code": "L03SCHL",
        "path": "pages/L03SCHL.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03SCHL.html",
        "children": [
          {"title":"장학 공지사항","miniLabel":"장학 공지","code":"L04SCHN","path":"pages/L04SCHN.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019967","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","장학관리","장학 공지사항"],"sourceRow":21,"description":"장학금 관련 공지사항과 안내 확인","contentPath":"pages/L03SCHL.html","contentAnchor":"L04SCHN","guideStatus":"embedded"},
          {"title":"장학금 조회","description":"장학금 조건 검색과 상세정보 확인","miniLabel":"장학금 조회","code":"L04SCHQ","path":"pages/L04SCHQ.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021781","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","장학관리","장학금 조회"],"sourceRow":22,"guideStatus":"existing"},
          {"title":"장학금 온라인신청","miniLabel":"장학금 온라인신청","code":"L04SCHP","path":"pages/L04SCHP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019968","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","장학관리","장학금 온라인신청"],"guideStatus":"existing","description":"장학금별 신청서 작성과 서류 제출"},
          {"title":"장학금 지급계좌관리","miniLabel":"계좌 관리","code":"L04SCHA","path":"pages/L04SCHA.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019969","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","장학관리","장학금 지급계좌관리"],"sourceRow":23,"description":"장학금 지급계좌 등록과 변경","guideStatus":"existing"},
          {"title":"장학금 수혜현황","miniLabel":"수혜 현황","code":"L04SCHS","path":"pages/L04SCHS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019970","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","장학관리","장학금 수혜현황"],"sourceRow":24,"description":"재학 중 장학금 수혜내역 확인","guideStatus":"existing"}
        ]
      },
      {
        "title": "공동체",
        "description": "RC 공동체 구성·활동·상담 관리",
        "miniLabel": "공동체",
        "code": "L03COMM",
        "path": "pages/L03COMM.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03COMM.html",
        "children": [
          {"title":"사제동행교수선택","miniLabel":"사제 동행","code":"L04SAJE","path":"pages/L04SAJE.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019964","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","공동체","사제동행교수선택"],"sourceRow":25,"sourceAliases":["사제동행교수선택(신규)"],"description":"지도교수 선택 및 선정내역","guideStatus":"existing"},
          {"title":"공동체구성 및 활동내역","miniLabel":"공동체 구성&활동","code":"L04CMAC","path":"pages/L04CMAC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020862","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","공동체","공동체구성 및 활동내역"],"sourceRow":27,"description":"공동체 구성원과 활동내역 확인","guideStatus":"existing"},
          {"title":"공동체 활동 결과보고","miniLabel":"활동 결과보고","code":"L04CMRP","path":"pages/L04CMRP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020863","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","공동체","공동체 활동 결과보고"],"sourceRow":28,"description":"주차별 활동보고서와 상세일지 관리","guideStatus":"existing"},
          {"title":"공동체 멘토상담 입력","miniLabel":"멘토 상담","code":"L04CMMT","path":"pages/L04CMMT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020864","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","공동체","공동체 멘토상담 입력"],"sourceRow":29,"description":"공동체 팀원별 멘토상담 일지 관리","guideStatus":"existing"},
          {"title":"전공상담신청","description":"전공상담 일정과 신청내역 확인","miniLabel":"전공상담신청","code":"L04MJCN","path":"pages/L04MJCN.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021782","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","공동체","전공상담신청"],"sourceRow":30,"guideStatus":"existing"},
          {"title":"RC설문진단","description":"RC 설문·진단 일정과 기관 확인","miniLabel":"RC설문진단","code":"L04RCSU","path":"pages/L04RCSU.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021783","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","공동체","RC설문진단"],"sourceRow":31,"guideStatus":"existing"},
          {"title":"My MAP","miniLabel":"MY MAP","code":"L04MYMP","path":"pages/L04MYMP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020822","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","공동체","My MAP"],"sourceRow":26,"description":"진로·대학생활·공동체 진행현황 확인","guideStatus":"existing","operationStatus":"retained"}
        ]
      },
      {
        "title": "진단검사·인적성검사",
        "description": "진단검사와 설문조사 참여 안내",
        "miniLabel": "진단검사·인적성검사",
        "code": "L03SURV",
        "path": "pages/L03SURV.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"진단검사 및 만족도조사","description":"진단·만족도조사 선택과 문항 응답","miniLabel":"진단검사 및 만족도조사","code":"L04DIAS","path":"pages/L04DIAS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020161","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","진단검사·인적성검사","진단검사 및 만족도조사"],"sourceRow":32,"guideStatus":"existing"},
          {"title":"ABEEK 설문조사","miniLabel":"ABEEK 설문","code":"L04ABEK","path":"pages/L04ABEK.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020039","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","진단검사·인적성검사","ABEEK 설문조사"],"sourceRow":33,"description":"대상과목 설문 선택과 문항 응답","guideStatus":"existing"},
          {"title":"교직 적/인성 검사","miniLabel":"교직 적/인성","code":"L04PERS","path":"pages/L04PERS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020040","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","진단검사·인적성검사","교직 적/인성 검사"],"sourceRow":34,"description":"교직 적·인성 검사와 응답 안내","guideStatus":"existing"},
          {"title":"GATEWAY 설문","miniLabel":"GATEWAY 설문","code":"L04GTWY","path":"pages/L04GTWY.html","enabled":true,"hideInNav":false,"directUrl":"https://jjstar.jj.ac.kr/","guideStatus":"existing","description":"필요한 교내 지원과 담당부서 안내","sourceMenuPath":["STAR 지원","진단검사·인적성검사","GATEWAY 설문"],"sourceDomId":"M000022960"}
        ]
      },
      {
        "title": "커뮤니티",
        "description": "학교 소식과 IT 문의 안내",
        "miniLabel": "커뮤니티",
        "code": "L03CMTY",
        "path": "pages/L03CMTY.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"공지사항","description":"분류별 공지 검색과 상세 내용 확인","miniLabel":"공지","code":"L04IFNT","path":"pages/L04IFNT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020160","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","커뮤니티","공지사항"],"sourceRow":35,"guideStatus":"existing"},
          {"title":"일반공지","description":"학교 일반공지 검색과 게시글 확인","miniLabel":"일반공지","code":"L04GNNT","path":"pages/L04GNNT.html","enabled":true,"hideInNav":true,"sourceDomId":"M000022731","directUrl":"https://jjstar.jj.ac.kr/","showDirectLink":false,"sourceMenuPath":["STAR 지원","커뮤니티","일반공지"],"contentPath":"pages/L03CMTY.html","contentAnchor":"L04GNNT","guideStatus":"embedded"},
          {"title":"Q&A","miniLabel":"주요 질문","code":"L04QNAA","path":"pages/L04QNAA.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020159","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","커뮤니티","Q&A"],"sourceRow":36,"guideStatus":"existing","externalUrl":"https://www.jj.ac.kr/jj/community/itbaro.do?mode=list","linkOnly":false,"description":"IT 문의 게시글과 처리상태 확인"}
        ]
      },
      {
        "title": "증명발급",
        "description": "각종 증명서 발급과 내역 확인",
        "miniLabel": "증명발급",
        "code": "L03CERTI",
        "path": "pages/L03CERTI.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03CERTI.html",
        "children": [
          {"title":"인터넷 증명발급","miniLabel":"인터넷 증명발급","code":"L04CEGD","path":"pages/L04CEGD.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020474","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","증명발급","인터넷 증명발급"],"sourceRow":37,"sourceAliases":["인터넷 증명발금 안내","인터넷 증명발급 안내"],"description":"인터넷 증명서 발급 사이트 연결","contentPath":"pages/L03CERTI.html","contentAnchor":"L04CEGD","guideStatus":"embedded","externalUrl":"http://jj.webminwon.kr/"},
          {"title":"제증명 발급","miniLabel":"제증명 발급","code":"L04CEIS","path":"pages/L04CEIS.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020475","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","증명발급","제증명 발급"],"sourceRow":38,"description":"재학·성적·졸업 증명서 발급 안내","contentPath":"pages/L03CERTI.html","contentAnchor":"L04CEIS","guideStatus":"embedded","operationStatus":"retained","externalUrl":"http://jj.webminwon.kr/"},
          {"title":"제증명 발급내역","miniLabel":"발급 내역","code":"L04CEHI","path":"pages/L04CEHI.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020476","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","증명발급","제증명 발급내역"],"sourceRow":39,"description":"신청한 증명서의 발급내역 확인","contentPath":"pages/L03CERTI.html","contentAnchor":"L04CEHI","guideStatus":"embedded","operationStatus":"retained","externalUrl":"http://jj.webminwon.kr/"}
        ]
      },
      {
        "title": "JJSTAR 이용 매뉴얼",
        "description": "웹 사용법과 대학생활 자료 안내",
        "miniLabel": "JJSTAR 이용 매뉴얼",
        "code": "L03JJMN",
        "path": "pages/L03JJMN.html",
        "enabled": true,
        "hideInNav": true,
        "generatedOverview": true,
        "children": [
          {"title":"웹페이지 이용 매뉴얼","miniLabel":"웹페이지 이용 매뉴얼","code":"L04WEBG","path":"pages/L04WEBG.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020416","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","JJSTAR 이용 매뉴얼","웹페이지 이용 매뉴얼"],"sourceRow":40,"guideStatus":"existing","externalUrl":"https://docs.jjstar.site/","description":"JJSTAR 메뉴별 웹 사용법 안내"},
          {"title":"대학생활 가이드 (PDF)","miniLabel":"대학생활 가이드 (PDF)","code":"L04PDFG","path":"pages/L04PDFG.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020417","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","JJSTAR 이용 매뉴얼","대학생활 가이드 (PDF)"],"sourceRow":41,"guideStatus":"existing","externalUrl":"https://jjstar.jj.ac.kr/upload/univGuide.pdf","description":"대학생활 안내 PDF 열람"}
        ]
      },
      {
        "title": "교내사이트",
        "miniLabel": "교내사이트",
        "code": "L03CAMP",
        "path": "pages/L03CAMP.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "sourceDomId": "M000023071",
        "description": "교내 주요 사이트와 정보 연결",
        "children": [
          {"title":"사이버캠퍼스","miniLabel":"사이버캠퍼스","code":"L04CYBR","path":"pages/L04CYBR.html","enabled":true,"hideInNav":true,"sourceDomId":"M000023092","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","교내사이트","사이버캠퍼스"],"guideStatus":"existing","externalUrl":"https://jjstar.jj.ac.kr/","description":"온라인 강의와 수업자료 이용"},
          {"title":"도서관 바로가기","miniLabel":"도서관 바로가기","code":"L04LIBR","path":"pages/L04LIBR.html","enabled":true,"hideInNav":true,"sourceDomId":"M000023093","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","교내사이트","도서관 바로가기"],"guideStatus":"existing","externalUrl":"https://jjstar.jj.ac.kr/","description":"도서 검색과 도서관 서비스 이용"},
          {"title":"단과대학 홈페이지","miniLabel":"단과대학 홈페이지","code":"L04COLG","path":"pages/L04COLG.html","enabled":true,"hideInNav":true,"sourceDomId":"M000023094","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","교내사이트","단과대학 홈페이지"],"guideStatus":"existing","externalUrl":"https://jjstar.jj.ac.kr/","description":"소속 단과대학 홈페이지 연결"},
          {"title":"학과 홈페이지","miniLabel":"학과 홈페이지","code":"L04DPHP","path":"pages/L04DPHP.html","enabled":true,"hideInNav":true,"sourceDomId":"M000023095","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","교내사이트","학과 홈페이지"],"guideStatus":"existing","externalUrl":"https://jjstar.jj.ac.kr/","description":"소속 학과 홈페이지 연결"},
          {"title":"대학원 바로가기","miniLabel":"대학원 바로가기","code":"L04GRAD","path":"pages/L04GRAD.html","enabled":true,"hideInNav":true,"sourceDomId":"M000023096","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","교내사이트","대학원 바로가기"],"guideStatus":"existing","externalUrl":"https://graduate.jj.ac.kr/graduate/index.do","description":"대학원 입학·학사 안내 확인"},
          {"title":"금주의 식단정보","miniLabel":"금주의 식단정보","code":"L04FOOD","path":"pages/L04FOOD.html","enabled":true,"hideInNav":true,"sourceDomId":"M000023097","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","교내사이트","금주의 식단정보"],"guideStatus":"existing","externalUrl":"https://jj.ac.kr/jj/campuslife/food.do","description":"교내 식당의 주간 식단 확인"}
        ]
      },
      {
        "title": "교내서비스",
        "miniLabel": "교내서비스",
        "code": "L03CSVC",
        "path": "pages/L03CSVC.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "sourceDomId": "M000023091",
        "description": "학교 온라인 서비스 바로가기",
        "children": [
          {"title":"웹메일","miniLabel":"웹메일","code":"L04MAIL","path":"pages/L04MAIL.html","enabled":true,"hideInNav":true,"sourceDomId":"M000023098","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","교내서비스","웹메일"],"guideStatus":"existing","externalUrl":"https://jjstar.jj.ac.kr/","description":"학교 계정의 웹메일 이용"},
          {"title":"Office 365","miniLabel":"Office 365","code":"L04MS65","path":"pages/L04MS65.html","enabled":true,"hideInNav":true,"sourceDomId":"M000023099","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","교내서비스","Office 365"],"sourceAliases":["MS365"],"guideStatus":"existing","externalUrl":"https://jjstar.jj.ac.kr/","description":"학교 계정용 Office 365 이용"},
          {"title":"원격지원","miniLabel":"원격지원","code":"L04RMOT","path":"pages/L04RMOT.html","enabled":true,"hideInNav":true,"sourceDomId":"M000023100","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","교내서비스","원격지원"],"guideStatus":"existing","externalUrl":"https://jjstar.jj.ac.kr/","description":"컴퓨터 문제 해결을 위한 원격지원 요청"},
          {"title":"애플 온 캠퍼스","miniLabel":"애플 온 캠퍼스","code":"L04APOC","path":"pages/L04APOC.html","enabled":true,"hideInNav":true,"sourceDomId":"M000023101","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","교내서비스","애플 온 캠퍼스"],"guideStatus":"existing","externalUrl":"https://jjstar.jj.ac.kr/","description":"Apple 제품의 교육 할인 안내"},
          {"title":"모바일 다운로드 센터","miniLabel":"모바일 다운로드 센터","code":"L04MDWN","path":"pages/L04MDWN.html","enabled":true,"hideInNav":true,"sourceDomId":"M000023102","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["STAR 지원","교내서비스","모바일 다운로드 센터"],"guideStatus":"existing","externalUrl":"https://jjstar.jj.ac.kr/","description":"학교 모바일 앱 안내와 다운로드"}
        ]
      }
    ],
    "overviewPath": "pages/L02SUPP.html"
  },
  {
    "title": "학사정보",
    "description": "수강·성적·학적과 학점인정 관리",
    "miniLabel": "학사 정보",
    "code": "L02ACAD",
    "path": "pages/L02ACAD.html",
    "enabled": true,
    "hideInNav": false,
    "generatedOverview": true,
    "children": [
      {
        "title": "수강관리",
        "description": "수강신청·시간표·수업정보 관리",
        "miniLabel": "수강관리",
        "code": "L03COUR",
        "path": "pages/L03COUR.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03COUR.html",
        "children": [
          {"title":"수강바구니","miniLabel":"수강 바구니","code":"L04BASK","path":"pages/L04BASK.html","enabled":true,"hideInNav":true,"sourceDomId":"M000021002","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","수강관리","수강바구니"],"sourceRow":48,"description":"수강신청 전 희망과목 미리 담기","contentPath":"pages/L03COUR.html","contentAnchor":"L04BASK","guideStatus":"embedded","externalUrl":"https://sugang.jj.ac.kr/"},
          {"title":"수강신청","miniLabel":"수강 신청","code":"L04ENRA","path":"pages/L04ENRA.html","enabled":true,"hideInNav":true,"sourceDomId":"M000021003","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","수강관리","수강신청"],"sourceRow":49,"description":"수강할 과목 선택과 수강신청","contentPath":"pages/L03COUR.html","contentAnchor":"L04ENRA","guideStatus":"embedded","externalUrl":"https://sugang.jj.ac.kr/"},
          {"title":"수강신청 내역","miniLabel":"수강 내역","code":"L04ENRV","path":"pages/L04ENRV.html","enabled":true,"hideInNav":true,"sourceDomId":"M000021004","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","수강관리","수강신청 내역"],"sourceRow":50,"sourceAliases":["수강신청 내역조회"],"description":"수강과목·출결·시간표와 확인서 조회","contentPath":"pages/L03COUR.html","contentAnchor":"L04ENRV","guideStatus":"embedded"},
          {"title":"강좌시간표/수업계획서","miniLabel":"강좌시간표/수업계획서","code":"L04CLPL","path":"pages/L04CLPL.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020011","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","수강관리","강좌시간표/수업계획서"],"sourceRow":51,"description":"강좌 검색과 수업계획서·수강제한 확인","guideStatus":"existing","sourceAliases":["강좌시간표/수업계획서 조회"]},
          {"title":"AHA 바로가기","miniLabel":"AHA 링크","code":"L04AHAL","path":"pages/L04AHAL.html","enabled":true,"hideInNav":true,"sourceDomId":"M000021784","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","수강관리","AHA 바로가기"],"sourceRow":52,"description":"AHA 학습 프로그램과 교육 안내","contentPath":"pages/L03ADMN.html","contentAnchor":"L04AHAL","guideStatus":"embedded","externalUrl":"https://aha.jj.ac.kr/"},
          {"title":"AHA 교육이수증","miniLabel":"AHA 이수증","code":"L04AHAC","path":"pages/L04AHAC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021785","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","수강관리","AHA 교육이수증"],"sourceRow":53,"description":"AHA 이수내역 조회와 이수증 출력","guideStatus":"existing"}
        ]
      },
      {
        "title": "출결·졸업관리",
        "description": "출석인정과 졸업요건·신청 관리",
        "miniLabel": "출결·졸업관리",
        "code": "L03GRDM",
        "path": "pages/L03GRDM.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "sourceAliases": [
          "졸업관리"
        ],
        "children": [
          {"title":"출석인정신청(공결)","miniLabel":"출석인정신청(공결)","code":"L04ATAP","path":"pages/L04ATAP.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020014","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","출결·졸업관리","출석인정신청(공결)"],"sourceRow":55,"description":"공결 신청과 출석인정요청서 출력","contentPath":"pages/L03COUR.html","contentAnchor":"L04ATAP","guideStatus":"embedded","sourceAliases":["출석인정신청"]},
          {"title":"졸업이수 기준 정보","description":"졸업기준과 취득학점·미충족 요건 확인","miniLabel":"졸업기준 정보","code":"L04GRDI","path":"pages/L04GRDI.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021006","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","출결·졸업관리","졸업이수 기준 정보"],"sourceRow":56,"guideStatus":"existing"},
          {"title":"졸업예정자 졸업사정 확인","description":"졸업사정 결과와 졸업식 참석 확인","miniLabel":"졸업사정 확인","code":"L04GRDC","path":"pages/L04GRDC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020550","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","출결·졸업관리","졸업예정자 졸업사정 확인"],"sourceRow":57,"guideStatus":"existing"},
          {"title":"조기졸업 신청","description":"조기졸업 요건과 신청현황 관리","miniLabel":"조기졸업 신청","code":"L04EGRD","path":"pages/L04EGRD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020551","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","출결·졸업관리","조기졸업 신청"],"sourceRow":58,"guideStatus":"existing"},
          {"title":"학사학위 취득유예 신청","description":"학위 취득유예 신청과 내역 확인","miniLabel":"학사학위 취득유예","code":"L04DEFR","path":"pages/L04DEFR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020552","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","출결·졸업관리","학사학위 취득유예 신청"],"sourceRow":59,"guideStatus":"existing"},
          {"title":"출결확인","miniLabel":"출결 확인","code":"L04ATTD","path":"pages/L04ATTD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020013","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","출결·졸업관리","출결확인"],"sourceRow":54,"description":"학기별 수강과목의 출결 현황","guideStatus":"existing","operationStatus":"retained"}
        ]
      },
      {
        "title": "성적관리·강의평가",
        "description": "성적·강의평가와 이수현황 확인",
        "miniLabel": "성적관리·강의평가",
        "code": "L03GRAD",
        "path": "pages/L03GRAD.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "sourceAliases": [
          "성적관리"
        ],
        "overviewPath": "pages/L03GRAD.html",
        "children": [
          {"title":"학기별성적","miniLabel":"학기별성적","code":"L04SEMG","path":"pages/L04SEMG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020026","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","성적관리·강의평가","학기별성적"],"sourceRow":60,"description":"과목별 성적·평가내역과 취득학점 확인","guideStatus":"existing","sourceAliases":["학기별성적조회"]},
          {"title":"강의평가","miniLabel":"최종 강의평가","code":"L04LEVL","path":"pages/L04LEVL.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020028","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","성적관리·강의평가","강의평가"],"sourceRow":61,"description":"학기 말 강의평가 문항 응답","guideStatus":"existing"},
          {"title":"중간강의평가","miniLabel":"중간 강의평가","code":"L04MLEV","path":"pages/L04MLEV.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020029","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","성적관리·강의평가","중간강의평가"],"sourceRow":62,"description":"학기 중 강의평가 문항 응답","guideStatus":"existing"},
          {"title":"성적이의신청","miniLabel":"성적 이의","code":"L04GREJ","path":"pages/L04GREJ.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020025","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","성적관리·강의평가","성적이의신청"],"sourceRow":63,"description":"성적이의신청 작성과 답변 상태 확인","guideStatus":"existing"},
          {"title":"성적정보분석(AMC5)","miniLabel":"성적 분석","code":"L04AMC5","path":"pages/L04AMC5.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020024","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","성적관리·강의평가","성적정보분석(AMC5)"],"sourceRow":64,"sourceAliases":["성적정보분석 (AMC5)"],"description":"전체·전공·교양의 학기별 성적 비교","guideStatus":"existing"},
          {"title":"채플/기독교이수현황","miniLabel":"채플 이수현황","code":"L04CHST","path":"pages/L04CHST.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020043","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","성적관리·강의평가","채플/기독교이수현황"],"sourceRow":75,"sourceAliases":["채플/기독교 이수현황"],"description":"채플·기독교 교과목 이수현황 확인","guideStatus":"existing"}
        ]
      },
      {
        "title": "학적관리",
        "description": "학적정보와 전공·학적변동 관리",
        "miniLabel": "학적관리",
        "code": "L03RECD",
        "path": "pages/L03RECD.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03RECD.html",
        "children": [
          {"title":"학적 기초","miniLabel":"학적 기초","code":"L04BASC","path":"pages/L04BASC.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020435","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","학적관리","학적 기초"],"sourceRow":65,"description":"나의 학적·연락처·다전공 내역 확인","guideStatus":"existing"},
          {"title":"복수/부 전공 신청","miniLabel":"복수/부 전공 신청","code":"L04DBMJ","path":"pages/L04DBMJ.html","enabled":true,"hideInNav":false,"directUrl":"https://jjstar.jj.ac.kr/","guideStatus":"existing","description":"복수전공·부전공 신청 안내","sourceMenuPath":["학사정보","학적관리","복수/부 전공 신청"],"operationStatus":"retained"},
          {"title":"전과전공 선택 신청 및 확인","miniLabel":"전공 선택","code":"L04CHMJ","path":"pages/L04CHMJ.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020438","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","학적관리","전과전공 선택 신청 및 확인"],"sourceRow":67,"description":"전과·전공선택 신청과 처리현황 확인","guideStatus":"existing"},
          {"title":"휴학신청","miniLabel":"휴학","code":"L04LEAV","path":"pages/L04LEAV.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020440","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","학적관리","휴학신청"],"sourceRow":68,"description":"일반·군휴학 신청과 접수상태 확인","guideStatus":"existing"},
          {"title":"복학 신청 및 확인","miniLabel":"복학","code":"L04RETN","path":"pages/L04RETN.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020437","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","학적관리","복학 신청 및 확인"],"sourceRow":69,"description":"복학 학과 선택과 신청현황 확인","guideStatus":"existing"},
          {"title":"자퇴신청","miniLabel":"자퇴","code":"L04WITH","path":"pages/L04WITH.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020441","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","학적관리","자퇴신청"],"sourceRow":70,"description":"자퇴사유 작성과 신청·접수상태 확인","guideStatus":"existing"},
          {"title":"재입학 신청","miniLabel":"재입학 신청","code":"L04READ","path":"pages/L04READ.html","enabled":true,"hideInNav":false,"directUrl":"https://jjstar.jj.ac.kr/","guideStatus":"existing","description":"학업 재개를 위한 재입학 신청 안내","sourceMenuPath":["학사정보","학적관리","재입학 신청"],"operationStatus":"retained"},
          {"title":"학점인정신청","miniLabel":"학점인정신청","code":"L04CRAP","path":"pages/L04CRAP.html","enabled":true,"hideInNav":false,"directUrl":"https://jjstar.jj.ac.kr/","guideStatus":"existing","description":"학점 인정 신청 관련 안내","sourceMenuPath":["학사정보","학적관리","학점인정신청"]},
          {"title":"자기설계전공 신청","miniLabel":"자기설계전공 신청","code":"L04SDMJ","path":"pages/L04SDMJ.html","enabled":true,"hideInNav":false,"directUrl":"https://jjstar.jj.ac.kr/","guideStatus":"existing","description":"전공 교육목표·전공능력 설계와 신청","sourceMenuPath":["학사정보","학적관리","자기설계전공 신청"],"operationStatus":"retained"},
          {"title":"입학 전 학습경험 등록","miniLabel":"입학 전 학습경험 등록","code":"L04PLEX","path":"pages/L04PLEX.html","enabled":true,"hideInNav":false,"directUrl":"https://jjstar.jj.ac.kr/","guideStatus":"existing","description":"입학 전 학습경험 등록 안내","sourceMenuPath":["학사정보","학적관리","입학 전 학습경험 등록"],"operationStatus":"retained"},
          {"title":"전과전공 시뮬레이션","description":"전과·전공선택 시뮬레이션 안내","miniLabel":"전과전공 시뮬레이션","code":"L04MJSI","path":"pages/L04MJSI.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021855","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","학적관리","전과전공 시뮬레이션"],"sourceRow":66,"guideStatus":"existing","operationStatus":"retained"}
        ]
      },
      {
        "title": "학점인정신청",
        "description": "다전공 신청과 특별학점 인정",
        "miniLabel": "학점 인정",
        "code": "L03CRED",
        "path": "pages/L03CRED.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "sourceAliases": [
          "학점신청"
        ],
        "overviewPath": "pages/L03CRED.html",
        "children": [
          {"title":"beSTAR 신청","miniLabel":"beSTAR 신청","code":"L04BEST","path":"pages/L04BEST.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020445","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","학점인정신청","beSTAR 신청"],"sourceRow":71,"description":"beSTAR 신청 대상과 조건 안내","guideStatus":"existing","operationStatus":"retained"},
          {"title":"연계/융합 전공 신청","miniLabel":"연계/융합 전공","code":"L04LINK","path":"pages/L04LINK.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020045","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","학점인정신청","연계/융합 전공 신청"],"sourceRow":72,"description":"연계·융합전공 탐색과 이수신청","guideStatus":"existing"},
          {"title":"특별학점","miniLabel":"특별 학점","code":"L04SPCR","path":"pages/L04SPCR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020046","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","학점인정신청","특별학점"],"sourceRow":73,"description":"자격증·증빙 등록과 인정학점 신청","guideStatus":"existing"},
          {"title":"K-MOOC인정신청","miniLabel":"K-MOOC 인정","code":"L04KMOC","path":"pages/L04KMOC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020047","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","학점인정신청","K-MOOC인정신청"],"sourceRow":74,"description":"K-MOOC 이수내역 등록과 학점인정","guideStatus":"existing"}
        ]
      },
      {
        "title": "사회봉사",
        "description": "봉사활동 신청·보고·이수 관리",
        "miniLabel": "사회봉사",
        "code": "L03SERV",
        "path": "pages/L03SERV.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03SERV.html",
        "children": [
          {"title":"사회봉사 공지사항","description":"봉사활동 모집과 교육 일정 공지 확인","miniLabel":"사회봉사 공지사항","code":"L04SVNT","path":"pages/L04SVNT.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020031","directUrl":"https://jjstar.jj.ac.kr/","showDirectLink":false,"sourceMenuPath":["학사정보","사회봉사","사회봉사 공지사항"],"contentPath":"pages/L03SERV.html","contentAnchor":"L04SVNT","guideStatus":"embedded"},
          {"title":"사회봉사 교과목신청","miniLabel":"사봉 교과목","code":"L04SVAP","path":"pages/L04SVAP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020032","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","사회봉사","사회봉사 교과목신청"],"sourceRow":76,"description":"봉사활동 일정·정원 확인과 교과목 신청","guideStatus":"existing"},
          {"title":"사회봉사 신청내역 및 인증 확인","miniLabel":"사봉 내역","code":"L04SVCK","path":"pages/L04SVCK.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020033","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","사회봉사","사회봉사 신청내역 및 인증 확인"],"sourceRow":77,"sourceAliases":["신청내역 및 인증 확인"],"description":"봉사 신청·이수내역과 확인서 조회","guideStatus":"existing"},
          {"title":"사회봉사 현황","description":"봉사교육 참석과 보고서 제출현황 확인","miniLabel":"사회봉사 현황","code":"L04SVST","path":"pages/L04SVST.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021864","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","사회봉사","사회봉사 현황"],"sourceRow":78,"guideStatus":"existing"},
          {"title":"사회봉사 활동계획서 제출","miniLabel":"활동 계획서","code":"L04SVPL","path":"pages/L04SVPL.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020034","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","사회봉사","사회봉사 활동계획서 제출"],"sourceRow":79,"sourceAliases":["활동계획서 제출"],"description":"봉사 계획서와 활동일정 작성·저장","guideStatus":"existing"},
          {"title":"사회봉사 결과보고서 제출","miniLabel":"결과 보고서","code":"L04SVRP","path":"pages/L04SVRP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020035","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","사회봉사","사회봉사 결과보고서 제출"],"sourceRow":80,"sourceAliases":["결과보고서 제출"],"description":"봉사 결과보고서 작성과 활동사진 첨부","guideStatus":"existing"},
          {"title":"심폐소생술 교과목 신청","miniLabel":"심폐교과 신청","code":"L04CPRA","path":"pages/L04CPRA.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021786","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","사회봉사","심폐소생술 교과목 신청"],"sourceRow":81,"description":"심폐소생술 교육 일정 확인과 신청","guideStatus":"existing"},
          {"title":"심폐소생술 교과목 신청내역 확인","miniLabel":"심폐교과 신청확인","code":"L04CPRH","path":"pages/L04CPRH.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021787","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","사회봉사","심폐소생술 교과목 신청내역 확인"],"sourceRow":82,"description":"심폐소생술 신청·이수결과와 확인서 조회","guideStatus":"existing"}
        ]
      },
      {
        "title": "해외봉사",
        "description": "해외봉사 신청과 활동내역 관리",
        "miniLabel": "해외봉사",
        "code": "L03OVSV",
        "path": "pages/L03OVSV.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03OVSV.html",
        "children": [
          {"title":"해외봉사 공지사항","description":"해외봉사 모집과 활동 공지 안내","miniLabel":"해외봉사 공지사항","code":"L04OVNT","path":"pages/L04OVNT.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020072","directUrl":"https://jjstar.jj.ac.kr/","showDirectLink":false,"sourceMenuPath":["학사정보","해외봉사","해외봉사 공지사항"],"contentPath":"pages/L03OVSV.html","contentAnchor":"L04OVNT","guideStatus":"embedded"},
          {"title":"해외봉사 신청","miniLabel":"해봉 신청","code":"L04OVAP","path":"pages/L04OVAP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020073","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","해외봉사","해외봉사 신청"],"sourceRow":83,"description":"해외봉사 파견지 선택과 참가 신청","guideStatus":"existing"},
          {"title":"해외봉사 신청 내역 확인","miniLabel":"신청 내역","code":"L04OVCK","path":"pages/L04OVCK.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020074","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","해외봉사","해외봉사 신청 내역 확인"],"sourceRow":84,"description":"학기별 해외봉사 신청내역 확인","guideStatus":"existing"},
          {"title":"해외봉사 결과보고서 작성","miniLabel":"결과 보고서","code":"L04OVRP","path":"pages/L04OVRP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020075","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","해외봉사","해외봉사 결과보고서 작성"],"sourceRow":85,"sourceAliases":["해외봉사 결과보고서 제출"],"description":"해외봉사 보고서 제출과 파일 관리","guideStatus":"existing"}
        ]
      },
      {
        "title": "학사관리",
        "description": "학칙 변경과 학사 FAQ 안내",
        "miniLabel": "학사 관리",
        "code": "L03ADMN",
        "path": "pages/L03ADMN.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03ADMN.html",
        "children": [
          {"title":"학칙개정사항 안내","miniLabel":"학칙 개정","code":"L04RULE","path":"pages/L04RULE.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020427","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","학사관리","학칙개정사항 안내"],"sourceRow":42,"description":"학칙 개정 전후 내용과 적용시기 확인","contentPath":"pages/L03ADMN.html","contentAnchor":"L04RULE","guideStatus":"embedded","operationStatus":"retained"},
          {"title":"학사관리 FAQ","miniLabel":"학사 FAQ","code":"L04ADFA","path":"pages/L04ADFA.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020426","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","학사관리","학사관리 FAQ"],"sourceRow":43,"description":"학사 업무의 자주 묻는 질문 안내","contentPath":"pages/L03ADMN.html","contentAnchor":"L04ADFA","guideStatus":"embedded","operationStatus":"retained"}
        ]
      },
      {
        "title": "교육과정",
        "description": "교육과정과 이수계획 안내",
        "miniLabel": "교육 과정",
        "code": "L03CURR",
        "path": "pages/L03CURR.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03CURR.html",
        "children": [
          {"title":"교양 교육과정 조회","miniLabel":"교양 교과","code":"L04GECR","path":"pages/L04GECR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020428","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","교육과정","교양 교육과정 조회"],"sourceRow":44,"description":"교양 교과목 구성과 교육과정 안내","guideStatus":"existing","operationStatus":"retained"},
          {"title":"전공 교육과정 조회","miniLabel":"전공 교과","code":"L04MJCR","path":"pages/L04MJCR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020429","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","교육과정","전공 교육과정 조회"],"sourceRow":45,"description":"전공 교과목 구성과 교육과정 안내","guideStatus":"existing","operationStatus":"retained"},
          {"title":"교육과정 시뮬레이션","miniLabel":"교과 시뮬","code":"L04CRSM","path":"pages/L04CRSM.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020430","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","교육과정","교육과정 시뮬레이션"],"sourceRow":46,"description":"교육과정의 교과목 이수 시뮬레이션","guideStatus":"existing","operationStatus":"retained"},
          {"title":"My 교육과정 조회","miniLabel":"MY 교과","code":"L04MCRR","path":"pages/L04MCRR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020431","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["학사정보","교육과정","My 교육과정 조회"],"sourceRow":47,"description":"나의 교육과정과 교과목 구성 안내","guideStatus":"existing","operationStatus":"retained"}
        ]
      }
    ],
    "overviewPath": "pages/L02ACAD.html"
  },
  {
    "title": "역량강화",
    "description": "핵심·전공역량과 활동 인증 관리",
    "miniLabel": "역량 강화",
    "code": "L02COMP",
    "path": "pages/L02COMP.html",
    "enabled": true,
    "hideInNav": false,
    "generatedOverview": true,
    "children": [
      {
        "title": "SUPER 핵심역량",
        "description": "핵심역량 구성·인증·진단 안내",
        "miniLabel": "SUPER 핵심역량",
        "code": "L03SUCP",
        "path": "pages/L03SUCP.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03SUCP.html",
        "children": [
          {"title":"SUPER 핵심역량","miniLabel":"역량 안내","code":"L04SUPE","path":"pages/L04SUPE.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020477","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","SUPER 핵심역량","SUPER 핵심역량"],"sourceRow":86,"description":"5대 핵심역량과 세부역량 안내","contentPath":"pages/L03SUCP.html","contentAnchor":"L04SUPE","guideStatus":"embedded"},
          {"title":"SUPER 핵심역량 인증 정보","miniLabel":"인증 정보","code":"L04SUCI","path":"pages/L04SUCI.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020478","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","SUPER 핵심역량","SUPER 핵심역량 인증 정보"],"sourceRow":87,"description":"역량 인증제도와 영역별 인증현황","contentPath":"pages/L03SUCP.html","contentAnchor":"L04SUCI","guideStatus":"embedded"},
          {"title":"SUPER 핵심역량 진단검사","miniLabel":"진단 검사","code":"L04SUDG","path":"pages/L04SUDG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020479","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","SUPER 핵심역량","SUPER 핵심역량 진단검사"],"sourceRow":88,"description":"학년별 핵심역량 진단 결과 확인","guideStatus":"existing"},
          {"title":"SUPER 핵심역량 진단평가 결과 분석","miniLabel":"결과 분석","code":"L04SURS","path":"pages/L04SURS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020480","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","SUPER 핵심역량","SUPER 핵심역량 진단평가 결과 분석"],"sourceRow":89,"description":"학교평균과 핵심역량 진단점수 비교","guideStatus":"existing"}
        ]
      },
      {
        "title": "starT 프로그램",
        "description": "프로그램 참여 신청 및 활동 인증",
        "miniLabel": "starT 프로그램",
        "code": "L03STRT",
        "path": "pages/L03STRT.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "sourceAliases": [
          "starT"
        ],
        "overviewPath": "pages/L03STRT.html",
        "children": [
          {"title":"starT 안내 및 혜택","miniLabel":"starT 안내 및 혜택","code":"L04STGD","path":"pages/L04STGD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020483","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","starT 프로그램","starT 안내 및 혜택"],"sourceRow":90,"guideStatus":"embedded","contentPath":"pages/L03STRT.html","contentAnchor":"L043CAT","contentAnchors":["L043CAT","L04TRCK","L04STPG","L04STBF"],"sourceAliases":["3C활동 안내","starT 트랙제도","starT 프로그램 소개","starT 주요혜택"],"description":"활동체계와 신청 기준·포인트 혜택"},
          {"title":"starT 신청 현황","miniLabel":"신청 현황","code":"L04STHS","path":"pages/L04STHS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020486","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","starT 프로그램","starT 신청 현황"],"sourceRow":91,"description":"활동 신청내역 조회·수정·취소","guideStatus":"existing"},
          {"title":"starT 온라인 신청","miniLabel":"starT 온라인 신청","code":"L04STOH","path":"pages/L04STOH.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020485","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","starT 프로그램","starT 온라인 신청"],"sourceRow":92,"description":"활동내용과 증빙자료 작성·신청","guideStatus":"existing","sourceAliases":["starT 온라인 신청내역"]},
          {"title":"starT 활동 인증","miniLabel":"활동 인증","code":"L04STCF","path":"pages/L04STCF.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020487","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","starT 프로그램","starT 활동 인증"],"sourceRow":93,"description":"활동 인증내역과 누적 포인트 확인","guideStatus":"existing"}
        ]
      },
      {
        "title": "비교과 프로그램",
        "description": "프로그램 신청·추천 및 이수 관리",
        "miniLabel": "비교과 프로그램",
        "code": "L03NCUR",
        "path": "pages/L03NCUR.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"비교과 참여 신청","description":"프로그램 일정·조건 확인 및 참여 신청","miniLabel":"참여 신청","code":"L04NCAP","path":"pages/L04NCAP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020504","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","비교과 프로그램","비교과 참여 신청"],"sourceRow":94,"guideStatus":"existing"},
          {"title":"비교과 프로그램 추천","description":"추천 프로그램 일정·역량 비교","miniLabel":"비교과 추천","code":"L04NCRD","path":"pages/L04NCRD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020503","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","비교과 프로그램","비교과 프로그램 추천"],"sourceRow":95,"guideStatus":"existing"},
          {"title":"Navigation 비교과 프로그램 추천","miniLabel":"Navigation 비교과 프로그램 추천","code":"L04NVCR","path":"pages/L04NVCR.html","enabled":true,"hideInNav":false,"directUrl":"https://jjstar.jj.ac.kr/","guideStatus":"existing","description":"취약역량·관심사별 프로그램 추천","sourceMenuPath":["역량강화","비교과 프로그램","Navigation 비교과 프로그램 추천"],"sourceDomId":"M000022792"},
          {"title":"비교과 신청현황/만족도 조사","description":"신청현황·만족도평가 및 이수증 발급","miniLabel":"비교과 신청현황/만족도 조사","code":"L04NCSS","path":"pages/L04NCSS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020506","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","비교과 프로그램","비교과 신청현황/만족도 조사"],"sourceRow":96,"guideStatus":"existing"},
          {"title":"비교과 활동 증명서","description":"비교과 활동내역 선택과 증명서 출력","miniLabel":"활동 증명서","code":"L04NCCF","path":"pages/L04NCCF.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020507","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","비교과 프로그램","비교과 활동 증명서"],"sourceRow":97,"guideStatus":"existing"}
        ]
      },
      {
        "title": "전공역량",
        "description": "전공능력 자기평가 및 결과 분석",
        "miniLabel": "전공역량",
        "code": "L03MAJC",
        "path": "pages/L03MAJC.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03MAJC.html",
        "children": [
          {"title":"전공역량 자기평가 진단 검사","miniLabel":"역량 평가","code":"L04MJDG","path":"pages/L04MJDG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020461","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","전공역량","전공역량 자기평가 진단 검사"],"sourceRow":98,"description":"전공능력 자기평가 참여·결과 확인","guideStatus":"existing"},
          {"title":"전공역량 자기평가 결과 분석","miniLabel":"결과 분석","code":"L04MJRS","path":"pages/L04MJRS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020462","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","전공역량","전공역량 자기평가 결과 분석"],"sourceRow":99,"description":"전공능력별 자기평가 결과 분석","guideStatus":"existing"}
        ]
      },
      {
        "title": "역량개발 프로그램",
        "description": "팀 활동 프로그램과 보고서 관리",
        "miniLabel": "역량개발 프로그램",
        "code": "L03CPRG",
        "path": "pages/L03CPRG.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"Together","description":"팀별 활동 증빙과 보고서 관리","miniLabel":"투게더 (P)","code":"L04TGTH","path":"pages/L04TGTH.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020524","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","역량개발 프로그램","Together"],"sourceRow":100,"guideStatus":"existing"},
          {"title":"진로 해시태그(#)","description":"팀장·팀원 신청과 활동·선발기준 안내","miniLabel":"진로 해시태그(#)","code":"L04CRHT","path":"pages/L04CRHT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021788","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["역량강화","역량개발 프로그램","진로 해시태그(#)"],"sourceRow":101,"guideStatus":"existing"},
          {"title":"리빙랩","miniLabel":"리빙랩","code":"L04LVLB","path":"pages/L04LVLB.html","enabled":true,"hideInNav":false,"directUrl":"https://jjstar.jj.ac.kr/","guideStatus":"existing","description":"리빙랩 역량개발 프로그램 안내","sourceMenuPath":["역량강화","역량개발 프로그램","리빙랩"],"operationStatus":"retained"},
          {"title":"로컬벤처","miniLabel":"로컬벤처","code":"L04LCVT","path":"pages/L04LCVT.html","enabled":true,"hideInNav":false,"directUrl":"https://jjstar.jj.ac.kr/","guideStatus":"existing","description":"로컬벤처 역량개발 프로그램 안내","sourceMenuPath":["역량강화","역량개발 프로그램","로컬벤처"],"operationStatus":"retained"},
          {"title":"오픈테이블","miniLabel":"오픈테이블","code":"L04OPTB","path":"pages/L04OPTB.html","enabled":true,"hideInNav":false,"directUrl":"https://jjstar.jj.ac.kr/","guideStatus":"existing","description":"오픈테이블 역량개발 프로그램 안내","sourceMenuPath":["역량강화","역량개발 프로그램","오픈테이블"],"operationStatus":"retained"}
        ]
      }
    ]
  },
  {
    "title": "진로개발 및 상담",
    "description": "직무 탐색·진로 설계 및 상담 이용",
    "miniLabel": "진로·상담",
    "code": "L02CARE",
    "path": "pages/L02CARE.html",
    "enabled": true,
    "hideInNav": false,
    "generatedOverview": true,
    "children": [
      {
        "title": "커리어로드맵",
        "description": "관심직무와 학기별 진로 설계",
        "miniLabel": "커리어로드맵",
        "code": "L03CRMP",
        "path": "pages/L03CRMP.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"목표직무 탐색","description":"학과·수강 과목별 직무 탐색 및 등록","miniLabel":"목표직무 탐색","code":"L04TGJB","path":"pages/L04TGJB.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020140","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","커리어로드맵","목표직무 탐색"],"sourceRow":102,"guideStatus":"existing"},
          {"title":"관심직무 자가진단","description":"관심직무 등록 및 자가진단 내역 확인","miniLabel":"관심직무 자가진단","code":"L04INJB","path":"pages/L04INJB.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020944","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","커리어로드맵","관심직무 자가진단"],"sourceRow":103,"guideStatus":"existing"},
          {"title":"My 직무개발현황","description":"수강 교과목별 연관 직무와 이수현황","miniLabel":"직무개발 현황","code":"L04MJDV","path":"pages/L04MJDV.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020138","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","커리어로드맵","My 직무개발현황"],"sourceRow":104,"guideStatus":"existing"},
          {"title":"학과별 커리어로드맵","description":"학과별 추천 콘텐츠와 직무별 교과목","miniLabel":"학과별 로드맵","code":"L04DCRM","path":"pages/L04DCRM.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020142","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","커리어로드맵","학과별 커리어로드맵"],"sourceRow":105,"guideStatus":"existing"},
          {"title":"My 커리어로드맵","description":"학기별 교과·비교과·자격증 활동 설정","miniLabel":"MY 로드맵","code":"L04MCRM","path":"pages/L04MCRM.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020139","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","커리어로드맵","My 커리어로드맵"],"sourceRow":106,"guideStatus":"existing"},
          {"title":"선도학생 커리어패스","description":"선도학생의 학기별 수강·활동 이력 확인","miniLabel":"선도학생 커리어패스","code":"L04LEAD","path":"pages/L04LEAD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020141","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","커리어로드맵","선도학생 커리어패스"],"sourceRow":107,"guideStatus":"existing"}
        ]
      },
      {
        "title": "직무탐색",
        "description": "직무 분류와 주요 업무·역량 탐색",
        "miniLabel": "직무탐색",
        "code": "L03JOBE",
        "path": "pages/L03JOBE.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"직무역량 소개","description":"직무 정의와 지식·기술·태도 구성 안내","miniLabel":"직무역량 소개","code":"L04JBCP","path":"pages/L04JBCP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020508","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","직무탐색","직무역량 소개"],"sourceRow":108,"guideStatus":"existing"},
          {"title":"JJCS 직무탐색","description":"JJCS 분류와 NCS 능력단위 탐색","miniLabel":"JJCS 직무","code":"L04NCSJ","path":"pages/L04NCSJ.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020509","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","직무탐색","JJCS 직무탐색"],"sourceRow":109,"sourceAliases":["NCS 직무탐색"],"guideStatus":"existing"},
          {"title":"JJKECO 직무탐색","description":"직업분류별 주요 업무·관련 학과 확인","miniLabel":"JJKECO 직무탐색","code":"L04JJKE","path":"pages/L04JJKE.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020510","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","직무탐색","JJKECO 직무탐색"],"sourceRow":110,"guideStatus":"existing"},
          {"title":"직무역량 탐색","description":"직무별 주요 업무와 필요 능력단위 확인","miniLabel":"직무역량 탐색","code":"L04JBEF","path":"pages/L04JBEF.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020511","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","직무탐색","직무역량 탐색"],"sourceRow":111,"guideStatus":"existing"}
        ]
      },
      {
        "title": "진로·진단검사",
        "description": "흥미·성격·학습 성향 진단 안내",
        "miniLabel": "진로·진단검사",
        "code": "L03TEST",
        "path": "pages/L03TEST.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "sourceAliases": [
          "진단검사"
        ],
        "overviewPath": "pages/L03TEST.html",
        "children": [
          {"title":"직업흥미검사(STRONG)","miniLabel":"직업흥미 STRONG","code":"L04STRG","path":"pages/L04STRG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020520","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","진로·진단검사","직업흥미검사(STRONG)"],"sourceRow":112,"sourceAliases":["직업흥미검사 (STRONG)"],"description":"직업흥미와 선호 업무환경 검사","guideStatus":"existing"},
          {"title":"성격검사(MBTI)","miniLabel":"성격 MBTI","code":"L04MBTI","path":"pages/L04MBTI.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020518","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","진로·진단검사","성격검사(MBTI)"],"sourceRow":113,"sourceAliases":["성격검사 (MBTI)"],"description":"성격 선호지표와 16가지 유형 안내","guideStatus":"existing"},
          {"title":"학습유형검사(U&I)","miniLabel":"학습유형 U&I","code":"L04UITY","path":"pages/L04UITY.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020519","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","진로·진단검사","학습유형검사(U&I)"],"sourceRow":114,"sourceAliases":["학습유형검사 (U&I)"],"description":"학습 성향·행동·공부 방법 안내","guideStatus":"existing"},
          {"title":"카운슬링센터 심리검사","miniLabel":"카운슬링 진단","code":"L04PSYC","path":"pages/L04PSYC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020521","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","진로·진단검사","카운슬링센터 심리검사"],"sourceRow":115,"sourceAliases":["카운슬링센터 심리 검사"],"description":"심리검사 종류와 이용 절차 안내","guideStatus":"existing","externalUrl":"https://happyjcc.jj.ac.kr/happyjcc/test/test01.do","linkOnly":false},
          {"title":"우리대학 기타 진단검사","miniLabel":"기타 검사","code":"L04ETCT","path":"pages/L04ETCT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020517","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","진로·진단검사","우리대학 기타 진단검사"],"sourceRow":116,"sourceAliases":["기타 진단검사"],"description":"진로·적성·직업심리검사 안내","guideStatus":"existing"}
        ]
      },
      {
        "title": "상담",
        "description": "상담 예약·진행 및 멘토링 이용",
        "miniLabel": "상담",
        "code": "L03COUN",
        "path": "pages/L03COUN.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "sourceAliases": [
          "심리/학업/진로 상담"
        ],
        "overviewPath": "pages/L03COUN.html",
        "children": [
          {"title":"상담안내","miniLabel":"상담 안내","code":"L04CNGD","path":"pages/L04CNGD.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020512","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","상담","상담안내"],"sourceRow":117,"sourceAliases":["상담 안내"],"description":"상담 예약과 방문·진행 절차 안내","contentPath":"pages/L03COUN.html","contentAnchor":"L04CNGD","guideStatus":"embedded"},
          {"title":"1:1 상담","miniLabel":"1:1 상담","code":"L04CN11","path":"pages/L04CN11.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020513","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","상담","1:1 상담"],"sourceRow":118,"description":"상담자·일정 선택 및 상담예약","guideStatus":"existing"},
          {"title":"멘토링","miniLabel":"선후배 멘토링","code":"L04MENT","path":"pages/L04MENT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020514","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","상담","멘토링"],"sourceRow":119,"description":"멘토링 활동보고서와 또래상담 관리","guideStatus":"existing"},
          {"title":"온라인 상담 신청","miniLabel":"온라인 상담","code":"L04ONCN","path":"pages/L04ONCN.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020515","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","상담","온라인 상담 신청"],"sourceRow":120,"sourceAliases":["온라인 상담"],"description":"상담 일자·유형 선택 및 요청내용 작성","guideStatus":"existing"},
          {"title":"카운슬링센터 심리 상담","miniLabel":"카운슬링센터 심리 상담","code":"L04PSCN","path":"pages/L04PSCN.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020516","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["진로개발 및 상담","상담","카운슬링센터 심리 상담"],"sourceRow":121,"guideStatus":"existing","externalUrl":"https://happyjcc.jj.ac.kr/happyjcc/counsel/individual02.do","linkOnly":false,"description":"개인상담 신청과 진행 절차 안내"}
        ]
      }
    ]
  },
  {
    "title": "취·창업지원",
    "description": "취·창업 정보와 역량 개발 지원",
    "miniLabel": "취·창업",
    "code": "L02JOBS",
    "path": "pages/L02JOBS.html",
    "enabled": true,
    "hideInNav": false,
    "generatedOverview": true,
    "children": [
      {
        "title": "창업",
        "description": "창업 활동·포인트·장학금 관리",
        "miniLabel": "창업",
        "code": "L03STUP",
        "path": "pages/L03STUP.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"사업참여이력","description":"사업 참여·증빙 등록과 승인·포인트 확인","miniLabel":"사업 참여이력","code":"L04BIZH","path":"pages/L04BIZH.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020532","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","창업","사업참여이력"],"sourceRow":122,"guideStatus":"existing"},
          {"title":"창업 장학금 신청","description":"창업 포인트 확인 및 장학금 신청","miniLabel":"창업 장학금","code":"L04STSC","path":"pages/L04STSC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020533","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","창업","창업 장학금 신청"],"sourceRow":123,"guideStatus":"existing"}
        ]
      },
      {
        "title": "취업정보",
        "description": "채용·기업·대외활동 정보 탐색",
        "miniLabel": "취업정보",
        "code": "L03EMPI",
        "path": "pages/L03EMPI.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"교내 채용 정보","description":"교내 채용공고와 모집·첨부자료 확인","miniLabel":"교내 채용","code":"L04INJP","path":"pages/L04INJP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020534","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","취업정보","교내 채용 정보"],"sourceRow":124,"guideStatus":"existing"},
          {"title":"기업 정보","description":"기업 탐색과 관심·목표기업 설정","miniLabel":"기업 정보","code":"L04COMP","path":"pages/L04COMP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020535","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","취업정보","기업 정보"],"sourceRow":125,"guideStatus":"existing"},
          {"title":"맞춤형 채용정보","description":"학과별 채용정보와 모집조건 확인","miniLabel":"맞춤형 채용","code":"L04MTJP","path":"pages/L04MTJP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020536","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","취업정보","맞춤형 채용정보"],"sourceRow":126,"guideStatus":"existing"},
          {"title":"기관요청 채용정보","description":"기관요청 채용공고와 모집정보 확인","miniLabel":"기관 채용","code":"L04REQJ","path":"pages/L04REQJ.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020537","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","취업정보","기관요청 채용정보"],"sourceRow":127,"guideStatus":"existing"},
          {"title":"채용포털 채용정보","description":"채용포털별 채용공고와 공채일정 탐색","miniLabel":"채용 포털","code":"L04PTJP","path":"pages/L04PTJP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020538","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","취업정보","채용포털 채용정보"],"sourceRow":128,"guideStatus":"existing"},
          {"title":"취업정보","description":"교내·기관·추천 채용공고 확인","miniLabel":"취업정보","code":"L04JBIN","path":"pages/L04JBIN.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021865","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","취업정보","취업정보"],"sourceRow":129,"guideStatus":"existing"},
          {"title":"대외활동","description":"대외활동·공모전·취업행사 정보 확인","miniLabel":"대외활동","code":"L04EXAC","path":"pages/L04EXAC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021789","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","취업정보","대외활동"],"sourceRow":130,"guideStatus":"existing"},
          {"title":"취업성공기","description":"선배 취업 준비 경험·후기(공개 예정)","miniLabel":"취업성공기","code":"L04JBST","path":"pages/L04JBST.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021790","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","취업정보","취업성공기"],"sourceRow":131,"guideStatus":"existing"}
        ]
      },
      {
        "title": "현장실습학기제",
        "description": "현장실습 신청·보고·평가 관리",
        "miniLabel": "현장실습학기제",
        "code": "L03INTR",
        "path": "pages/L03INTR.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"서약서 작성/개인정보 동의","description":"현장실습 서약과 개인정보 동의 저장","miniLabel":"서약서 작성/개인정보 동의","code":"L04INAG","path":"pages/L04INAG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020541","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","현장실습학기제","서약서 작성/개인정보 동의"],"sourceRow":132,"guideStatus":"existing"},
          {"title":"현장실습학기제 참여 신청","description":"현장실습 신청서 작성과 승인 확인","miniLabel":"참여 신청","code":"L04INAP","path":"pages/L04INAP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020543","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","현장실습학기제","현장실습학기제 참여 신청"],"sourceRow":133,"sourceAliases":["헌장실습학기제 참여 신청"],"guideStatus":"existing"},
          {"title":"현장실습학기제 참여 내역","description":"현장실습 이력·보고서·증빙 관리","miniLabel":"참여 내역","code":"L04INHI","path":"pages/L04INHI.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020544","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","현장실습학기제","현장실습학기제 참여 내역"],"sourceRow":134,"guideStatus":"existing"},
          {"title":"만족도 평가","description":"현장실습 만족도 응답과 개선 의견 작성","miniLabel":"만족도 평가","code":"L04INSV","path":"pages/L04INSV.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020545","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","현장실습학기제","만족도 평가"],"sourceRow":135,"guideStatus":"existing"},
          {"title":"중도 포기 신청","description":"현장실습 포기 사유 작성과 신청","miniLabel":"중도 포기","code":"L04INDR","path":"pages/L04INDR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020546","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","현장실습학기제","중도 포기 신청"],"sourceRow":136,"guideStatus":"existing"},
          {"title":"FAQ","description":"현장실습 자주 묻는 질문 검색","miniLabel":"주요 질문","code":"L04INFA","path":"pages/L04INFA.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020539","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["취·창업지원","현장실습학기제","FAQ"],"sourceRow":137,"guideStatus":"existing"}
        ]
      }
    ]
  },
  {
    "title": "대학생활",
    "description": "학생활동과 교내 생활·시설 이용",
    "miniLabel": "대학 생활",
    "code": "L02LIFE",
    "path": "pages/L02LIFE.html",
    "enabled": true,
    "hideInNav": false,
    "generatedOverview": true,
    "children": [
      {
        "title": "학생회 활동",
        "description": "학생 자치기구 선거와 투표 참여",
        "miniLabel": "학생회 활동",
        "code": "L03STCN",
        "path": "pages/L03STCN.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03STCN.html",
        "children": [
          {"title":"총학생회 선거","miniLabel":"선거","code":"L04ELCT","path":"pages/L04ELCT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020079","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","학생회 활동","총학생회 선거"],"sourceRow":138,"description":"학생 자치기구 온라인 선거 참여","guideStatus":"existing"}
        ]
      },
      {
        "title": "원격교육 TA 운영",
        "description": "원격교육 조교의 근무일지 관리",
        "miniLabel": "원격교육 TA 운영",
        "code": "L03TAOP",
        "path": "pages/L03TAOP.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03TAOP.html",
        "children": [
          {"title":"TA 근무일지 입력","miniLabel":"일지 입력","code":"L04TALG","path":"pages/L04TALG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020488","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","원격교육 TA 운영","TA 근무일지 입력"],"sourceRow":139,"description":"월별 TA 근무일지 작성·승인 확인","guideStatus":"existing"}
        ]
      },
      {
        "title": "산학협력활동",
        "description": "산학협력 연구 참여 증명 관리",
        "miniLabel": "산학협력활동",
        "code": "L03INDS",
        "path": "pages/L03INDS.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"산학협력 연구 참여 확인서","description":"산학협력 연구 참여 확인서 신청·출력","miniLabel":"참여 확인서","code":"L04INDC","path":"pages/L04INDC.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020164","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","산학협력활동","산학협력 연구 참여 확인서"],"sourceRow":140,"guideStatus":"existing"}
        ]
      },
      {
        "title": "통학버스",
        "description": "통학버스 노선·신청·운영 안내",
        "miniLabel": "통학버스",
        "code": "L03BUSS",
        "path": "pages/L03BUSS.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03BUSS.html",
        "children": [
          {"title":"통학버스 노선도","miniLabel":"버스 노선도","code":"L04BUSM","path":"pages/L04BUSM.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019984","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","통학버스","통학버스 노선도"],"sourceRow":141,"description":"지역별 통학버스 노선·정류장 확인","contentPath":"pages/L03BUSS.html","contentAnchor":"L04BUSM","guideStatus":"embedded"},
          {"title":"통학버스 신청","miniLabel":"탑승 신청","code":"L04BUSA","path":"pages/L04BUSA.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019985","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","통학버스","통학버스 신청"],"sourceRow":142,"description":"통학버스 신청내역과 취소·환불 관리","guideStatus":"existing"},
          {"title":"통학버스 안내","miniLabel":"버스 안내","code":"L04BUSI","path":"pages/L04BUSI.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019986","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","통학버스","통학버스 안내"],"description":"통학버스 신청·운영 변경사항 확인","contentPath":"pages/L03BUSS.html","contentAnchor":"L04BUSI","guideStatus":"embedded"}
        ]
      },
      {
        "title": "시설 예약/신고",
        "description": "강의실 이용과 시설 보수 요청",
        "miniLabel": "시설 예약/신고",
        "code": "L03ETAC",
        "path": "pages/L03ETAC.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "sourceAliases": [
          "기타 학사 관리"
        ],
        "overviewPath": "pages/L03ETAC.html",
        "children": [
          {"title":"강의실 잔류 신청","miniLabel":"잔류 신청","code":"L04ROOMS","path":"pages/L04ROOMS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020466","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","시설 예약/신고","강의실 잔류 신청"],"sourceRow":143,"description":"야간·방과 후 강의실 잔류 신청","guideStatus":"existing"},
          {"title":"시설 관련 요청","description":"시설 보수 요청과 접수·처리 확인","miniLabel":"시설 관련 요청","code":"L04FREQ","path":"pages/L04FREQ.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020554","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","시설 예약/신고","시설 관련 요청"],"sourceRow":144,"guideStatus":"existing"}
        ]
      },
      {
        "title": "학생생활관",
        "description": "생활관 입사·납부·생활 신청 관리",
        "miniLabel": "학생생활관",
        "code": "L03DORM",
        "path": "pages/L03DORM.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03DORM.html",
        "children": [
          {"title":"학생생활관 공지사항","description":"생활관 모집·일정·운영 공지 확인","miniLabel":"학생생활관 공지사항","code":"L04DMNT","path":"pages/L04DMNT.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019992","directUrl":"https://jjstar.jj.ac.kr/","showDirectLink":false,"sourceMenuPath":["대학생활","학생생활관","학생생활관 공지사항"],"contentPath":"pages/L03DORM.html","contentAnchor":"L04DMNT","guideStatus":"embedded"},
          {"title":"학생생활관 입사 신청","miniLabel":"입사","code":"L04DMAP","path":"pages/L04DMAP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020002","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","학생생활관","학생생활관 입사 신청"],"sourceRow":145,"description":"생활관 모집정보 확인과 입사 신청","guideStatus":"existing"},
          {"title":"입사서약서 작성","miniLabel":"서약서 작성","code":"L04DMPG","path":"pages/L04DMPG.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020001","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","학생생활관","입사서약서 작성"],"sourceRow":146,"description":"입사정보·서류 작성과 서약·동의 저장","contentPath":"pages/L03DORM.html","contentAnchor":"L04DMPG","guideStatus":"embedded"},
          {"title":"관실신청","miniLabel":"관실 신청","code":"L04ROOM","path":"pages/L04ROOM.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019993","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","학생생활관","관실신청"],"sourceRow":147,"description":"생활관 층·호실·좌석 선택 및 신청","guideStatus":"existing"},
          {"title":"학생생활관비 납입고지서","miniLabel":"납입 고지서","code":"L04DMBI","path":"pages/L04DMBI.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019998","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","학생생활관","학생생활관비 납입고지서"],"sourceRow":148,"description":"생활관비 고지 내역 확인과 고지서 출력","contentPath":"pages/L03DORM.html","contentAnchor":"L04DMBI","guideStatus":"embedded"},
          {"title":"학생생활관비 납부확인서","miniLabel":"납부 확인서","code":"L04DMCF","path":"pages/L04DMCF.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019994","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","학생생활관","학생생활관비 납부확인서"],"sourceRow":149,"description":"생활관비 납부 확인과 확인서 출력","contentPath":"pages/L03DORM.html","contentAnchor":"L04DMCF","guideStatus":"embedded"},
          {"title":"늦은귀사신청","miniLabel":"늦은 귀사","code":"L04LATR","path":"pages/L04LATR.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019995","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","학생생활관","늦은귀사신청"],"sourceRow":150,"description":"늦은귀사 신청서와 증빙서류 준비","contentPath":"pages/L03DORM.html","contentAnchor":"L04LATR","guideStatus":"embedded"},
          {"title":"상벌점","miniLabel":"상벌점","code":"L04PNTS","path":"pages/L04PNTS.html","enabled":true,"hideInNav":true,"sourceDomId":"M000019997","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","학생생활관","상벌점"],"sourceRow":151,"description":"생활관 상벌점 내역과 합계 확인","contentPath":"pages/L03DORM.html","contentAnchor":"L04PNTS","guideStatus":"embedded","sourceAliases":["상벌점조회"]},
          {"title":"외박신청","miniLabel":"외박","code":"L04OUTS","path":"pages/L04OUTS.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020000","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","학생생활관","외박신청"],"sourceRow":152,"description":"외박기간·사유 작성과 신청내역 확인","guideStatus":"existing"},
          {"title":"조기 취침 신청","miniLabel":"조기 취침","code":"L04SLEP","path":"pages/L04SLEP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020003","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","학생생활관","조기 취침 신청"],"sourceRow":153,"description":"조기 취침 사유 작성과 신청내역 확인","guideStatus":"existing"},
          {"title":"불편사항 신청","miniLabel":"불편 사항","code":"L04INCV","path":"pages/L04INCV.html","enabled":true,"hideInNav":false,"sourceDomId":"M000019996","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","학생생활관","불편사항 신청"],"sourceRow":154,"description":"생활관 불편사항 접수와 처리 확인","guideStatus":"existing"},
          {"title":"퇴사 신청","miniLabel":"퇴사","code":"L04LEVD","path":"pages/L04LEVD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020004","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","학생생활관","퇴사 신청"],"sourceRow":155,"description":"퇴사정보·환불계좌 작성과 동의 확인","guideStatus":"existing"}
        ]
      },
      {
        "title": "해외연수",
        "description": "해외연수 신청과 입·출국 신고",
        "miniLabel": "해외연수",
        "code": "L03OVTR",
        "path": "pages/L03OVTR.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "overviewPath": "pages/L03OVTR.html",
        "children": [
          {"title":"해외 연수 신청","miniLabel":"연수 신청","code":"L04TRAP","path":"pages/L04TRAP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020463","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","해외연수","해외 연수 신청"],"sourceRow":156,"description":"해외연수 모집공고와 신청내역 확인","guideStatus":"existing"},
          {"title":"해외 입·출국 신고","miniLabel":"입출국 신고","code":"L04TRDG","path":"pages/L04TRDG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020464","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","해외연수","해외 입·출국 신고"],"sourceRow":157,"description":"연수 출국·입국 신고와 증빙 관리","guideStatus":"existing"}
        ]
      },
      {
        "title": "캡스톤디자인",
        "description": "캡스톤 과제·서약·카드대여 관리",
        "miniLabel": "캡스톤디자인",
        "code": "L03CAPS",
        "path": "pages/L03CAPS.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"캡스톤디자인 서약서동의","description":"캡스톤 서약과 개인정보 동의 저장","miniLabel":"서약서 동의","code":"L04CPAG","path":"pages/L04CPAG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020126","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","캡스톤디자인","캡스톤디자인 서약서동의"],"sourceRow":158,"sourceAliases":["캡스톤디자인 서약서 동의"],"guideStatus":"existing"},
          {"title":"신청확인 및 관리","description":"과제 변경·지출·결과보고서 관리","miniLabel":"신청 확인","code":"L04CPMG","path":"pages/L04CPMG.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020127","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","캡스톤디자인","신청확인 및 관리"],"sourceRow":159,"guideStatus":"existing"},
          {"title":"카드대여","description":"카드대여 시간 확인과 예약·취소","miniLabel":"카드 대여","code":"L04CARD","path":"pages/L04CARD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020128","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","캡스톤디자인","카드대여"],"sourceRow":160,"guideStatus":"existing"}
        ]
      },
      {
        "title": "개인(팀) 프로젝트",
        "description": "개인·팀 프로젝트 이수·보고 관리",
        "miniLabel": "개인(팀) 프로젝트",
        "code": "L03PJCT",
        "path": "pages/L03PJCT.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"개인(팀) 프로젝트","description":"프로젝트 이수내역과 결과보고서 작성","miniLabel":"개인/팀 프로젝트","code":"L04PRJT","path":"pages/L04PRJT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020523","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["대학생활","개인(팀) 프로젝트","개인(팀) 프로젝트"],"sourceRow":161,"guideStatus":"existing"}
        ]
      }
    ],
    "overviewPath": "pages/L02LIFE.html"
  },
  {
    "title": "My Page",
    "description": "나의 정보와 역량·활동 기록 관리",
    "miniLabel": "My Page",
    "code": "L02MYPG",
    "path": "pages/L02MYPG.html",
    "enabled": true,
    "hideInNav": false,
    "generatedOverview": true,
    "children": [
      {
        "title": "나의정보",
        "description": "개인정보·학과 선택·예비군 관리",
        "miniLabel": "나의정보",
        "code": "L03MYIN",
        "path": "pages/L03MYIN.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"My 정보","description":"관심사 선택과 역량 진단·참여현황 확인","miniLabel":"MY 정보","code":"L04MYIF","path":"pages/L04MYIF.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020007","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["My Page","나의정보","My 정보"],"sourceRow":162,"guideStatus":"existing"},
          {"title":"학생증","miniLabel":"학생증","code":"L04STID","path":"pages/L04STID.html","enabled":true,"hideInNav":false,"directUrl":"https://jjstar.jj.ac.kr/","guideStatus":"existing","description":"학생증 종류와 이용 정보","sourceMenuPath":["My Page","나의정보","학생증"],"operationStatus":"retained"},
          {"title":"개인정보 동의내역","miniLabel":"개인정보 동의내역","code":"L04PRVC","path":"pages/L04PRVC.html","enabled":true,"hideInNav":false,"directUrl":"https://jjstar.jj.ac.kr/","guideStatus":"existing","description":"개인정보 수집·이용·제공 동의 관리","sourceMenuPath":["My Page","나의정보","개인정보 동의내역"],"sourceDomId":"M000023031"},
          {"title":"희망학과 선택","miniLabel":"희망 학과","code":"L04HMJR","path":"pages/L04HMJR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020404","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["My Page","나의정보","희망학과 선택"],"sourceRow":163,"description":"희망학과 탐색과 선택내역 관리","guideStatus":"existing"},
          {"title":"학과 선택","miniLabel":"학과 선택","code":"L04DEPT","path":"pages/L04DEPT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020439","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["My Page","나의정보","학과 선택"],"sourceRow":164,"description":"진학할 학과 선택과 신청내역 관리","guideStatus":"existing"},
          {"title":"학부모 학사정보조회 승인","miniLabel":"학부모 조회승인","code":"L04PAPR","path":"pages/L04PAPR.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020444","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["My Page","나의정보","학부모 학사정보조회 승인"],"sourceRow":165,"description":"보호자 연락처와 학사조회 권한 관리","guideStatus":"existing"},
          {"title":"학생예비군 신청","description":"예비군 전입신고 작성·첨부·동의 저장","miniLabel":"학생예비군 신청","code":"L04RESV","path":"pages/L04RESV.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021791","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["My Page","나의정보","학생예비군 신청"],"sourceRow":166,"guideStatus":"existing"}
        ]
      },
      {
        "title": "취업역량",
        "description": "대학생활 목표·역량·경력 관리",
        "miniLabel": "취업역량",
        "code": "L03EMPC",
        "path": "pages/L03EMPC.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"My 대학생활 로드맵","description":"학기 목표·계획과 대학생활 현황 관리","miniLabel":"MY 로드맵","code":"L04MYLF","path":"pages/L04MYLF.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020558","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["My Page","취업역량","My 대학생활 로드맵"],"sourceRow":167,"guideStatus":"existing"},
          {"title":"My 역량개발","description":"핵심역량 점수·진단결과·개발현황 확인","miniLabel":"MY 역량개발","code":"L04MYCP","path":"pages/L04MYCP.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020556","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["My Page","취업역량","My 역량개발"],"sourceRow":168,"guideStatus":"existing","operationStatus":"retained"},
          {"title":"My 직무역량","description":"활동별 직무역량과 추천 프로그램·자격증","miniLabel":"MY 직무역량","code":"L04MYJB","path":"pages/L04MYJB.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020557","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["My Page","취업역량","My 직무역량"],"sourceRow":169,"guideStatus":"existing"},
          {"title":"My 커리어","description":"이력서·자기소개서와 경력개발계획 관리","miniLabel":"MY 커리어","code":"L04MYCR","path":"pages/L04MYCR.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020559","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["My Page","취업역량","My 커리어"],"sourceRow":170,"guideStatus":"existing"},
          {"title":"My 포트폴리오","description":"자료 업데이트와 포트폴리오 출력","miniLabel":"My 포트폴리오","code":"L04PORT","path":"pages/L04PORT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000021792","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["My Page","취업역량","My 포트폴리오"],"sourceRow":171,"guideStatus":"existing"}
        ]
      },
      {
        "title": "수상·인증 내역",
        "description": "교내 수상과 마이크로전공 인증",
        "miniLabel": "수상·인증 내역",
        "code": "L03AWCT",
        "path": "pages/L03AWCT.html",
        "enabled": true,
        "hideInNav": false,
        "generatedOverview": true,
        "children": [
          {"title":"교내 수상내역","miniLabel":"교내 수상","code":"L04AWIN","path":"pages/L04AWIN.html","enabled":true,"hideInNav":true,"sourceDomId":"M000020468","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["My Page","수상·인증 내역","교내 수상내역"],"sourceRow":172,"description":"교내 수상기록과 상장 조회","contentPath":"pages/L03AWAR.html","contentAnchor":"L04AWIN","guideStatus":"embedded"},
          {"title":"학습경험 인증 현황","description":"학습경험 모듈별 인증과 참여 이력","miniLabel":"학습경험 인증현황","code":"L04EXCH","path":"pages/L04EXCH.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020561","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["My Page","수상·인증 내역","학습경험 인증 현황"],"sourceRow":174,"guideStatus":"existing"},
          {"title":"마이크로 전공 인증서","miniLabel":"micro전공 인증서","code":"L04MCRT","path":"pages/L04MCRT.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020037","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["My Page","수상·인증 내역","마이크로 전공 인증서"],"sourceRow":175,"description":"마이크로전공 인증 내역·인증서 확인","guideStatus":"existing"},
          {"title":"성적우수상내역","miniLabel":"성적 우수상","code":"L04AWRD","path":"pages/L04AWRD.html","enabled":true,"hideInNav":false,"sourceDomId":"M000020449","directUrl":"https://jjstar.jj.ac.kr/","sourceMenuPath":["My Page","수상·인증 내역","성적우수상내역"],"sourceRow":173,"sourceAliases":["성적우수상 내역"],"description":"학기별 성적우수상 수상내역","guideStatus":"existing","operationStatus":"retained"}
        ]
      }
    ],
    "sourceAliases": [
      "SUPER STAR"
    ]
  }
];
