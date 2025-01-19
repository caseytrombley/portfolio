<template>
  <section>
    <v-container max-width="1200px" fluid class="container">
      <div class="scene">
<!--        <DrawBox :size="[300, 400]" />-->
        <DrawSomething />
<!--        <div class="layer layer1">-->
<!--          <DrawBox :size="[300, 400]" />-->

<!--          <div class="layer layer2">-->
<!--            <DrawBox :size="[270, 50]" />-->
<!--          </div>-->

<!--          <div class="layer layer3">-->
<!--            <DrawBox :size="[270, 80]" />-->
<!--          </div>-->
<!--        </div>-->

      </div>
    </v-container>
  </section>
</template>

<script lang="ts">
import DrawBox from "./DrawBox.vue";
import DrawSomething from "./DrawSomething.vue";

export default {
  components: {DrawSomething, DrawBox}
}
</script>


<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.scene {
  transform: rotate(-10deg);
}
.layer {
  position: absolute;
}
.layer1 {
  top: 0;

  .layer2 {
    top: 20px;
    left: 15px;
  }
  .layer3 {
    top: 40px;
    left: 15px;
  }
}
</style>

