import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Grid,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  // 仮のデータ
  const userData = {
    username: 'ゲストユーザー',
    level: 5,
    experience: 2500,
    achievements: [
      { id: 1, name: '初めてのプレイ', description: '初めてゲームをプレイしました' },
      { id: 2, name: 'スコア1000', description: 'スコア1000を達成しました' },
    ],
    recentScores: [
      { id: 1, score: 1200, date: '2023-12-01' },
      { id: 2, score: 1500, date: '2023-12-02' },
      { id: 3, score: 1800, date: '2023-12-03' },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* プロフィール情報 */}
        <Grid columns={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{ width: 100, height: 100, mb: 2 }}
                alt={userData.username}
              />
              <Typography variant="h5" gutterBottom>
                {userData.username}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                レベル {userData.level}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                経験値 {userData.experience}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* アチーブメント */}
        <Grid columns={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              アチーブメント
            </Typography>
            <List>
              {userData.achievements.map((achievement) => (
                <ListItem key={achievement.id}>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={achievement.name}
                    secondary={achievement.description}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* 最近のスコア */}
        <Grid columns={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              最近のスコア
            </Typography>
            <List>
              {userData.recentScores.map((score) => (
                <ListItem key={score.id}>
                  <ListItemText
                    primary={`スコア: ${score.score}`}
                    secondary={`日付: ${score.date}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 