# Node.js

## Node.js란?

자바스크립트는 원래 브라우저 내에서 동작할 수 있었지만, nodejs로 인해 브라우저 밖으로 나올 수 있게 되었습니다. 그래서, 서버를 만들 수도 있고, 웹 스크랩을 하는 등 프로그래밍 언어로 사용할 수 있게 해준 것입니다. 그것이 nodejs입니다.

## 무엇을 할 수 있을까?

Spring, Laravel, Django 등 웹 프레임워크는 많은데, nodejs를 사용하는 이유는 무엇일까요?

모든 프레임워크에 장당점이 있기 때문에, 다음과 같은 경우에 nodejs를 사용합니다.

#### 1. 자바스크립트를 선택합니다. 자바스크립트로 프론트엔드, 백엔드를 모두 할 수 있으며, 그로 인해 요소들을 customizing할 수 있게 됩니다.

#### 2. 비동기이기 때문에 실시간 처리에 유용합니다. 많은 데이터를 전송하고 저장하고, 알림이나 채팅처럼 실시간 요청에 대한 반응이 필요한 서비스에 유용합니다.

#### cf) 단, 메모리나 램에 접근해서 해야하는 작업에는 적합하지 않습니다. 하지만 어떤 언어를 선택하든, 규모가 있는 서비스는 아주 다양한 언어로 개발되어 있습니다. nodejs를 공부한다고 다른 건 못한다고 생각할 필요는 없다고 생각합니다.

## Get started

_cf) mac을 기준으로 적었습니다. 양해 바랍니다._

#### 1. Homebrew 설치

#### 2. nodejs 설치 (by brew)

```shell
brew install node
```

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

추가로 해야할 것 : (mongodb 확인, dotenv 확인)

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

가장 기본적인 파일들이며 꼭 따를 필요 없습니다. 본인에 따라 커스터마이징해서 사용하면 됩니다.
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

session을 다루기 위해서 cookie에 유저 정보를 저장하는데, 서버가 사용자로부터 받은 데이터를 이해할 수 있게 합니다. app.use할 때, json으로 보내는 경우(json), html form으로 보내는 경우(urlencoded)에 대해 설정합니다.

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

```shell
npm start
```

## 명령어 이해

**_자바 스크립트의 모든 명령어는 위에서 아래로 실행됩니다. 이것은 당연하게 보이지만, 생각보다 중요합니다._**

#### 1. get

get방식은 사용자가 form에 쓴 값이 url에 담겨 있는 것이 특징입니다.

```javascript
app.get("/", call); // 사용자가 /에 접근하면, call함수 실행
```

_cf) call함수에 res.send() 가 없으면 무한 로딩_

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

_cf) "/user/:id" 에서 ':' 를 붙이면, 어떤 값이든 될 수 있는 변수 임을 의미합니다._

_cf) arrow function : =>를 사용하면 implicit하게 return을 가지고 있어서 return을 붙이지 않습니다. 만약 {}를 사용한다면, return을 붙여야 합니다._

### 1. Controller

기본적으로 controller는 모델당 하나를 가진다고 생각하면 됩니다.

```javascript
export const home = (req, res) =>
  res.render("pug파일", { something: "넘겨줄 객체" });
```

_cf) 위에서 pug파일에는 원래 view할 파일을 적는 곳으로, 저희는 pug를 view engine으로 설정할 것입니다._

### 2. View

기본적으로 view를 할 파일은 Controller에서 정의된 함수당 하나를 가진다고 생각하면 됩니다. View를 위해서는 먼저 어떤 view engine를 쓸 것인지 정해야합니다. 저의 첫 view engine은 Ejs였지만, pug를 사용해 봅시다.

```shell
npm install pug
```

먼저 pug를 설치한 후에, 명시적으로 view engine을 설정해줘야(app.set) 합니다.

**app.js**

```javascript
app.set("view engine", "pug");
```

또한, pug파일들은 기본적으로 views 폴더 밑에 넣어둬야 합니다. express 공식 API문서에 가보면, views폴더 밑에 파일들을 담을 것을 설명하고 있습니다. 그러면, res.render로 인자를 넘겨줄 때, pug 확장자를 붙이지 않아도 views 폴더에서 알아서 찾아서 인식합니다. 예를 들면, 다음과 같습니다.

