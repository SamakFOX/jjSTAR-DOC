# jjSTAR 사용자 가이드 (Html+PDF / DemoWEB)  

## 메뉴 개편 기준 (2026-10-15)

- 서비스 메뉴는 2026-10-15 확인한 JJSTAR 메뉴 엑셀의 ‘메뉴 목록’ 시트 기준으로 대분류 7개, 중분류 42개, 하위 메뉴 165개입니다. 가이드 전용 시작 화면은 유지하며, 이용 가이드 묶음 5개 항목은 웹 메뉴 목록·검색·이전/다음 이동에서 제외합니다.
- 기존 문서 연결은 9월 29일 메뉴 변경 이력도 대조합니다. 정보조회는 기존 STAR 관리의 코드·교육과정 설명을 유지하고, JJCS 직무탐색은 기존 NCS 메뉴 코드를 유지합니다. starT 안내 및 혜택은 기존 3C 활동·트랙·프로그램 소개·혜택 설명을 함께 제공합니다.
- 실행용 메뉴는 `data/menu.js`에서 관리합니다. 기존 `title`, `miniLabel`, `code`, `path`, `enabled`, `hideInNav`, `children` 형식을 유지하며, 원본 DOM ID는 `sourceDomId`에 별도로 보관합니다.
- 대분류·중분류 본문 목록은 같은 메뉴 데이터에서 생성하며 기존 문서의 설명·이미지를 재사용합니다. `hideInNav` 하위 메뉴의 안내는 해당 상위 페이지에 임베드하고 목차 앵커로 이동합니다. `enabled`와 `hideInNav`는 가이드의 노출 설정이며 실제 서비스 권한을 뜻하지 않습니다.
- 기존 상세 문서는 재사용하고, 미작성 상태였던 61개 메뉴에는 이용 안내 초안을 작성했습니다. 신규 가이드는 검토된 장학금 조회의 상단·페이지 설명·추가 팁·예시 순서를 따릅니다. 메뉴 이동이나 가이드 작성이 개별 기능의 동작 검증 완료를 의미하지는 않습니다. 원본 메뉴 경로와 DOM 식별자는 각 항목의 `sourceMenuPath`, `sourceDomId`에 보관합니다. 원본 엑셀과 비교·변환 자료는 로컬에서 별도로 보관하며 Git에는 포함하지 않습니다.
- 2026-10-19 추가 점검에서는 실제 이미지가 한 장이라도 연결된 기존 가이드 8개를 보존하고, 번호 placeholder만 있던 나머지 기존 가이드 96개의 설명·팁·예시를 교체했습니다. 학사일정은 별도 요청에 따라 제목 아이콘만 추가했습니다. 중분류에 포함된 상세 안내도 기존 메뉴 경로와 앵커를 유지합니다.
- 교육과정편람은 별도 요청에 따라 `pages/L04EDCRB.html`로 분리했습니다. 정보조회 목차·사이드바에서 독립 페이지로 열리며 교육과정조회와 수강편람은 기존 임베드를 유지합니다.
- 개편 전 상태는 원격 브랜치와 태그 `backup/before-menu-20261015`로 보존합니다. 기존 안내 파일은 삭제하지 않습니다.
- VS Code 터미널(PowerShell)에서 `node scripts/test-menu.mjs`로 메뉴 검사를 실행합니다. `python -m http.server 8765 --bind 127.0.0.1` 실행 후 `http://127.0.0.1:8765/index.html`에서 확인할 수 있습니다.
- 같은 서버의 `/scripts/menu-browser-check.html`은 브라우저 DOM으로 전체 상위 페이지·숨김 메뉴 임베드·하위 메뉴 연결을 검사합니다.
- 앞으로 로컬 미리보기는 현재 작업 버전을 `http://127.0.0.1:8765/index.html`, 개편 전 백업을 `http://127.0.0.1:8766/index.html`로 함께 실행합니다. GitHub Pages의 소스 브랜치나 현재 작업 브랜치를 전환하지 않습니다.
- 8766은 `refs/tags/backup/before-menu-20261015`에서 별도 추출한 고정 스냅샷을 제공합니다. 현재 로컬 스냅샷 위치는 `outputs/local-compare-20261016/before-menu-33f283a`이며, 로컬 비교용 파일은 Git에 포함하지 않습니다.

