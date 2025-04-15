import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { Game } from './game';

// 環境変数の読み込み
dotenv.config();

export const app = express();
export const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// ミドルウェア
app.use(cors());
app.use(express.json());

// データベース接続
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lastwoo')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ゲームの初期化
const game = new Game();
game.initialize(io);

// ルート
app.get('/', (req, res) => {
  res.json({ message: 'LastWoo Game API' });
});

// サーバー起動
const PORT = process.env.NODE_ENV === 'test' ? 5001 : process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 