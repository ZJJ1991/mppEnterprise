import { cry, abi, RLP, Transaction } from "thor-devkit";
import { resolve } from "url";
import { prototype } from "form-data";
// const thor_dev = require('thor-devkit')
const api = "http://localhost:8669";
const Web3 = require("web3");
var web3 = new Web3("");
const delay = require("delay");

const request = require("request");
const prototypeAddress = "0x000000000000000000000050726f746f74797065";
const contractAdd = "0x102289403ab6120b33af459a9ac2e7f58458f2c6";

export default class API {
  constructor() {}
  // Callback to handle the http request
  callback(error: any, response: any, body: any) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(JSON.stringify(body));
      console.log("body is: " + JSON.stringify(body));
      //   return body.data;
      return JSON.stringify(body);
    } else console.log("err: " + error);
  }
  getEnergy(address: string) {
    return new Promise(function(resolve, reject) {
      let url = api + "/accounts/" + address;
      var options = {
        method: "GET",
        json: true
      };
      request(url, options, function(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(JSON.stringify(body));
          let energy = body.energy;
          console.log("data: ", JSON.stringify(body));
          resolve(energy);
        } else {
          console.log("err: " + error);
          reject(false);
        }
      });
    });
  }

  async getTransactionReceipt(txid: string) {
    let url = api + "/transactions/" + txid + "/receipt";
    var options = {
      method: "GET",
      json: true,
      headers: []
    };
    return new Promise(function(resolve, reject) {
      request(url, options, function(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
          console.log("raw body: ", body);
          body = JSON.parse(JSON.stringify(body));
          console.log("tx receipt: ", body);
          let reverted = body.reverted;
          if (!reverted) resolve(true);
          else resolve(false);
        } else {
          console.log("err: " + error);
          reject(false);
        }
      });
    });
  }

  async getTransaction(txid: string) {
    let url = api + "/transactions/" + txid;
    var options = {
      method: "GET",
      json: true,
      headers: []
    };
    return new Promise(function(resolve, reject) {
      request(url, options, function(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
          console.log("raw body: ", body);
          body = JSON.parse(JSON.stringify(body));
          console.log("tx receipt: ", body);
          let reverted = body.reverted;
          if (!reverted) resolve(true);
          else resolve(false);
        } else {
          console.log("err: " + error);
          reject(false);
        }
      });
    });
  }

  async currentSponsor(contractAddress: string) {
    return new Promise(function(resolve, reject) {
      let url = api + "/accounts/" + prototypeAddress;
      var methodId = web3.eth.abi.encodeFunctionSignature(
        "currentSponsor(address)"
      );
      var parameter = web3.eth.abi.encodeParameter("address", contractAddress);
      var code = methodId + parameter.substr(2);
      var options = {
        method: "POST",
        json: true,
        headers: [],
        body: {
          data: code
        }
      };

      request(url, options, function(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(JSON.stringify(body));
          console.log("body: ", body);
          let currentSponsor = body.data;
          currentSponsor = "0x" + currentSponsor.substr(26); // Note that the returned data here is always 32 bytes long, which should be converted into correct data format accordingly.
          resolve(currentSponsor);
        } else {
          console.log("err: " + error);
          reject(false);
        }
      });
    });
  }

  async getMaster(contractAddress: any) {
    return new Promise(function(resolve, reject) {
      let url = api + "/accounts/" + prototypeAddress;
      var methodId = web3.eth.abi.encodeFunctionSignature("master(address)");
      var parameter = web3.eth.abi.encodeParameter("address", contractAdd);
      var code = methodId + parameter.substr(2);
      console.log("code: ", code);
      var options = {
        method: "POST",
        json: true,
        headers: [],
        body: {
          data: code
        }
      };
      request(url, options, function(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(JSON.stringify(body));
          let data = body.data;
          let master = "0x" + data.substr(26); // Note that the returned data here is always 32 bytes long, which should be converted into correct data format accordingly.
          resolve(master);
        } else {
          console.log("err: " + error);
          reject(false);
        }
      });
    });
  }

  // The api this function calls does not interfere with any transaction.
  async isSponsor(contractAdd: any, sponsorAdd: any) {
    return new Promise(function(resolve, reject) {
      let url = api + "/accounts/" + prototypeAddress;
      var methodId = web3.eth.abi.encodeFunctionSignature(
        "isSponsor(address,address)"
      );
      var parameter = web3.eth.abi.encodeParameters(
        ["address", "address"],
        [contractAdd, sponsorAdd]
      );
      var code = methodId + parameter.substr(2);
      console.log("code: ", code);

      var options = {
        method: "POST",
        json: true,
        headers: [],
        body: {
          data: code
        }
      };

      request(url, options, function(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(JSON.stringify(body));
          let data = body.data;
          let status = data.substr(65);
          resolve(status);
        } else {
          console.log("err: " + error);
          reject(false);
        }
      });
    });
  }

  async bestBlockRef(): Promise<any> {
    var bestRef = "";
    return new Promise(function(resolve, reject) {
      request(
        api + "/blocks/best",
        {
          method: "GET",
          json: true
        },
        function(error: any, response: any, body: any) {
          if (!error && response.statusCode == 200) {
            body = JSON.parse(JSON.stringify(body));
            console.log("body is: " + JSON.stringify(body));
            var blockid = body.id;
            console.log("blockid: ", blockid);
            blockid = blockid.substr(2);
            for (var i = 0; i < 16; i++) {
              bestRef = bestRef + blockid[i];
            }
            resolve(bestRef);
          } else {
            reject(error);
          }
        }
      );
    });
  }
  // Need to send a transaction
  async unSponsor(contractAddress: string, sponsorPrivateKey: string) {
    var methodId = web3.eth.abi.encodeFunctionSignature("unsponsor(address)");
    var parameter = web3.eth.abi.encodeParameters(
      ["address"],
      [contractAddress]
    );
    var code: string = methodId + parameter.substr(2);
    var number = 0 * Math.pow(10, 18);
    this.sendTx(code, prototypeAddress, sponsorPrivateKey);
  }

  async Sponsor(contractAddress: string, sponsorPrivateKey: string) {
    var methodId = web3.eth.abi.encodeFunctionSignature("sponsor(address)");
    var parameter = web3.eth.abi.encodeParameters(
      ["address"],
      [contractAddress]
    );
    var code: string = methodId + parameter.substr(2);
    var number = 0 * Math.pow(10, 18);

    this.sendTx(code, prototypeAddress, sponsorPrivateKey);
  }

  async addUser(
    contractAddress: string,
    userAddress: string,
    masterPrivateKey: string
  ) {
    var methodId = web3.eth.abi.encodeFunctionSignature(
      "addUser(address,address)"
    );
    var parameter = web3.eth.abi.encodeParameters(
      ["address", "address"],
      [contractAddress, userAddress]
    );
    var code: string = methodId + parameter.substr(2);
    console.log("add user code: ", code);
    let txid = await this.sendTx(code, prototypeAddress, masterPrivateKey);
    await delay(13000);
    let status = await this.getTransactionReceipt(txid.toString());
    console.log("status, ", status);
    return new Promise(function(resolve, reject) {
      console.log("add user result 2: ", status);
      resolve(status);
    });
  }

  async removeUser(
    contractAddress: string,
    userAddress: string,
    masterPrivateKey: string
  ) {
    var methodId = web3.eth.abi.encodeFunctionSignature(
      "removeUser(address,address)"
    );
    var parameter = web3.eth.abi.encodeParameters(
      ["address", "address"],
      [contractAddress, userAddress]
    );
    var code: string = methodId + parameter.substr(2);
    console.log("remove user code: ", code);
    let txid = await this.sendTx(code, prototypeAddress, masterPrivateKey);
    await delay(13000);
    let status = await this.getTransactionReceipt(txid.toString());
    console.log("status, ", status);
    return new Promise(function(resolve, reject) {
      console.log("remove user result 2: ", status);
      resolve(status);
    });
  }
  async creditPlan(contractAddress: string) {
    return new Promise(function(resolve, reject) {
      let url = api + "/accounts/" + prototypeAddress;
      var methodId = web3.eth.abi.encodeFunctionSignature(
        "creditPlan(address)"
      );
      var parameter = web3.eth.abi.encodeParameters(
        ["address"],
        [contractAddress]
      );
      var code = methodId + parameter.substr(2);
      console.log("code: ", code);
      var options = {
        method: "POST",
        json: true,
        headers: [],
        body: {
          data: code
        }
      };
      request(url, options, function(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(JSON.stringify(body));
          let rawCreditPlan = body.data;
          let recoveryRate = rawCreditPlan.substr(66);
          let credit = "";
          for (var i = 0; i < 66; i++) {
            credit = credit + rawCreditPlan[i];
          }
          let creditPlan = {
            credit: credit,
            recoveryRate: recoveryRate
          };
          resolve(creditPlan);
        } else {
          reject(error);
        }
      });
    });
  }
  // 0x0000000000000000000000000000000000000025dd85d670d35ec9bec00000000000000000000000000000000000000000000000000000000000000000000000
  // 0x80df45b4000000000000000000000000102289403ab6120b33af459a9ac2e7f58458f2c6
  // 0x0000000000000000000000000000000000000025DD85D670D35EC9BEC0000000
  // 0000000000000000000000000000000000000000000000000000000000000000
  async userCredit(contractAddress: string, userAddress: string) {
    let url = api + "/accounts/" + prototypeAddress;
    var methodId = web3.eth.abi.encodeFunctionSignature(
      "userCredit(address,address)"
    );
    var parameter = web3.eth.abi.encodeParameters(
      ["address", "address"],
      [contractAddress, userAddress]
    );
    var code = methodId + parameter.substr(2);
    console.log("code: ", code);
    var options = {
      method: "POST",
      json: true,
      headers: [],
      body: {
        data: code
      }
    };
    return new Promise(function(resolve, reject) {
      request(url, options, function(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(JSON.stringify(body));
          console.log("user credit: ", body);
          let credit = body.data;
          console.log("credit is: ", credit);
          credit = parseInt(credit, 16);
          console.log("credit is: ", credit);
          resolve(credit);
        } else {
          reject(false);
        }
      });
    });
  }

  async isUser(contractAddress: string, userAddress: string) {
    let url = api + "/accounts/" + prototypeAddress;
    var methodId = web3.eth.abi.encodeFunctionSignature(
      "isUser(address,address)"
    );
    var parameter = web3.eth.abi.encodeParameters(
      ["address", "address"],
      [contractAddress, userAddress]
    );
    var code = methodId + parameter.substr(2);
    console.log("code: ", code);
    var options = {
      method: "POST",
      json: true,
      headers: [],
      body: {
        data: code
      }
    };
    return new Promise(function(resolve, reject) {
      request(url, options, function(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(JSON.stringify(body));
          console.log("is user body: ", body);
          let isUser = body.data;
          if (
            isUser ==
            "0x0000000000000000000000000000000000000000000000000000000000000001"
          )
            resolve(true);
          else resolve(false);
        } else {
          reject(false);
        }
      });
    });
  }

  async setCreditPlan(
    contractAddress: string,
    credit: string,
    recoveryRate: string,
    masterPrivateKey: string
  ) {
    let energy = credit + '000000000000000000'
    var methodId = web3.eth.abi.encodeFunctionSignature(
      "setCreditPlan(address,uint256,uint256)"
    );
    var parameter = web3.eth.abi.encodeParameters(
      ["address", "uint256", "uint256"],
      [contractAddress, energy, recoveryRate]
    );
    var code: string = methodId + parameter.substr(2);
    console.log("remove user code: ", code);
    let txid = await this.sendTx(code, prototypeAddress, masterPrivateKey);
    await delay(13000);
    let status = await this.getTransactionReceipt(txid.toString());
    console.log("status, ", status);
    return new Promise(function(resolve, reject) {
      console.log("set credit plan result: ", status);
      resolve(status);
    });
  }

  async selectSponsor(
    contractAddress: string,
    sponsorAddress: string,
    masterPrivateKey: string
  ) {
    var methodId = web3.eth.abi.encodeFunctionSignature(
      "selectSponsor(address,address)"
    );
    var parameter = web3.eth.abi.encodeParameters(
      ["address", "address"],
      [contractAddress, sponsorAddress]
    );
    var code: string = methodId + parameter.substr(2);
    let txid = await this.sendTx(code, prototypeAddress, masterPrivateKey);
    await delay(13000);
    let status = await this.getTransactionReceipt(txid.toString());
    console.log("status, ", status);
    return new Promise(function(resolve, reject) {
      console.log("select sponsor result 2: ", status);
      resolve(status);
    });
  }

  async Shopping(contractAddress: string, privateKey: any) {
    var methodId = web3.eth.abi.encodeFunctionSignature("renderHelloWorld()");

    let txid = await this.sendTx(methodId, contractAddress, privateKey);
    await delay(13000);
    let status = await this.getTransactionReceipt(txid.toString());
    return new Promise(function(resolve, reject) {
      resolve(status);
    });
  }

  async sendTx(code: string, accountAddress: string, privateKey: string) {
    let url = api + "/transactions";
    let clauses = [
      {
        to: accountAddress,
        value: 0,
        data: code
      }
    ];
    var bestRef = await this.bestBlockRef();

    // Get the latest block height, which will be referenced to later on
    bestRef = "0x" + bestRef; // blockRef is the first 8 bytes of a specified block id;however if the block is a future block, the blockRef is the 4 bytes block height plus the 4 bytes 0.
    console.log("bestblockref:", bestRef);

    // Built the transaction body
    let txbody: Transaction.Body = {
      chainTag: 0x27, // Note that the chainTag for testnet is 0x27, which, in mainnet, is 0x4a
      blockRef: bestRef,
      expiration: 100, // This specifies the transaction expires in 100 blocks.
      clauses: clauses,
      gasPriceCoef: 180,
      gas: 900000, // Note that the gas here refers to the gas limit.
      dependsOn: null,
      nonce: "0x29c257e36ea6e72a"
    };
    let tx = new Transaction(txbody);
    let signingHash = cry.blake2b256(tx.encode()); // Hash the transaction content.
    let newPriKey = privateKey.substr(2); // Get rid of the '0x' prefix
    tx.signature = cry.secp256k1.sign(
      signingHash,
      Buffer.from(newPriKey, "hex")
    );

    let raw = tx.encode(); // Note that the raw transaction does not contain '0x' profit yet. When actually sending a transaction, '0x' prefix is needed.
    console.log("raw tx: ", "0x" + raw.toString("hex"));
    let decoded = Transaction.decode(raw);
    var options = {
      method: "POST",
      json: true,
      headers: [],
      body: {
        raw: "0x" + raw.toString("hex") // Remember to add the '0x' prefix for the raw data
      }
    };
    return new Promise(function(resolve, reject) {
      request(url, options, function(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(JSON.stringify(body));
          let txid: string = body.id;
          resolve(txid);
        } else {
          reject(error);
        }
      });
    });
  }

  getFullNum(num:any) {
    //处理非数字
    if (isNaN(num)) {
      return num;
    }

    //处理不需要转换的数字
    var str = "" + num;
    if (!/e/i.test(str)) {
      return num;
    }

    return num.toFixed(18).replace(/\.?0+$/, "");
  }
}

