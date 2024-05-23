<template>
  <div class="header-bg-com">
    <div :class="custom_class" :style="{backgroundImage: `url(${background.url})`}">
      <div class="container">
        <h1 class="title">{{title}}</h1>
        <b-breadcrumb class="breadcrumb mt-4" :items="breadcrumb"></b-breadcrumb>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdHeaderBg",
  props:['background','breadcrumb','title','custom_class'],
  data (){
    return{
    }
  }
}
</script>

<style lang="scss">
@import "@assets/scss/components/header-bg.scss";
</style>