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
                    <v-template v-for="leader of joueur.leaderAChoisir" :key="leader.identite">
                        <Leader :photo="leader.photo" :identite="leader.identite"/>
                    </v-template>
                    <v-card-actions>
                        <v-btn @click="choose(joueur,1)">{{leaderIdentity(joueur,1)}}</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn @click="choose(joueur,2)">{{leaderIdentity(joueur,2)}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
        </v-row>
    </v-container>
</template>

<script>
  import Leader from '@/components/Leader'

  export default {
    components: { Leader },
    name: 'Session',
    data: () => ({
      joueurs: {}
    }),
    beforeMount: async function () {
      const { data } = await this.$http.get(`/api/leaders/randoms/${this.$route.params.id}`)
      this.joueurs = data
    },
    methods: {
      async choose(leader, i){
        console.log(leader, i)
      },
      leaderIdentity(leader, i){
        return leader.leaderAChoisir[i-1].identite
      }
    },
    computed: {
      sessionId () {
        return this.$route.params.id
      }
    }
  }

</script>

<style scoped>

</style>
