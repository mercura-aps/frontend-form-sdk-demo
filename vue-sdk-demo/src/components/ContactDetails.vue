<script setup lang="ts">
import { useContactDetails } from '../form-sdk';

const requestFields = useContactDetails(state => state.requestFieldsData.data);
const setSubFieldValue = useContactDetails(state => state.setSubFieldValue);
const requestFieldsValues = useContactDetails(state => state.requestFieldsValues);
const requestFieldsErrors = useContactDetails(state => state.requestFieldsErrors);
const fixedContactDetails = useContactDetails(state => state.fixedContactDetails);
const setFixedContactDetailsValue = useContactDetails(state => state.setFixedContactDetailsValue);
</script>

<template>
  <div class="space-y-6 p-4">
    <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <h3 class="mb-4 border-b border-gray-100 pb-2 text-lg font-semibold text-gray-900">
        Fixed Contact Details
      </h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <label v-for="fixedContactDetail in fixedContactDetails" :key="fixedContactDetail.id" class="space-y-2">
          <div class="block text-sm font-medium text-gray-700">
            {{ fixedContactDetail.id }} <span class="text-red-500">*</span>
          </div>
          <input
            type="text"
            :value="fixedContactDetail.value ?? ''"
            @input="setFixedContactDetailsValue({
              id: fixedContactDetail.id,
              value: ($event.target as HTMLInputElement).value
            })"
            class="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            :placeholder="`Enter ${fixedContactDetail.id.toLowerCase()}`"
          />
          <div v-if="fixedContactDetail.error" class="text-red-500">
            <span v-if="fixedContactDetail.error === 'invalid-email'">Invalid email</span>
            <span v-if="fixedContactDetail.error === 'missing'">Required</span>
          </div>
        </label>
      </div>
    </div>
    <div
      v-for="field in requestFields"
      :key="field.id"
      class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <h3 class="mb-4 border-b border-gray-100 pb-2 text-lg font-semibold text-gray-900">
        {{ field.name }}
      </h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <label v-for="subField in field.fields" :key="field.id + '-' + subField.id" class="space-y-2">
          <div class="block text-sm font-medium text-gray-700">
            {{ subField.name }}
            <span v-if="subField.required" class="text-red-500">*</span>
          </div>
          <input
            :type="subField.type"
            :checked="subField.type === 'checkbox' ? requestFieldsValues[field.id]?.[subField.id] === 'true' : false"
            :value="requestFieldsValues[field.id]?.[subField.id] ?? ''"
            @input="setSubFieldValue({
              requestFieldId: field.id,
              requestSubFieldId: subField.id,
              value: subField.type === 'checkbox' 
                ? String(($event.target as HTMLInputElement).checked) 
                : ($event.target as HTMLInputElement).value
            })"
            class="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            :placeholder="`Enter ${subField.name.toLowerCase()}`"
          />
          <div v-if="requestFieldsErrors[field.id]?.[subField.id]" class="text-red-500">
            <span v-if="requestFieldsErrors[field.id]?.[subField.id] === 'invalid-number'">Invalid number</span>
            <span v-if="requestFieldsErrors[field.id]?.[subField.id] === 'unchecked-checkbox'">Unchecked checkbox</span>
            <span v-if="requestFieldsErrors[field.id]?.[subField.id] === 'missing'">Required</span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
