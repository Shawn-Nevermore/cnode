<template>
  <div class="postlist">
    <!--列表加载出来之前，加载动画-->
    <div class="loading" v-if="isLoading">
      <img src="" alt="" />
    </div>
    <div class="panel">
      <ul class="topic_list">
        <li></li>
        <li v-for="post in posts" :key="post.id">
          <!--头像-->
          <span class="avatar">
            <img :src="post.author.avatar_url" alt="" />
          </span>
          <!--            回复数/点击数-->
          <span> {{ post.reply_count }}/{{ post.visit_count }} </span>
          <!--标题-->
          <span class="title">
            <a :href="post.title">{{ post.title }}</a>
          </span>
          <span>
            {{ post.create_at }}
          </span>
        </li>
      </ul>
      <!--分页器-->
      <div class="pagination"></div>
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
    .loading

    .panel
        .topic_list
            list-style: none
            padding 0
            li
                &:hover
                    background: #f5f5f5
                &:first-child
                    border-top 0
                border-top 1px solid #f5f5f5
                padding: 10px 0 10px 10px
                line-height 2rem
                .avatar
                    img
                        width: 30px
                        height: 30px
                .title
                    a
                        text-decoration none
</style>
