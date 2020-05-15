const express = require('express');
const router = express.Router();

router.post('/metric/:key', (req, res) => {
  const { key } = req.params;
  res.send(key);
});

module.exports = router;
