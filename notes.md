# Node.js

## Node.js란?

자바스크립트는 원래 브라우저 내에서 동작할 수 있었지만, nodejs로 인해 브라우저 밖으로 나올 수 있게 되었습니다. 그래서, 서버를 만들 수도 있고, 웹 스크랩을 하는 등 프로그래밍 언어로 사용할 수 있게 해준 것입니다. 그것이 nodejs입니다.

## 무엇을 할 수 있을까?

Spring, Laravel, Django 등 웹 프레임워크는 많은데, nodejs를 사용하는 이유는 무엇일까요?

모든 프레임워크에 장당점이 있기 때문에, 이럴 다음과 같은 경우에 nodejs를 사용합니다.

#### 1. 가장 먼저는 언어가 자바스크립트입니다. 자바스크립트로 프론트엔드, 백엔드를 모두 할 수 있으며, 요소들을 customizing할 수 있게 됩니다.

#### 2. 비동기이기 때문에 실시간 처리에 유용합니다. 많은 데이터를 전송하고 저장하고, 알림이나 채팅처럼 실시간 요청에 대한 반응이 필요한 서비스에 유용합니다.

#### cf) 단, 메모리나 램에 접근해서 해야하는 작업에는 적합하지 않습니다. 하지만, 규모가 있는 서비스는 아주 다양한 언어로 개발되어 있습니다. nodejs를 공부한다고 다른 건 못한다고 생각할 필요는 없다고 생각합니다.

## Get started

_cf) mac을 기준으로 적었습니다. 양해 바랍니다._

#### 1. Homebrew 설치

#### 2. nodejs 설치 (by brew)

node.js를 설치하면, 자동적으로 npm(앱스토어 같이 패키지를 담아두고 관리하는 것)이 설치됩니다. 그 때부터 다음의 명령어를 사용합니다.

## Server started

#### 1. express (웹 프레임워크) 설치

```javascript
npm init              // npm으로 프로젝트 시작 (package.json이 생성됩니다.)
npm install express   // express 설치
```

**_npm 명령어는 반드시!! package.json이 있는 곳에서 명령어를 실행해야 합니다._**
**_아니면 의도하지 않은 곳에 packge.json이 또 생깁니다._**

## Github & gitignore

node_modules는 무거운 파일입니다. 그래서 저장소에서 .gitignore에 추가해야합니다.

구글에 gitignore nodejs를 치면, gitignore해야하는 표준이 있으니 이것으로 채워넣으면 됩니다.

**_package-lock.json 도 꼭 확인하고 추가해주세요. 보안과 관련된 것입니다._**

그래서 협업을 하게 되면, 소스코드와 package.json파일만 넘겨주면 됩니다. 그러면 넘겨받은 측에서

```javascript
npm install
```

하면 필요한 패키지 다운로드 끝~

## 서버 확인

자바스크립트 파일 하나를 만들어서 다음의 코드가 실행되는지 확인합니다. 이 때는 파일명을 신경쓰지 맙시다.

```javascript
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
```

## 코드 들어가기 전 환경

#### 0. 파일 만들기

가장 기본적인 예시를 위한 형식으로, 꼭 따를 필요 없이 기본 틀을 이해했다면, 커스터마이징해서 사용하면 됩니다.
**app.js** , **init.js** , **router.js** 를 만듭니다.

#### 1. babel

최신 js를 오리지날 js로 알아서 바꿔주는 도구입니다.

```shell
npm install @babel/node
npm install @babel/preset-env
npm install @babel/core
```

그리고, .babelrc를 만들고, 다음을 입력합니다.

```json
{
  "presets": ["@babel/preset-env"]
}
```

#### 2. nodemon

코드를 수정하고, 서버를 껐다가 다시 키고 하는 일을 대신해줍니다. nodemon을 설치할 때는 -D (개발자에게 필요한 dependency로 넣기)를 붙입시다.

```shell
npm install nodemon -D
```

그리고, package.json에서 다음과 같은 부분을 추가합니다. delay를 주는 이유는 코드가 수정되고, babel이 변환을 완료할 시간을 주기 위함입니다.

```json
"scripts" : {
    "start" : "nodemon --exec babel-node init.js --delay 2"
}
```

#### 3. morgan

middleware로, 무슨 일이 어디서 일어났는지 기록해주는 logging 도구입니다.

```shell
npm install morgan
```

#### 4. helmet

nodejs의 보안을 위해 필요한 middelware입니다.

```shell
npm install helmet
```

#### 5. body-parser

사용자가 form을 채워서 전송하면, 서버가 받게 됩니다. 이 때의 request object에 접근할 수 있도록 합니다.