**Controller.js**

```javascript
export const home = (req, res) => res.render("home");
```

_cf) view에서 중요한 것은 레이아웃을 짜서 사용한다는 것입니다. 가령, header, nav, footer의 경우, 웹사이트 내에서 계속적으로 필요한 것입니다. 그런데, 프로그래밍 언어가 아닌 html로는 모든 파일에 사용하려면, 모든 파일에 해당 부분을 복붙할 수 밖에 없습니다. 이 같은 반복을 막자는 것입니다._

## pug와 친해지기

pug는 <></> 조합이 아닌, **_tab_** 으로 구분함을 명심해야 합니다.

### 1. 아이콘 사용하기

**html**

```html
<i class="fab fa-youtube"></i>
```

**pug**

```pug
i.fab.fa-youtube
```

### 2. div 사용하기

**html**

```html
<div class="title">
  <p>Hello world!</p>
</div>
```

**pug**

```pug
.title
  p Hello world!
```

### 3. span 사용하기

**html**

```html
<span class="title"> Hello world! </span>
```

**pug**

```pug
span.title
  Hello world!
```

### 4. form 사용하기

**html**

```html
<form action="" method="get" class="search">
  <input type="text" placeholder="Search by" name="term"></input>
</form>
```

**pug**

```pug
.search
  form(action="/search", method="get")
    input(type="text", placeholder="Search by", name="term")
```

### 5. 자바스크립트 사용하기 (#으로 사용할 수 있습니다.)

**html**

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

**pug**

```pug
body
  h1 Test
  .clock
    #{new Date().getFullYear()}
```

### 6. 다른 파일(home.pug)에서 레이아웃(main.pug)을 사용하고자 할 때, extends를 하면 됩니다.

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

### 7. 다른 파일(main.pug)에서 element(footer.pug)를 사용하고자 할 때, include를 하면 됩니다.

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

mixin은 pug의 함수의 일종이라서 ()를 붙여서 사용하게 됩니다. 그리고 하나의 빈 객체를 인자로 사용합니다. 다음의 예시는 home.pug에서 mixin함수를 사용하는 예시입니다.

**home.pug**

```pug
extends layouts/main
include mixins/videoBlock

block content
  .videos
    each video in videos
      +videoBlock({   // 여기
        title: video.title,
        description: video.description
      })
```

home.pug에서 **_+videoBlock_** 해서 객체 안에 내용만 전달해주면, html 형식은 mixins 폴더에 있는 videoBlock.pug에서 정의한 틀을 사용하게 되는 것입니다.

**videoBlock.pug**

```pug
// videoBlock은 mixin의 이름이고, mixin이 함수라서 ()가 있으며, 하나의 인자를 빈 객체형태로 넘겨준다.
mixin videoBlock(video={})
    h1=video.title
    p=video.description
```

mixin 안에서 사용하는 video.something 는 mixin을 호출하는 pug파일(home.pug)에서 인자로 넘겨줘야 되고, 그곳에서 key로 정의한 변수명을 사용하는 것입니다. 만약, home.pug에서 videoFile:fileUrl 을 videoBlock.pug에 넘겨주면, videoBlock.pug는 video.videoFile로 사용하는 것이라는 것입니다.

_cf) controls=true를 해주어야 실행 버튼을 누를 수 있게 됩니다._

_cf) 페이지에 상태코드 전달하기_

```javascript
res.status(400);
```

## routes.js

사용하는 url을 변수화한 routes.js 파일에서 ':' 를 사용하면, 값을 바꿀 수 있는 변수가 됩니다.

```javascript
const USER_DETAIL = "/:id";

const routes = {
  userDetail: USER_DETAIL,
};
```

그런데 이는 express는 이해하지만, HTML은 이를 이해하지 못하고, 실제 요소검사를 했을 때, :id 가 그대로 뜨게 됩니다.

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

**userRouter.js**

'이 Url은 함수입니다.' 표시를 해줘야 합니다.

```pug
userRouter.get(routes.userDetail(), userDetail);
```

