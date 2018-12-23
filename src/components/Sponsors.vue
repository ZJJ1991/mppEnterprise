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
                    <v-layout column align-center justify-center class="white--text">
                        <img src="~assets/logo.png" alt="Vuetify.js" height="200">
                        <br/><br/>
                        <h1 class="white--text mb-2 display-1 text-xs-center">{{ title }}</h1>
                        <div class="subheading mb-3 text-xs-center">Powered by An active VeChain Community Developer</div>
                    </v-layout>
                </v-parallax>
            </section>
            <section class="mx-5 mt-3">
                <v-data-table :headers="sponsor_headers" :items="sponsors" hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <!-- Note that the reason to use <template> here is because we want to have the full size table. -->
                        <td class="text-xs-center">{{ props.item.address }}</td>
                        <td class="text-xs-center">{{ props.item.bal }}</td>
                        <!-- <td class="text-xs-center">{{ props.item.creditPlan }}</td> -->
                        <div class="text-xs-center">
                            <v-btn color="grey" primary @click="snackbar = true" v-on:click="selectSponsor(props.item.address)">
                                Select
                            </v-btn>
                        </div>
                    </template>
                </v-data-table>
            </section>
            <section class="mx-5 mt-3">
                <v-card class="text-xs-center" title="Basic Info">
                    <p class="text-md-center">Current Sponsor Address: {{ currentSponsor }}</p>
                    <p class="text-md-center">Current Master Address: {{ currentMaster }}</p>
                    <p class="text-md-center">Credit Plan----Credit: {{ creditPlan.credit }} Recovery Rate: {{ creditPlan.recoveryRate }}</p>
                    <p class="text-md-center">Some testing data going be to be used: user:0x6cd336cd6766fc8370821166325fb9e8e4a986b6, sponsor:0x05fbe2524837b5768fbc2c6a4a6741a6ae78546d</p>
                    <!-- <p class="text-md-center">Description: 1 VTHO = Energy/1e+18; Energy = gas * gasPrice; gasPrice = bgp + bgp * gpc /255 (about 1.7e+15）; bgp = 1e+15, gpc = 180</p> -->
                    <v-container grid-list-md text-xs-center>
                        <v-layout column>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field v-model="addSponsorAdd" label="Sponsor Address" type="text"></v-text-field>
                                </v-flex>
                                <v-flex xs3>
                                    <v-btn block color="primary" dark @click="snackbar = true" v-on:click="Sponsor(addSponsorAdd)">
                                        Sponsor
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="unsponsorAdd" label="The address that is going to be removed from the sponsor list." type="text"></v-text-field>
                                </v-flex>
                                <v-flex xs3>
                                    <v-btn block color="primary" dark @click="snackbar = true" v-on:click="unSponsor(unsponsorAdd)">
                                        UnSponsor
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field v-model="addUserAdd" label="User Address" type="text"></v-text-field>
                                </v-flex>
                                <v-flex xs3>
                                    <v-btn block color="primary" dark v-on:click="addUser(addUserAdd)">
                                        Add
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="rmUserAdd" label="User Address" type="text"></v-text-field>
                                </v-flex>
                                <v-flex xs3>
                                    <v-btn block color="primary" dark v-on:click="removeUser(rmUserAdd)">
                                        Remove
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field v-model="credit" label="Credit" type="text"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="recoveryRate" label="Recovery Rate" type="text"></v-text-field>
                                </v-flex>
                                <v-flex xs3>
                                    <v-btn block color="primary" dark v-on:click="setCreditPlan(credit, recoveryRate)">
                                        Set
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-layout>
                    </v-container>
                </v-card>
            </section>
            <section class="mx-5 mt-3">
                <v-data-table :headers="nonuser_headers" :items="nonusers" hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <!-- Note that the reason to use <template> here is because we want to have the full size table. -->
                        <td class="text-xs-center">{{ props.item.address }}</td>
                        <td class="text-xs-center">{{ props.item.bal }}</td>
                        <div class="text-xs-center">
                            <v-btn color="grey" primary v-on:click="Shopping(props.item.address)">
                                Send A Transaction
                            </v-btn>
                        </div>
                    </template>
                </v-data-table>
            </section>
            <section class="mx-5 mt-3 mb-3">
                <v-data-table :headers="user_headers" :items="users" hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <!-- Note that the reason to use <template> here is because we want to have the full size table. -->
                        <td class="text-xs-center">{{ props.item.address }}</td>
                        <td class="text-xs-center">{{ props.item.remainingCredit }}</td>
                        <td class="text-xs-center">{{ props.item.bal }}</td>
                        <div class="text-xs-center">
                            <v-btn color="grey" primary v-on:click="Shopping(props.item.address)">
                                Send A Transaction
                            </v-btn>
                        </div>
                    </template>
                </v-data-table>
            </section>
        </v-content>
        <v-flex primary lighten-2 py-3 text-xs-center white--text xs12>
            &copy;2018 — <strong>VeChain</strong>
        </v-flex>
    </v-app>
</div>
</template>

<script>
// import PrototypeUtility from "../lib/Prototype";
import API from "../lib/api";
import BigNumber from "bignumber.js";
// const PrototypeUti = new PrototypeUtility();
const apiUti = new API();

const contractAdd = "0x102289403ab6120b33af459a9ac2e7f58458f2c6";
// const masterAdd = "0x3ed57ec5e5576f4940eb73c42b498972bf2d4393";
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
          text: "VTHO Left",
          align: "center",
          value: "Balance"
        },
        {
          text: "Select Sponsor",
          align: "center",
          sortable: false,
          value: "button"
        }
      ],
      nonuser_headers: [
        {
          text: "NonUser-Address",
          align: "center",
          sortable: false,
          value: "address"
        },
        {
          text: "VTHO Left",
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
          text: "VTHO Left",
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
      nonusers: [],
      currentSponsor: "",
      currentMaster: "",
      addSponsorAdd: "",
      unsponsorAdd: "",
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
    // this.addInitialUsers();
    this.loadRandomAccount();
  },
  methods: {
    MainPage() {
      this.$router.push({
        name: "MainPage"
      });
    },

    async loadCurrentSponsor() {
      let currentSponsor = await apiUti.currentSponsor(contractAdd);
      if (currentSponsor) this.isSponsor(currentSponsor);
    },

    async loadCurrentMaster() {
      let currnetMaster = await apiUti.getMaster(contractAdd);
      if (currnetMaster) {
        this.currentMaster = currnetMaster;
      } else {
        this.currentMaster = "No available master account yet.";
      }
    },

    async CurrentSponsor() {
      let currentSponsor = await apiUti.currentSponsor(contractAdd);
      this.currentSponsor = currentSponsor;
    },

    async loadRandomAccount() {
      const randomAdd = "0xaffe17f8336ffb4d6ba1b152bfe2f9d1ad703cbf";
      // const randomPrk =
      //   "74266bdf3ffe2efad1efab3c83f92d9cb0baa2c2ad1d7ad46f5e3ef18878b835";
      let energy = await apiUti.getEnergy(randomAdd);
      let vtho = energy / Math.pow(10, 18);
      vtho = new BigNumber(vtho).dp(3).toString(10);
      let randomAcc = {
        address: randomAdd,
        bal: vtho
      };
      this.nonusers.push(randomAcc);
    },

    async loadContract() {
      let energy = await apiUti.getEnergy(contractAdd);
      let vtho = energy / Math.pow(10, 18);
      vtho = new BigNumber(vtho).dp(3).toString(10);
      let creditPlan = await apiUti.creditPlan(contractAdd);
      this.creditPlan.credit =
        parseInt(creditPlan.credit, 16) / Math.pow(10, 18);
      this.creditPlan.recoveryRate = parseInt(creditPlan.recoveryRate, 16);
      var newSponsor = {
        address: contractAdd + " (Contract Itself)",
        bal: vtho,
        creditPlan:
          "Credit: " +
          this.creditPlan.credit +
          " Recovery Rate: " +
          this.creditPlan.recoveryRate
      };
      this.sponsors.push(newSponsor);
      // db.sponsorsInsert(contractAdd);
    },
    async Sponsor(sponsorAdd) {
      let sponsorPrivateKey;
      if (sponsorAdd == "0x7797728c180152c98787351a531526a508fe814c") {
        sponsorPrivateKey =
          "0x853fb586200ee2e0d620ac6ad89e8546494c1104ae4b2539777b35a29a552f94";
      }
      let result = await apiUti.Sponsor(contractAdd, sponsorPrivateKey);
      if (result) {
        this.isSponsor(sponsorAdd);
      }
    },
    async unSponsor(sponsorAdd) {
      let sponsorPrivateKey;
      if (sponsorAdd == "0x7797728c180152c98787351a531526a508fe814c") {
        sponsorPrivateKey =
          "0x853fb586200ee2e0d620ac6ad89e8546494c1104ae4b2539777b35a29a552f94";
      }
      let result = await apiUti.unSponsor(contractAdd, sponsorPrivateKey);
      if (result) {
        this.sponsors.splice(0, 1)
      }
    },
    async isSponsor(sponsorAdd) {
      // var sponsorAdd = '0x05fbe2524837b5768fbc2c6a4a6741a6ae78546d'
      let isSpon = await apiUti.isSponsor(contractAdd, sponsorAdd);
      if (isSpon) {
        let energy = await apiUti.getEnergy(sponsorAdd);
        energy = parseInt(energy, 16);
        let vtho = energy / Math.pow(10, 18);
        vtho = new BigNumber(vtho).dp(3).toString(10);
        let creditPlan = await apiUti.creditPlan(contractAdd);
        let credit = creditPlan.credit;
        credit = parseInt(credit, 16);
        credit = credit / Math.pow(10, 18);
        credit = new BigNumber(credit).dp(3).toString(10);
        let recoveryRate = creditPlan.recoveryRate;
        recoveryRate = parseInt(recoveryRate, 16);
        var newSponsor = {
          address: sponsorAdd,
          bal: vtho,
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
      let result = await apiUti.selectSponsor(
        contractAdd,
        sponsorAdd,
        masterPrivateKey
      );
      if (result) {
        this.currentSponsor = sponsorAdd;
      }
    },

    async addUser(userAdd) {
      let isUser = await apiUti.isUser(contractAdd, userAdd);
      // The logic is that if the user intended to be added is already a user, just add it to the UI directly, otherwise, using prototype contract to add it.
      if (isUser) {
        let userCredit = await apiUti.userCredit(contractAdd, userAdd);
        userCredit = userCredit / Math.pow(10, 18);
        userCredit = new BigNumber(userCredit).dp(3).toString(10);
        let energy = await apiUti.getEnergy(userAdd);
        let vtho = energy / Math.pow(10, 18);
        vtho = new BigNumber(vtho).dp(3).toString(10);
        let user = {
          address: userAdd,
          remainingCredit: userCredit,
          bal: vtho
        };
        this.users.push(user);
      } else {
        let result = await apiUti.addUser(
          contractAdd,
          userAdd,
          masterPrivateKey
        );
        if (result) {
          let userCredit = await apiUti.userCredit(contractAdd, userAdd);
          userCredit = userCredit / Math.pow(10, 18);
          userCredit = new BigNumber(userCredit).dp(3).toString(10);
          let energy = await apiUti.getEnergy(userAdd);
          let vtho = energy / Math.pow(10, 18);
          vtho = new BigNumber(vtho).dp(3).toString(10);
          let user = {
            address: userAdd,
            remainingCredit: userCredit,
            bal: vtho
          };
          this.users.push(user);
        } else {
        }
      }
    },

    addInitialUsers() {
      var user1Add = "0x6a480c078bfa88ac6a4d323e7d9b00c94cb9ec22";
      var user2Add = "0x6cd336cd6766fc8370821166325fb9e8e4a986b6";
      // var user3Add = "0x05fbe2524837b5768fbc2c6a4a6741a6ae78546d";
      this.addUser(user1Add);
      this.addUser(user2Add);
      // this.addUser(user3Add);
    },

    async removeUser(userAdd) {
      let result = await apiUti.removeUser(
        contractAdd,
        userAdd,
        masterPrivateKey
      );
      if (result) {
        let userCredit = await apiUti.userCredit(contractAdd, userAdd);
        let user = {
          address: userAdd,
          remainingCredit: userCredit
        };
        this.users.splice(this.users.indexOf(user), 1);
      } else {
        alert("failt to remove the user")
      }
    },

    async Shopping(userAdd) {
      const user1PrivateKey =
        "0x073ad7a89062d807509a708fc4a7b476de7a8a13eb7cb5e10caa013f88f79cc0";
      const user2PrivateKey =
        "0xbf02c1c966963e635676d831600baa8ff8d3843a0624f1a59e5bc3b9624a1ec5";
      const user3PrivateKey =
        "0x989f429a16161a078b65f507b36c5286272735018db939e073620f9ee465606c";
      const randomAccPriKey =
        "0x74266bdf3ffe2efad1efab3c83f92d9cb0baa2c2ad1d7ad46f5e3ef18878b835";
      let userPrikey;
      if (userAdd == "0x6a480c078bfa88ac6a4d323e7d9b00c94cb9ec22") {
        userPrikey = user1PrivateKey;
      } else if (userAdd == "0x6cd336cd6766fc8370821166325fb9e8e4a986b6") {
        userPrikey = user2PrivateKey;
      } else if (userAdd == "0x05fbe2524837b5768fbc2c6a4a6741a6ae78546d") {
        userPrikey = user3PrivateKey;
      } else if (userAdd == "0xaffe17f8336ffb4d6ba1b152bfe2f9d1ad703cbf") {
        userPrikey = randomAccPriKey;
      }
      // Simply sending a transaction to the contract, to see who is going to pay the gas.
      let result = await apiUti.Shopping(contractAdd, userPrikey);
      let status = result[0];
      let gasPayer = result[1];
      if (status) {
        if (gasPayer == "0x102289403ab6120b33af459a9ac2e7f58458f2c6") {
          this.loadContract();
          this.addUser(userAdd); // this referesh the user info
        } else if (
          gasPayer == userAdd &&
          gasPayer != "0xaffe17f8336ffb4d6ba1b152bfe2f9d1ad703cbf"
        ) {
          this.addUser(userAdd); // this referesh the user info
        } else if (gasPayer == "0xaffe17f8336ffb4d6ba1b152bfe2f9d1ad703cbf") {
          this.loadRandomAccount();
        } else if (gasPayer == "0x7797728c180152c98787351a531526a508fe814c") {
          this.loadCurrentSponsor();
          this.addUser(userAdd); // this referesh the user info
        }
      }
    },

    async setCreditPlan(credit, recoveryRate) {
      let result = await apiUti.setCreditPlan(
        contractAdd,
        credit,
        recoveryRate,
        masterPrivateKey
      );
      if (result) {
        this.creditPlan.credit = credit;
        this.creditPlan.recoveryRate = recoveryRate;
        this.credit = "";
        this.recoveryRate = "";
      }
    }
    // async userCredit(address) {
    //   let userCredit = await PrototypeUti.userCredit(contractAdd, address);
    // }
  }
};
</script>
