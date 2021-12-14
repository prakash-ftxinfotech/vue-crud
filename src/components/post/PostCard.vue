<template>
  <div class="postcard">
    <div class="postcard-header">{{ title }}</div>
    <div class="postcard-body">{{ desc }}</div>
    <div class="postcard-footer flex items-center">
      <q-btn
        @click="edit(id)"
        outline
        dense
        round
        v-if="isLoggedIn"
        class="q-mr-sm"
        color="primary"
        icon="edit"
      />
      <q-btn
        outline
        round
        v-if="isLoggedIn"
        dense
        color="red"
        icon="delete"
        @click="removepost(id)"
      />
      <span class="q-ml-auto">Author : {{ author }} </span> || Date :
      <span>{{ datetime }}</span>
    </div>
    <q-dialog v-model="editpost" v-if="post.id">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="updatepost" class="q-gutter-md">
            <q-input v-model="post.title" outlined placeholder="Post Title" />
            <q-input
              v-model="post.desc"
              type="textarea"
              outlined
              placeholder="Post Description"
            />
            <div class="text-right">
              <q-btn label="Update Post" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "PostCard",
  data() {
    return {
      editpost: false,

      post: {},
    };
  },
  props: {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    desc: {
      type: String,
    },
    datetime: {
      type: String,
    },
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn"]),
  },
  methods: {
    edit(id) {
      this.$store
        .dispatch("post/editpost", id)
        .then((data) => {
          this.post = data;
          this.editpost = true;
        })
        .catch((error) => console.log("error", error));
    },
    updatepost() {
      this.$store
        .dispatch("post/updatepost", this.post)
        .then((data) => {
          this.editpost = false;
        })
        .catch((error) => console.log("error", error));
    },
    removepost(id) {
      this.$q
        .dialog({
          title: "Are You Sure?",
          message: "",
          class: "confirm-dialog",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$store.dispatch("post/removepost", id);
        });
    },

  },
});
</script>

<style lang="scss" scoped>
.postcard {
  border: 1px solid #ccc;
  min-width: 500px;
  box-shadow: 0 0px 10px 10px #00000014;
  // padding: 15px 0;
  & + .postcard {
    margin-top: 25px;
  }
  &-header,
  &-footer {
    padding: 15px 15px;
  }
  &-body {
    padding: 15px 15px;
  }
  &-header {
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    font-size: 18px;
  }
  &-footer {
    border-top: 1px solid #ccc;
    font-size: 12px;
    color: grey;
  }
}
</style>
