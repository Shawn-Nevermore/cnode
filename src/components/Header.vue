<template>
  <div class="header">
    <div class="header-inner">
      <div class="header-inner-left">
        <router-link to="/" class="brand">
          <img src="../assets/cnodejs_light.svg" alt="logo" />
        </router-link>

        <form class="header-search" action="">
          <label>
            <input class="header-search-query" type="text" />
          </label>
        </form>
      </div>

      <div class="header-inner-right">
        <ul class="list">
          <li><a href="#">首页</a></li>
          <li><a href="#">新手入门</a></li>
          <li><a href="#">API</a></li>
          <li><a href="#">关于</a></li>
          <li><a href="#">注册</a></li>
          <li><a href="#">登录</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="stylus" scoped>
.header
  background #444
  width 100%
  position fixed
  top 0
  left 0
  font-size 13px

  .header-inner
    display flex
    justify-content space-between
    align-items center
    width 90%
    max-width 1400px
    min-width 960px
    min-height 40px
    margin auto
    padding 5px

    .header-inner-left
      display flex
      align-items center

      .brand
        width 120px
        height 34px
        line-height 34px
        padding 3px 20px

        img
          max-width 100%

      .header-search
        width 233px
        line-height 40px

        .header-search-query
          &:hover
          &:focus
            background: #fff
          background url(/src/assets/search.e53b380a.hashed.png) 4px 4px no-repeat #888
          width 206px
          padding 5px 5px 5px 22px
          border-radius 15px
          border 0
          color #666
          transition: all .5s

    .header-inner-right
      .list
        list-style none
        display flex
        margin 0

        li
          padding 10px 15px
          a
            &:hover
              color #fff
            text-decoration none
            color #ccc
</style>
