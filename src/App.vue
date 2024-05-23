<template>
  <div class="wrap">
    <main class="wrap-content">
      <HomeSection />
    </main>
    <div id="loading-bg">
    </div>
  </div>
</template>
<script>
  import HomeSection from "@views/home-new/components/HomeSection.vue";

  export default {
    name: 'LayoutWeb',
    components: {
      HomeSection
    }

  };
</script>


<style>
@font-face{
    font-family: 'Testing';
    font-style: normal;
  
    src: url('./fonts/Raleway-Regular.ttf') format('truetype'),
    url('./fonts/Raleway-Regular.woff2') format("woff2"),
    url('./fonts/Raleway-Regular.woff') format("woff");
}

.wrap{
  overflow-x: hidden;
}
</style>
