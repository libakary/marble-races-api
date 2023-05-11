<template>
    <div>
      <router-link to="/addSignUp">Registreeri signup</router-link><br/>
      <table2-template 
        caption="Kõik signupid" 
        :items="signups" 
        :showControls="true" 
        @delete="signupToDelete = $event"
        >
  
      </table2-template>
    </div>
    
<!--kõik töötab aga kui ma uncomment'in selle siis tekkib igaveseks pop-up mida ei saa kinni panna-->

    <!--<signup-details
      :signupDetailId="signupDetailId" 
      @close="signupDetailId = 0"
    ></signup-details>-->
    <modal :show="JSON.stringify(signupToDelete) !== '{}'">
      <template #header>
        <h3>Signupi kustutamine</h3>
      </template>
      <template #body>
      <p>u sure about that?</p>
      </template>
      <template #footer>
      <button class="modal-default-button" @click="deleteSignup()">Jah</button>
      <button class="modal-default-button" @click="signupToDelete = {}">Ei</button>
      
      </template>
    </modal>
   <!-- <Teleport to="body">
      <modal :show="signupDetailId !=0" @close="signupDetailId = 0">
        <template #header>
          <h3>Signupi üksikasjad</h3>
        </template>
        <template #body>
        <b>Tiimi id: </b>{{ currentSignup.teamId }}<br/>
        <b>Võistluse id: </b>{{ currentSignup.competitionId }}<br/>
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
  import Table2Template from "../../components/Table2.vue";
  //import SignupDetails from "../../components/SignupDetails.vue";
  import Modal from "../../components/Modal.vue";
  import { RouterLink } from "vue-router";
  
  export default {
    components: {
      Table2Template,
      //SignupDetails, 
      RouterLink,
      Modal,
    },
    data() {
      return {
        signups: [],
        signUpsId: 0,
        signupToDelete: {},
      };
    },
    async created() {
      
      this.signups=await (await fetch(import.meta.env.VITE_API_URL+"/signups")).json();
    },
    methods: {
      async deleteSignup() {
        fetch(import.meta.env.VITE_API_URL+"/signups/"+ this.signupToDelete.id, {
          method: "delete",
        }).then(async (response) => {
          if (response.status == 204) {
            console.log("DELETED");
            this.signups.splice(this.signups.indexOf(this.signupToDelete), 1);
            this.signupToDelete = {};
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
  