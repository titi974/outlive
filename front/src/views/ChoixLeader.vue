<template>
    <v-container fluid>
        <v-row>
            Sessions: {{sessionId}}
        </v-row>
        <v-row>
            <v-col cols="6" v-for="joueur of joueurs" :key="joueur.id">
                <v-card
                        class="mx-auto"
                        max-width="400"
                >
                    <v-card-title>{{joueur.pseudo}} est {{joueur.couleur}}</v-card-title>
                    <v-card-subtitle>Choisir un Leader</v-card-subtitle>
                    <template v-for="leader of joueur.leaderAChoisir">
                        <Leader @choose="($event) => choose($event,joueur)"
                                :is-choosen="!!(joueur.leader && joueur.leader.identite===leader.identite)"
                                :photo="leader.photo"
                                :identite="leader.identite" :key="leader.identite"/>
                    </template>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col offset="4" cols="4">
                <v-btn :disabled="!nextIsActive" class="button" color="primary" @click="creationAbris">Selection finie
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Leader from '@/components/Leader'

    export default {
        components: { Leader },
        name: 'ChoixLeader',
        data: () => ({
            joueurs: {},
        }),
        beforeMount: async function() {
            const { data } = await this.$http.get(`/api/leaders/randoms/${this.$route.params.idSession}`)
            this.joueurs = data
        },
        methods: {
            async choose (identite, joueur) {
                const { data } = await this.$http.patch(`/api/joueurs/${joueur.id}/leader`, {
                    joueurId: joueur.id,
                    session: { numero: this.$route.params.idSession },
                    leader: identite,
                })
                this.joueurs.filter(joueur => joueur.id === data.id).forEach(joueur => joueur.leader = data.leader)
            },
            async creationAbris () {
                const {idSession} = this.$route.params
                await this.$http.post(`/api/abris`, {
                    session: { numero: idSession },
                    joueurs: this.joueurs.map(joueur => ({ id: joueur.id })),
                })
                await this.$router.push({ name: 'Salles', params: { idSession } })
            },
        },
        computed: {
            sessionId () {
                return this.$route.params.idSession
            },
            nextIsActive () {
                return Array.isArray(this.joueurs) ? this.joueurs.filter(joueur => !!joueur.leader).length === this.joueurs.length : false
            },
        },
    }

</script>

<style scoped>
    .button {
        text-align: center;
    }
</style>
