const {
    Client,
    Hbar,
    PrivateKey,
    AccountAllowanceApproveTransaction,
  } = require('@hashgraph/sdk');
  
  require('dotenv').config({ path: '../.env' });
  
  const myAccountId = '0.0.13721954';
  const myPrivateKey = PrivateKey.fromString(
    '302e020100300506032b65700422042017954fd2268906a48f77ff0ad0c90cb3b23ef9b2e702c3556cb372535bc8c634'
  );
  
  const myAccountId2 = '0.0.13726169';
  const myPrivateKey2 = PrivateKey.fromString(
    '302e020100300506032b657004220420da9cccc9dc38f8983a1804f077466bd6829b3bd5832b05bae323b492a451c46f'
  );
  console.log(myAccountId, myAccountId2);
  
  const client = Client.forTestnet();
  client.setOperator(myAccountId, myPrivateKey);
  
  const client2 = Client.forTestnet();
  client2.setOperator(myAccountId2, myPrivateKey2);
  
  async function approveAllowance() {
    // Create the transaction
    const transaction = new AccountAllowanceApproveTransaction()
      .approveHbarAllowance(myAccountId, myAccountId2, Hbar.from(35))
      .freezeWith(client);
    //Sign the transaction with the owner account key
    const signTx = await transaction.sign(myPrivateKey);
    //Sign the transaction with the client operator private key and submit to a Hedera network
    const txResponse = await signTx.execute(client);
    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);
    //Get the transaction consensus status
    const transactionStatus = receipt.status;
    console.log(
      'The transaction consensus status is ' +
        transactionStatus.toString()
    );
  }
  
  approveAllowance();