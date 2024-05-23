<template>
    <div class="swap"><input
      ref="name"
      placeholder="Name"
    />
        <HomeSection/>
    </div>
</template>

<script>

import HomeSection from './components/HomeSection.vue'
export default {
    name:"Home",
    components:{
        HomeSection,
    },
    data(){
        return{

        }
    },
     mounted() {
    this.focusInput();
  },
  methods: {
    focusInput() {
      this.$refs.name.focus();
    },
  },
  
    
}

</script>
