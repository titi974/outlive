<template>
    <div>
        <template v-for="(salle,i) of salles">
            <Salle :is-disabled="disabledSelected"
                   :key="i"
                   :id="salle.id.id"
                   :nom="salle.nom"
                   :img="salle.img"
                   :info="salle.info"
                   @selectionner="salleChoisie($event)"/>
        </template>
        <v-btn v-if="!selected" :disabled="!allSalleSelected" @click="sallesSelectionner()">
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
            selected: {
                type: Boolean,
                required: true
            }
        },
        data: () => ({
            sallesSelected: []
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
            disabledSelected() {
                return this.allSalleSelected
            }
        },
    }
</script>

<style scoped>
    .info {

    }
</style>
