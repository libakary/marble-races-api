<template>
    <div>
      <router-link to="/addCompetition">Lisa uus võistlus</router-link><br/>
      <table-template
        caption="Kõik võistlused" 
        :items="competitions" 
        :showControls="true" 
        @show="competitionDetailId = $event.id"
        @delete="competitionToDelete = $event"
      >
    
      </table-template>
    </div>
    <competition-details 
      :competitionDetailId="competitionDetailId"
      @close="competitionDetailId = 0"
    ></competition-details>
    <modal :show="JSON.stringify(competitionToDelete) !== '{}'">
      <template #header>
        <h3>Võistluse Kustutamine</h3>
      </template>
      <template #body>
        <p>Oled kindel, et soovid kustutada seda mängu?</p>
      </template>
      <template #footer>
        <button class="modal-default-button" @click="deleteCompetition()">Jah</button>
        <button class="modal-default-button" @click="competitionToDelete = {}">Ei</button>
      </template>
    </modal>

  </template>
  
  <script>
    import TableTemplate from '../../components/Table.vue';
    import CompetitionDetails from "../../components/CompetitionDetails.vue";
    import SignupDetails from "../../components/SignupDetails.vue";
    import Modal from "../../components/Modal.vue";
    import { RouterLink } from 'vue-router';
    
    export default {
      components: {
        TableTemplate,
        CompetitionDetails,
        SignupDetails,
        RouterLink,
        Modal,
      },
      data() {
        return {
          competitions: [],
          competitionDetailId: 0,
          competitionToDelete: {},
          
        };
      },
      async created() { 
        this.competitions = await (await fetch(import.meta.env.VITE_API_URL+"/competitions")).json();
      },
      methods: {
      async deleteCompetition() {
        fetch(import.meta.env.VITE_API_URL+"/competitions/"+ this.competitionToDelete.id, {
          method: "delete",
        }).then(async (response) => {
          if (response.status == 204) {
            console.log("DELETED");
            this.competitions.splice(this.competitions.indexOf(this.competitionToDelete), 1);
            this.competitionToDelete = {};
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
  