<template>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="competitionDetailId != 0" @close="$emit('close')">
      <template #header>
        <h3>Võistluse üksikasjad</h3>
      </template>
      <template #body>
        <b>Nimi: </b>{{ currentCompetition.competitionName }}<br/>
        <b>Kuupäev: </b>{{ currentCompetition.date }}<br/>
        <b>Raja tüüp: </b>{{ currentCompetition.trackType }}<br/>
        <b>Võistkondade arv: </b>{{ currentCompetition.numberOfTeams }}<br/>
        <b>Registreeritud Võistkonnad: </b>{{ currentCompetition.signups}}<br/>
        <b>Asukoht: </b>{{ currentCompetition.location }}<br/>
        <b>Organiseerija: </b>{{ currentCompetition.organizer }}<br/>
      </template>
    </modal>
  </Teleport>
</template>

<script>
import Modal from "./Modal.vue";
import useDateFormating from "./useDateFormating.js"
export default {
    components: {
        Modal,
    },
    props: {
        competitionDetailId: {
            type: Number,
            required: true,
        },
        signupDetailId: {
            type: Number,
            required: true,
        },
        signupTeamname: {
            type: Object,
            required: true,
        },
    },
    emits: ["close"],
    data() {
        return {
            currentCompetition: {
                id: 0, 
                competitionName: "", 
                datedate: "", 
                trackType: "", 
                numberOfTeams: 0, 
                registeredTeams: [], 
                location: "", 
                organizer: "", 
                signups: [],
            },
        };
    },
    beforeUpdate() {
        if (this.competitionDetailId == 0) return;
        this.getDetails()
    },
    methods: {
        async getDetails() {
            this.currentCompetition = await (
                await fetch(`${import.meta.env.VITE_API_URL}/competitions/${this.competitionDetailId}`)
            ).json();
            console.log(this.currentCompetition);
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }
    }
}
</script>

<style>
.modal-container {
  width: 700px;
}
</style>