<template>
  <v-dialog
    v-bind="dialogProps"
    transition="dialog-bottom-transition"
    max-width="800px"
  >
    <v-card class="dialog-content-body">
      <v-toolbar flat color="transparent">

<!--        <v-toolbar-title class="font-weight-bold">Case Study</v-toolbar-title>-->
        <v-spacer></v-spacer>
        <v-btn icon @click="emitClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <div v-html="content" class="case-study-content"></div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { marked } from 'marked';

interface Props {
  caseStudyID: string | null;
  modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const content = ref('');

// Computed property for dialog props
const dialogProps = computed(() => ({
  modelValue: props.modelValue,
  'onUpdate:modelValue': (value: boolean) => {
    emit('update:modelValue', value);
  },
}));

watch(
  () => props.caseStudyID,
  async (newID) => {
    if (newID) {
      const markdown = await fetchMarkdown(newID);
      content.value = marked(markdown);  // Convert markdown to HTML
    }
  },
  { immediate: true }
);

const emitClose = () => {
  emit('update:modelValue', false); // Close the modal when the close button is clicked
};

const fetchMarkdown = async (id: string) => {
  try {
    const response = await fetch(`/case-studies/${id}.md`);  // Path should be relative to the public folder
    if (!response.ok) throw new Error('Error loading case study');
    const markdownText = await response.text();
    //console.log('Markdown loaded:', markdownText); // Debugging output
    return markdownText;
  } catch (error) {
    console.error(error);
    return 'Unable to load the case study.';
  }
};

</script>

<style lang="scss" scoped>
.case-study-content {
  white-space: normal;
  word-wrap: break-word;
  font-size: 1.25rem;

  ::v-deep {
    h1 {
      margin: 0 0 2rem;
    }
    h3 {
      margin: 2rem 0 1rem;
    }
    p {
      margin: 0 0 1rem;
    }
    ul {
      margin-left: 2rem;
    }
  }
}
</style>
