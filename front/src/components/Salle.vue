<template>
        <v-card
                class="mx-auto my-12"
                max-width="374"
        >
            <v-card-title>{{nom}}</v-card-title>
            <v-img :src="linkPhoto(img)"></v-img>
            <v-card-text class="info">
                {{info}}
            </v-card-text>
            <v-btn @click="selectionner()">
                Choisir
            </v-btn>
        </v-card>
</template>

<script>
export default {
    name: 'Salle',
    props: {
        nom: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        info: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        }
    },
    methods: {
        selectionner(){
            this.$emit('selectionner', this.id)
        },
        linkPhoto (img) {
            return require(`@/assets/salles/${img}.png`)
        }
    }
}
</script>

<style scoped>

</style>
