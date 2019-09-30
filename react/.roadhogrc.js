import pxtorem from 'postcss-pxtorem';
const path          = require( 'path' );
const svgSpriteDirs = [
require.resolve( 'antd-mobile' ).replace( /warn\.js$/ , '' ) ,
// antd-mobile 内置svg
// 业务代码本地私有 svg 存放目录
path.resolve( __dirname , 'src/assets/fonts' ) ,
];
export default {
entry : "src/index.js" ,
disableCSSModules : false ,
publicPath : "/" ,
theme : "./theme.config.js" ,
svgSpriteLoaderDirs : svgSpriteDirs ,
autoprefixer : {
browsers : [
"iOS >= 8" ,
"Android >= 4"
]
} ,
proxy : { } ,
extraPostCSSPlugins : [
pxtorem( {
rootValue : 100 ,
propWhiteList : [] ,
} ) ,
] ,
// style 必须是 true
extraBabelPlugins : [
"transform-runtime" ,
[
"import" ,
{ libraryName : "antd-mobile" , "libraryDirectory" : "lib" , "style" : true }
]
] ,
env : {
development : {
extraBabelPlugins : [
"dva-hmr"
]
}
}
};