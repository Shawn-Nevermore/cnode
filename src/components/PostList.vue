<template>
  <div class="postlist">
    <!--列表加载出来之前，加载动画-->
    <div class="loading" v-if="isLoading">
      <img src="" alt="" />
    </div>
    <div class="panel">
      <div class="toolbar">
        <span class="topic-tab current-tab">全部</span>
        <span class="topic-tab">精华</span>
        <span class="topic-tab">分享</span>
        <span class="topic-tab">问答</span>
        <span class="topic-tab">招聘</span>
      </div>
      <ul class="topic_list">
        <li class="cell clearfix" v-for="post in posts" :key="post.id">
          <!--头像-->
          <a class="avatar" href="#">
              <img :src="post.author.avatar_url" alt="avatar"/>
          </a>

          <!--回复数/点击数-->
          <span class="reply_visit_count">
            <span class="reply_count">{{ post.reply_count }}</span>
            <span class="count_seperator">/</span>
            <span class="visit_count">{{ post.visit_count }}</span>
          </span>

          <!--最后更新时间 -->
          <div class="last_time">
            <!--              <button @click="getAvatar(post.id)" :key="post.id">GET</button>-->
            <img :src="reply_avatar" alt="" />
            <span class="last_active_time">{{
              post.last_reply_at | formatDate
            }}</span>
          </div>

          <!--标题-->
          <div class="topic_title_wrapper">
            <span class="topic_list_tab">置顶</span>
            <a class="topic_title" :href="post.title">{{ post.title }}</a>
          </div>
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
      posts: [],
      postId: "",
      reply_avatar: ""
    };
  },
  methods: {
    getPosts() {
      this.$axios
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: 1,
            limit: 40
          }
        })
        .then(res => {
          this.isLoading = false; //加载成功，去除动画
          this.posts = res.data.data;
          this.postId = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAvatar(id) {
      this.$axios
        .get(`https://cnodejs.org/api/v1/topic/${id}`)
        .then(res => {
          this.reply_avatar = res.data.data.replies.pop().author.avatar_url;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  beforeMount() {
    this.isLoading = true; //加载成功之前显示加载动画
    this.getPosts();
  }
};
</script>

<style lang="stylus" scoped>
.postlist
    max-width: 1095px
    .panel
        a
            text-decoration none
            color: #778087
        .toolbar
            padding: 10px
            background-color: #f6f6f6
            border-radius: 5px 5px 0 0
            .topic-tab.current-tab
                background-color: #80bd01
                color: #fff
                padding: 3px 4px
                border-radius: 3px
            .topic-tab
                margin: 0 10px
                color: #80bd01
        .topic_list
            list-style: none
            .cell
                position: relative
                &:hover
                    background: #f5f5f5
                &:first-child
                    border-top 0
                background: #fff
                border-top 1px solid #f5f5f5
                padding: 10px
                .avatar
                    float: left
                    img
                        width: 30px
                        height: 30px
                        border-radius: 3px
                .reply_visit_count
                    float: left
                    width: 70px
                    text-align center
                    line-height: 30px
                    height: 30px
                    .reply_count
                        color: #9e78c0
                    .count_seperator
                        font-size 10px
                    .visit_count
                        font-size: 10px
                        color: #b4b4b4


                .last_time
                    float: right
                    margin-left: 50px
                    img
                        width: 20px
                        background: #000
                    .last_active_time
                        display: inline-block
                        min-width: 50px
                        font-size 11px
                        color #778087
                        text-align: right
                        white-space: nowrap
                .topic_title_wrapper
                    white-space: nowrap
                    .topic_list_tab
                        background: #e5e5e5
                        line-height: 30px
                        height: 30px
                        color: #999
                        padding: 2px 4px
                        /*margin: 0 5px*/
                        border-radius: 3px
                        font-size: 12px
                    .topic_title
                        &:hover
                            text-decoration underline
                        &:visited
                            color: #888
                        display: inline-block
                        line-height: 30px
                        color: #333
                        width: 70%
                        text-overflow ellipsis
                        white-space: nowrap
                        font-size: 16px
                        overflow: hidden
</style>