최종적으로 pug파일에서 userDetail로 가는 url을 사용할 때, pug파일에서 userDetail의 인자를 넘겨주어 동작할 수 있도록 합니다.

**header.pug**

```pug
a(href=routes.userDetail(user.id)) Profile
```

## form을 통해서 controller로 받아올 때는 이렇게 사용하자!

```javascript
const {
  body: { file, title, description },
} = req;
```

## MongoDB

NoSQL 데이터 베이스이며, 규칙과 절차가 상대적으로 작습니다. 심지어 테이블이 없습니다.(대신 Schema가 있고, 데이터가 DB에 들어가기 전에 Schema를 확인하게 됩니다.) 장점은 document(JSON file)를 줄여주고, 생성이 매우 빠르고 엄격하지 않아서 채팅을 만들 때의 DB로 적합합니다. 우선, Node에서 MongoDB를 사용하려면, MongoCE(community edition)과 Moogoose가 필요합니다.

### 세팅

#### 1. MongoDB (comminity server) 다운로드

_cf) https://docs.mongodb.com/manual/installation/_

공식 홈페이지에서의 매뉴얼을 따르되, 되도록이면 맥의 경우 home brew를 이용하자.

```shell
brew tap mongodb/brew
brew install mongodb-community@4.4
```

#### 2. Mongoose 다운로드

이제 Javascript와 Mongo를 연결해줄 징검다리 역할이 필요합니다.

```shell
npm install mongoose
```

#### 3. dotenv 다운로드

dotenv는 DB를 숨겨두고 싶을 때 사용할 수 있습니다. '.env' 라는 파일을 만들고 거기에 변수들을 정의합니다.(이것은 규칙입니다.) **_단, 반드시! gitignore에 .env파일을 포함시켜야합니다._**

```shell
npm install dotenv
```

### 사용

**connect하는 URL**은

```
mongodb://localhost:포트번호/Database이름
```

**db.js**

```javascript
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // .env에 있는 변수들을 process.env 라는 객체로 불러옵니다.

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) =>
  console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
```

_cf) userNewUrlParser, useFindAndModify는 이제 새로운 mongoose에는 다 기본적으로 되어 있을 테지만, 확실하게 하기 위해서 추가합니다. 해당 configuration을 사용하는지 안 하는지를 설정합니다._

**init.js**

```javascript
import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`✅Listening on: http://localhost:${PORT}`));
```

### Model

MongoDB에 우리의 파일들이 어떤 식으로 생겨야 할지를 알려줘야 합니다. models라는 폴더를 만들고, 각 모델의 형태를 정의하는 파일들을 만듭니다. (모델은 통상적으로 대문자로 네이밍합니다.) 그리고 다음 2가지를 정의해야 합니다.

#### 1. Model(Document 혹은 Collection)

Schema를 기반하여 model(collection)이 만들어 집니다.

#### 2. Schema

데이터가 DB에 입력될 때 지켜야하는 형식입니다.

예는 다음과 같습니다.

**Video.js**

```javascript
import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required",
  },
  title: {
    type: String,
    required: "Title is required",
  },
  description: String, // type:String과 동일
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now, // ()를 붙여주면 지금 실행이라 없음
  },
});

const model = mongoose.model("Video", VideoSchema);

export default model;
```

그리고 init.js에도 추가해줘야 합니다.

**init.js**

```javascript
import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video"; // 이거 추가

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`✅Listening on: http://localhost:${PORT}`));
```

### DB

db.js를 보면, mongoose.connect에서 "mongodb://localhost:27017/wetube" 로 연결되고 있습니다. 그래서 현재는 wetube라는 데이터 베이스 안에 있는 것입니다. 그리고 그 안에 수 많은 Model(collection)들이 있는 것입니다.

여기서 사용되는 함수는 구글에서 Mongoose query를 검색해서 나오는 Documentation을 기반으로 했습니다.

### DB에 값을 올리는 법

_videoController.js_

````javascript
// Video 라는 모델(컬렉션)을 만들었다고 가정
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  try {
    const newVideo = await Video.create({  // 여기
      fileUrl: path,
      title,
      description,
    });
    res.redirect(routes.videoDetail(newVideo.id));
  } catch (error) {
    console.log(error);
  }
};```

