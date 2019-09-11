<template>
  <div class="postlist">
    <!--列表加载出来之前，加载动画-->
    <div class="loading" v-if="isLoading">
      <img src="" alt="" />
    </div>
    <div class="panel">
      <ul>
        <li></li>
        <li v-for="post in posts" :key="post.id">
          <span class="avatar">
            <img :src="post.author.avatar_url" alt="" />
          </span>
          <span>
            {{ post.title }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      posts: []
    };
  },
  methods: {
    getData() {
      this.$axios
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: 1,
            limit: 40
          }
        })
        .then(res => {
          this.posts = res.data.data;
          console.log(this.posts[0].author.avatar_url);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  beforeMount() {
    this.isLoading = true;
    this.getData();
  }
};
</script>

<style lang="stylus" scoped>
.postlist
    background: #fff
    .panel
        .avatar
            img
                width: 30px
                height: 30px
</style>
