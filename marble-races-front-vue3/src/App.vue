<template>
  <div>
  <table-template
  caption="Kõik võistlused" 
  :items="competitions" 
  :showControls="true" 
  @show="competitionDetailId = $event.id">
  
  </table-template>
    <!-- <table border="1">
      <caption>
        Kõik võistlused
      </caption>
      <tr>
        <th>Nimi</th>
      </tr>
      <tr v-for="competition in competitions" :key="competition.id">
        <td>{{ competition.competitionName }}</td>
        <td><button @click="$event=> competitionDetailId = competition.id">Kuva Detailid</button></td>
      </tr>
    </table> -->
  </div>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="competitionDetailId != 0" @close="competitionDetailId = 0">
      <template #header>
        <h3>Võistluse üksikasjad</h3>
      </template>
      <template #body>
        <b>Nimi: </b>{{ currentCompetition.competitionName }}<br/>
        <b>Kuupäev: </b>{{ currentCompetition.date }}<br/>
        <b>Raja tüüp: </b>{{ currentCompetition.trackType }}<br/>
        <b>Võistkondade arv: </b>{{ currentCompetition.numberOfTeams }}<br/>
        <b>Registreeritud Võistkonnad: </b>{{ currentCompetition.registeredTeams }}<br/>
        <b>Asukoht: </b>{{ currentCompetition.location }}<br/>
        <b>Organiseerija: </b>{{ currentCompetition.organizer }}<br/>
      </template>
    </modal>
  </Teleport>
</template>

<script>
  import Modal from './components/Modal.vue';
  import TableTemplate from './components/Table.vue';

  export default {
    components: {
      Modal,
      TableTemplate,
    },
    data() {
      return {
        competitions: [
          
        ],
        competitionDetailId: 0,
        currentCompetition: {
          id: 0, 
          competitionName: "", 
          datedate: "", 
          trackType: "", 
          numberOfTeams: 0, 
          registeredTeams: "", 
          location: "", 
          organizer: "", 
          signups: [],
        },
      };
    },
    async created() {
      this.competitions = await (await fetch("http://localhost:8090/competitions")).json();
    },
    watch: {
      async competitionDetailId(newId) {
        if (newId == 0) return;
        this.currentCompetition = await (
          await fetch(`http://localhost:8090/competitions/${newId}`)
        ).json();
      },
    }
  };
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
