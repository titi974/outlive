<template>
    <div class="home">
        <div>
            <img alt="Vue logo" src="../assets/logo.png">
        </div>
        <div>
            <v-btn color="primary" @click="creer()">Démarrez</v-btn>
            <v-text-field
                    v-model="nombre"
                    label="Nombre de joueur"
                    outlined
                    shaped
            ></v-text-field>
        </div>
    </div>
</template>

<script>
  // @ is an alias to /src
  export default {
    name: 'Home',
    data: () => ({
      nombre: 0,
      session: ''
    }),
    methods: {
      creer: async function () {
        try {
          const { data } = await this.$http.post('api/jeux', { nombre: this.nombre })
          this.session = data
          this.$router.push({ name: 'Sessions', params: { id: data } })
        } catch (e) {
          console.log(e)
        }
      }
    },
    computed: {

    }
  }
</script>
<style>
    .home {
        text-align: center;
    }
</style>
