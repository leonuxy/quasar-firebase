import { boot } from "quasar/wrappers";
import { useAuthStore } from "src/stores/auth";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ store, router }) => {
  const authStore = useAuthStore(store);
  // await authStore.fetchToken();
  //   if (authStore.token) {
  // await authStore.fetchUser();

  // if (authStore.user) {
  //   await authStore.fetchRoles();
  //   await authStore.fetchPermissions();

  //   if (authStore.hasPermissions({ "use-role-companies": true })) {
  //     await authStore.fetchRoleCompanies();
  //   }

  //   if (authStore.hasPermissions({ "use-role-areas": true })) {
  //     await authStore.fetchRoleAreas();
  //   }

  //   if (authStore.hasPermissions({ "use-role-clients": true })) {
  //     await authStore.fetchRoleClients();
  //   }
  // }
  //   }

  router.beforeEach(async (to, from, next) => {
    const auth = to.meta.auth;
    if (auth !== undefined) {
      if (auth === true && !authStore.user) {
        return next({ name: "auth.login" });
      } else if (auth === false && authStore.user) {
        return next({ name: "dashboard.index" });
      }
    }

    // const roles = to.meta.roles;
    // if (roles !== undefined && !authStore.hasRoles(roles)) {
    //   return next(from.path == to.path ? '/dashboard' : from);
    // }

    // const permissions = to.meta.permissions;
    // if (permissions !== undefined && !authStore.hasPermissions(permissions)) {
    //   return next(from.path == to.path ? '/dashboard' : from);
    // }

    // return next();
  });
});