var aapi = new API();
// aapi.isSponsor(contractAdd, "0x05fBE2524837B5768fbc2c6A4a6741a6Ae78546d");

// aapi.unSponsor(
//   contractAdd,
//   "0x989f429a16161a078b65f507b36c5286272735018db939e073620f9ee465606c"
// );

// aapi.currentSponsor(contractAdd);

// aapi.Sponsor(
//   contractAdd,
//   "0x989f429a16161a078b65f507b36c5286272735018db939e073620f9ee465606c"
// );

// aapi.addUser(contractAdd, "0x05fBE2524837B5768fbc2c6A4a6741a6Ae78546d", "0x5cedad2e53f4ffd46e0ca9f9e7a98b0ea47ce4606bf447320a35a7a2726266eb")

// aapi.removeUser(contractAdd, "0x05fBE2524837B5768fbc2c6A4a6741a6Ae78546d", "0x5cedad2e53f4ffd46e0ca9f9e7a98b0ea47ce4606bf447320a35a7a2726266eb")

aapi.setCreditPlan(contractAdd, "300000", "0", "0x5cedad2e53f4ffd46e0ca9f9e7a98b0ea47ce4606bf447320a35a7a2726266eb")

// aapi.selectSponsor(
//   contractAdd,
//   "0x05fBE2524837B5768fbc2c6A4a6741a6Ae78546d",
//   "0x5cedad2e53f4ffd46e0ca9f9e7a98b0ea47ce4606bf447320a35a7a2726266eb"
// );

// aapi.creditPlan(contractAdd);

// aapi.userCredit(contractAdd, "0x6a480c078bfa88ac6a4d323e7d9b00c94cb9ec22")
// aapi.userCredit(contractAdd, "0x6cd336cd6766fc8370821166325fb9e8e4a986b6")

// aapi.isUser(contractAdd, "0x6a480c078bfa88ac6a4d323e7d9b00c94cb9ec22")

// aapi.Shopping(
//   contractAdd,
//   "0x073ad7a89062d807509a708fc4a7b476de7a8a13eb7cb5e10caa013f88f79cc0"
// );

// aapi.getTransactionReceipt(
//   "0xdaca627dff4cdba13a81c81da4ebfb8610ae559b7683cef3ecf6de814fb8ace2"
// );
// aapi.getTransaction(
//   "0xdaca627dff4cdba13a81c81da4ebfb8610ae559b7683cef3ecf6de814fb8ace2"
// );
