const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("src/pages/LoginPage.vue"),
    meta: {
      auth: false,
    },
  },
  {
    path: "/",
    component: () => import("layouts/UserLayout.vue"),
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/form_request_sample",
        name: "form-request-sample",
        component: () => import("pages/FormRequestSample.vue"),
      },
      {
        path: "/contact-us",
        name: "contact-us",
        component: () => import("src/pages/ContactUs.vue"),
      },
      {
        path: "/contact-us",
        name: "contact-us",
        component: () => import("src/pages/ContactUs.vue"),
      },
    ],
    meta: {
      auth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
