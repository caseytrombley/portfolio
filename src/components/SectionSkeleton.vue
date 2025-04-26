<template>
  <v-container max-width="1200px" fluid class="container my-10">
    <div v-if="name" class="loading">
        Loading <span class="name"><v-icon>mdi-format-quote-open</v-icon>{{ name }}<v-icon>mdi-format-quote-close</v-icon></span>
    </div>
    <v-skeleton-loader type="card" class="my-8" />
  </v-container>
</template>

<script lang="ts" setup>

interface Props {
  name?: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  text-align: center;
  text-transform: capitalize;
  justify-content: center;
  align-items: center;
  gap: 5px;
  animation: flicker 2700ms infinite;
}

i {
  top: -5px;
  font-size: .9em;
  color: #666666;
}
.name {
  font-size: 1.3rem;
  font-weight: 600;

  //animation: flicker 900ms infinite;
}
</style>
