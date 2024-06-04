<template>
  <!-- src="../assets/background_image.png" -->
  <q-img class="window-width window-height">
    <div
      class="window-height window-width column justify-center items-center bg-transparent"
    >
      <!-- src="../assets/logo.png" -->
      <q-img
        style="max-height: 180px; max-width: 150px"
        class="q-mb-md"
      ></q-img>
      <q-form @submit="handleLogin">
        <q-card class="bg-white q-pt-md" style="max-width: 400px">
          <p
            class="text-positive text-subtitle1 text-weight-bold q-px-xl q-mx-xl text-center"
          >
            Login Your Account
          </p>

          <q-input
            outlined
            v-model="username"
            placeholder="username"
            dense
            class="q-mx-md inputFieldLogin"
          >
            <template v-slot:append>
              <q-icon name="username" />
            </template>
          </q-input>
          <q-input
            outlined
            v-model="password"
            placeholder="Password"
            dense
            class="q-mx-md q-mt-sm inputFieldLogin"
            type="password"
          >
            <template v-slot:append>
              <q-icon name="lock" />
            </template>
          </q-input>
          <div class="q-pa-sm">
            <div class="row justify-between">
              <q-checkbox
                keep-color
                v-model="checkbox"
                label="Remember Me"
                color="positive"
                class="text-grey-8"
              />
            </div>

            <q-btn
              color="positive"
              label="LOGIN"
              style="width: 100%"
              class="q-px-md q-mb-xs"
              type="submit"
            />
          </div>
        </q-card>
      </q-form>
    </div>
  </q-img>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LocalStorage } from "quasar";
import { useAuthStore } from "src/stores/auth";

const username = ref("");
const password = ref("");
const checkbox = ref(false);

const { login } = useAuthStore();
const handleLogin = () =>
  login({
    username: username.value,
    password: password.value,
    rememberMe: checkbox.value,
  });
// LocalStorage.remove("area-mapping");
// LocalStorage.remove("top-customer");
// LocalStorage.remove("top-customer2");
// LocalStorage.remove("customer-mapping");
</script>
