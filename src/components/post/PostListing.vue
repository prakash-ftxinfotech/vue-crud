<template>
  <div>
    <PostHeader />
    <q-scroll-area style="height: 75vh">
      <PostCard
        v-for="postlists in Postlist"
        :key="postlists.id"
        v-bind="postlists"
      />
      <div class="q-pa-lg text-center" v-if="!Postlist.length">
        Post Not Found
      </div>
      <div class="loading text-center" v-show="loading">
        <q-img src="../../../public/loading.gif" width="150px" height="150px" />
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import PostCard from "components/post/PostCard.vue";
import PostHeader from "components/post/PostHeader.vue";

import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "PostListing",
  data() {
    return {};
  },
  components: {
    PostCard,
    PostHeader,
  },
  computed: {
    ...mapGetters("post", ["Postlist", "loading"]),
  },
  mounted() {
    this.$store.dispatch("post/getpostlist").then((res) => {});
    console.log(this.Postlist);
  },
});
</script>

<style lang="scss" scoped></style>
