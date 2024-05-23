<template>
<div class="accordion-com">
  <!-- <div class="accordion-one-row">
    <div class="accordion" id="accordionExample" v-for="(a_q,index) in faq_one_row" :key="index">
      <div class="accordion-item border-0">
        <h2 class="accordion-header" :id="'headingOne'+index">
          <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#collapseOne'+index"
              aria-expanded="true"
              :aria-controls="'collapseOne'+index"
          >
            <h3>{{a_q.question}}</h3>
          </button>
        </h2>
        <div
            :id="'collapseOne'+index"
            class="accordion-collapse collapse"
            :aria-labelledby="'headingOne'+index"
            data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            {{a_q.answer}}
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="accordion-two-row">
    <div class="container">
      <div class="row">
        <div class="accordion col-md-6" id="accordionExample" v-for="(questionAnswer,index) in faq.faqs" :key="index.id">
          <div class="accordion-item border-0">
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
                {{questionAnswer.description}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "AdAccordion",
  props:['faq_one_row','faq_two_row'],
  data(){
    return{
    }
  },
  methods: {
    ...mapActions(['fetchFaq']),
  },
  computed: {
    ...mapGetters(['faq']),
  },
  mounted(){
    this.fetchFaq({
        filter: {
          locale: this.$router.currentRoute.params.locale
            ? this.$router.currentRoute.params.locale
            : 'en',
        },
      });
  }
}
</script>

<style lang="scss">
@import "@assets/scss/components/accordion.scss";
</style>