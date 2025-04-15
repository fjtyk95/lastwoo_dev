import mongoose from 'mongoose';

// MongoDBの接続をモック化
jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue({}),
  connection: {
    on: jest.fn(),
    once: jest.fn(),
    close: jest.fn().mockResolvedValue(undefined),
  },
}));

// テスト終了後にMongoDBの接続をクリーンアップ
afterAll(async () => {
  await mongoose.connection.close();
}); 