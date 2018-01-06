<style lang="sass">
  @import '../styles/menu.scss';
</style>

<template lang="pug">
  Menu(ref='sideMenu', :active-name="$route.name", :open-names="openNames", width='auto', @on-select = 'changeMenu')
    template(v-for='item in menuList')
      MenuItem(v-if="item.children.length<=1", :name="item.children[0].name", :key ="item.path")
        Icon(:type="item.icon", :size="iconSize", :key="item.path")
        span(class="layout-text", :key="item.path") {{itemTitle(item)}}
      Submenu(v-if="item.children.length >1", :name="item.name",:key="item.path")
        template(slot="title")
          Icon(:type="item.icon",:size="iconSize")
          span(class="layout-text") {{itemTitle(item)}}
        template(v-for='child in item.children')
          MenuItem(:name="child.name", :key = "child.name")
            Icon(:type="child.icon",:size='iconSize')
            span(class='layout-text', :key="child.name") {{itemTitle(item)}}
</template>

<script>
export default {
  name:'sidebarMenu',
  props: {
    menuList:Array,
    iconSize:Number,
    openNames:{
      type: Array
    }
  },
  methods:{
    changeMenu(active) {
      this.$emit('on-change',active)
    },
    itemTitle(item) {
      return this.item.title
    },
  },
  updated() {
    this.$nextTick(()=>{
      if(this.$refs.sideMenu){
        this.$refs.sideMenu.updatedOpend()
      }
    })
  }
}
</script>
