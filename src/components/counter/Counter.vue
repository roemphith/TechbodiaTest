<template>
    <section class="counter bg-img"  v-if="counter.counter && counter.counter.length > 0"
    :style="{ backgroundImage: 'url(' + background + ')' }">
        <div class="container">
            <div class="row justify-content-center" >
                <div class="col-lg-3 col-md-4 col-6 mb-3" v-for="(counter, index) in counter.counter" :key="'counter' + index" >
                    <div class="counter-item">
                        <div class="image">
                            <img :src=" assetUrl + counter.image " alt="" class="img-fluid">
                        </div>
                        <div class="counter"> {{counter.count}} </div>
                        <div class="title"><h5>{{counter.title}}</h5></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
   export default{
   name:'Counter',
   props: ['counters'],
   data(){
    return{
        assetUrl: process.env.VUE_APP_ASSET_URL + '/',
        background: require('@/assets/images/funfact-line.png'),
    }
   },
   methods: {
      ...mapActions(['fetchCounter']),
    
    },
    computed: {
      ...mapGetters(['counter']),
  
    },
    mounted() {
      this.fetchCounter({
        filter: {
          locale: this.$router.currentRoute.params.locale
            ? this.$router.currentRoute.params.locale
            : 'en',
        },
      });
    },
     watch: {
       $route(to, from) {
         if (from.params.locale && to.params.locale !== from.params.locale) {
           this.fetchCounter({
             filter: {
               locale: this.$router.currentRoute.params.locale
                   ? this.$router.currentRoute.params.locale
                   : "en",
             },
           });
         }
       },
     },
}
    
</script>
<style lang="scss">
@import '@assets/scss/components/counter';

</style>