## Kangdarigram

대표적인 SNS 애플리케이션 중 하나인 인스타그램 클론 프로젝트
[Kangdarigram](http://kangdari.shop.s3-website.ap-northeast-2.amazonaws.com)

## 개발 기간

- 2020/07/24 ~ 2020/08/18

## 개발 목적

- 풀스택 프로젝트를 진행하며 웹 개발의 전체적인 이해와 각 기술 스택에 대한 이해도를 높임.

- SNS의 기본적인 기능들을 직접 구현

- Redux를 이용한 상태 관리

## 기술 스택

- Front-End: React.js, Redux(redux-thunk), styled-components

- Back-End: Express, MongoDB

- Deploy: AWS S3, EC2

## 구현 기능

### Acount

- 회원가입(bcrypt를 이용한 패스워드 암호화)

- JWT 기반 로그인 및 인증 처리

- 예외 처리(아이디 중복, 비밀번호 오류)

### Post

- Post 작성 및 삭제

- 전체 Post 조회

- Intersection Observer API를 이용하여 무한 스크롤

- pos 상세 페이지

- 좋아요, 좋아요 확인, 저장

- 댓글 작성 및 삭제

### Profile

- 유저가 작성 및 저장한 Post 조회

- 자신의 프로필 편집 (사진, 이름, 아이디, 소개 수정)

### Search

- 사용자 아이디, 이름 검색 기능

- 태그 검색 기능

## 시연 영상 링크

[![Watch the video](https://user-images.githubusercontent.com/44963933/90490628-ca53bf80-e179-11ea-97cf-5bf00e8c7a93.png)](https://www.youtube.com/watch?v=JbvSdYq0kjM)
