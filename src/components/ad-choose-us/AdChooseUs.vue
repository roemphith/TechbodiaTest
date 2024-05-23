<template>
<div class="choose-us">
  <div class="choose-us-wrap row">
    <div class="col-lg-6 col-12 col-img d-flex align-items-center">
      <img :src="chooseUs && chooseUs.chooseUsContent && assetUrl + chooseUs.chooseUsContent.image" alt="" class="img-fluid">
    </div>
    <div class="col-lg-6 col-12 col-content d-flex align-items-center">
      <div class="choose-container">
        <div class="content">
          <h2 class="text-uppercase small-title">{{chooseUs && chooseUs.chooseUsContent && chooseUs.chooseUsContent.headTitle}}</h2>
          <h2 class="big-title">{{chooseUs && chooseUs.chooseUsContent && chooseUs.chooseUsContent.title}}</h2>
          <div class="accordion-com">
            <div class="accordion-one-row">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item border-0" v-for="(questionAnswer,index) in chooseUs.chooseUs" :key="index.id">
                  <h2 class="accordion-header" :id="'headingOne'+index">
                    <button
                        class="accordion-button"
                        :class="{ 'collapsed': index !== 0 }"
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#collapseOne'+index"
                        aria-expanded="true"
                        :aria-controls="'collapseOne'+index"
                    >
                      <h3>{{questionAnswer.title}}</h3>
                    </button>
                  </h2>
                  <div
                      :id="'collapseOne'+index"
                      class="accordion-collapse collapse"
                      :class="{ 'show': index === 0 }"
                      :aria-labelledby="'headingOne'+index"
                      data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      {{questionAnswer.descript}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="row">
    <div class="col-lg-6">
      <img  :src="chooseUs && chooseUs.chooseUsContent && chooseUs.chooseUsContent.image" alt="" class="img-fluid">
    </div>
  </div> -->
</div>
</template>

<script>
   import { mapActions, mapGetters } from 'vuex';
export default {
  name: "AdChooseUs",
  props:['choose_us_info','answer_question'],
  components:{
  },
  data(){
    return{
      assetUrl: process.env.VUE_APP_ASSET_URL + '/',
      serviceBackground: require('@/assets/images/list-service.png'),
    }
  },
  
  methods: {
    // this(".card-header").click(function() {
    //   this(this).find('i').toggleClass('fas fa-plus fas fa-minus');
    // });
      ...mapActions(['fetchChooseUs']),
    
    },
    computed: {
      ...mapGetters(['chooseUs']),
  
    },
    mounted() {
      this.fetchChooseUs({
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
        this.fetchChooseUs({
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
@import "@assets/scss/components/choose-us.scss";
</style>