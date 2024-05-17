const routes = [
  {
    path: "/login",
    component: () => import("src/pages/LoginPage.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/UserLayout.vue"),
    children: [
      {
        path: "/index",
        name: "list-sample",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/contact-us",
        name: "contact-us",
        component: () => import("src/pages/ContactUs.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
