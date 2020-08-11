// 여기서는 모던 js 사용 불가
const path = require("path"); // 절대 경로를 설정할 수 있도록 해주는 패키지
const autoprefixer = require("autoprefixer");
// const ExtractCSS = require("extract-text-webpack-plugin");
const MiniExtractCSS = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); // __dirname : 현재 프로젝트 디렉토리 이름 (전역 변수임)
const OUTPUT_DIR = path.join(__dirname, "static"); // static 폴더로 export함

// const config = {
//   entry: ENTRY_FILE,
//   mode: MODE,
//   module: {
//     rules: [
//       {
//         test: /\.(scss)$/,
//         use: MiniExtractCSS.extract([
//           {
//             loader: "css-loader",
//           },
//           {
//             loader: "postcss-loader", // 코드를 그냥 번역만이 아니라 호환성까지
//             options: {
//               plugins() {
//                 return [autoprefixer({ overrideBrowserslist: "cover 99.5%" })];
//               },
//             },
//           },
//           {
//             loader: "sass-loader",
//           },
//         ]),
//       },
//     ],
//   },
//   output: {
//     path: OUTPUT_DIR,
//     filename: "[name].[format]",
//   },
//   plugins: [new ExtractCSS("styles.css")],
// };

// module.exports = config;

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
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
