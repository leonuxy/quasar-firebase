import { defineStore } from "pinia";
import { Loading, LocalStorage, Notify } from "quasar";
import { api } from "src/boot/axios";
// import { supabase } from "src/boot/supabase";

import { db } from "src/boot/firebase";
import {
  QuerySnapshot,
  collection,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
/** Interface for User */
export interface User {
  seller_id: string;
  seller_area: string;
  seller_name: string;
  seller_pass: string;
  seller_picture: string;
  seller_phone: string;
  seller_org: string;
  seller_user: string;
}

export interface UserLevel {}
export interface UserNext {}

/** Possible User Type in Store */
export type UserVar = User | null;
export type UserLevelVar = UserLevel | null;
export type UserNextVar = UserNext | null;

/** Authentication Token in Store */
export type TokenData = string;
export type TokenVar = TokenData | null;

/** Local Storage Name for Token */
export const tokenStorageName = "token";
const handleEmailToken = (response: {
  data: {
    email: string;
  };
}): TokenData => {
  const result = response.data;
  return result.email;
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
    token: TokenVar;
    user: UserVar;
    userLevel: UserLevelVar;
    userNext: UserNextVar;
    // roles: Roles;
    // permissions: Permissions;
    // roleCompanies: RoleCompanies;
    // roleAreas: RoleAreas;
    // roleClients: RoleClients;
  } => ({
    token: null,
    user: null,
    userLevel: {},
    userNext: {},
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
          username: username,
          password: password,
          remember_me: rememberMe,
        })
        .then((response) => this.setToken(handleEmailToken(response)))
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
      this.setToken(null);
      this.router.go(0);
    },

    async fetchUserLevel() {
      try {
        if (this.user) {
          const collectionRef = collection(
            db,
            "userlevel/" + this.user.seller_id + "/" + this.user.seller_id
          );
          const querySnapshot = await getDocs(collectionRef);
          this.userLevel = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
    async myUserNextUser() {
      try {
        if (this.user) {
          const collectionRef = collection(
            db,
            "userlevel/" + this.user.seller_id + "/" + this.user.seller_id
          );
          const querySnapshot = await getDocs(collectionRef);
          this.userNext = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter((row) => row.id == this.user.seller_id);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },

    async isMADC(collectionName) {
      try {
        const q = query(
          collection(db, "userlevel/" + collectionName + "/" + collectionName)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.empty;
        // return doc.exists;
      } catch (error) {
        console.error("Error checking document existence:", error);
        return false;
      }
    },
    /**
     * Fetch User from the Backend API.
     * Will also set the global User variable
     */
    async fetchUser() {
      let user: UserVar = null;
      return api
        .post(
          "/slashdb2",
          {
            endpoint: "smdcBisiGetSellerV2",
            data: { seller_user: this.token },
          },
          {
            headers: {
              Authorization: "61527b29:xbywj5nnme24x326ng9oqj2gnrktqm6j",
            },
          }
        )
        .then(async (response) => {
          let result = response.data.response[0];
          const checkMadc = await this.isMADC(result.seller_id);
          // console.log(checkMadc);
          if (result.seller_id && !checkMadc) {
            // if (result.seller_id && !this.isMADC(result.seller_id)) {
            // this.isMADC(result.seller_id);
            user = result as User;
          } else {
            LocalStorage.remove(tokenStorageName);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => this.setUser(user));
    },

    //     /** Fetch Token from Local Storage. Will also set the global Token variable */
    async fetchToken() {
      await this.setToken(LocalStorage.getItem(tokenStorageName));
      return Promise.resolve(this.token);
    },

    //     /** Set the global Authentication Token */
    async setToken(token: TokenVar, handleUser = false) {
      this.token = token;
      if (token) {
        LocalStorage.set(tokenStorageName, token);
        // api.defaults.headers.common["Authorization"] = "Bearer " + token;
        if (handleUser) {
          await this.fetchUser();
        }
      } else {
        LocalStorage.remove(tokenStorageName);
        delete api.defaults.headers.common["Cookie"];
        delete api.defaults.headers.common["Authorization"];
        if (handleUser) {
          this.setUser(null);
        }
      }
    },

    //     /** Set the global User variable */
    setUser(user: UserVar) {
      this.user = user;
    },

    setUserLevel(userLevel: UserLevelVar) {
      this.userLevel = userLevel;
    },

    setUserNext(userNext: UserNextVar) {
      this.userNext = userNext;
    },

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
