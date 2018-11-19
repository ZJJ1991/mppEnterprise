const thorify = require("thorify").thorify;
const Web3 = require("web3");
const web3 = thorify(new Web3(), "http://localhost:8669");

const prototypeAddress = "0x000000000000000000000050726f746f74797065";
const PrototypeAbi = [
  {
    constant: false,
    inputs: [
      { name: "_self", type: "address" },
      { name: "_newMaster", type: "address" }
    ],
    name: "setMaster",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_self", type: "address" },
      { name: "_user", type: "address" }
    ],
    name: "isUser",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_self", type: "address" },
      { name: "_key", type: "bytes32" }
    ],
    name: "storageFor",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_self", type: "address" },
      { name: "_blockNumber", type: "uint256" }
    ],
    name: "energy",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_self", type: "address" },
      { name: "_user", type: "address" }
    ],
    name: "removeUser",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_self", type: "address" }],
    name: "currentSponsor",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_self", type: "address" },
      { name: "_credit", type: "uint256" },
      { name: "_recoveryRate", type: "uint256" }
    ],
    name: "setCreditPlan",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_self", type: "address" },
      { name: "_sponsor", type: "address" }
    ],
    name: "selectSponsor",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_self", type: "address" },
      { name: "_blockNumber", type: "uint256" }
    ],
    name: "balance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_self", type: "address" }],
    name: "sponsor",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_self", type: "address" }],
    name: "creditPlan",
    outputs: [
      { name: "credit", type: "uint256" },
      { name: "recoveryRate", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_self", type: "address" },
      { name: "_user", type: "address" }
    ],
    name: "addUser",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_self", type: "address" }],
    name: "hasCode",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_self", type: "address" }],
    name: "master",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_self", type: "address" },
      { name: "_user", type: "address" }
    ],
    name: "userCredit",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_self", type: "address" }],
    name: "unsponsor",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_self", type: "address" },
      { name: "_sponsor", type: "address" }
    ],
    name: "isSponsor",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];
const PrototypeContract = new web3.eth.Contract(PrototypeAbi, prototypeAddress);

export default class PrototypeUtility {
  constructor() {}
  addPrivateKey(privateKey: string, address: string) {
    const result = web3.eth.accounts.wallet.add({
      privateKey: privateKey,
      address: address
    });
    console.log("result of adding pri key: ", result);
  }
  async currentSponsor(contractAdd: string) {
    return await PrototypeContract.methods.currentSponsor(contractAdd).call();
  }

  async getMaster(contractAdd: string) {
    return await PrototypeContract.methods
      .master(contractAdd)
      .call()
      // .then(function(master: any) {
      //   console.log("master is: ", master);
      // });
  }

  async isSponsor(contractAdd: string, sponsorAdd: string) {
    try {
      return PrototypeContract.methods
        .isSponsor(contractAdd, sponsorAdd)
        .call();
    } catch (err) {
      return false;
    }
  }
  async sponsor(contractAdd: string, sponsorAdd: string, sponsorPrk: string) {
    web3.eth.accounts.wallet.add({
      privateKey: sponsorPrk,
      address: sponsorAdd
    });
    // const contractAdd = "0x102289403ab6120b33af459a9ac2e7f58458f2c6";
    PrototypeContract.methods
      .sponsor(contractAdd)
      .send({ from: sponsorAdd })
      .then(function(sponsorResult: any) {
        console.log("sponsor result: ", sponsorResult);
      });
  }

  async unSponsor(contractAdd: string, sponsorAdd: string, sponsorPrk: string) {
    web3.eth.accounts.wallet.add({
      privateKey: sponsorPrk,
      address: sponsorAdd
    });
    PrototypeContract.methods.unsponsor(contractAdd).send({ from: sponsorAdd });
    // .then(function(unSponsorResult: any) {
    //   console.log("unsponsor result: ", unSponsorResult);
    // });
  }

  async selectSponsor(
    masterPrk: string,
    masterAdd: string,
    contractAdd: string,
    sponsorAdd: string
  ) {
    web3.eth.accounts.wallet.add({
      privateKey: masterPrk,
      address: masterAdd
    });
    let result = await PrototypeContract.methods
      .selectSponsor(contractAdd, sponsorAdd)
      .send({ from: masterAdd });
    // .then(function(selectSponsorResult: any) {
    //   console.log("select sponsor result: ", selectSponsorResult);
    // });
    return result;
  }

  async getEnergy(address: string) {
    return web3.eth.getEnergy(address);
  }
  async creditPlan(contractAdd: string) {
    return PrototypeContract.methods.creditPlan(contractAdd).call();
  }
  async userCredit(contractAdd: string, userAdd: string) {
    return PrototypeContract.methods.userCredit(contractAdd, userAdd).call();
  }

  async isUser(contractAdd: string, userAdd: string) {
    let result = await PrototypeContract.methods
      .isUser(contractAdd, userAdd)
      .call();
    // .then(function(isUser: any) {
    //   console.log("is user? ", isUser);
    // });
    return result;
  }

  async addUser(
    masterPrk: string,
    masterAdd: string,
    contractAdd: string,
    userAdd: string
  ) {
    web3.eth.accounts.wallet.add({
      privateKey: masterPrk,
      address: masterAdd
    });
    let error = false;
    try {
      await PrototypeContract.methods
        .addUser(contractAdd, userAdd)
        .send({ from: masterAdd, gas: 100000 })
        .then(function(addUserResult: any) {
          console.log("add user result is: ", addUserResult);
        });
    } catch (err) {
      return false;
    }
    if (!error) {
      return true;
    }
  }
  async removeUser(
    masterPrk: string,
    masterAdd: string,
    contractAdd: string,
    userAdd: string
  ) {
    web3.eth.accounts.wallet.add({
      privateKey: masterPrk,
      address: masterAdd
    });
    let error = false;
    try {
      await PrototypeContract.methods
        .removeUser(contractAdd, userAdd)
        .send({ from: masterAdd, gas: 1000000 })
        .then(function(removeUserResult: any) {
          console.log("remove user result is: ", removeUserResult);
        });
    } catch (err) {
      return false;
    }
    if (!error) {
      return true;
    }
  }
  async Shopping(userPrikey: string, userAdd: string, contractAdd: string) {
    web3.eth.accounts.wallet.add({
      privateKey: userPrikey,
      address: userAdd
    });
    var methodId = web3.eth.abi.encodeFunctionSignature(
      "renderHelloWorld()"
    );
    console.log('contract add: ', contractAdd)
    let error = false;
    try {
      let result = await web3.eth
        .sendTransaction({
          from: userAdd,
          to: contractAdd,
          value: 0,
          data: methodId,
        })
        .then(function(txResult: any) {
          console.log("tx result: ", txResult);
        });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true
  }
  async setCreditPlan(
    masterprikey: string,
    masterAdd: string,
    contractAdd: string,
    credit: string,
    recoveryRate: number
  ) {
    web3.eth.accounts.wallet.add({
      privateKey: masterprikey,
      address: masterAdd
    });
    var error = false;
    try {
      credit = credit + '000000000000000000'
      await PrototypeContract.methods
        .setCreditPlan(contractAdd, credit, recoveryRate)
        .send({ from: masterAdd, gas: 100000 })
        .then(function(setCreditPlan: any) {
          console.log("set credit plan is: ", setCreditPlan);
        });
    } catch (err) {
      error = true;
      return false;
    }
    if (!error) {
      return true;
    }
  }
}
