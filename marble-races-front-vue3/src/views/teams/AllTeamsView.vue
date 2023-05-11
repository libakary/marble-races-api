<template>
    <div>
      <router-link to="/addTeam">Registreeri tiim</router-link>
      <router-link to="/addSignUp">Registreeri signup</router-link>
      <table-template 
        caption="Kõik tiimid" 
        :items="teams" 
        :showControls="true" 
        @show="teamDetailId=$event.id"
        @delete="teamToDelete = $event"
        >
  
      </table-template>
    </div>

    <team-details
      :teamDetailId="teamDetailId" 
      @close="teamDetailId = 0"
    ></team-details>
    <modal :show="JSON.stringify(teamToDelete) !== '{}'">
      <template #header>
        <h3>Tiimi kustutamine</h3>
      </template>
      <template #body>
      <p>u sure about that?</p>
      </template>
      <template #footer>
      <button class="modal-default-button" @click="deleteTeam()">Jah</button>
      <button class="modal-default-button" @click="teamToDelete = {}">Ei</button>
      </template>
    </modal>
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
  import TableTemplate from "../../components/Table.vue";
  import TeamDetails from "../../components/TeamDetails.vue";
  import Modal from "../../components/Modal.vue";
  import { RouterLink } from "vue-router";
  
  export default {
    components: {
      TableTemplate,
      TeamDetails,
      RouterLink,
      Modal,
    },
    data() {
      return {
        teams: [],
        teamDetailId: 0,
        teamToDelete: {},
      };
    },
    async created() {
      
      this.teams=await (await fetch(import.meta.env.VITE_API_URL+"/teams")).json();
    },
    methods: {
      async deleteTeam() {
        fetch(import.meta.env.VITE_API_URL+"/teams/"+ this.teamToDelete.id, {
          method: "delete",
        }).then(async (response) => {
          if (response.status == 204) {
            console.log("DELETED");
            this.teams.splice(this.teams.indexOf(this.teamToDelete), 1);
            this.teamToDelete = {};
          } else {
            console.log("RESPONSE:", response);
            const data = await response.json();
            console.log("DELETE: ",data);
          }
        });
      },
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
  