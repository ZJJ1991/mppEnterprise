<template>
   <div id="sponsors">
      <meta http-equiv="Access-Control-Allow-Origin" content="http://localhost:8669" />
      <v-app light>
        <meta http-equiv="Access-Control-Allow-Origin" content="http://localhost:8669" />
         <v-toolbar class="white">
            <v-btn icon class="hidden-xs-only" v-on:click="MainPage()">
               <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>Back</v-toolbar-title>
         </v-toolbar>
         <v-content>
            <section>
               <v-parallax :src="require('@/assets/section.jpg')" height="380">
                  <v-layout
                     column
                     align-center
                     justify-center
                     class="white--text">
                     <img src="~assets/logo.png" alt="Vuetify.js" height="200">
                     <br/><br/>
                     <h1 class="white--text mb-2 display-1 text-xs-center">{{ title }}</h1>
                     <div class="subheading mb-3 text-xs-center">Powered by VeChain Foundation</div>
                  </v-layout>
               </v-parallax>
            </section>
            <section>
               <v-data-table
                  :headers="sponsor_headers"
                  :items="sponsors"
                  hide-actions
                  class="elevation-1">
                  <template slot="items" slot-scope="props">
                     <!-- Note that the reason to use <template> here is because we want to have the full size table. -->
                     <td class="text-xs-center">{{ props.item.address }}</td>
                     <td class="text-xs-center">{{ props.item.bal }}</td>
                     <td class="text-xs-center">{{ props.item.creditPlan }}</td>
                     <div class="text-xs-center">
                     <v-btn
                        color="grey" primary
                        @click="snackbar = true"
                        v-on:click="selectSponsor(props.item.address)"
                     >
                        Select
                      </v-btn>
                     </div>
                  </template>
               </v-data-table>
            </section>
            <section>
               <v-card class="text-xs-center">
                  <p class="text-md-center">Current Sponsor Address:  {{ currentSponsor }}</p>
                  <p class="text-md-center">Current Master Address:  {{ currentMaster }}</p>
                  <p class="text-sm-center">Credit Plan----Credit: {{ creditPlan.credit }}  Recovery Rate: {{ creditPlan.recoveryRate }}</p>
                  <v-container grid-list-md text-xs-center>
                    <v-layout column>
                        <v-layout row>
                            <v-flex xs12>
                            <v-text-field
                                v-model="addSponsorAdd"
                                label="Sponsor Address"
                                type="text"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                            <v-btn
                                block
                                color="primary"
                                dark
                                @click="snackbar = true"
                                v-on:click="isSponsor(addSponsorAdd)"
                                >
                                Sponsor
                            </v-btn>
                            </v-flex>
                            <v-flex xs12>
                            <v-text-field
                                v-model="checkInAdd"
                                label="Valid Sponsor Address Not Included In This System Yet"
                                type="text"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                            <v-btn
                                block
                                color="primary"
                                dark
                                @click="snackbar = true"
                                v-on:click="isSponsor(checkInAdd)"
                                >
                                Check In
                            </v-btn>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                            <v-text-field
                                v-model="addUserAdd"
                                label="User Address"
                                type="text"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                            <v-btn
                                block
                                color="primary"
                                dark
                                v-on:click="addUser(addUserAdd)"
                                >
                                Add
                            </v-btn>
                            </v-flex>
                            <v-flex xs12>
                            <v-text-field
                                v-model="rmUserAdd"
                                label="User Address"
                                type="text"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                            <v-btn
                                block
                                color="primary"
                                dark
                                v-on:click="removeUser(rmUserAdd)"
                                >
                                Remove
                            </v-btn>
                            </v-flex>
                        </v-layout>
                          <v-layout row>
                            <v-flex xs12>
                            <v-text-field
                                v-model="credit"
                                label="Credit"
                                type="text"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                            <v-text-field
                                v-model="recoveryRate"
                                label="Recovery Rate"
                                type="text"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                            <v-btn
                                block
                                color="primary"
                                dark
                                v-on:click="setCreditPlan(credit, recoveryRate)"
                                >
                                Set
                            </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-layout>
                  </v-container>
               </v-card>
            </section>
            <section>
                <v-data-table
                :headers="user_headers"
                :items="users"
                hide-actions
                class="elevation-1">
                <template slot="items" slot-scope="props">
                    <!-- Note that the reason to use <template> here is because we want to have the full size table. -->
                    <td class="text-xs-center">{{ props.item.address }}</td>
                    <td class="text-xs-center">{{ props.item.remainingCredit }}</td>
                    <div class="text-xs-center">
                        <v-btn color="grey" primary v-on:click="Shopping(props.item.address)">
                            Send A Transaction
                        </v-btn>
                    </div>
                </template>
                </v-data-table>
            </section>
         </v-content>
         <v-flex
            primary
            lighten-2
            py-3
            text-xs-center
            white--text
            xs12
            >
            &copy;2018 — <strong>VeChain</strong>
         </v-flex>
      </v-app>
   </div>
