import Vue from "vue";
import Router from "vue-router";
import MainPage from "@/components/MainPage";
import Sponsors from "@/components/Sponsors";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: MainPage
      // children: [
      //   {
      //     path: 'mpp',
      //     name: 'SponsorsList',
      //     component: Sponsors
      //   }
      // ]
    },
    {
      path: "/mpp",
      name: "SponsorsList",
      component: Sponsors
    }
  ]
});
