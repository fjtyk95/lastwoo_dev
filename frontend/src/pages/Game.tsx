import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useWebSocket } from '../hooks/useWebSocket';

interface GameState {
  currentWord: string;
  player1Score: number;
  player2Score: number;
  history: Array<{ word: string; player: string }>;
}

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentWord: 'りんご',
    player1Score: 0,
    player2Score: 0,
    history: [],
  });
  const [inputWord, setInputWord] = useState('');
  const { sendMessage, lastMessage } = useWebSocket();

  useEffect(() => {
    if (lastMessage) {
      // WebSocketからのメッセージを処理
      const data = JSON.parse(lastMessage.data);
      setGameState(prevState => ({
        ...prevState,
        currentWord: data.currentWord,
        player1Score: data.player1Score,
        player2Score: data.player2Score,
        history: [...prevState.history, { word: data.currentWord, player: data.player }],
      }));
    }
  }, [lastMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputWord) {
      sendMessage(JSON.stringify({
        type: 'word',
        word: inputWord,
      }));
      setInputWord('');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        LastWoo Game
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          現在の言葉: {gameState.currentWord}
        </Typography>
        <Typography variant="body1" gutterBottom>
          プレイヤー1: {gameState.player1Score} ポイント
        </Typography>
        <Typography variant="body1" gutterBottom>
          プレイヤー2: {gameState.player2Score} ポイント
        </Typography>
      </Paper>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            label="次の言葉"
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
          />
          <Button variant="contained" type="submit">
            送信
          </Button>
        </Box>
      </form>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          履歴
        </Typography>
        <List>
          {gameState.history.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.word}
                secondary={`プレイヤー: ${item.player}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Game; 