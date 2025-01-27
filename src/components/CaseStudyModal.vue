<template>
  <v-dialog
    v-bind="dialogProps"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar flat>
        <v-btn icon @click="emitClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ caseStudyTitle }}</v-toolbar-title>
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

const caseStudyTitle = ref('');
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
      caseStudyTitle.value = getCaseStudyTitle(newID);
      const markdown = await fetchMarkdown(newID);
      content.value = marked(markdown);  // Convert markdown to HTML
    }
  }
);

const emitClose = () => {
  emit('update:modelValue', false);
};

const fetchMarkdown = async (id: string) => {
  try {
    const response = await fetch(`/case-studies/${id}.md`);  // Path should be relative to the public folder
    if (!response.ok) throw new Error('Error loading case study');
    const markdownText = await response.text();
    console.log('Markdown loaded:', markdownText); // Debugging output
    return markdownText;
  } catch (error) {
    console.error(error);
    return 'Unable to load the case study.';
  }
};

const getCaseStudyTitle = (id: string) => {
  const titles: Record<string, string> = {
    'classroom-competitions': 'Driving Engagement Through Interactive Classroom Competitions',
    // Add more case studies here as needed
  };
  return titles[id] || 'Case Study';
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
