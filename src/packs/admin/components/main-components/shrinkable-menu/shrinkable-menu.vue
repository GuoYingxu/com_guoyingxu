<style lang="scss">
  @import './styles/menu.scss';
</style>
<template lang="pug">
  .ivu-shrinkable-menu(:style="{background: bgColor}")
    slot(name="top")
    //- sidbebar-menu(v-show="!shrink",:menu-list="menuList",:open-names="openNames",@on-change="handleChange")
    //- sidbebar-menu-shrink(v-show="shrink", :menu-list="menuList",:icon-color="shrinkIconColor",@on-change="handleChange")
</template>

<script>
// import sidebarMenu from './components/sidebarMenu.vue';
// import sidebarMenuShrink from './components/sidebarMenuShrink.vue';
import util from '../../../../libs/util';
export default {  
  name: 'shrinkableMenu',
  components: {
    // sidebarMenu,
    // sidebarMenuShrink
  },
  props: {
    shrink: {
      type:Boolean,
      default: false
    },
    menuList: {
      type:Array,
      required: true
    },
    beforePush: {
      type: Function
    },
    openNames:{
      type:Array
    }
  },
  computed: {
    bgColor(){
      return "#495060"
    },
    shrinkIconColor(){
      return "#fff"
    }
  },
  methods: {
    handleChange(name){
      let willpush = true;
      if(this.beforePush !== undefined){
        if(!this.beforePush(name)){
          willpush = false
        }
      }
      if(this.willpush){
        this.$router.push({
          name: name
        })
      }
      this.$emit('on-change',name)
    }
  }
}
</script>

