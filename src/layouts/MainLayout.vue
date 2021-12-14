<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> CRUD Operation App </q-toolbar-title>
        <q-btn label="Login" v-show="!isLoggedIn" @click="loginmodel = true" />
        <q-btn
          label="Logout"
          v-show="isLoggedIn"
          icon="account_circle"
          @click="logout"
        />
        <q-dialog
          v-model="loginmodel"
          class="login-model"
          full-height
          position="right"
        >
          <q-card class="full-height" style="width: 350px">
            <div class="q-pa-md" style="max-width: 400px">
              email: eve.holt@reqres.in<br />
              <q-form @submit="onSubmit" class="q-gutter-md" autocomplete="off">
                <q-input
                  outlined
                  v-model="email"
                  placeholder="Enter Your Email*"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Email required',
                  ]"
                />
                <q-input
                  type="password"
                  outlined
                  v-model.trim="password"
                  placeholder="Enter Your password*"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Password required',
                  ]"
                />

                <div>
                  <q-btn
                    label="Submit"
                    :disable="password && email"
                    type="submit"
                    color="primary"
                  />
                </div>
              </q-form>
            </div>
            <q-card-section class="row items-center no-wrap"> </q-card-section>
          </q-card>
        </q-dialog>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "MainLayout",

  computed: {
    ...mapGetters("auth", ["isLoggedIn"]),
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const loginmodel = ref(false);
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      loginmodel,
      email: ref(null),
      password: ref(null),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.email != null || this.password != null) {
        this.$store
          .dispatch("auth/login", {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            this.$router.push("/");
            this.loginmodel = false;
            console.log("on submit" + res);
          })
          .catch((err) => {
            console.log("error is " + err);
          });
      } else {
        console.log("tt");
      }
    },
    logout() {
      this.$store.dispatch("auth/logout").then(() => {});
    },
  },
});
</script>
<style lang="scss">
.login-model {
  .q-dialog__inner--minimized {
    padding: 0px;
  }
}
</style>
