(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e17fc"],{"7b61":function(e,n,o){"use strict";o.r(n);var t=function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",{staticClass:"login-container"},[o("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,autocomplete:"on","label-position":"left"}},[o("div",{staticClass:"title-container"},[o("h3",{staticClass:"title"},[e._v(e._s(e.$lang.loginForm))])]),o("el-form-item",{attrs:{prop:"username"}},[o("el-input",{model:{value:e.loginForm.username,callback:function(n){e.$set(e.loginForm,"username",n)},expression:"loginForm.username"}})],1),o("el-form-item",{attrs:{prop:"password"}},[o("el-input",{model:{value:e.loginForm.password,callback:function(n){e.$set(e.loginForm,"password",n)},expression:"loginForm.password"}})],1),o("el-button",{attrs:{type:"primary"},on:{click:e.handleLogin}},[e._v(e._s(e.$lang.login))])],1)],1)},r=[],a=(o("ba9d"),o("bd5e")),s={data:function(){return{loginForm:{username:"",password:""}}},methods:{handleLogin:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$api.login();case 2:o=n.sent,e.$permission.login(o.token),location.reload();case 5:case"end":return n.stop()}}),n)})))()}},computed:{}},i=s,l=o("2877"),c=Object(l["a"])(i,t,r,!1,null,null,null);n["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0e17fc.bb1adcc6.js.map