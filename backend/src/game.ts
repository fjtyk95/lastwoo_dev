import { Server, Socket } from 'socket.io';

interface GameState {
  currentWord: string;
  player1Score: number;
  player2Score: number;
  history: Array<{ word: string; player: string }>;
  usedWords: Set<string>;
}

export class Game {
  private state: GameState;
  private players: Map<string, Socket>;

  constructor() {
    this.state = {
      currentWord: 'りんご',
      player1Score: 0,
      player2Score: 0,
      history: [],
      usedWords: new Set(['りんご']),
    };
    this.players = new Map();
  }

  public initialize(io: Server) {
    io.on('connection', (socket) => {
      console.log('プレイヤーが接続しました:', socket.id);

      // プレイヤーを追加
      this.players.set(socket.id, socket);

      // 初期状態を送信
      socket.emit('gameState', this.state);

      // メッセージ受信
      socket.on('message', (data: string) => {
        try {
          const { type, word } = JSON.parse(data);
          if (type === 'word') {
            this.handleWord(socket, word);
          }
        } catch (error) {
          console.error('メッセージ処理エラー:', error);
        }
      });

      // 切断処理
      socket.on('disconnect', () => {
        console.log('プレイヤーが切断しました:', socket.id);
        this.players.delete(socket.id);
      });
    });
  }

  private handleWord(socket: Socket, word: string) {
    // 単語の検証
    if (!this.isValidWord(word)) {
      socket.emit('error', '無効な単語です');
      return;
    }

    // スコア計算
    const score = this.calculateScore(word);

    // 状態更新
    this.state.currentWord = word;
    this.state.usedWords.add(word);
    this.state.history.push({ word, player: socket.id });
    
    // プレイヤーのスコアを更新
    if (this.players.size === 1) {
      this.state.player1Score += score;
    } else {
      this.state.player2Score += score;
    }

    // 全プレイヤーに状態を送信
    this.broadcastState();
  }

  private isValidWord(word: string): boolean {
    // ひらがなのみ許可
    if (!/^[ぁ-ん]+$/.test(word)) {
      return false;
    }

    // 既に使用された単語は不可
    if (this.state.usedWords.has(word)) {
      return false;
    }

    // 前の単語の最後の文字で始まる必要がある
    const lastChar = this.state.currentWord.slice(-1);
    return word.startsWith(lastChar);
  }

  private calculateScore(word: string): number {
    // 単語の長さに応じてスコアを計算
    return word.length * 10;
  }

  private broadcastState() {
    const state = {
      currentWord: this.state.currentWord,
      player1Score: this.state.player1Score,
      player2Score: this.state.player2Score,
      history: this.state.history,
    };

    this.players.forEach((socket) => {
      socket.emit('gameState', state);
    });
  }
} 