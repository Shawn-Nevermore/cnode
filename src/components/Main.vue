<template>
  <div class="main clearfix">
    <SideBar></SideBar>
    <PostList></PostList>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";

export default {
  name: "Main",
  components: {
    PostList,
    SideBar
  }
};
</script>

<style lang="stylus" scoped>
.main
    width: 90%
    max-width: 1400px
    min-width: 960px
    margin: 65px auto
    min-height: 400px
    /*position: relative;*/
</style>