or

​```javascript
const db = client.db("wetube");
db.collection("Video")
  .insertOne({
    title: "Vlog",
    description: "My real life",
  })
  .then(function (result) {
    // process result
  });
````

### DB에 있는 값을 가져오는 법

_videoController.js_

```javascript
export const home = async (req, res) => {
  // find했을 때, 불러오는데 시간이 걸리기 때문에 async, await 조합
  try {
    const videos = await Video.find({}); // 여기
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
```

or

```javascript
const db = client.db("wetube");
const videos = db.collection("Video").find({});
```

그리고 여기서 찾은 element들을 정렬해서 보여주고 싶을 때는, find 후 sort를 사용합니다. 다음은 id를 기준으로, 역순으로 정렬하여 가져오는 예시입니다. (MongoDB는 데이터들이 \_id를 가집니다.)

_videoController.js_

```javascript
const videos = await Video.find({}).sort({ _id: -1 });
```

### DB에 있는 값을 업데이트 하는 법

일단, 수정한 뒤에 수정 완료 버튼을 누르는 것에서부터 시작하겠습니다.

_editVideo.pug_

```pug
block content
  .form-container
    form(action=routes.editVideo(video.id), method="post")  // 여기서 이렇게 post로 넘겨줍니다.
      input(type="text". placeholder="Title", name="title", value=video.title)
      textarea(name="description", placeholder="Description")=video.description
      input(type="submit", value="Update Video")
```

그러면 우선, 수정하고 있는 video의 id를 받아서 올바른 url로 변환을 하게 됩니다.

```javascript
const routes = {
  editVideo: (id) => {
    if (id) {
      return `/videos/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
};
```

그 뒤, 해당 url에서는 어떤 function을 부르는지 보기 위해서 라우터를 보게 됩니다. post로 제출했기 때문에 postEditVideo 를 호출하게 됩니다.

_videoRouter.js_

```javascript
videoRouter.post(routes.editVideo(), postEditVideo);
```

해당 함수는 req.params.id와 같은 id를 DB에서 찾아서, 해당 video의 title과 description을 req.body.title과 req.body.description으로 바꿔줍니다. 이 때, MongoDB의 모델은 공식 문서에서 확인할 수 있듯이 \_id를 가집니다.

_videoController.js_

```javascript
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;

  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch {
    res.redirect(routes.home);
  }
};
```

그러면, 끝!

### DB에 있는 값을 삭제하는 방법

이번에도 특정 video id에 해당하는 video를 삭제하는 것이므로, 특정 id를 받아서 router가 사용하는 url로 바꿔주는 부분부터 필요할 것입니다.

_routes.js_

```javascript
const routes = {
  deleteVideo: (id) => {
    if (id) {
      return `/videos/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
};
```

그러면 위에서 만들어진 url로 왔을 때 delete의 절차를 밟으면 되는 것입니다. 이 때, get이 받는 url 부분은 string이 아닌, function이 되는 것은 앞에서 계속 했습니다.

_videoRouter.js_

```javascript
videoRouter.get(routes.deleteVideo(), deleteVideo);
```

그러면, deleteVideo 함수에서 DB에서 해당 id를 찾고 delete하도록 해줍니다.

_videoController.js_

```javascript
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id }); // 여기
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
```

## DB에서 특정 단어를 포함하는 데이터 찾는 방법

보통 이 경우에는 완전히 같은 단어를 찾는 것이 아니라, 정규 표현식을 사용하여 찾게 됩니다.

## 참고) 정규 표현식 (Regular expression)

정규 표현식은 string으로부터 특정 패턴에 해당하는 값을 가지고 오는 것입니다. 다음 링크에서 쉽게 사용해봅시다.

추천 : https://regex101.com/

### 표현식 테스트

![image](https://user-images.githubusercontent.com/42775225/89726635-7c430b80-da57-11ea-9611-cb06f8a2a3df.png)

### 패턴 참조하기

![image](https://user-images.githubusercontent.com/42775225/89726662-ea87ce00-da57-11ea-8c35-b3df3d83e13b.png)

사용자가 검색한 값을 searchingBy라는 변수에 담고, title에 해당 단어를 포함하고 있는 데이터를 반환받도록 해봅시다. (\$options: "i" 는 insensitive로 대소문자 구분을 하지 않도록 하는 것입니다.)

_videoController.js_

```javascript
export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      // 여기
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};
```

## Javascript의 비동기 문법

async-await 조합으로 사용합니다. (await은 async안에서만 사용할 수 있습니다.) await에 걸린 명령어가 수행되어야(결과가 성공이든 실패든 상관없이 수행되기만 하면) 다음 명령어로 넘어갈 수 있습니다.

#### cf) 업로드할 때, 영상 파일 1개 만 받도록 해주기

input 안에 다음 태그 추가

```javascript
accept = "video/*";
```

#### cf) 샘플 영상 (big buck bunny)

https://test-videos.co.uk/bigbuckbunny/mp4-h264

## multer

form data에서 upload할 때 필요한 middleware입니다. middleware 단에서 file의 URL을 취하는 것이 대표적입니다.

사용법은 간단합니다. 우선, multar을 적용하고자 하는 **form** 에서

```javascript
enctype = "multipart/form-data";
```

를 추가해 줍니다. 그리고는 multer로 middleware를 하나 만들어줍니다.

**middleware.js**

```javascript
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });
export const uploadVideo = multerVideo.single("videoFile");
```

single은 파일 1개만 허용하는 것이고, 그 뒤에 "videoFile"은 input의 name태그와 매칭됩니다.

**upload.pug**

```pug
input(type="file", id="file", name="videoFile", required=true, accept="video/*", enctype = "multipart/form-data")
```

마지막으로, Router로 가서 middleware function을 추가해줍니다.

**videoRouter.js**

```javascript
videoRouter.post(routes.upload, uploadVideo, postUpload);
```

이렇게까지 하면, 저희가 file을 업로드할 때, 서버에 있는 uploads/videos/에 파일이 업로드 됩니다. multer가 자기가 알아서 uploads/videos/라는 폴더를 만들고 그 안에 파일을 저장합니다. 그리고 postUpload는 file방식이 아닌 URL방식으로 해당 file에 접근하는 것입니다. 이 때 file과 관련된 정보는 req.body가 아니라 req.file에 담겨있습니다. (file URL은 req.file.path와 동일합니다.)

이렇게 생성된 파일을 화면에 뿌려줄 때, middleware로

**app.js**

```javascript
app.use("/uploads", express.static("uploads"));
```

를 이용합니다. 이는 사용자가 uploads라는 경로로 오게 되면, express.static의 인자로 넘겨주는 디렉토리로 들어간다는 것을 뜻합니다. 현재는 app.use("/videos", videoRouter)가 있어서 저렇게만 해주면, uploads를 깔았으니 videoRouter

## const {} 최신 자바스크립트

req에서 변수로 저장할 내용들이 많으면 많을 수록 아래 방식이 유리합니다.

```javascript
const myTitle = req.body.title;
const id = req.params.id;
```

```javascript
const {
  body: { title: myTitle },
} = req;
const {
  params: { id },
} = req;
```

## ESLint

Linter는 당신이 서버를 돌리기 전에, '여기에 에러가 있어요!' 라고 말해주는 도구입니다.

```shell
npm install eslint -D
npm install eslint-plugin-prettier -D
npm install eslint-config-prettier -D
npm install prettier -D
```

이렇게 설치가 되었다면, init명령어를 통해서 자신에게 맞는 환경 설정을 해줍시다.

```shell
eslint --init
```

그리고 최종적으로 module.exports에서 다음 부분을 추가해줍니다.

```javascript
module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    "no-console": "off",
  },
};
```

모든 에러를 다 찾아서 처리해줄 것 같이 들리기는 하지만, 제게 획기적으로 도움이 되지는 않았습니다.

## Webpack

웹팩은 module bundler(모듈을 묶는 것)인데요. 쉽게 생각하면, 최신 자바스크립트나 sass같은 여러 파일(모듈)들을 어떤 브라우저도 이해할 수 있는 일반적인 css, js 등으로 묶어주는 역할을 합니다. (단, 웹팩은 자바스크립트만 이해할 수 있습니다. 자바스크립트가 아닌 파일은 밑에 나올 Loader가 처리를 해줄 겁니다.)

![image](https://user-images.githubusercontent.com/42775225/89727442-0abb8b00-da60-11ea-8e74-08234d07da96.png)

절차는 다음과 같이 이루어집니다.

### 1. Entry를 설정합니다.

저희가 사용하는 파일들은 서로 import를 하면서 그래프처럼 연결되어 있을 것입니다. 그 파일들의 시작점이 되는 파일을 Entry라고 합니다. (설정은 path와 함께 파일명을 지정해주되, 여러개 설정 가능합니다.)

cf) 설정하지 않으면, default는 ./src/index.js 입니다.

### 2. Output을 설정합니다.

웹팩이 bundle(묶기) 작업을 수행 후, 어느 경로에 파일을 저장할지를 Output이라고 합니다. 이를 설정해줍니다.

### 3. Loader를 설정합니다. (module)

어떤 파일들을 어떻게 바꿔줄지를 설정하는 것입니다. 웹팩은 자바스크립트 밖에 모르기 때문에, PNG는 PNG라고, css는 css라고 이해시켜야 합니다. _rules_ 속성 안에서 _test_ 에 정규표현식으로 이해시키고 싶은 파일을 명명하고, _use_ 에 원하는 로더를 지정해줍니다.

cf) scss파일들을 찾아서 css로 바꾸고, 전체 텍스트 중에 css의 텍스트만 뽑아서 분리된 하나의 파일을 만드는 것입니다. (웹팩은 config 파일이 아래에서 위로 실행되기 때문에 위의 과정을 역순으로 코딩핸나가야 합니다.)

그러기 위해서 plugin과 loader 들을 설치해줘야 합니다.

```shell
# npm install extract-text-webpack-plugin@next // 이제 지원 안하는듯
npm install mini-css-extract-plugin
npm install css-loader postcss-loader sass-loader babel-loader
npm install autoprefixer
npm install node-sass
```

cf) npm에서는 deprecated 인 경우가 많아서, 새로운 버전으로 사용하고 싶을 때는 @를 붙여서 버전을 명시할 수 있습니다. (@next이면, 베타 버전이 설치됩니다.)

### 4. Mode를 설정합니다.

mode는 production으로 할 때, 코드가 압축됩니다. 하지만, 개발하는 동안에는 코드가 압축되면 어디에서 에러가 났는지 볼 수 없기 때문에, development로 설정합니다.

cf)
_options_ : 로더에 대한 옵션
_exclude_ : 제외할 폴더
_include_ : 포함할 폴더

Entry, Output, Loaders, Plugins, Mode 라는 키워드를 기준으로,

## Webpack 사용법

### 설치

파일에서 사용할 수 있도록 하는 webpack과 터미널에서 사용할 수 있도록 하는 webpack-cli를 설치합니다.

```shell
npm install webpack webpack-cli
```

그리고 _webpack.config.js_ 라는 설정파일을 만듭니다. 왜냐하면, 웹팩은 기본적으로 _webpack.config.js_ 파일을 찾기 때문입니다. 물론, config 설정을 통해 파일명을 수정할 수도 있습니다. 하지만 저희는 그냥 위의 이름으로 설정 파일을 만듭시다.

**_config 파일 안에는 server 코드와 연관 되어서는 않됩니다. 오직 client 코드입니다. (babel-node는 사용할 수 없기에 옛날 자바스크립트 코드를 사용해야 합니다.)_**

또한, 웹팩은 기본적으로 exported configuration object를 찾게 되어 있고,

**webpack.config.js**

```javascript
// 여기서는 모던 js 사용 불가
const path = require("path"); // 절대 경로를 설정할 수 있도록 해주는 패키지
const autoprefixer = require("autoprefixer");
const MiniExtractCSS = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); // __dirname : 현재 프로젝트 디렉토리 이름 (전역 변수임)
const OUTPUT_DIR = path.join(__dirname, "static"); // static 폴더로 export함

