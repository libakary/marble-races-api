<template>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="signupDetailId != 0" @close="$emit('close')">
      <template #header>
        <h3>Signup üksikasjad</h3>
      </template>
      <template #body>
        <b>Tiimi nimi: </b>{{ currentSignup.teamName }}<br/>
        <b>Võistluse nimi: </b>{{ currentSignup.competitionName }}<br/>
      </template>
    </modal>
  </Teleport>
</template>

<script>
import Modal from "./Modal.vue";
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
    data() {
        return {
            currentSignup: {
                id: 0, 
                competitionName: "", 
                teamName: "", 
            },
        };
    },
    beforeUpdate() {
        if (this.signupDetailId == 0) return;
        this.getDetails()
    },
    methods: {
        async getDetails() {
            this.currentSignup = await (
                await fetch(`${import.meta.env.VITE_API_URL}/signups/${this.signupDetailId}`)
            ).json();
            console.log(this.currentSignup);
        },
    }
}
</script>

<style>
.modal-container {
  width: 700px;
}
</style>