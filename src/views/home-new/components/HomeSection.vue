<template>
  <div class="home app">
    <section class="welcome">
      <div class="container">
        <div>
          <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              size="sm"
              class="w-25"
          >
            <option :value="false">Asc</option>
            <option :value="true">Desc</option>
          </b-form-select>
        </div>
        <b-form-input class="mt-2" v-model="searchQuery" @keydown="searchCountries" placeholder="Search by country name" />
        <b-table
            id="my-table"
            :items="countries"
            :per-page="pageSize"
            :current-page="currentPage"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            hover
            first-text="First"
            prev-text="Prev"
            next-text="Next"
            last-text="Last"
        >
          <template #cell(flags)="row">
            <b-img-lazy :src="row.item.flags.png" fluid rounded width="100" height="50" alt="flag" />
          </template>
          <template #cell(name)="row">
            <div @click="info(row.item, row.index, $event.target)" class="mr-1 pointer">
              {{ row.item.name.official }}
            </div>
          </template>
          <template #cell(cca2)="row">
            {{ row.item.cca2 }}
          </template>
          <template #cell(cca3)="row">
            {{ row.item.cca3 }}
          </template>
          <template #cell(nativeName)="row">
            {{ getNativeOfficialName(row.item.name.nativeName) }}
          </template>
          <template #cell(altSpellings)="row">
            {{ row.item.altSpellings.join(', ') }}
          </template>
          <template #cell(idd)="row">
            {{ getCallingCodes(row.item.idd) }}
          </template>
        </b-table>
        <div class="page">
          <b-pagination
              v-model="currentPage"
              :total-rows="totalRow"
              :per-page="pageSize"
              aria-controls="countries-table"
              class="mt-3"
          ></b-pagination>
        </div>
        <b-modal :id="infoModal.id" title="Country Detail" ok-only @hide="resetInfoModal">
          Country Name: <strong>{{ infoModal.countryName }}</strong> <br />
          Country Code 2: <strong>{{ infoModal.countryCode2 }}</strong> <br />
          Country Code 3: <strong>{{ infoModal.countryCode3 }}</strong> <br />
          Native Name: <strong>{{ infoModal.nativeName }}</strong> <br />
          Alternative Country Name: <strong>{{ infoModal.alternativeCountryName }}</strong> <br />
          Country Code: <strong>{{ infoModal.countryCode }}</strong> <br />
          Area: <strong>{{ infoModal.area }}</strong> <br />
          <p><strong>Borders:</strong></p>
          <ul>
            <li v-for="border in infoModal.borders" :key="border">{{ border }}</li>
          </ul>
          <p><strong>Capital:</strong></p>
          <ul>
            <li v-for="capital in infoModal.capital" :key="capital">{{ capital }}</li>
          </ul>
          <p><strong>Continents:</strong></p>
          <ul>
            <li v-for="continent in infoModal.continents" :key="continent">{{ continent }}</li>
          </ul>

          Flag: <b-img-lazy :src="infoModal.flag" fluid rounded width="100" height="50" alt="flag" />
          <br />
          Population: <strong>{{ infoModal.population }}</strong> <br />
        </b-modal>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: "HomeSection",
  data() {
    return {
      assetUrl: process.env.VUE_APP_ASSET_URL + "/",
      countries: [],
      searchQuery: '',
      sortOrder: 'asc',
      currentPage: 1,
      pageSize: 25,
      totalRow: null,
      showingModal: false,
      selectedCountry: null,
      fields: [ // Define fields for BootstrapVue table
        { key: 'flags', label: 'Flags' },
        { key: 'name', label: 'Country Name', sortDirection: 'desc'},
        { key: 'cca2', label: '2 character Country Code' },
        { key: 'cca3', label: '3 character Country Code' },
        { key: 'nativeName', label: 'Native Country Name' },
        { key: 'altSpellings', label: 'Alternative Country Name' },
        { key: 'idd', label: 'Country Calling Codes' }
      ],
      sortBy: 'name',
      sortDesc: false,
      sortDirection: 'asc',
      infoModal: {
        id: 'info-modal',
        title: '',
        countryName: '',
        countryCode2: '',
        countryCode3: '',
        nativeName: '',
        alternativeCountryName: '',
        countryCode: '',
        area: '',
        borders: [],
        capital: [],
        continents: [],
        flag: '',
        population: ''
      }
    };
  },

  methods: {
    async fetchCountries() {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        this.countries = response.data;
        this.totalRow = response.data.length;
        this.currentPage = 1;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    async searchCountries() {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const allCountries = response.data;
        // Filter countries based on search query
        this.countries = allCountries.filter(country =>
            country.name.official.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        this.totalRow = this.countries.length;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    getNativeOfficialName(nativeNameObj) {
      if (!nativeNameObj || typeof nativeNameObj !== 'object') {
        return 'N/A';
      }

      const firstLangKey = Object.keys(nativeNameObj)[0];
      if (firstLangKey && nativeNameObj[firstLangKey] && nativeNameObj[firstLangKey].official) {
        return nativeNameObj[firstLangKey].official;
      }

      return 'N/A';
    },

    getCallingCodes(idd) {
      return idd.root + (idd.suffixes ? idd.suffixes.join(', ') : '');
    },

    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.countryName = item.name.official
      this.infoModal.nativeName = this.getNativeOfficialName(item.name.nativeName)
      this.infoModal.countryCode2 = item.cca2
      this.infoModal.countryCode3 = item.cca3
      this.infoModal.alternativeCountryName = item.altSpellings.join(', ')
      this.infoModal.countryCode = this.getCallingCodes(item.idd)
      this.infoModal.area = item.area
      this.infoModal.borders = item.borders
      this.infoModal.capital = item.capital
      this.infoModal.continents = item.continents
      this.infoModal.flag = item.flags.png
      this.infoModal.population = item.population
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },

    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
      this.infoModal.title = '';
      this.infoModal.countryName = '';
      this.infoModal.nativeName = '';
      this.infoModal.countryCode2 = '';
      this.infoModal.countryCode3 = '';
      this.infoModal.alternativeCountryName = '';
      this.infoModal.countryCode = '';
      this.infoModal.area = '';
      this.infoModal.borders = [];
    },

  },
  computed: {
  },
  mounted() {
    this.fetchCountries();
  },
};
</script>

<style lang="scss">
@import "@core/assets/scss/swiper";
</style>
