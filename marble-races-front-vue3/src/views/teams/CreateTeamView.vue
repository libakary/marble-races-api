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
                    <label for="teamName">Tiimi nimi</label>
                </div>
                <div class="col-75">
                    <input id="teamName" type="text" v-model="teamName" />
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label for="nrOfTeammates">Inimeste arv</label>
                </div>
                <div class="col-75">
                    <input id="nrOfTeammates" type="number" v-model="nrOfTeammates" />
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label for="teamLeader">Tiimi pealik</label>
                </div>
                <div class="col-75">
                    <input id="teamLeader" type="text" v-model="teamLeader" />
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label for="country">Riik</label>
                </div>
                <div class="col-75">
                    <input id="country" type="text" v-model="country" required />
                    <select v-model="country">
                        <option disabled value="">Vali riik</option>
                        <option v-for="country,index in countries" :key="index" :value="country">
                            {{country}}
                        </option>
                    </select>
                </div>
            </div>

            <div class="row">
                <input type="submit" value="Lisa tiim" />
            </div>
            
        </form>
    </div>
</template>

<script>
const API_URL =import.meta.env.VITE_API_URL+"/teams";
export default {
    data() {
        return {
            error:"",
            teamName: "",
            nrOfTeammates: 0,
            teamLeader: "",
            country: "",
            countries: [],
        }
    },
    async created() {
        this.countries = await(await fetch(import.meta.env.VITE_API_URL+"/countries")).json()        
    },
    methods: {
        formSubmitHandler (){
            const newTeam = {
                teamName:this.teamName,
                nrOfTeammates:this.nrOfTeammates,
                teamLeader:this.teamLeader,
                country:this.country,
            };
            fetch(API_URL,{
                method:"post",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(newTeam),
            })
            //.then(this.checkResponseStatus)
            .then((response)=>response.json())
            .then((data)=>{
                if (!data.error) {
                    this.$router.push("/");
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
  background-color: #4f4f4f;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

input[type=submit]:hover {
  background-color: #000000;
}

.container {
  border-radius: 4px;
  background-color: #f2f2f2;
  padding: 60px;
  width: 600px;
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