import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import IssueCertificate from './Issue';
import ViewCertificate from './View';
import { useLocation } from 'react-router-dom';

let Redirect = false; // Set to true after redirection

function App() {
  const [studentAddress, setStudentAddress] = useState('');

  const pathname = useLocation().pathname; // Use the useLocation hook inside the App function

  // Update the flag when visiting the `/view` route
  useEffect(() => {
    if (pathname === '/view') {
      Redirect = false;
    } else if (pathname === '/') {
      Redirect = true;
    }
  }, [pathname]);

  // Handle issue certificate and redirect to view certificate page
  const handleIssueCertificateAndRedirect = async () => {
    try {
      await IssueCertificate(); // Call the issueCertificate function
      Router.push('/view'); // Redirect to the view certificate page
      Redirect = true; // Update the flag after redirection
    } catch (error) {
      console.error('Error issuing certificate:', error);
      alert('Failed to issue certificate');
    }
  };

  return (
    <div style={{
      display: 'flex',
     flexDirection:'column',
      alignItems: 'center',

    }}>
      <Routes>
        <Route exact path="/" element={<IssueCertificate issueCertificateAndRedirect={handleIssueCertificateAndRedirect} />} />
        <Route path="/view" element={<ViewCertificate studentAddress={studentAddress} />} />
      </Routes>


      {/* Conditional rendering based on the flag */}
      {Redirect === false &&
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Link to="/view">
            <button>Go to View</button>
          </Link>
        </div>
      }

      {Redirect === true &&
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Link to="/">
            <button>Go to Issue</button>
          </Link>
        </div>
      }

    </div>
  );
}

export default App;
