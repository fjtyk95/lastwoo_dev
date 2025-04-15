import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          LastWoo Game
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          楽しく遊んで、スコアを競おう！
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/game')}
            sx={{ mr: 2 }}
          >
            ゲームを始める
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/profile')}
          >
            プロフィール
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 