import React, { useState } from 'react';
import { ethers } from 'ethers';
import './css/Issue.css'
function IssueCertificate() {
  const [studentName, setStudentName] = useState('');
  const [degreeName, setDegreeName] = useState('');
  const [subject, setSubject] = useState('');
  const [studentAddress, setStudentAddress] = useState('');
  const [issueResult, setIssueResult] = useState('');

  // Replace with your contract address
  const CONTRACT_ADDRESS = '0x3aBDC732E9f05DF22211FAfF0Cf8DF6D76742016';
  const API_KEY = 'FL2LLcHpmU6y2PVSqEnv-3BcXP9yJoZd';
  const PRIVATE_KEY = '8332144f020a904498a781d075ad1d303efbbe828fab718fd43bcad1f5b2d8ca';

  const issueCertificate = async () => {
    try {
      const network = 'maticmum';
      const provider = new ethers.providers.AlchemyProvider(network, API_KEY);
      const signer = new ethers.Wallet(PRIVATE_KEY, provider);

      const contractABI = require('./abi/CertificateNFT.json');
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      const issueTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp

      const transaction = await contract.issueCertificate(
        studentName,
        degreeName,
        subject,
        studentAddress,
        issueTimestamp
      );

      await transaction.wait();

      setIssueResult('Certificate issued successfully!');
    } catch (error) {
      console.error('Error issuing certificate:', error);
      setIssueResult('Failed to issue certificate' + '-->' + error);
    }
  };

  return (
    <div className='issue-certificate-container'>
      <h1>Issue Certificate</h1>
      <input
        type="text"
        placeholder="Student Name"
        onChange={(e) => setStudentName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Degree Name"
        onChange={(e) => setDegreeName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        onChange={(e) => setSubject(e.target.value)}
      />
      <input
        type="text"
        placeholder="Student Address"
        onChange={(e) => setStudentAddress(e.target.value)}
      />
      <button onClick={issueCertificate}>Issue Certificate</button>
      <p>{issueResult}</p>
    </div>
  );
}

export default IssueCertificate;
