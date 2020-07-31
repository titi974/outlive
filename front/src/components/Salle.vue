<template>
        <v-card
                class="mx-auto my-12"
                max-width="374"
                @click="selectionner()"
                :disabled="isDisabled"
        >
            <v-card-title>{{nom}}</v-card-title>
            <v-img :src="linkPhoto(img)">
                <v-icon v-if="isChoosen" x-large color="success">mdi-check-decagram</v-icon>
            </v-img>
            <v-card-text class="info">
                {{info}}
            </v-card-text>
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
        },
        isDisabled: {
            type: Boolean,
            required: true
        }
    },
    data: () => ({
        isChoosen: false
    }),
    methods: {
        selectionner(){
            this.$emit('selectionner', this.id)
            this.isChoosen = true
        },
        linkPhoto (img) {
            return require(`@/assets/salles/${img}.png`)
        }
    }
}
</script>

<style scoped>

</style>
