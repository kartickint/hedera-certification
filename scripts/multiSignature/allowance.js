const {
  Client,
  AccountBalanceQuery,
  TransferTransaction,
  Hbar,
  PrivateKey,
  AccountCreateTransaction,
  AccountAllowanceApproveTransaction,
} = require('@hashgraph/sdk');
require('dotenv').config({ path: '../.env' });

const myAccountId = "0.0.13726169";
const myPrivateKey = PrivateKey.fromString("302e020100300506032b657004220420da9cccc9dc38f8983a1804f077466bd6829b3bd5832b05bae323b492a451c46f");

const myAccountId2 = "0.0.13726170";
const myPrivateKey2 = PrivateKey.fromString("302e020100300506032b6570042204202e2a2d35881240359d4a2ac47a7487292f5d3c7f098565428a7956091d37484a");

const myAccountId3 = "0.0.13726171";
const myPrivateKey3 = PrivateKey.fromString("302e020100300506032b657004220420a3ad2f9a2b96e488ce1517bd2e01613389c4cd413ca8307b012daa2bea1f3a7a");

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

const client2 = Client.forTestnet();
client2.setOperator(myAccountId2, myPrivateKey2);

async function UseAllowance() {
  const transaction = new TransferTransaction()
    .addApprovedHbarTransfer(myAccountId, new Hbar(-20))
    .addApprovedHbarTransfer(myAccountId3, new Hbar(20));
  console.log(
    `Doing transfer from ${myAccountId} to ${myAccountId3}`
  );
  const txId = await transaction.execute(client2);
  const receipt = await txId.getReceipt(client2);
  const transactionStatus = receipt.status;
  console.log(
    'The transaction consensus status is ' + transactionStatus
  );
  // Create the queries
  const queryMine = new AccountBalanceQuery().setAccountId(
    myAccountId
  );
  const queryOther = new AccountBalanceQuery().setAccountId(
    myAccountId3
  );
  const accountBalanceMine = await queryMine.execute(client2);
  const accountBalanceOther = await queryOther.execute(client2);
  console.log(
    `My account balance ${accountBalanceMine.hbars} HBar, other account balance ${accountBalanceOther.hbars}`
  );
}

UseAllowance();