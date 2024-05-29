import { defineStore } from "pinia";
import { Loading, LocalStorage, Notify } from "quasar";
import { api } from "src/boot/axios";
// import { supabase } from "src/boot/supabase";

/** Interface for User */
export interface User {
  /** User's ID */
  id: string;

  /** User's name */
  name: string;

  /** User's name */
  username: string;

  /** User's email */
  email: string;
}

/** Possible User Type in Store */
export type UserVar = User | null;

/** Authentication Token in Store */
export type TokenData = string;
export type TokenVar = TokenData | null;

/** Local Storage Name for Token */
export const tokenStorageName = "token";
const handleTokenResponse = (response: {
  data: {
    data: string;
  };
}): TokenData => {
  const result = response.data;
  return result.data;
};

/** Interface for Roles */
// export interface Roles {
//   [role: string]: boolean;
// }

/** Interface for Permissions */
// export interface Permissions {
//   [permission: string]: boolean;
// }

// export type RoleCompanies = string[];
// export type RoleAreas = number[];
// export type RoleClients = number[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (error: any) => {
  Loading.hide();
  Notify.create({
    type: "negative",
    message:
      error.response && error.response.data
        ? error.response.data.message
        : error.message,
  });
  throw error;
};

export const useAuthStore = defineStore("user", {
  state: (): {
    // token: TokenVar;
    user: UserVar;
    // roles: Roles;
    // permissions: Permissions;
    // roleCompanies: RoleCompanies;
    // roleAreas: RoleAreas;
    // roleClients: RoleClients;
  } => ({
    // token: null,
    user: null,
    // roles: {},
    // permissions: {},
    // roleCompanies: [],
    // roleAreas: [],
    // roleClients: [],
  }),
  getters: {
    // hasMappings: (state) => {
    //   return (
    //     state.roleCompanies.length > 0 ||
    //     state.roleAreas.length > 0 ||
    //     state.roleClients.length > 0
    //   );
    // },
  },
  actions: {
    /** Login */
    async login({
      username,
      password,
      rememberMe,
    }: {
      username: string;
      password: string;
      rememberMe?: boolean;
    }) {
      Loading.show({
        message: "Logging in",
      });
      return api
        .post("/login", {
          email: username,
          password: password,
          remember_me: rememberMe,
        })
        .then((response) => this.setToken(handleTokenResponse(response)))
        .then(() => this.router.go(0))
        .catch(handleError);
    },

    /** Sign Out */
    async logout(loading = false) {
      if (loading) {
        Loading.show({
          message: "Logging out...",
        });
      }

      return api
        .post("/logout")
        .then(() => this.setToken(null))
        .then(() => this.router.go(0))
        .catch(handleError);
    },

    /**
     * Fetch User from the Backend API.
     * Will also set the global User variable
     */
    //     async fetchUser() {
    //       let user: UserVar = null;
    //       return api
    //         .get('/user')
    //         .then(async (response) => {
    //           const result = response.data;
    //           const { data, error } = await supabase
    //             .from('users')
    //             .select('id, name, username, email')
    //             .eq('email', result.data.email)
    //             .single();
    //           if (error) {
    //             throw error;
    //           }

    //           user = data as User;
    //         })
    //         .catch((error) => console.log(error))
    //         .finally(() => this.setUser(user));
    //     },

    //     /** Fetch Token from Local Storage. Will also set the global Token variable */
    //     async fetchToken() {
    //       await this.setToken(LocalStorage.getItem(tokenStorageName));
    //       return Promise.resolve(this.token);
    //     },

    //     /** Set the global Authentication Token */
    //     async setToken(token: TokenVar, handleUser = false) {
    //       this.token = token;
    //       if (token) {
    //         LocalStorage.set(tokenStorageName, token);
    //         api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    //         if (handleUser) {
    //           await this.fetchUser();
    //         }
    //       } else {
    //         LocalStorage.remove(tokenStorageName);
    //         delete api.defaults.headers.common['Cookie'];
    //         delete api.defaults.headers.common['Authorization'];
    //         if (handleUser) {
    //           this.setUser(null);
    //         }
    //       }
    //     },

    //     /** Set the global User variable */
    //     setUser(user: UserVar) {
    //       this.user = user;
    //     },

    //     async fetchRoles() {
    //       return supabase
    //         .rpc('get_user_roles', { target_user_id: this.user?.id })
    //         .single()
    //         .then(({ data, error }) => {
    //           if (error) {
    //             throw error;
    //           }

    //           const roles = (data as { data: string[] }).data;
    //           roles.forEach((role) => (this.roles[role] = true));
    //         });
    //     },

    //     hasRoles(roles: Roles) {
    //       let processedRoles: Roles;
    //       if (Array.isArray(roles)) {
    //         const roleObj: Roles = {};
    //         for (const role of roles) {
    //           roleObj[role] = true;
    //         }

    //         processedRoles = roleObj;
    //       } else {
    //         processedRoles = roles;
    //       }

    //       for (const role in processedRoles) {
    //         if (processedRoles[role] != this.roles[role]) {
    //           return false;
    //         }
    //       }

    //       return true;
    //     },

    //     async fetchPermissions() {
    //       return supabase
    //         .rpc('get_user_permissions', { target_user_id: this.user?.id })
    //         .single()
    //         .then(({ data, error }) => {
    //           if (error) {
    //             throw error;
    //           }

    //           const permissions = (data as { data: string[] }).data;
    //           permissions.forEach(
    //             (permission) => (this.permissions[permission] = true)
    //           );
    //         });
    //     },

    //     async fetchRoleCompanies() {
    //       return supabase
    //         .rpc('get_user_role_companies', { target_user_id: this.user?.id })
    //         .single()
    //         .then(({ data, error }) => {
    //           if (error) {
    //             throw error;
    //           }

    //           this.roleCompanies = (data as { data: string[] }).data;
    //         });
    //     },

    //     async fetchRoleAreas() {
    //       return supabase
    //         .rpc('get_user_role_areas', { target_user_id: this.user?.id })
    //         .single()
    //         .then(({ data, error }) => {
    //           if (error) {
    //             throw error;
    //           }

    //           this.roleCompanies = (data as { data: string[] }).data;
    //         });
    //     },

    //     async fetchRoleClients() {
    //       return supabase
    //         .rpc('get_user_role_clients', { target_user_id: this.user?.id })
    //         .single()
    //         .then(({ data, error }) => {
    //           if (error) {
    //             throw error;
    //           }

    //           this.roleCompanies = (data as { data: string[] }).data;
    //         });
    //     },

    //     hasPermissions(permissions: Permissions) {
    //       let processedPermissions: Permissions;
    //       if (Array.isArray(permissions)) {
    //         const permissionObj: Permissions = {};
    //         for (const permission of permissions) {
    //           permissionObj[permission] = true;
    //         }

    //         processedPermissions = permissionObj;
    //       } else {
    //         processedPermissions = permissions;
    //       }

    //       for (const permission in processedPermissions) {
    //         if (processedPermissions[permission] != this.permissions[permission]) {
    //           return false;
    //         }
    //       }

    //       return true;
    //     },
  },
});
