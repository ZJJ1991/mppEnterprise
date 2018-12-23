<template>
 <div id="app">
   <v-app light>
    <v-toolbar class="white">
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <section>
        <v-parallax :src="require('@/assets/hero.jpeg')" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text">
            <img src="~assets/logo.png" alt="Vuetify.js" height="200">
            <br/><br/>
            <h1 class="white--text mb-2 display-1 text-xs-center">Multi Party Payment Demo</h1>
            <div class="subheading mb-3 text-xs-center">Powered by An Active VeChain Community Developer</div>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              v-on:click="Sponsorpage()">
              TRY
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">A noval blockchain economy model</h2>
              <span class="subheading">Multi Party Payment</span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Multi Party</div>
                    </v-card-title>
                    <v-card-text>
                      Blockchain usually requires transaction senders to pay some amount of service fee to the block producer, which may cool off customers' interests to buy products from a blockchain powered app.
                      However, VeChain MPP(Multi-Party-Payment) protocol is a sololution to such a problem since it is possbile to involve other parties paying transaction fee for the target transaction sender.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Fast to get resources</div>
                    </v-card-title>
                    <v-card-text>
                      Any accouts can actively sponsor the target enterprise account (usually refers to a contract account in the blockchain).
                      The sponsor candidates can actively unsponsor the enterprise account and also the enterprise account can actively select the sponsor out of the sponsor list.
                      A limit is set to avoid attacking the enterprise account with tons of junk transactions.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Easy to Implement</div>
                    </v-card-title>
                    <v-card-text>
                      To implement the MPP protocol, the built-in contract "prototype" should be leveraged.
                      VeChain virtual machine is compliant with solidity language, as such developers can easily implement or migrate existing Solidity contracts to VechainThor blockchain.
                      Thorify, thor-devkit and built-in api are optional ways for developers to interact with VeChainThor such as deploying contracts, call contract functions etc.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="require('@/assets/section.jpg')" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">The early bird gets the worm</div>
            <em>Kick off your MPP application now</em>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="https://github.com/vechain"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company Info</div>
                </v-card-title>
                <v-card-text>
                  VeChain is a public blockchain platform that focuses on supply chain management and smart contracts. It is commonly listed as VET on crypto-trading platforms.
                  VeChain was the only top 20 cryptocurrency that did not show negative returns in the first three months of 2018, instead gaining 28 percent. In April 2018, it was the 17th largest cryptocurrency.
                  Please refer to <a href="https://en.wikipedia.org/wiki/VeChain">wikipedia</a> for more details.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact the company</div>
                </v-card-title>
                <v-card-text>
                  When I have encountered any technical issues, I always contact the company through the following information.
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>021-32265578</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>No.546 Yuyuan Road, Shanghai, China</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>support@vechain.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <v-footer class="blue darken-2">
        <v-layout column wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-3">
              Made with
              <v-icon class="red--text">favorite</v-icon>
              using <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
              by <a class="white--text" href="https://github.com/ZJJ1991">Junjie Zhou</a>
            </div>
          </v-flex>
        </v-layout>
      </v-footer>

    </v-content>
  </v-app>
 </div>
</template>
<script>
export default {
  data() {
    return {
      title: "MPP Enterprise Adoption"
    };
  },
  methods: {
    Sponsorpage() {
      this.$router.push({ name: "SponsorsList" });
    }
  }
};
</script>
