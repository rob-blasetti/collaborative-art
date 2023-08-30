import React, { useState, useEffect, useMemo } from 'react';
import Web3 from 'web3';
import '../style/Donate.css';

const Donate = () => {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState(''); // Added this state
  const [contractBalance, setContractBalance] = useState(0);
  const [networkName, setNetworkName] = useState("");
  const [criteriaMet, setCriteriaMet] = useState(false); // Step 1
  const web3 = useMemo(() => {
    return new Web3(window.ethereum || Web3.givenProvider);
  }, []);  // Empty dependency array ensures useMemo only runs once
  const contractABI = [
    {
      "inputs": [],
      "name": "claimPayment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "finalizePayment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "meetCriteria",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_duration",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "criteriaMet",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "deposits",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "endTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const contractAddress = "0xb737f40cb119dfa76df7c747d9469264efa25242"; // Deployed contract address
  
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User rejected connection:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature!");
    }
  };

    const deposit = async (amount) => {
      console.log("Raw Amount in Ether (from input):", amount);  // Log raw amount
      
      const weiAmount = web3.utils.toWei(amount, 'ether'); // Still using web3 for utility functions
      console.log("Converted Amount in Wei:", weiAmount);  // Log converted amount
    
      const transactionParameters = {
          to: contractAddress,
          from: account,
          value: weiAmount,
          data: contract.methods.deposit().encodeABI() // Encoding the ABI for the contract call
      };

      console.log("Transaction Parameters:", transactionParameters);  // Log transaction parameters
    
      try {
          const txReceipt = await window.ethereum.request({
              method: 'eth_sendTransaction',
              params: [transactionParameters]
          });
    
          console.log("Transaction Receipt:", txReceipt);
    
          // Listening for events
          const events = txReceipt.events;
          if(events && events.DebugMessage) {
              console.log("DebugMessage Event Output:", events.DebugMessage.returnValues);
          }
          if(events && events.DebugValue) {
              console.log("DebugValue Event Output:", events.DebugValue.returnValues);
          }
      } catch (error) {
          console.error("Error depositing:", error);
      }
  };

  const claimPayment = async () => {
      await contract.methods.claimPayment().send({ from: account });
  }

  const finalizePayment = async () => {
      await contract.methods.finalizePayment().send({ from: account });
  }

  

  useEffect(() => {
    async function fetchAccount() {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }    

    fetchAccount();
  }, [web3]);

  const handleDeposit = async () => {
    try {
      await deposit(amount);
      alert('Deposit successful');
    } catch (error) {
      console.error('Error depositing:', error);
      alert('Deposit failed');
    }
  }

  const handleClaim = async () => {
    try {
      await claimPayment();
      alert('Claim successful');
    } catch (error) {
      console.error('Error claiming:', error);
      alert('Claim failed');
    }
  }

  const handleFinalize = async () => {
    try {
      await contract.methods.finalizePayment().send({ from: account });
      alert('Payment has been finalized');
    } catch (error) {
      console.error('Error finalizing payment:', error);
      alert('Error finalizing payment');
    }
  };
  
  
  const handleMeetCriteria = async () => {
    try {
      await contract.methods.meetCriteria().send({
        from: account,
        gasPrice: web3.utils.toWei('50', 'gwei') // Set your desired gas price here
      });
      alert('Criteria has been met');
    } catch (error) {
      console.error('Error meeting criteria:', error);
      alert('Error meeting criteria');
    }
  };

  useEffect(() => {
    async function fetchContractBalance() {
        const balance = await web3.eth.getBalance(contractAddress);
        setContractBalance(web3.utils.fromWei(balance, 'ether'));
    }
    async function fetchCriteriaMet() {
      const isMet = await contract.methods.criteriaMet().call();
      console.log('isMet: ', isMet);
      setCriteriaMet(isMet);
    }

    fetchCriteriaMet();
    fetchContractBalance();
  }, [web3, contractAddress]);

  return (
    <div className="conditional-payment-app">
      <h1>Conditional Payment</h1>
      <p>Connected to {networkName}</p>

      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected to: {account}</p>
        </>
      )}

      <div className="contract-balance-section">
        <h2>Contract Balance</h2>
        <p>{contractBalance} Ether</p>
      </div>

      <div className="deposit-section">
        <h2>Deposit Ether</h2>
        <input
          type="text"
          placeholder="Amount in Ether"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>

      <div className="actions-section">
        <h2>Actions</h2>
        <button onClick={handleMeetCriteria}>Meet Criteria</button>
        <button onClick={handleClaim}>Claim Payment</button>
        <button onClick={handleFinalize}>Finalize Payment</button>
      </div>
      <div className="criteria-met-section">
        <h2>Criteria Met</h2>
        <p>Criteria Met: {criteriaMet ? "Yes" : "No"}</p> {/* Step 3 */}
      </div>
    </div>
  );
};

export default Donate;
