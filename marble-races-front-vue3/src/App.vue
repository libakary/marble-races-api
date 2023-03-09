<template>
  <div>

    <table-template 
      caption="Kõik tiimid" 
      :items="teams" 
      :showControls="true" 
      @show="teamDeatilId=$event">

    </table-template>
  </div>
  <team-details :teamDeatilId="teamDetailId" 
  @close="teamDetailId = 0"></team-details>
  <!-- <Teleport to="body">
    -use the modal component, pass in the prop-
    <modal :show="teamDetailId !=0" @close="teamDetailId = 0">
      <template #header>
        <h3>Tiimi üksikasjad</h3>
      </template>
      <template #body>
      <b>Nimi: </b>{{ currentTeam.teamName }}<br/>
      <b>Inimeste arv: </b>{{ currentTeam.nrOfTeammates }}<br/>
      <b>Tiimi pealik: </b>{{ currentTeam.teamLeader }}<br/>
      <b>Maa: </b>{{ currentTeam.country }}<br/>
      </template>
      <template #footer>
        <button
              class="modal-default-button"
              @click="$emit('close')"
            >OK</button>
      </template>
    </modal>
  </Teleport> -->
</template>

<script>
//import Modal from './components/Modal.vue'
import TableTemplate from "./components/Table.vue";
import TeamDetails from "./components/TeamDetails.vue";

export default {
  components: {
    //Modal,
    TableTemplate,
    TeamDetails,
  },
  data() {
    return {
      teams:[],
      teamDetailId: 0,
    };
  },
  async created() {
    this.teams=await (await fetch("http://localhost:8090/teams")).json();
  },
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
