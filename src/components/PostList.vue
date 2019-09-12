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
            <span class="avatar">
              <a href="#"><img :src="post.author.avatar_url" alt=""/></a>
            </span>

            <!--回复数/点击数-->
            <span class="reply_visit_count">
              <span class="reply_count">{{ post.reply_count }}</span>
              <span class="count_seperator">/</span>
              <span class="visit_count">{{ post.visit_count }}</span>
            </span>

            <!--标题-->
            <span class="title">
              <a :href="post.title">{{ post.title }}</a>
            </span>
          </div>
          <div class="rightPart">
            <!--最后更新时间 -->
            <span class="last_time">
<!--              <button @click="getAvatar(post.id)" :key="post.id">GET</button>-->
              <img :src="reply_avatar" alt="头像"/>
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
                    border:1px solid green
                    width: 70%
                    padding-right 20px
                    display: flex
                    align-items: center
                    /*height: 30px*/
                    .avatar
                        img
                            width: 30px
                            height: 30px
                    .reply_visit_count
                        min-width: 80px
                        text-align center
                        .reply_count
                            color: #9e78c0
                        .count_seperator
                            font-size 10px
                        .visit_count
                            font-size: 10px
                            color: #b4b4b4
                    .title
                        border: 1px solid red

                        width 100%
                        a
                            border 1px solid blue
                            &:hover
                                text-decoration underline
                            &:visited
                                color: #888
                            padding 0
                            color: #333
                            max-width: 70%
                            text-overflow ellipsis
                            white-space: nowrap
                            font-size: 16px
                            display: block
                            overflow: hidden

                .rightPart
                    vertical-align middle
                    .last_time
                        min-width: 70px
                        align-self: flex-end
                        img
                            width: 20px
                            background: #000
                        .last_active_time
                            font-size 11px
                            color #778087
                            text-align: right
                            white-space: nowrap
                            min-width: 50px
                            display: inline-block
</style>
