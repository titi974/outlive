<template>
    <div>
        <template v-for="(salle,i) of salles">
            <Salle :key="i" :id="salle.id.id" :nom="salle.nom" :img="salle.img" :info="salle.info"
                   @selectionner="salleChoisie($event)"/>
        </template>
        <v-btn :disabled="!allSalleSelected" @click="sallesSelectionner()">
            Envoyer la selection
        </v-btn>
    </div>
</template>

<script>
    import Salle from '@/components/Salle'

    export default {
        name: 'ListSallesByJoueur',
        components: { Salle },
        props: {
            joueur: {
                type: Object,
                required: true,
            },
            salles: {
                type: Array,
                required: true,
            },
        },
        data: () => ({
            sallesSelected: [],
        }),
        methods: {
            salleChoisie (id) {
                const index = this.sallesSelected.findIndex(salle => salle.id === id)
                if (index > -1) {
                    this.sallesSelected.splice(index, 1)
                } else {
                    this.sallesSelected.push(id)
                }
            },
            sallesSelectionner () {
                if (this.allSalleSelected) {
                    this.$emit('salleSelectionne', { joueurId: this.joueur.id, salles: this.sallesSelected })
                }
            },
        },
        computed: {
            allSalleSelected () {
                return this.sallesSelected.length === 4
            },
        },
    }
</script>

<style scoped>
    .info {

    }
</style>
<!--<v-list flat-->
<!--        :three-line="true">-->
<!--    <v-subheader>Salles</v-subheader>-->
<!--    <v-list-item-group color="primary">-->
<!--        <v-list-item-->
<!--                v-for="(salle,i) of salles"-->
<!--                :key="i"-->
<!--        >-->
<!--            <v-list-item-avatar >-->
<!--                <v-img :src="linkPhoto(salle.img)"></v-img>-->
<!--            </v-list-item-avatar>-->
<!--            <v-list-item-content>-->
<!--                <v-list-item-title v-html="salle.nom"></v-list-item-title>-->
<!--                <v-list-item-subtitle v-html="salle.info" ></v-list-item-subtitle>-->
<!--            </v-list-item-content>-->
<!--        </v-list-item>-->
<!--    </v-list-item-group>-->
<!--</v-list>-->
