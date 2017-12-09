<template lang="pug">
  .page-face
    .face-top
      .width-container
        .left.margin-top-5
          Avatar(icon='person',size='large')
        .left.face-word
          span This is Blog!
        .right.face-search.margin-top-10
          Input(icon="ios-search",placeholder="search")
    //- .face-body
    //-   .width-container.flip-height-300
    //-     img(src="./face.jpg")
        

</template>

<style lang="scss">
 @import './face';
</style>
