<template>
    <div @click="choose()" class="leader">
        <v-img :alt="photo" :src="linkPhoto" aspect-ratio="1.43" contain height="280">
            <v-icon v-if="isChoosen" x-large color="success">mdi-check-decagram</v-icon>
        </v-img>
    </div>
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
      },
      isChoosen: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      choose () {
        this.$emit('choose', this.identite)
      }
    },
    computed: {
      linkPhoto () {
        return require(`@/assets/leaders/${this.photo}.jpg`)
      }
    }
  }
</script>

<style scoped>
    .leader {
        cursor: pointer;
    }

    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: .5;
        position: absolute;
        width: 100%;
    }
</style>
