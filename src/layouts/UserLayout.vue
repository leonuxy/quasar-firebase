<template>
  <q-layout view="hHr lpR fFf">
    <q-header elevated class="bg-green-9 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar> -->
          MADC Web
        </q-toolbar-title>

        <q-btn dense flat round icon="notifications" @click="toggleRightDrawer">
          <q-badge color="red" floating></q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- START -->
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <!-- <q-item clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item> -->
          <q-item clickable v-ripple to="/index">
            <q-item-section avatar>
              <q-icon name="view_list" />
            </q-item-section>
            <q-item-section> List Request </q-item-section>
          </q-item>
          <!-- <q-item clickable v-ripple to="/form_request_sample">
            <q-item-section avatar>
              <q-icon name="feed" />
            </q-item-section>

            <q-item-section> Form Request Sample </q-item-section>
          </q-item> -->

          <q-item clickable v-ripple to="/contact-us">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>

            <q-item-section> Contact Us </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Front Back Name</div>
          <div>user@email.com</div>
          <div>User Roles</div>
        </div>
      </q-img>
      <!-- END -->
      <!-- drawer content -->
    </q-drawer>

    <q-toolbar-title side="right" bordered> Username </q-toolbar-title>
    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      behavior="desktop"
      elevated
      desktop
    >
      <q-item>
        <q-item-section class="text-green-9 text-bold">
          List Approval
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Rescheduled Notification</q-item-label>
          <q-item-label caption>Already Approved By ME</q-item-label>
          <q-item-label caption class="text-blue-8"
            >20 Hours and 50 Minutes Ago</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-separator color="grey" inset></q-separator>
      <q-item>
        <q-item-section>
          <q-item-label>Rescheduled Notification</q-item-label>
          <q-item-label caption>Already Approved By ME</q-item-label>
          <q-item-label caption class="text-blue-8"
            >20 Hours and 50 Minutes Ago</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-separator color="grey" inset></q-separator>
      <q-item>
        <q-item-section>
          <q-item-label>Rescheduled Notification</q-item-label>
          <q-item-label caption>Already Approved By ME</q-item-label>
          <q-item-label caption class="text-blue-8"
            >20 Hours and 50 Minutes Ago</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-separator color="grey" inset></q-separator>
    </q-drawer>

    <!-- this is where the Pages are injected -->
    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    <q-footer class="bg-blue-grey-1 text-grey-9">
      <q-toolbar>
        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar> -->
          <div>Copyright &copy; T&D Team</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
};
</script>
