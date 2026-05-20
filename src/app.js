const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true, version: '1.0.0' }));
app.get('/users', (_req, res) => res.json({ users: ['alice', 'bob'] }));
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  res.status(201).json({ id: Date.now(), name });
});

if (require.main === module) {
  app.listen(3000, () => console.log('App running on port 3000'));
}
module.exports = app;
