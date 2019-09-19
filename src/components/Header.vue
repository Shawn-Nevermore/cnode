<template>
  <div class="header">
    <div class="header-inner">
      <div class="header-inner-left">
        <router-link to="/" class="brand">
          <img src="../assets/cnodejs_light.svg" alt="logo" />
        </router-link>

        <form class="header-search" action="">
          <input class="header-search-query" type="search" />
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
    z-index 100
    box-shadow 0px 0px 20px 0px rgba(0, 0, 0, 0.75)

    .header-inner
        display flex
        justify-content space-between
        align-items center
        /*width 10%*/
        max-width 1400px
        min-width 960px
        min-height 40px
        margin auto
        padding 5px

        .header-inner-left
            display flex
            align-items center

            .brand
                width 160px
                height 40px
                line-height 40px
                padding 3px 20px

                img
                    max-width 100%

            .header-search
                .header-search-query
                    background: #888 url(../assets/search.e53b380a.hashed.png) no-repeat 4px center
                    border 0
                    padding: 5px 10px 5px 26px
                    width: 233px
                    border-radius: 10em
                    transition: all .3s

                    &:focus, &:hover
                        width: 333px
                        background-color: #fff

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
