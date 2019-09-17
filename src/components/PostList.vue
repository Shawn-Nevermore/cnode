<template>
  <div class="postlist">
    <!--列表加载出来之前，加载动画-->
    <div class="loading" v-if="isLoading">
      <img src="" alt="" />
    </div>
    <div class="panel">
      <ul class="topic_list">
        <li class="header">
          <div class="toolbar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
          </div>
        </li>
        <li class="cell" v-for="post in posts" :key="post.id">
          <div class="leftPart">
            <!--头像-->
            <a class="avatar" href="#"><img :src="post.author.avatar_url" alt="头像"/></a>

            <!--回复数/点击数-->
            <span class="reply_visit_count">
              <span class="reply_count">{{ post.reply_count }}</span>
              <span class="count_seperator">/</span>
              <span class="visit_count">{{ post.visit_count }}</span>
            </span>
          </div>

            <span class="topic_list_tab">置顶</span>
            <!--标题-->
            <div class="topic_title_wrapper">
              <a class="topic_title" :href="post.title">{{ post.title }}</a>
            </div>

          <div class="rightPart">
            <!--最后更新时间 -->
            <span class="last_time">
<!--              <button @click="getAvatar(post.id)" :key="post.id">GET</button>-->
              <img :src="reply_avatar" alt=""/>
              <span class="last_active_time">{{ post.last_reply_at | formatDate }}</span>
            </span>
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
    background: #fff
    max-width: 1095px
    .panel
        a
            text-decoration none
            color: #778087
        .topic_list
            list-style: none
            padding 0   /*清除默认Padding*/
            .cell
                &:hover
                    background: #f5f5f5
                &:first-child
                    border-top 0
                display: flex
                justify-content: space-between
                align-items: center
                border-top 1px solid #f5f5f5
                padding: 10px
                .leftPart
                    width: 100px
                    display: flex
                    align-items: center
                    .avatar
                        display: flow-root
                        img
                            width: 30px
                            border-radius: 3px
                    .reply_visit_count
                        width: 70px
                        text-align center
                        .reply_count
                            color: #9e78c0
                        .count_seperator
                            font-size 10px
                        .visit_count
                            font-size: 10px
                            color: #b4b4b4

                .topic_list_tab
                  background: #e5e5e5
                  color: #999
                  padding: 2px 4px
                  margin: 0 5px
                  border-radius: 3px
                  font-size: 12px

                .topic_title_wrapper
                    display: flow-root
                    flex: 1
                    white-space: nowrap
                    max-width: 752.5px
                    .topic_title
                        &:hover
                            text-decoration underline
                        &:visited
                            color: #888
                        color: #333
                        width: 70%
                        text-overflow ellipsis
                        white-space: nowrap
                        font-size: 16px
                        display: block
                        overflow: hidden

                .rightPart
                    flex: none
                    vertical-align middle

                    .last_time
                        display: flow-root
                        min-width: 70px
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
</style>
