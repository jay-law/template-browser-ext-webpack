const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

console.log(`- Building app`);

const plugins = [
   new HtmlWebpackPlugin({
      template: "./src/sidebar/sidebar.html",
      filename: "sidebar/sidebar.html",
   }),
   new HtmlWebpackPlugin({
      template: "./src/popup/popup.html",
      filename: "popup/popup.html",
   }),
   new CopyWebpackPlugin({
      patterns: [
         { from: "./src/manifest.json", to: "manifest.json" },
         { from: "./src/assets/images", to: "assets/images" },
         { from: "./src/assets/data", to: "assets/data" }
      ]
   }),
];

const moduleRules = [
   {
      test: /\.tsx?$/,
      loader: "ts-loader",
      exclude: /node_modules/,
   },
]

const configs = [];

const mainConfig = {
   mode: "production",
   entry:
   {
      background: {
         import: path.resolve(__dirname, "src", "background", "background.ts"),
         filename: "background/[name].js"
      },
      content_script: {
         import: path.resolve(__dirname, "src", "content", "content_script.ts"),
         filename: "content/[name].js"
      }
   },
   output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name]",
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: moduleRules,
   },
   plugins: [
      new CopyWebpackPlugin({
         patterns: [
            { from: "./src/manifest.json", to: "manifest.json" },
            { from: "./src/assets/images", to: "assets/images" },
            { from: "./src/assets/data", to: "assets/data" }
         ]
      }),
   ]
}
configs.push(mainConfig);

const sidebarConfig = {
   mode: "production",
   entry:
   {
      sidebar: {
         import: path.resolve(__dirname, "src", "sidebar", "sidebar.ts"),
         filename: "sidebar/[name].js"
      },
   },
   output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name]",
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: moduleRules,
   },
   plugins: [new HtmlWebpackPlugin({
      template: "./src/sidebar/sidebar.html",
      filename: "sidebar/sidebar.html",
   })],
}
configs.push(sidebarConfig);

const popupConfig = {
   mode: "production",
   entry:
   {
      popup: {
         import: path.resolve(__dirname, "src", "popup", "popup.ts"),
         filename: "popup/[name].js"
      },
   },
   output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name]",
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: moduleRules,
   },
   plugins: [new HtmlWebpackPlugin({
      template: "./src/popup/popup.html",
      filename: "popup/popup.html",
   })],
}
configs.push(popupConfig);

module.exports = configs;
