<template>
  <div class="q-mb-md">
    <div class="flex" style="min-width: 500px">
      <q-input
        outlined
        v-model="searchinput"
        class="col q-mr-md"
        placeholder="Search Post....."
        @keyup="searchpost"
      />
      <q-btn color="primary" @click="opencreatepostmodel" label="Create Post">
      </q-btn>
      <q-dialog v-model="alert">
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <q-form @submit="submit" class="q-gutter-md">
              <q-input v-model="posttitle" outlined placeholder="Post Title" />
              <q-input
                v-model="postdesc"
                type="textarea"
                outlined
                placeholder="Post Description"
              />
              <div class="text-right">
                <q-btn label="Submit" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { mapGetters } from "vuex";
import { Notify } from "quasar";
export default defineComponent({
  name: "PostHeader",
  data() {
    return {
      alert: false,
      posttitle: null,
      postdesc: null,
      searchinput: null,
      timer: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn"]),
  },
  methods: {
    submit() {
      this.$store.dispatch("post/submitPost", {
        posttitle: this.posttitle,
        postdesc: this.postdesc,
      });
      (this.posttitle = ""), (this.postdesc = "");
      this.alert = false;
    },
    opencreatepostmodel() {
      if (this.isLoggedIn) {
        this.alert = true;
      } else {
        Notify.create({
          message: "Login for Create Post",
          color: "red",
        });
      }
    },
    searchpost() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.timer = setTimeout(() => {
        this.$store.dispatch("post/searchpost", this.searchinput);
      }, 400);
    },
  },
});
</script>

<style lang="scss" scoped></style>
