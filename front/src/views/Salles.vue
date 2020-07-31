<template>
    <div>
        <div>Salles</div>
        <v-container>
            <v-row>
                <template v-for="association in joueursAvecSalles">
                    <v-col cols="4" :key="association.joueur.id">
                        {{association.joueur.pseudo}}
                        <list-salles-by-joueur
                                :joueur="association.joueur"
                                :salles="association.salles"
                                :selected="association.isSelected"
                                @salleSelectionne="selectSalles($event)"/>
                    </v-col>
                </template>
            </v-row>
            <v-row v-if="allSelected">
                <v-col cols="4" offset="4">
                    <v-btn class="success" @click="demarrer()">Demarrer</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import ListSallesByJoueur from '@/components/ListSallesByJoueur'

    export default {
        name: 'Salles',
        components: { ListSallesByJoueur },
        data: () => ({
            joueursAvecSalles: []
        }),
        beforeMount: async function() {
            const resRandomsSalles = await this.$http.get(`/api/salles/randoms/${this.$route.params.idSession}`)
            const resJoueurs = await this.$http.get(`/api/joueurs?ids=${resRandomsSalles.data.map(js => js.joueurId)}`)
            this.joueursAvecSalles = resRandomsSalles.data.map(random => {
                const { id: { id }, couleur } = resJoueurs.data.filter(joueur => joueur.id.id === random.joueurId)[0]
                return {
                    joueur: { id, couleur },
                    salles: random.salles,
                    isSelected: false
                }
            })
        },
        methods: {
            async selectSalles ({ joueurId, salles }) {
                await this.$http.post(`/api/jeux/${this.$route.params.idSession}/salles`, { joueurId, salles })
                this.joueursAvecSalles.find(ele => ele.joueur.id === joueurId).isSelected = true
            },
            async demarrer() {

            }
        },
        computed: {
            allSelected(){
                const selected = this.joueursAvecSalles.filter(ele => ele.isSelected)
                return selected.length === this.joueursAvecSalles.length
            }
        }
    }
</script>

<style scoped>

</style>