</template>
<script>
import PrototypeUtility from "../lib/Prototype";

const PrototypeUti = new PrototypeUtility();

const contractAdd = "0x102289403ab6120b33af459a9ac2e7f58458f2c6";
const masterAdd = "0x3ed57ec5e5576f4940eb73c42b498972bf2d4393";
const masterPrivateKey =
  "0x5cedad2e53f4ffd46e0ca9f9e7a98b0ea47ce4606bf447320a35a7a2726266eb";

export default {
  data() {
    return {
      title: "MPP",
      sponsor_headers: [
        {
          text: "Address",
          align: "center",
          sortable: false,
          value: "address"
        },
        {
          text: "Energy Left",
          align: "center",
          value: "Balance"
        },
        {
          text: "Credit Plan",
          align: "center",
          value: "credits"
        },
        {
          text: "Select Sponsor",
          align: "center",
          sortable: false,
          value: "button"
        }
      ],
      user_headers: [
        {
          text: "Address",
          align: "center",
          sortable: false,
          value: "address"
        },
        {
          text: "Remaining Credit",
          align: "center",
          sortable: false,
          value: "text"
        },
        {
          text: "Shopping",
          align: "center",
          sortable: false,
          value: "button"
        }
      ],
      sponsors: [],
      users: [],
      currentSponsor: "",
      currentMaster: "",
      addSponsorAdd: "",
      checkInAdd: "",
      addUserAdd: "",
      rmUserAdd: "",
      creditPlan: [],
      credit: "",
      recoveryRate: ""
    };
  },
  created() {
    this.CurrentSponsor(); // Going to display the current sponsor to the UI.
    this.loadContract(); // Going to display the contract address into the UI.
    this.loadCurrentMaster();
    this.loadCurrentSponsor(); // Going to display the current sponsor into the UI.
    this.addInitialUsers();
  },
  methods: {
    MainPage() {
      this.$router.push({ name: "MainPage" });
    },
    async loadCurrentSponsor() {
      let currentSponsor = await PrototypeUti.currentSponsor(contractAdd);
      this.isSponsor(currentSponsor);
    },

    async loadCurrentMaster() {
      let currnetMaster = await PrototypeUti.getMaster(contractAdd);
      console.log('current master: ', currnetMaster)
      this.currentMaster = currnetMaster;
    },

    async CurrentSponsor() {
      let currentSponsor = await PrototypeUti.currentSponsor(contractAdd);
      this.currentSponsor = currentSponsor;
    },

    async loadContract() {
      let energy = await PrototypeUti.getEnergy(contractAdd);
      energy = energy / Math.pow(10, 18);
      let creditPlan = await PrototypeUti.creditPlan(contractAdd);
      this.creditPlan.credit = creditPlan.credit;
      this.creditPlan.recoveryRate = creditPlan.recoveryRate;
      var newSponsor = {
        address: contractAdd + " (Contract Itself)",
        bal: energy,
        creditPlan:
          "Credit: " + this.credit + " Recovery Rate: " + this.recoveryRate
      };
      this.sponsors.push(newSponsor);
      // db.sponsorsInsert(contractAdd);
    },
    async unSponsor() {},

    async Sponsor() {},

    async isSponsor(sponsorAdd) {
      // var sponsorAdd = '0x05fbe2524837b5768fbc2c6a4a6741a6ae78546d'
      let isSpon = await PrototypeUti.isSponsor(contractAdd, sponsorAdd);
      // console.log(isSpon);
      if (isSpon) {
        let energy = await PrototypeUti.getEnergy(sponsorAdd);
        energy = energy / Math.pow(10, 18);
        let creditPlan = await PrototypeUti.creditPlan(contractAdd);
        let credit = creditPlan.credit;
        let recoveryRate = creditPlan.recoveryRate;
        var newSponsor = {
          address: sponsorAdd,
          bal: energy,
          creditPlan: "Credit: " + credit + " Recovery Rate: " + recoveryRate
        };
        this.sponsors.push(newSponsor);
        // db.sponsorsInsert(sponsorAdd);
      } else {
        alert("The given address is not a sponsor.");
      }
    },
    async becomeSponsor(sponsorAdd) {},

    async selectSponsor(sponsorAdd) {
      if (
        sponsorAdd ==
        "0x102289403ab6120b33af459a9ac2e7f58458f2c6 (Contract Itself)"
      ) {
        alert("Cannot select the contract as the sponsor.");
        return;
      }
      let result = await PrototypeUti.selectSponsor(
        masterPrivateKey,
        masterAdd,
        contractAdd,
        sponsorAdd
      );
      if (result) {
        console.log("succeed to select sponsor");
        this.currentSponsor = sponsorAdd;
      }
    },

    async addUser(userAdd) {
      console.log("user address to be added: ", userAdd);
      let isUser = await PrototypeUti.isUser(contractAdd, userAdd);
      // The logic is that if the user intended to be added is already a user, just add it to the UI directly, otherwise, using prototype contract to add it.
      if (isUser) {
        console.log("is already a user");
        let userCredit = await PrototypeUti.userCredit(contractAdd, userAdd);
        let user = {
          address: userAdd,
          remainingCredit: userCredit
        };
        this.users.push(user);
        console.log(this.users);
      } else {
        let result = await PrototypeUti.addUser(
          masterPrivateKey,
          masterAdd,
          contractAdd,
          userAdd
        );
        console.log("add user result", result);
        if (result) {
          console.log("success to add");
          let userCredit = await PrototypeUti.userCredit(contractAdd, userAdd);
          let user = {
            address: userAdd,
            remainingCredit: userCredit
          };
          this.users.push(user);
          console.log(this.users);
        } else {
          console.log("fail to add user");
        }
      }
    },

    addInitialUsers() {
      var user1Add = "0x6a480c078bfa88ac6a4d323e7d9b00c94cb9ec22";
      var user2Add = "0x6cd336cd6766fc8370821166325fb9e8e4a986b6";
      var user3Add = "0x05fbe2524837b5768fbc2c6a4a6741a6ae78546d";
      this.addUser(user1Add);
      this.addUser(user2Add);
      this.addUser(user3Add);
    },

    async removeUser(userAdd) {
      console.log("user address to be removed: ", userAdd);
      let result = await PrototypeUti.removeUser(
        masterPrivateKey,
        masterAdd,
        contractAdd,
        "0x6a480c078bfa88ac6a4d323e7d9b00c94cb9ec22"
      );
      console.log("result: ", result);
      if (result) {
        console.log("success to remove");
        let userCredit = await PrototypeUti.userCredit(contractAdd, userAdd);
        let user = {
          address: userAdd,
          remainingCredit: userCredit
        };
        console.log("user index: ", this.users.indexOf(user));
        this.users.splice(this.users.indexOf(user), 1);
      } else {
        console.log("fail to remove");
      }
    },

    async Shopping(userAdd) {
      const user1PrivateKey =
        "0x073ad7a89062d807509a708fc4a7b476de7a8a13eb7cb5e10caa013f88f79cc0";
      const user2PrivateKey =
        "0xbf02c1c966963e635676d831600baa8ff8d3843a0624f1a59e5bc3b9624a1ec5";
      const user3PrivateKey =
        "0x989f429a16161a078b65f507b36c5286272735018db939e073620f9ee465606c";
      let userPrikey;
      if (userAdd == "0x6a480c078bfa88ac6a4d323e7d9b00c94cb9ec22") {
        userPrikey = user1PrivateKey;
      } else if (userAdd == "0x6cd336cd6766fc8370821166325fb9e8e4a986b6") {
        userPrikey = user2PrivateKey;
      } else if (userAdd == "0x05fbe2524837b5768fbc2c6a4a6741a6ae78546d") {
        userPrikey = user3PrivateKey;
      }
      // Simply sending a transaction to the contract, to see who is going to pay the gas.
      let result = await PrototypeUti.Shopping(
        userPrikey,
        userAdd,
        contractAdd
      );
      console.log(result);
    },

    async setCreditPlan(credit, recoveryRate) {
      let result = await PrototypeUti.setCreditPlan(
        masterPrivateKey,
        masterAdd,
        contractAdd,
        credit,
        recoveryRate
      );
      if (result) {
        this.creditPlan.credit = credit;
        this.creditPlan.recoveryRate = recoveryRate;
        this.credit = '';
        this.recoveryRate = '';
        console.log("success! ", this.creditPlan.credit);
      }
    }
    // async userCredit(address) {
    //   let userCredit = await PrototypeUti.userCredit(contractAdd, address);
    // }
  }
};
</script>