const config = {
  entry: ENTRY_FILE,
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniExtractCSS.loader,
            options: {
              hmr: process.env.WEBPACK_ENV === "development",
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [
                  autoprefixer({
                    overrideBrowserslist: "cover 99.5%",
                  }),
                ];
              },
            },
          },

          "sass-loader",
        ],
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [
    new MiniExtractCSS({
      filename: "styles.css",
    }),
  ],
};

module.exports = config;
```

그리고 package.json 를 수정합니다. 저희는 이제 더 이상 npm start를 쓰지 않습니다.

**package.json**

```json
  "scripts": {
    "dev:server": "nodemon --exec babel-node init.js --delay 2",
    "dev:assets": "WEBPACK_ENV=development webpack -w",
    "build:assets": "WEBPACK_ENV=production webpack"
  },
```

이제 앞으로는,

```shell
npm run dev:server  // 기존의 npm start 역할
```

와

```shell
npm run dev:assets  // webpack를 부르고 파일들을 지켜보는 역할
```

cf) -w를 붙여주는 이유 : css 파일을 수정할 때마다 webpack을 끄고 다시 실행시키고 싶지는 않기 때문

cf) 윈도우로 진행하시는 분들이 있다면!

```shell
npm install --save-dev cross-env 하시고

"dev:assets": "cross-env WEBPACK_ENV=development webpack",
"build:assets": "cross-env WEBPACK_ENV=production webpack"
```

와

```shell
npm run build:assets // 코드를 server에 올려주는 역할
```

를 각각 다른 콘솔에서 실행시킬 것입니다.

_cf) webpack으로 생성된 폴더 트리는 다음과 같습니다._

- webpack.config.js
- js
  - main.js
- scss
  - config
    - \_variables.scss
  - styles.scss

_cf) 대부분의 경우는 webpack에 대한 도구를 이미 많이 만들어놔서 이를 몰라도 크게 문제될 것은 없습니다._

거의 다 왔습니다. 결국, 사용하기 위해서 기존 파일에서 link를 달아야 합니다.

**main.pug**

```pug
doctype html
html
    head
        <script src="https://kit.fontawesome.com/d49c4080ea.js" crossorigin="anonymous"></script>
        title #{pageTitle} | #{siteName}
        link(rel="stylesheet", href="/static/styles.css")  // 여기
    body
        include ../partials/header
        main
            block content
        include ../partials/footer
        script(src="/static/main.js")  // 여기
