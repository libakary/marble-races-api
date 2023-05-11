<template>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="teamDetailId !=0" @close="$emit('close')">
      <template #header>
        <h3>Tiimi üksikasjad</h3>
      </template>
      <template #body>
        <b>Nimi: </b>{{ currentTeam.teamName }}<br/>
        <b>Inimeste arv: </b>{{ currentTeam.nrOfTeammates }}<br/>
        <b>Tiimi pealik: </b>{{ currentTeam.teamLeader }}<br/>
        <b>Riik: </b>{{ currentTeam.country }}<br/>
      </template>
    </modal>
  </Teleport>
</template>


<script>
    import Modal from "./Modal.vue"
    export default {
        components: {
            Modal,
        },
        props: {
            teamDetailId: {
                type: Number,
                required: true,
            },
        },
        emits: ["close"],
        data(){
            return {
                currentTeam: {
                    id: 0, 
                    teamName:"", 
                    nrOfTeammates: 0,
                    teamLeader:"",
                    country:"",
                },
            };
        },
        beforeUpdate() {
            if (this.teamDetailId == 0) return;
            this.getDetails();
        },
        methods: {
            async getDetails () {
                this.currentTeam=await (
                    await fetch(`${import.meta.env.VITE_API_URL}/teams/${this.teamDetailId}`)
                ).json();
                console.log(this.currentTeam);
            },
        },
    };
</script>

<style>
.modal-container {
  width: 700px;
}
</style>