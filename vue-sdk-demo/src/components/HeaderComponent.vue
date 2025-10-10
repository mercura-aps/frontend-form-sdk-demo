<script setup lang="ts">
import { useAppearance, useAuth, useLocalization, useReset } from '../form-sdk';
import CurrentConfigPriceDisplay from './CurrentConfigPriceDisplay.vue';
import SaveOrUpdateDraft from './SaveOrUpdateDraft.vue';

const availableLanguages = useLocalization(state => state.availableLanguagesData.data);
const setSelectedLanguage = useLocalization(state => state.setSelectedLanguage);
const selectedLanguage = useLocalization(state => state.selectedLanguage);

const availableCountries = useLocalization(state => state.availableCountriesData.data);
const setSelectedCountry = useLocalization(state => state.setSelectedCountry);
const selectedCountry = useLocalization(state => state.selectedCountry);

const reset = useReset(state => state.reset);
const isAuth = useAuth(state => state.isAuth);
const user = useAuth(state => state.user);
const companyInformation = useAppearance(state => state.getAppearance("companyInformation"));
</script>

<template>
  <header class="sticky top-0 left-0 z-10 flex items-center justify-between bg-white py-4">
    <router-link to="/" class="text-2xl font-bold">
      Vue Form SDK
      <img :src="companyInformation.data?.companyInformationLogo" class="max-w-32" alt="Logo" />
    </router-link>
    <div class="flex items-center gap-2">
      <SaveOrUpdateDraft />
      <CurrentConfigPriceDisplay />
      <div>{{ isAuth ? user?.name : "Not logged in" }}</div>
      <button @click="reset">Reset</button>
      <select
        :value="selectedLanguage?.slug"
        @change="setSelectedLanguage(($event.target as HTMLSelectElement).value)"
      >
        <option v-for="language in availableLanguages" :key="language.id" :value="language.slug">
          {{ language.name }}
        </option>
      </select>
      <select
        :value="selectedCountry?.slug"
        @change="setSelectedCountry(($event.target as HTMLSelectElement).value)"
      >
        <option v-for="country in availableCountries" :key="country.id" :value="country.slug">
          {{ country.name }} {{ country.currency?.code }}
        </option>
      </select>
    </div>
  </header>
</template>