<style lang="scss">
@import './pagebody.scss';
</style>

<template lang="pug">
  .page-body
    .width-container
      .waterfall
        .waterfall-item(v-for="item in items", :style="{height:item.height}")
          .title {{item.title}}
          .abstract {{item.abstract}}
</template>

<script>
import {mapState} from 'vuex';
export default {
  data(){
    return {
    }
  },
  mounted(){
    this.getData();
  },
  computed:{
    ...mapState({
      items: state => state.article.articles
    })
  },
  components: {
  },
  methods:{
    getData(){
      this.$store.dispatch('getArticle',{type: 'waterfall'})
    }
  }
}
</script>
