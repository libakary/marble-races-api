<template>
    <div class="container">
        <div v-if="error">
            <span v-for="message,index in error" :key="index">
            {{ message }}<br/>
            </span>
        </div>
        <form @submit.prevent="formSubmitHandler">
            <div class="row">
                <div class="col-25">
                    <label for="team">Team</label>
                </div>
                <div class="col-75">
                 
                    <select v-model="teamId">
                        <option disabled value="">Vali tiim</option>
                        <option v-for="team,index in teams" :key="index" :value="team.id">
                            {{team.teamName}}
                        </option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label for="competition">Competition</label>
                </div>
                <div class="col-75">
                   
                    <select v-model="competitionId">
                        <option disabled value="">Vali võistlus</option>
                        <option v-for="competition,index in competitions" :key="index" :value="competition.id">
                            {{competition.competitionName}}
                        </option>
                    </select>
                </div>
            </div>

            <div class="row">
                <input type="submit" value="Lisa singup" />
            </div>
            
        </form>
    </div>
</template>

<script>
const API_URL =import.meta.env.VITE_API_URL+"/signups";
export default {
    data() {
        return {
            error:"",
            teams: [],
            competitions: [],
            teamId: 0,
            competitionId: 0,  
        };
    },
    async created() {
        this.teams = await(await fetch(import.meta.env.VITE_API_URL+"/teams")).json()        
        this.competitions = await(await fetch(import.meta.env.VITE_API_URL+"/competitions")).json()        
    },
    methods: {
        formSubmitHandler (){
            const newSignUp = {
                teamId: this.teamId,
                competitionId: this.competitionId,
            };
            fetch(API_URL,{
                method:"post",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(newSignUp),
            })
            //.then(this.checkResponseStatus)
            .then((response)=>response.json())
            .then((data)=>{
                if (!data.error) {
                    this.$router.push("/signups");
                    return;
                }
                //alert(data.error);
                this.error = data.error
            })
            .catch((error) => {
                console.log(error);
            });
            //console.log(event);
            //alert("Registreeritud!")
        },
        /* async checkResponseStatus(response){
            if(response.ok) return response;
            throw new Error(
                `${response.status} ${response.statusText} ${await response.text()}`
            ); */
        //},
    },
}
</script>

<style>
* {
  box-sizing: border-box;
}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

input[type=number], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input[type=submit] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

input[type=submit]:hover {
    background-color: #45a049;
}

.container {
  border-radius: 4px;
  background-color: #60a655;
  padding: 20px;
  width: 600px;
  height: 200px;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row::after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 1000px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}
</style>