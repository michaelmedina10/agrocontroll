<template>
  <v-container fluid>
    <v-row class="py-2"> </v-row>
    <v-row class="mx-1">
      <v-carousel cycle>
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
        </v-carousel-item>
      </v-carousel>
    </v-row>
    <v-row>
      <v-container>
        <h1 class="white--text text-h1 my-2" align="center">Pesticidas</h1>
        <v-row v-for="(p, i) in 5" :key="i">
          <v-col cols="12">
            <p class="white--text text-body-1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est esse
              exercitationem, quasi commodi adipisci architecto possimus
              consectetur voluptas excepturi porro nulla nihil quia harum
              debitis iste reprehenderit doloribus expedita dolor! Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Ut blanditiis cumque
              veritatis, magnam, aperiam alias omnis autem veniam atque
              provident odio quis illum repudiandae molestias sed minima quia
              tempora. Neque. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Dolores corrupti temporibus assumenda minima reiciendis
              exercitationem illo praesentium porro dolor consectetur harum
              minus pariatur non fuga cupiditate esse velit, quae ratione. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nulla quis
              laudantium quas. Facere, aspernatur est excepturi, reprehenderit
              aperiam tempora odio ipsam officiis porro alias, temporibus culpa
              voluptatum quas ut corporis.
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <v-img height="200" :src="items[0].src"></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-img height="200" :src="items[3].src"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
};
</script>

<style></style>
