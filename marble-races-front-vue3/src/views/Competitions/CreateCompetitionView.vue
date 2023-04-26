<template>
    <div class="container">
        <div v-if="error">
            <span v-for="message, index in error" :key="index">
                {{ message }}<br />
            </span>
        </div>
        <form @submit.prevent="formSubmitHandler">
        <div class="row">
            <div class="col-25">
                <label for="competitionName">Võistluse Nimi</label>
            </div>
            <div class="col-75">
                <input id="competitionName" v-model="competitionName" type="text" required/>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="date">Kuupäev</label>
            </div>
            <div class="col-75">
                <input id="date" v-model="date" type="date" required/>
            </div>
        </div>    
        <div class="row">
            <div class="col-25">
                <label for="trackType">Raja tüüp</label>
            </div>
            <div class="col-75">
                <input id="trackType" v-model="trackType" type="text" required/>
                <select v-model="trackType">
                    <option disabled value="">Vali raja tüüp</option>
                    <!--<option value="Slaalom">Slaalom</option>-->
                    <option v-for="item in trackTypes" :key="item.id" :value="item.trackType">
                        {{item.trackType}}
                    </option>
                    <!--<option value="Sprint">Sprint</option>-->
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="numberOfTeams">Võistkondade arv</label>
            </div>
            <div class="col-75">
                <input id="numberOfTeams" v-model="numberOfTeams" type="number" required/>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="registeredTeams">Registreeritud võistkonnad</label>
            </div>
            <div class="col-75">
                <textarea id="registeredTeams" v-model="registeredTeams" type="text" required></textarea>
                <!-- siia teha ka dropdown?-->
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="location">Asukoht</label>
            </div>
            <div class="col-75">
                <input id="location" v-model="location" type="text" required/>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="organizer">Organiseerija</label>
            </div>
            <div class="col-75">
                <input id="organizer" v-model="organizer" type="text" required/>
            </div>
        </div>
        <br>
        <div class="row">
            <input type="submit" value="Lisa Võistlus"/>
        </div>
        </form>
    </div>
</template>
<script>
const API_URL = "http://localhost:8090/competitions";
export default {
    data() {
        return {
            error: "",
            competitionName: "Test", 
            date: "2023-04-06", 
            trackType: "Test raja tüüp", 
            trackTypes: [],
            numberOfTeams: 0, 
            registeredTeams: "Test tiimid", 
            location: "Test asukoht", 
            organizer: "Test organiseerija", 
            signups: [],

        };
    },
    async created() {
        this.trackTypes = await (await fetch("http://localhost:8090/trackTypes")).json()
        this.trackTypes = [...new Set(this.trackTypes.map(item => item.trackType))]

    },
    methods: {
        formSubmitHandler() {
            const newCompetition = {
                competitionName: this.competitionName, 
                date: this.date,
                trackType: this.trackType,
                numberOfTeams: this.numberOfTeams,
                registeredTeams: this.registeredTeams,
                location: this.location,
                organizer: this.organizer,
                signups: this.signups,
            };
            fetch(API_URL, {
                method: "post",
                headers: {"Content-Type": "application/json" },
                body:JSON.stringify(newCompetition),
            })
            .then((response)=>response.json())
            .then((data)=>{
                if(!data.error) {
                    this.$router.push("/");
                    return;
                }
                //alert(data.error);
                this.error = data.error;
                
            })
            .catch((error)=>{
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

input[type=text],
input[type=number],
input[type=date], select, textarea {
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
  border-radius: 5px;
  background-color: #302a2a;
  padding: 20px;
  width: 130%;
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
@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}
</style>