```shell
npm install body-parser
```

#### 6. cookie-parser

session을 다루기 위해서 cookie에 유저 정보를 저장하는데, 서버가 사용자로부터 받은 데이터를 이해할 수 있게 합니다. json으로 보내는 경우(json), html form으로 보내는 경우(urlencoded)에 대해 설정합니다.

```shell
npm install cookie-parser
```

#### 7. all in code

여기까지 했다면, **app.js** 에 다음과 같이 추가해줍니다. (주석으로 해놓은 부분도 결국에는 다 사용하게 됩니다.)

```javascript
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import { userRouter } from "./router";

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// // get methods something (not listen method here)
// app.use("/user", userRouter); // 사용자가 '/'에 접근하면, userRouter가 이를 처리할 것이라는 의미

export default app; // 다른 파일에서 import하면, app object를 준다는 의미
```

**init.js** 에 다음과 같이 추가해줍니다.

```javascript
import app from "./app";

const PORT = 4000;

app.listen(PORT, () => console.log(`✅Listening on: http://localhost:${PORT}`));
```

**router.js** 에 다음과 같이 추가해줍니다.

```javascript
import express from "express";

export const userRouter = express.Router(); // userRouter 객체도 다른 곳에서 사용합니다.

userRouter.get("/", (req, res) => res.send("Test"));
```

#### 8. settings finished

## 명령어 이해

**_모든 명령어는 위에서 아래로 실행됩니다. 이것은 당연하게 보이지만, 생각보다 중요합니다._**

#### 1. get

get방식은 사용자가 form에 쓴 값이 url에 담겨 있는 것이 특징입니다.

```javascript
app.get("/", call); // 사용자가 /에 접근하면, call함수 실행
```

_cf) call함수에 res.send("") 가 없으면 무한 로딩_

#### 2. use

use는 middleware를 글로벌로 사용하는 메서드입니다. 이는 해당 웹사이트에서 모두 다 적용됩니다. (특정 하나에만 사용하고 싶다면, get의 중간 인자를 추가하여 사용합니다.)

middleware은 사용자와 마지막 응답 사이에 존재하는 것입니다. express에서의 모든 함수는 middleware가 될 수 있습니다. middleware은 (req, res, next)를 가집니다. 원하는 만큼의 middleware를 가질 수 있습니다. 만약 middleware에서 next함수를 호출하지 않는다면, 연결을 끊을 수도 있습니다.

## MVC 패턴

M(model), V(view), C(controller)를 뜻하며, 코드 구역을 명확하게 구분하기 위해 고안된 디자인 패턴입니다.

_cf) 다음 글을 재미있게 읽었습니다._

<a href="https://medium.com/@hulitw/introduction-mvc-spa-and-ssr-545c941669e9"> Xiao Ming </a>

조금 더 세부적으로 말하면,

Model은 데이터,
View는 데이터가 생긴 모습,
Controller는 데이터를 찾는 함수입니다. (대게 각 모델마다 컨트롤러가 있습니다.)

_cf) "/user/:id" 에서 ':' 를 붙이면, 어떤 값이든 될 수 있음을 의미합니다._

_cf) arrow function : =>를 사용하면 implicit하게 return을 가지고 있어서 return을 붙이지 않습니다. 만약 {}를 사용한다면, return을 붙여야 합니다._

### 1. Controller

기본적으로 controller는 모델당 하나를 가진다고 생각하면 됩니다.

```javascript
export const home = (req, res) =>
  res.render("템플릿", { something: "넘겨줄 객체" });
```

_cf) 위에서 템플릿은 home.pug를 말하며, 넘겨줄 객체는 _

### 2. View

기본적으로 view의 템플릿은 함수당 하나를 가진다고 생각하면 됩니다. View를 위해서는 먼저 어떤 view engine를 쓸 것인지 정해야합니다. 저의 첫 view engine은 Ejs였지만, pug를 사용해 봅시다.

```shell
npm install pug
```

먼저 pug를 설치한 후에, 명시적으로 view engine을 설정해줘야(app.set) 합니다.

```javascript
app.set("view engine", "pug");
```

또한, pug파일은 기본적으로 views 폴더 밑에 넣어둬야 합니다. express 공식 API문서에 가보면, views폴더 밑에 담으라고 합니다. 그러면, res.render로 인자를 넘겨줄 때, pug를 붙이지 않아도 views 폴더에서 알아서 찾아서 인식합니다.

**Controller.js**

```javascript
export const home = (req, res) => res.render("home");
```

view에서 중요한 것은 레이아웃을 짜서 사용한다는 것입니다. 가령, header, nav, footer의 경우, 웹사이트 내에서 계속적으로 필요한 것입니다. 그런데, 프로그래밍 언어가 아닌 html로는 모든 파일에 사용하려면, 모든 파일에 해당 부분을 복붙할 수 밖에 없습니다. 이 같은 반복을 막자는 것입니다.

## pug와 친해지기

pug는 tab으로 구분함을 명심해야 합니다.

### 1. 아이콘 사용하기

```html
<i class="fab fa-youtube"></i>
```

```pug
i.fab.fa-youtube
```

### 2. div 사용하기

```html
<div class="title">
  <p>Hello world!</p>
