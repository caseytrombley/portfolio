
<template>
  <div class="logo-icon">
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       x="0px" y="0px" viewBox="0 0 192 223.3" style="enable-background:new 0 0 192 223.3;" xml:space="preserve">

  <!-- Outer polygons -->
  <g id="outer">
    <polygon class="top" points="97,0 0,56 29.3,74.8 97,33.3 164.7,72.4 192,56 "/>
    <polygon class="left" points="0,56 0,167.3 29.2,150.7 29.3,74.8 "/>
    <polygon class="bottom" points="0,167.3 96,223.3 192,167.3 164.7,151.7 97,190 29.2,150.7 "/>
  </g>

    <g id="outer2">
    <polygon class="top" points="97,0 0,56 29.3,74.8 97,33.3 164.7,72.4 192,56 "/>
      <polygon class="left" points="0,56 0,167.3 29.2,150.7 29.3,74.8 "/>
      <polygon class="bottom" points="0,167.3 96,223.3 192,167.3 164.7,151.7 97,190 29.2,150.7 "/>
  </g>

    <!-- Inner polygons -->
    <g id="inner">
    <polygon class="in-top" points="97,112 137.3,88 97,64.7 56,88.3 "/>
      <polygon class="in-left" points="56,135.4 96,160.1 97,112 56,88.3 "/>
      <polygon class="in-right" points="97,112 137.3,88 137.3,135 96,160.1 "/>
  </g>

    <!-- In polygons -->
    <g id="in">
    <polygon class="in st0" points="164.7,72.4 164.7,151.7 137.3,135 137.3,88 "/>
  </g>

    <!-- Right polygon -->
    <polygon class="right trans" points="164.7,72.4 192,56 192,167.3 164.7,151.7 "/>

    <!--      &lt;!&ndash; Group for the "C" &ndash;&gt;-->
    <!--      <g id="content-layer">-->
    <!--        <content x="96" y="130" content-anchor="middle" class="svg-content">-->
    <!--          C-->
    <!--        </content>-->
    <!--      </g>-->

</svg>
</div>
</template>

<style lang="scss" scoped>

$trans: transparent;
$white: #ffffff;
$green:#0d7364;
$green2: #0eaa85;
$green3: #016a5a;
$green4: #0dc499;

$fill1: #685E5A;
$fill1: #685E5A;
//$fill2: #333232;
$fill2: $white;
$fill3: #3A3634;

.trans {
  fill: transparent;
}
.white {
  fill: #ffffff;
}
.st0{fill:#685E5A;}
.st1{fill:#333232;}
.st2{fill:#3A3634;}

.logo {
  display: flex;
  overflow: visible;

  svg {
    height: 48px;
  }

  #in {
    transform: translate3d(5px, 0, 0);

    polygon {
      fill: $green3;
    }
  }

  #inner {
    transform: scale(1.8) translate3d(-43px, -51px, 0);

    polygon {
      fill: $green;

    }
  }
  #outer {
    transform: scale(0.8) translate3d(24px, 30px, 0);

    polygon {

      fill: $green2;

      //&:nth-child(1) {
      //  fill: $green2;
      //}
      //&:nth-child(2) {
      //  fill: $green2;
      //}
      //&:nth-child(3) {
      //  fill: $green2;
      //}
    }
  }

  #outer2 {
    transform: scale(0.75) translate3d(26px, 47px, 0);

    polygon {

      fill: $green4;
    }
  }


}

</style>
