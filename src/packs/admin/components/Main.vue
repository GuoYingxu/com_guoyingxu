<style lang="scss">
  @import './Main.scss';
</style>

<template lang="pug">
  .main(:class="{'main-hide-text':shrink}")
    .sider-menu-con(:style="{width: shrink? '60px': '200px', overflow: shrink ? 'visible' : 'auto'}")
      shrinkable-menu(:shrink="shrink", @on-change="handleSubMenuChange",:before-push="beforePush",:open-names="opendSubmenuArr",:menu-list="menuList")
        log-con(slot="top")
          img(v-show="!shrink", src="../images/logo.jpg",key="max-logo")
          img(v-show="shrink",src="../images/logo-min.jpg",key="min-logo")
    
</template>
<script>
import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
import {mapState} from 'vuex'
import util from '../../libs/util'
export default {
  components: {
    shrinkableMenu
  },
  data(){
    return {
      shrink: false,
      // opendSubmenuArr: []
    }
  },
  computed: {
    ...mapState({
      opendSubmenuArr: state => state.admin.opendSubmenuArr,
      menuList: state => state.admin.menuList,
    }),
  },
  methods:{
    init(){
       console.log(this.$route.name)
       console.log(this.$store)
       let pathArr = util.setCurrentPath(this,this.$route.name);
        this.$store.commit('updateMenulist');
        if (pathArr.length >= 2) {
            this.$store.commit('addOpenSubmenu', pathArr[1].name);
        }
        this.userName = Cookies.get('user');
        let messageCount = 3;
        this.messageCount = messageCount.toString();
        this.checkTag(this.$route.name);
        this.$store.commit('setMessageCount', 3);
    },
    toggleClick(){
      this.shrink = !this.shrink;
    },
    handleSubmenuChange (val) {
        // console.log(val)
    },
    beforePush (name) {
      // if (name === 'accesstest_index') {
      //     return false;
      // } else {
      //     return true;
      // }
      return true;
    },
    checkTag(){

    }
  },
  watch: {
    '$route' (to) {
      // this.$store.commit('setCurrentPageName',to.name);
      // let pathArr = util.setCurrentPath(this,to.name);
      // if(pathArr.length > 2){
      //   this.$store.commit('addOpenSubmenu', pathArr[1].name);
      // }
      // this.checkTag(to.name)
      // localStorage.currentPageName=to.name;
    }
  },
  mounted(){
    this.init()
    console.log(this.$route)
  },
  created(){
    // this.$store.commit('setOpendList')
  }
}
</script>
