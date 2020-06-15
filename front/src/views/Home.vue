<template>
    <div class="home">
        <div>
            <img alt="Vue logo" src="../assets/logo.png">
        </div>
        <div>
            <v-btn color="primary">Démarrez</v-btn>
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
      nombre: 0
    }),
    beforeMount: async function () {
      try{
        const r = await this.$http.post('api/jeux',{nombre:2})
        const a = await this.$http.get('api')
        console.log(r,a)
      }catch (e) {
        console.log(e)
      }


    }
  }
</script>
<style>
    .home {
        text-align: center;
    }
</style>