</div>
```

```pug
.title
  p Hello world!
```

### 3. span 사용하기

```html
<span class="title"> Hello world! </span>
```

```pug
span.title
  Hello world!
```

### 4. form 사용하기

```html
<form action="" method="get" class="search">
  <input type="text" placeholder="Search by" name="term"></input>
</form>
```

```pug
.search
  form(action="/search", method="get")
    input(type="text", placeholder="Search by", name="term")
```

### 5. 자바스크립트 사용하기 (#으로 사용할 수 있습니다.)

```html
<body>
  <h1 class="header">Test</h1>
  <div class="clock"></div>
  <script>
    const date = new Date();
    const clock = document.querySelector(".clock");
    clock.innerText = date.getFullYear();
  </script>
</body>
```

```pug
body
  h1 Test
  .clock
    #{new Date().getFullYear()}
```

### 6. 다른 파일에서 레이아웃(main.pug)을 사용하고자 할 때, extends를 하면 됩니다.

**main.pug**

```pug
doctype html
html
    head
        title Wetube
    body
        header
            h1 Wetube
        main
            block content
        footer
            span &copy; Wetube
```

**home.pug**

```pug
extends layouts/main

block content
  p Hello
```

### 7. 다른 파일에서 element(footer.pug)를 사용하고자 할 때, include를 하면 됩니다.

**footer.pug**

```pug
footer.footer  // include명.클래스명
    .footer__icon
        i.fab.fa-youtube
    span.footer__text &copy; 2020 Wetube
```

**main.pug**

```pug
doctype html
html
    head
        <script src="https://kit.fontawesome.com/d49c4080ea.js" crossorigin="anonymous"></script>
        title Wetube
    body
        header
            h1 Wetube
        main
            block content
        include ../partials/footer
```

## mixin

웹 사이트에서 계속 반복되는 코드를 복붙하지 않고 재활용하는 방법입니다.

### 활용 예시

mixin은 pug의 함수의 일종이라서 ()를 붙여서 사용하게 됩니다. 그리고 인자를 받을 수 있도록 해서 사용하게 되는데, 다음의 예시를 보겠습니다.

**home.pug**

```pug
extends layouts/main
include mixins/videoBlock

block content
  .videos
    each video in videos
      +videoBlock({
        title: video.title,
        description: video.description
      })
```

home.pug에서 **_+videoBlock해서 _** 객체 안에 내용만 전달해주면, html 형식은 mixins 폴더에 있는 videoBlock.pug에서 틀을 사용하게 되는 것입니다.

**videoBlock.pug**

```pug
mixin videoBlock(video={})
    h1=video.title
    p=video.description
```

_cf) 만약 영상을 사이트에 접속해서 바로 보도록 하고 싶으면, autoplay=true나 controls=true를 해주면 됩니다._

_cf) 페이지에 상태코드 전달하기_

```javascript
res.status(400);
```

## routes.js

사용하는 url을 변수화한 routes.js 파일에서 ':' 를 사용하면, 바꿀 수 있는 값이 됩니다. 그런데 이는 express는 이해하지만, HTML은 이를 이해하지 못하고, 실제 요소검사를 했을 때, :가 그대로 뜨게 됩니다.

```javascript
const USER_DETAIL = "/:id";

const routes = {
  userDetail: USER_DETAIL,
};
```

![image](https://user-images.githubusercontent.com/42775225/89121657-a3e82000-d4fb-11ea-86ba-957a67acb929.png)

이렇게 해결합니다.

**routes.js**

```javascript
const USER_DETAIL = "/:id";

const routes = {
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
};
```

**header.pug**

```pug
a(href=routes.userDetail(user.id)) Profile
```

**userController.js**

```pug
userRouter.get(routes.userDetail(), userDetail);
```

## form을 통해서 controller로 받아올 때는 이렇게 사용하자!

```javascript
const {
  body: { file, title, description },
} = req;
```
