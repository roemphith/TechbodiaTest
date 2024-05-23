<template>
  <div class="row card-team">
    <div v-for="(member, id) in team_infos" :key="id"
    class="col-lg-3 col-md-4 col-6 responsive-col"
    >
      <div class="single-team">
        <div class="team">
          <router-link :to="{ 
              name:'team-detail',
              query: {
                _post: member.uuid,
                text: member.slug,
              },
            }" class="team-image">
            <img :src="assetUrl + member.profile" :alt="member.alt" class="img-fluid">
          </router-link>
        </div>
        <div class="team-content-botton">
          <div class="member-identity">
            <h6 class="card-text name pt-2"><b-link href="#">{{member.name}}</b-link></h6>
            <span class="card-text position"><b-link href="#">{{member.position}}</b-link></span>
          </div>
          <div class="social d-flex justify-content-center mt-3">
            <b-link target="_blank" :href="member.facebook"><b-icon icon="facebook"></b-icon></b-link>
            <b-link target="_blank" :href="member.twitter"><b-icon icon="twitter"></b-icon></b-link>
            <b-link target="_blank" :href="member.linkIn"><b-icon icon="linkedin"></b-icon></b-link>
            <b-link target="_blank" :href="member.instgram"><b-icon icon="instagram"></b-icon></b-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdTeamCard",
  props:['team_infos'],
  data (){
    return{
      assetUrl: process.env.VUE_APP_ASSET_URL + '/',
      comment:'No Comment',
      
    }
  }
}
</script>

<style lang="scss">
@import "@assets/scss/components/team-card.scss";
</style>