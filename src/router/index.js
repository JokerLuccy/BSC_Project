import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register/index.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home/index.vue"),
  },
  {
    path: "/invite",
    name: "Invite",
    component: () => import("../views/Invite/index.vue"),
  },
  {
    path: "/account_detail",
    name: "AccountsDetail",
    component: () => import("../views/Accounts/index.vue"),
  },
  {
    path: "/award_record",
    name: "AwardRecord",
    component: () => import("../views/AwardRecord/index.vue"),
  },
  {
    path: "/game_assets",
    name: "GameAsset",
    component: () => import("../views/GameAsset/index.vue"),
  },
  {
    path: "/withdraw",
    name: "Withdraw",
    component: () => import("../views/Withdraw/index.vue"),
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: () => import("../views/FeedBack/index.vue"),
    children: [
      {
        path: "/feedback/question",
        name: "Question",
        component: () => import("../views/FeedBack/question.vue"),
      },
      {
        path: "/feedback/message",
        name: "Message",
        component: () => import("../views/FeedBack/message.vue"),
      },

      {
        path: "/",
        redirect: "/feedback/question",
      },
    ],
  },
  {
    path: "/message_detail",
    name: "MessageDetail",
    component: () => import("../views/FeedBack/message_detail.vue"),
  },
  {
    path: "/set_pwd",
    name: "SetPwd",
    component: () => import("../views/SetPwd/index.vue"),
  },
  {
    path: "/",
    redirect: "/login",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
