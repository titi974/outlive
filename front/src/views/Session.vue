<template>
    <v-container>
        <v-row>
            Sessions: {{sessionId}}
        </v-row>
        <v-row>
            <v-col cols="2" v-for="joueur in lesJoueurs" :key="joueur.id">
                <v-card>
                    <v-card-title>{{joueur.couleur}}</v-card-title>
                    <v-card-text>
                        <v-text-field
                                v-model="joueur.pseudo"
                                label="pseudo"
                                outlined
                                shaped
                        ></v-text-field>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-btn color="success" @click="sauvegarderPseudo()">Envoyer</v-btn>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    name: 'Session',
    data: () => ({
      jeux: ''
    }),
    beforeMount: async function () {
      const { data } = await this.$http.get(`/api/jeux/${this.$route.params.id}`)
      this.jeux = data
    },
    methods: {
      async sauvegarderPseudo () {
        await this.$http.put(`/api/jeux/${this.$route.params.id}/joueurs`, { ...this.mapper() })
      },
      mapper () {
        const { session, joueurs } = this.jeux
        return {
          session,
          joueurs
        }
      }
    },
    computed: {
      sessionId () {
        return this.jeux?.session?.numero || this.$route.params.id
      },
      lesJoueurs () {
        return this.jeux.joueurs
      }
    }
  }
  // {
  // "session": {
  //   "numero": "c953bb2b-a85a-4de0-941f-62973758c1a4"
  // },
  // "nombreJoueur": 2,
  //   "dateDebut": "Tue Jun 16 2020",
  //   "joueurs": [
  //   {
  //     "id": "6a866fd0-d093-4ecf-ac36-cc5b9ba9cb18",
  //     "couleur": "VERT"
  //   },
  //   {
  //     "id": "8ffa2f67-8ea3-4b62-896e-a8cba01565b8",
  //     "couleur": "BLEU"
  //   }
  // ]

</script>

<style scoped>

</style>
