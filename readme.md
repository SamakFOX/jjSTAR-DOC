# jjSTAR 사용자 가이드 (Html+PDF / DemoWEB)  

## 메뉴 개편 기준 (2026-10-15)

- 서비스 메뉴는 2026-10-15 확인한 JJSTAR 메뉴 엑셀의 ‘메뉴 목록’ 시트 기준으로 대분류 7개, 중분류 42개, 하위 메뉴 165개입니다. 홈(JJSTAR 이용 가이드)과 하위 안내 4개는 서비스 메뉴와 별도로 웹 메뉴 목록·검색에 표시하며, 서비스의 이전/다음 이동에서는 제외합니다.
- 기존 문서 연결은 9월 29일 메뉴 변경 이력도 대조합니다. 정보조회는 기존 STAR 관리의 코드·교육과정 설명을 유지하고, JJCS 직무탐색은 기존 NCS 메뉴 코드를 유지합니다. starT 안내 및 혜택은 기존 3C 활동·트랙·프로그램 소개·혜택 설명을 함께 제공합니다.
- 실행용 메뉴는 `data/menu.js`에서 관리합니다. 기존 `title`, `miniLabel`, `code`, `path`, `enabled`, `hideInNav`, `children` 형식을 유지하며, 원본 DOM ID는 `sourceDomId`에 별도로 보관합니다.
- 대분류·중분류 본문 목록은 같은 메뉴 데이터에서 생성하며 기존 문서의 설명·이미지를 재사용합니다. `hideInNav` 하위 메뉴의 안내는 해당 상위 페이지에 임베드하고 목차 앵커로 이동합니다. `enabled`와 `hideInNav`는 가이드의 노출 설정이며 실제 서비스 권한을 뜻하지 않습니다.
- 상세 가이드는 상단·페이지 설명·추가 팁·예시 순서로 구성합니다. 가이드 제공 여부와 실제 서비스 기능의 동작 검증 여부는 별도로 관리합니다. 원본 메뉴 경로와 DOM 식별자는 각 항목의 `sourceMenuPath`, `sourceDomId`에 보관합니다. 원본 엑셀과 비교·변환 자료는 로컬에서 별도로 보관하며 Git에는 포함하지 않습니다.
- 중분류에 포함된 상세 안내는 기존 메뉴 경로와 앵커를 유지합니다.
- 교육과정편람은 `pages/L04EDCRB.html`에서 관리합니다. 정보조회 목차·사이드바에서 독립 페이지로 열리며 교육과정조회와 수강편람은 정보조회 페이지에 포함됩니다.
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

## 진로·취업 부서 검토용 화면

- `index.html?view=career`로 접속하면 진로개발 및 상담 19개, 취·창업지원 16개, My Page 취업역량 5개를 대상으로 숨김 항목을 제외해 표시합니다. 상담안내는 검토 대상에서 제외합니다.
- 검토 대상과 순서는 `assets/js/menu-views.js`의 `careerCodes`에서 관리합니다. 상위 목차·검색·이전/다음 이동도 같은 범위를 사용합니다.
- 본문과 이미지는 전체 가이드와 같은 파일을 사용하므로 기존 페이지를 수정하면 양쪽에 반영됩니다. `index.html`은 전체 메뉴에서 숨김 항목을 제외해 표시합니다.
- 이 주소는 메뉴 표시를 구분하는 용도이며 접근 권한을 제한하지 않습니다.

## 전체 메뉴 숨김 설정

- 서비스 세부 메뉴 165개 모두 숨김·표시를 조절할 수 있습니다. 설정은 `assets/js/menu-views.js` 상단의 `hiddenCodes`에서 관리합니다.
- JJSTAR Menu Opener 0.0.6 이상에서 JJSTAR Menu의 세부 메뉴에 마우스를 올린 뒤 눈 모양 버튼을 누르면 해당 코드가 숨김 목록에 저장되거나 해제됩니다. 숨긴 메뉴도 확장 목록에는 `가이드 숨김`으로 남아 편집할 수 있습니다.
- 직접 수정할 때는 `hiddenCodes`에 `'메뉴코드',`를 추가하면 숨김, 해당 줄을 제거하면 다시 표시됩니다. 본문·이미지와 부서 검토용 `careerCodes`는 그대로 유지합니다.
- 숨김은 전체 가이드와 부서 검토용 화면의 목록·검색·상위 목차·이전/다음 이동에 함께 적용됩니다. 하위 메뉴를 모두 숨긴 분류도 목록에서 빠집니다. 사용자용 표시 토글은 없습니다.
- 현재 숨김 목록이 비어 있어 전체 서비스 165개, 진로·취업 검토 대상 40개가 표시됩니다. 홈과 분류는 서비스 세부 메뉴 수에 포함하지 않습니다.
- 설정 파일에 미저장 편집 내용이 있으면 먼저 저장해야 합니다. 변경 후 웹 화면을 새로고침하면 반영됩니다. 이 설정은 가이드 표시만 제어하며 실제 JJSTAR 서비스의 메뉴와 접근 권한은 변경하지 않습니다.

## 세부메뉴 바로가기 설정

- 서비스 세부메뉴 165개의 바로가기 버튼은 `메뉴명 바로가기` 형식으로 표시합니다
- 링크는 `data/menu.js`의 각 메뉴 객체에 있는 `directUrl`에서 수정합니다. 현재는 모두 `https://jjstar.jj.ac.kr/`로 연결하며, 메뉴별 주소가 확정되면 해당 값만 바꾸면 됩니다
- 버튼 문구는 같은 객체의 `title`을 사용하며 본문·중분류 내 상세 안내·팝업에 공통 적용합니다