```

그리고 서버에게도 이 사실을 가르쳐 줍니다. route에는 static이라는 곳이 존재하지 않기 때문입니다. 누군가 /static 으로 접근하려고 하면, static 폴더로 가라고 가르쳐 줍니다.

**app.js**

```javascript
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static")); // 여기
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
```

**.gitignore**

```
static
```

이렇게 끝이 납니다.

cf) regeneratorRuntime 에러가 브라우저 콘솔 창에 발생했다면!

![image](https://user-images.githubusercontent.com/42775225/89851587-c945ef80-dbc7-11ea-9c49-a046cbeaf3a7.png)

이것은 크롬이 async를 어떻게 처리해야하는지 모르는 것입니다. 이 때는, polyfill을 설치래햐 합니다.

```shell
npm install @babel/polyfill
```

브라우저에 없는 부분을 메워주는 자바스크립트 파일입니다. 자세한 사항은 공식 문서를 확인하길 바랍니다.

**webpack.config.js**

```javascript
const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],  //여기 추가
  ...
```

## Passport 사용자 인증

사용자 인증과 관련된 미들웨어입니다. 쿠키를 생성하고, 브라우저에 저장시키는 일을 합니다. 가령, 브라우저 상에 쿠키를 설정해주면 그 쿠키를 통해서 사용자 ID 등을 알 수 있습니다. 그러면 Passport가 브라우저에서 자동으로 쿠키를 가져와서 인증이 완료된 User Object를 Controller에게 넘겨주는 일을 수행합니다.

_cf) 쿠키란?_

브라우저에 저장할 수 있는 것들로, 모든 요청에 대해 백엔드로 전송될 정보들이 담겨 있습니다. 가령, 사용자가 로그인 요청을 하면, 브라우저가 자동적으로 쿠키들을 서버로 전송하게 됩니다.

_cf) Passport의 Strategy_

접속 방식을 뜻합니다. local, facebook, github 같은 것들을 사용할 수 있습니다.

_cf) Passoport는 현재 로그인 한 사용자를 뜻하는 req.user를 자동적으로 만들어줍니다._

### 사용

User model을 위한 passport-local-mongoose 라는 모듈입니다. 사용자 기능을 추가할 수 있습니다. (패스워드 생성, 변경, 확인, 암호화 등등)

그것 말고도 인증에 필요한 모듈들을 모두 다운 받습니다.

```shell
npm i passport-local-mongoose  # MongoDB 인증 방식
npm i passport                 # 인증
npm i passport-local           # local 인증 방식
npm i passport-facebook        # facebook 인증 방식
npm i passport-github          # github 인증 방식
```

그리고 User Model를 생성합니다.

**User.js**

```javascript
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
});

