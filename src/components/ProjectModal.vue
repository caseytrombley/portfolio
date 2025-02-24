<template>
  <v-dialog
    v-bind="dialogProps"
    transition="dialog-bottom-transition"
    max-width="600px"
  >
    <v-card class="dialog-content-body">
      <v-toolbar flat color="transparent">
<!--        <v-toolbar-title>{{ projectData.shortTitle || "Project" }}</v-toolbar-title>-->
        <v-spacer></v-spacer>
        <v-btn icon @click="emitClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-item>
        <div class="banner">
          <h2 v-if="projectData.title">{{ projectData.title }}</h2>
          <p v-if="projectData.description">{{ projectData.description }}</p>
        </div>

        <v-img
          :src="`/designs/${projectID}.png`"
          cover
        ></v-img>

        <v-card-text>


          <div v-html="content" class="project-content"></div>

          <div class="project-links" v-if="projectData.url || projectData.gitUrl">
            <v-btn v-if="projectData.url" :href="projectData.url" target="_blank" color="primary" variant="tonal">
              Visit Site <v-icon end>mdi-open-in-new</v-icon>
            </v-btn>
            <v-btn v-if="projectData.gitUrl && projectData.gitUrl.trim()" :href="projectData.gitUrl" target="_blank" color="secondary" variant="tonal">
              View Code <v-icon end>mdi-github</v-icon>
            </v-btn>

          </div>
        </v-card-text>
      </v-card-item>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { marked } from 'marked';

interface Props {
  projectID: string | null;
  modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const content = ref('');
const projectData = ref<{ title?: string; shortTitle?: string; description?: string; url?: string; gitUrl?: string }>({});

const dialogProps = computed(() => ({
  modelValue: props.modelValue,
  'onUpdate:modelValue': (value: boolean) => {
    emit('update:modelValue', value);
  },
}));

const fetchMarkdown = async (id: string) => {
  try {
    const response = await fetch(`/projects/${id}.md`);
    if (!response.ok) throw new Error('Error loading project');
    const markdownText = await response.text();

    // Extract front matter using a more reliable regex
    const frontMatterRegex = /^---\s*\n([\s\S]+?)\n---\s*\n/;
    const match = markdownText.match(frontMatterRegex);
    let frontMatter = {};

    if (match) {
      frontMatter = match[1]
        .split("\n")
        .map(line => line.match(/^([^:]+):\s*(.*)$/))
        .filter(arr => arr)
        .reduce((acc, arr) => {
          if (arr) acc[arr[1].trim()] = arr[2].trim().replace(/^"(.*)"$/, "$1"); // Remove quotes if present
          return acc;
        }, {} as Record<string, string>);

      content.value = marked(markdownText.replace(frontMatterRegex, '').trim());
    } else {
      console.log("No front matter found");
      content.value = marked(markdownText);
    }

    projectData.value = frontMatter; // Update reactive state
  } catch (error) {
    console.error(error);
    content.value = 'Unable to load the project.';
  }
};


watch(
  () => props.projectID,
  async (newID) => {
    if (newID) {
      await fetchMarkdown(newID);
    }
  },
  { immediate: true }
);

const emitClose = () => {
  emit('update:modelValue', false);
};
</script>

<style lang="scss" scoped>
.dialog-content-body {
  max-width: 600px;
}

.banner {
  margin: 0 0 1.5rem;
  padding: 1.5rem;
  border: 9px solid #f5f5f5;
}

.project-content {
  white-space: normal;
  word-wrap: break-word;
  font-size: 1.1rem;

  ::v-deep() {
    h2 {
      margin: 0 0 1rem;
    }

    p {
      margin: 0 0 1em;
      &:last-child {
        margin: 0;
      }
    }

    ul {
      padding: 1rem;

      li {
        list-style-type: square;
        opacity: .5;
      }
    }
  }
}

.project-links {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
