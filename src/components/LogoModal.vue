<template>
  <v-dialog v-model="internalModel" max-width="600px" @click:outside="close">
    <v-card>
      <v-img
        :src="logo"
        :alt="`Logo ${index + 1}`"
        contain
        height="400"
      />
      <v-card-actions class="justify-between">
        <v-btn @click="prev" :disabled="index === 0">Previous</v-btn>
        <v-btn @click="next" :disabled="index === total - 1">Next</v-btn>
        <v-spacer />
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  logo: string;
  index: number;
  total: number;
}>();

const emit = defineEmits(['update:modelValue', 'next', 'prev']);

const internalModel = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  internalModel.value = val;
});

watch(internalModel, (val) => {
  emit('update:modelValue', val);
});

const close = () => {
  internalModel.value = false;
};

const next = () => emit('next');
const prev = () => emit('prev');
</script>