UserShcema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserShcema);

export default model;
```

위의 코드에서 한 가지 알아야 할 점은 usernameField입니다. usernameField는 username이 될 field를 명시합니다. username은 사용자의 이름이 될 수도 있고, 이메일이 될 수도 있고 선택하기 나름입니다. 그 중에 어떤 field를 username으로 사용할 것인지 _passport-local-mongoose_ 에게 알려줘야 합니다.

**init.js**

```javascript
import "./models/User"; // 모델 추가
```

그 다음으로는 실제 인증과 관련된 코드를 passport.js에 넣을 텐데, 그 전에 다음을 알아둡시다.

- serialization : (**_User를 주면 --> id만 저장해_**) 쿠키가 어떤 정보를 가질 수 있느냐, 다시 말해 어떤 field가 쿠키에 포함될 것인지를 알려줍니다. 브라우저에 있는, 사용자의 어떤 정보를 가질 수 있느냐 하는 것입니다. (쿠키에 있는 정보는 자동으로 벡엔드 쪽으로 전송됩니다. 쿠키는 아주 작아야하고, 민감한 정보가 담겨서는 안됩니다.)

- deserialization : (**_id를 주면 --> User를 식별해_**) 어느 사용자인지 어떻게 찾느냐, 다시 말해 쿠키를 받아서 사용자로 전환하는 것을 말합니다.

**passport.js**

````javascript
import passport from "passport";
import User from "./models/User";

passport.use(User.createStraategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());```
````

