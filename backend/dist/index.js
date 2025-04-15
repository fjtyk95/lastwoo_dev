"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const game_1 = require("./game");
// 環境変数の読み込み
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.httpServer = (0, http_1.createServer)(exports.app);
const io = new socket_io_1.Server(exports.httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});
// ミドルウェア
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// データベース接続
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lastwoo')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
// ゲームの初期化
const game = new game_1.Game();
game.initialize(io);
// ルート
exports.app.get('/', (req, res) => {
    res.json({ message: 'LastWoo Game API' });
});
// サーバー起動
const PORT = process.env.NODE_ENV === 'test' ? 5001 : process.env.PORT || 5000;
exports.httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
