<template>
  <router-view />
</template>

<script setup>
import firebase from "src/boot/firebase.js";
defineOptions({
  name: "App",
});
</script>
