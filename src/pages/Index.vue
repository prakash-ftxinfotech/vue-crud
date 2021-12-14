<template>
  <q-page class="flex flex-center q-py-lg">
    <PostListing />
  </q-page>
</template>

<script>
import PostListing from "components/post/PostListing.vue";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "PageIndex",
  components: {
    PostListing,
  },
  computed: {
    ...mapGetters("post", ["Title"]),
  },
});
</script>
