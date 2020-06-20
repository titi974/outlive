<template>
    <v-container>
        <v-row>
            <div>
                <img alt="Vue logo" src="../assets/logo.png">
            </div>
        </v-row>
        <v-row v-if="!isCreate">
            <v-col offset="4" cols="4">
                <v-text-field
                        v-model="nombre"
                        label="Nombre de joueur"
                        outlined
                        shaped
                        :disabled="isCreate"
                ></v-text-field>
            </v-col>
            <v-col offset="5" cols="4">
                <v-btn :disabled="isCreate" color="primary" @click="initilaiser()">Initilaiser</v-btn>
            </v-col>
        </v-row>
        <v-row v-if="isCreate">
            <v-col cols="2" v-for="(joueur,index) of joueurs" :key="index">
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
        <v-row v-if="isCreate">
            <v-col offset="5" cols="4">
                <v-btn :disabled="!isCreate" color="primary" @click="creerJoueur()">Creation Joueur</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  // @ is an alias to /src
  export default {
    name: 'Home',
    data: () => ({
      nombre: 0,
      session: '',
      jeux: {}
    }),
    methods: {
      initilaiser: async function () {
        try {
          const { data } = await this.$http.post('/api/jeux', { nombre: this.nombre })
          this.session = data.numero
          const jeuxDatas = await this.$http.get(`/api/jeux/${data.numero}`)
          this.jeux = jeuxDatas.data
        } catch (e) {
          console.log(e)
        }
      },
      creerJoueur: async function (){
        await this.$http.put(`/api/jeux/${this.$route.params.id}/joueurs`, { ...this.mapper() })
        await this.$router.push({ name: 'Sessions', params: { id: this.session } })
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
      isCreate () {
        return this.session !== '' && !this.jeux.id
      },
      joueurs () {
        return this.jeux.joueurs
      }
    }
  }
</script>
<style>
    .home {
        text-align: center;
    }
</style>
