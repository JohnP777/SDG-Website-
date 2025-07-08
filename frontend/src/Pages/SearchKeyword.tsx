import Page from '../Components/Page';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import teamsImg from '../Assets/teams.jpg';
import actionformImg from '../Assets/actionform.jpg';
import databaseImg from '../Assets/database.jpg';

const SearchKeyword = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('token-expiry');
    if (token && expiry && Date.now() < new Date(expiry).getTime()) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const teamsLink = loggedIn ? '/teams' : '/signup';
  const actionFormLink = loggedIn ? '/sdg-form' : '/signup';

  return (
    <Page>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: { xs: 2, md: 8 },
        marginTop: '10px',
        minHeight: 'calc(100vh - 300px)',
        width: '100%'
      }}>
        {/* Teams */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <a href={teamsLink} style={{ textDecoration: 'none' }}>
            <Typography variant="h5" sx={{ color: '#1565c0', fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
              SDG Action Teams
            </Typography>
            <img src={teamsImg} alt="Teams" style={{ width: '100%', maxWidth: 340, height: 260, objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer' }} />
          </a>
        </Box>
        {/* Action Form */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <a href={actionFormLink} style={{ textDecoration: 'none' }}>
            <Typography variant="h5" sx={{ color: '#1565c0', fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
              Create an SDG Action Plan
            </Typography>
            <img src={actionformImg} alt="Action Form" style={{ width: '100%', maxWidth: 340, height: 260, objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer' }} />
          </a>
        </Box>
        {/* Database */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <a href="https://sdg.unswzoo.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Typography variant="h5" sx={{ color: '#1565c0', fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
              SDG Database
            </Typography>
            <img src={databaseImg} alt="Database" style={{ width: '100%', maxWidth: 340, height: 260, objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer' }} />
          </a>
        </Box>
      </Box>
    </Page>
  );
};

export default SearchKeyword;