이렇게까지만 해주면, 사용자 인증과 관련된 것은 준비가 다 되었고, 미들웨어를 추가해줍니다.

**userController.js**

```javascript
try {
  const user = await User({
    name,
    email,
  });
  await User.register(user, password);
} catch (error) {
  console.log(error);
}
```

위의 부분이 DB에 사용자를 등록하는 것까지 한 것입니다. db.users.find({}) 를 해보면, 사용자들을 볼 수 있을 것입니다. 하지만, 웹 브라우저에서 쿠키 란을 가보면, 쿠키가 없습니다. 그것은 아직 로그인을 하지 않아서 입니다. 로그인까지 해서 코드를 완성해봅시다.

**globalRouter.js**

```javascript
globalRouter.post(routes.join, postJoin, postLogin);
```

전에 만들었던 postJoin이 middleware의 역할을 하도록 설계합니다.

**userController.js**

```javascript
import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const postJoin = async (req, res, next) => {
  // console.log(req.body);
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // To Do : Register User
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});
```

그러면, 전역으로 사용되는 user를 req.user로 바꾸고, 세션만 설정해주면 끝입니다.

**middleware.js**

````javascript
export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.user = req.user || {};  // 여기
  next();
};
```

세션을 사용하기 위해 다음을 설치합시다. Express는 세션을 이용해서 쿠키를 얻을 수 있습니다.

```shell
npm i express-session
````

**app.js**

```javascript
import passport from "passport";
import session from "express-session";
import "./passport";

// cookie parser 보다 뒤에 두기!
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
```

_cf) 위에서 사용된 secret은 무작위 문자열로, 쿠키에 있는 session ID를 암호화하기 위한 것입니다._

randomkeygen.com에 들어가서 랜덤한 string을 얻어서 secret의 인자로 줍니다. 이 때, .env에 해당 문자열을 숨겨서 넘겨주도록 합니다.