### 전주대학교 학생지원 시스템 jjSTAR 사용자 가이드입니다.  

JJSTAR란?<br>
&nbsp; - inSTAR와 onSTAR를 통합하며 학생중심의 신규 서비스들을 적재한 신규 플랫폼이에요!<br>
&nbsp; - 가이드는 신규서비스를 포함한 각 메뉴 위치와 사용법 등을 안내드리기 위해 제작되었어요.<br>

> 가이드 또는 데모 웹페이지에 대한 **문의** 또는 **개선사항 피드백**은<br>jjbd2874@jj.ac.kr 으로 전달해주시면 검토 후 반영해드릴게요!!  

---

## 가이드 종류
① HTML<br>
<img src="https://github.com/SamakFOX/jjSTAR-DOC/blob/main/assets/images/img_html_sample.webp" width="50%"><br>
&nbsp; - 웹페이지 기능 위치 및 상세 사용 방법 안내<br>
&nbsp; - 메뉴 사용법 상세 설명<br>

② PDF<br>
<img src="https://github.com/SamakFOX/jjSTAR-DOC/blob/main/assets/images/jjstar_home.webp" width="50%"><br>
&nbsp; - jjSTAR 서비스를 이용하는 최고의 방법을 안내<br>
&nbsp; - 각 기능간 연계와 시너지 효과 위주의 설명<br>
&nbsp; - 짧고 간결한 정보전달<br>

| jjSTAR 가이드 미리보기 (HTML) | [![바로가기](https://img.shields.io/badge/바로가기-blue?style=for-the-badge)](https://samakfox.github.io/jjSTAR-DOC/) |
|:---:|:---:|

| jjSTAR 가이드 미리보기 (PDF) | [![바로가기](https://img.shields.io/badge/바로가기-blue?style=for-the-badge)](https://samakfox.github.io/jjSTAR-DOC/pdf/jjSTAR_Guide.pdf) |
|:---:|:---:|

> 모바일 환경이 불편하신 분은 PDF로 다운로드하시기 바랍니다.  
> PDF 문서는 2026.03.19 기준 미업로드되었습니다. (3월 중 업로드 예정)  

&nbsp;

## 데모 웹
### 학생분들이 jjSTAR에 빠르게 적응할 수 있도록 제작한 데모 사이트입니다<br>
모든 기능을 사용해 볼 수 있게 RBAC가 해제되어있으며, 신청기간 제한도 해제되어 있으므로<br>
실제 JJSTAR 이용 시에는 신청기간에 맞춰 이용하시기 바랍니다 (ex. 등록금 납부 기간, 기숙사 신청 기간 등)<br>

| jjSTAR 데모 웹페이지 | [![바로가기](https://img.shields.io/badge/바로가기-blue?style=for-the-badge)](https://jjustar.dev) |
|:---:|:---:|

> 데모 웹페이지는 기존 전주대학교 행정 시스템과 연동되지 않으며, <br>기능 시연과 학생분들의 사용 경험과 개선점 피드백을 받기 위해 제작되었습니다.  

&nbsp;

## 면책 조항
본 프로젝트는 전주대학교와 어떠한 공식적인 관련도 없습니다.<br>
본 문서에 언급된 모든 상표는 해당 소유자의 자산입니다.<br>
© 2024 JEONJU UNIVERSITY. ALL RIGHTS RESERVED.<br>  

## Disclaimer
This project is not affiliated with Jeonju University.<br>
All trademarks referenced herein are the properties of their respective owners.<br>
© 2024 JEONJU UNIVERSITY. ALL RIGHTS RESERVED.<br>  

## 세부메뉴 바로가기 설정

- 서비스 세부메뉴 165개의 바로가기 버튼은 `메뉴명 바로가기` 형식으로 표시합니다
- 링크는 `data/menu.js`의 각 메뉴 객체에 있는 `directUrl`에서 수정합니다. 현재는 모두 `https://jjstar.jj.ac.kr/`로 연결하며, 메뉴별 주소가 확정되면 해당 값만 바꾸면 됩니다
- 버튼 문구는 같은 객체의 `title`을 사용하며 본문·중분류 내 상세 안내·팝업에 공통 적용합니다
