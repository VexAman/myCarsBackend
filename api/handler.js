import app from './app.js';

export default async (req, res) => {
  await app(req, res); // Delegate to your Express app
};
