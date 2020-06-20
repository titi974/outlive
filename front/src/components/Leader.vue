<template>
    <v-img :alt="photo" :src="linkPhoto" aspect-ratio="1.43" contain height="280"></v-img>
</template>

<script>
  export default {
    name: 'Leader',
    props: {
      photo: {
        type: String,
        required: true
      },
      identite: {
        type: String,
        required: true
      }
    },
    computed: {
      linkPhoto () {
        return require(`@/assets/${this.photo}.jpg`)
      }
    }
  }
</script>

<style scoped>
    .leader {
        width: 650px;
        height: 350px;
    }
</style>
