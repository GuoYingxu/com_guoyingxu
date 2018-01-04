<template lang="pug">
  div
    template(v-for="(item,index) in menuList")
      div(style="text-align:center" , :key="index")
        DropDown(transfer, v-if="item.children.length !== 1", placement='right-start', :key="index", @on-click="changeMenu")
          Button(style="width:70px; margin-left:-5px; padding:10px 0;", type="text")
            Icon(:size="20", :color="iconColor", :type="item.icon")
          DropDownMenu(style="with:200px",slot='list')
            template(v-for="(child,i) in item.children")
              DropDownItem(:name='child.name', :key="i")
                Icon(:type="child.icon")
                span(style="padding-left:10px;") {{itemTitle(child)}}
        
        DropDown(transfer, v-else,placement='right-start',:key='index',@on-click="changeMenu")
          Button(@click="changeMenu(item.children[0].name", style="width:70px;margin-left:-5px;padding:10px 0;", type="text")
            Icon(:size="20", :color="iconColor",:type="item.icon")
          DropDownMenu(style="width:200px", slot="list")
            DropDownItem( :name="item.children[0].name",:key="'d'+index")
              Icon(:type="item.icon")
              span(style="padding-left:10px") {{itemTitle(item.children[0])}}
</template>

<script>
export default {
  name: 'sidebarMenuShrink',
  props: {
    menuList:{
      type:Array
    },
    iconColor:{
      type: String,
      default: white
    },
  },
  methods: {
    changeMenu(active){
      this.$emit('on-change',active);
    },
    itenTitle(item){
      return item.title
    }
  }
}
</script>
