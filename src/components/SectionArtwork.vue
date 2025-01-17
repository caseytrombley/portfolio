<template>
  <section>
    <v-container max-width="1200px" fluid class="container">
      <DrawBox :size="[100, 100]" />
      <DrawBox :size="[300, 100]" />

      <DrawBox :size="[100, 50]" />

      <DrawBox :size="[300, 100]" />
    </v-container>
  </section>
</template>

<script lang="ts">
import DrawBox from "./DrawBox.vue";

export default {
  components: {DrawBox}
}
</script>


<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

</style>

