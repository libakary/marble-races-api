<template>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="signupDetailId !=0" @close="$emit('close')">
      <template #header>
        <h3>Signupi üksikasjad</h3>
      </template>
      <template #body>
        <b>Tiimi id: </b>{{ currentSignup.teamId }}<br/>
        <b>Võistluse id: </b>{{ currentSignup.competitionId }}<br/>
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
            signupDetailId: {
                type: Number,
                required: true,
            },
        },
        emits: ["close"],
        data(){
            return {
                currentSignup: {
                    id: 0, 
                    teamId:0, 
                    competitionId: 0,
                },
            };
        },
        beforeUpdate() {
            if (this.signupDetailId == 0) return;
            this.getDetails();
        },
        methods: {
            async getDetails () {
                this.currentSignup=await (
                    await fetch(`${import.meta.env.VITE_API_URL}/signups/${this.signupDetailId}`)
                ).json();
                console.log(this.currentSignup);
            },
        },
    };
</script>

<style>
.modal-container {
  width: 700px;
}
</style>