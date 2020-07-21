<template>
    <div>
        <div>Salles</div>
        <v-container>
            <v-row>
                <template v-for="association in joueursAvecSalles">
                    <v-col cols="4" :key="association.joueur.id">
                        {{association.joueur.pseudo}}
                        <list-salles-by-joueur :joueur="association.joueur" :salles="association.salles"
                                               @salleSelectionne="selectSalles($event)"/>
                    </v-col>
                </template>
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
            joueursAvecSalles: [],
        }),
        beforeMount: async function() {
            const resRandomsSalles = await this.$http.get(`/api/salles/randoms/${this.$route.params.idSession}`)
            const resJoueurs = await this.$http.get(`/api/joueurs?ids=${resRandomsSalles.data.map(js => js.joueurId)}`)
            this.joueursAvecSalles = resRandomsSalles.data.map(random => {
                const { id: { id }, couleur } = resJoueurs.data.filter(joueur => joueur.id.id === random.joueurId)[0]
                return {
                    joueur: { id, couleur },
                    salles: random.salles,
                }
            })
        },
        methods: {
            async selectSalles ({ joueurId, salles }) {
                await this.$http.post(`/api/jeux/${this.$route.params.idSession}/salles`, { joueurId, salles })
            },
        },
    }
</script>

<style scoped>

</style>
