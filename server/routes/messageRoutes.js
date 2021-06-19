const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// localhost3000/message/
router.post(
  '/',
  messageController.postMessage,
  (req, res) => {
    // res.cookie = 'Secret cookie';
    res.status(200).json(res.locals.message);
  }
);

router.get(
  '/',
  messageController.getMessages,
  (req, res) => {
    return res.status(200).json(res.locals.data);
  }
);

router.patch(
  '/:id', 
  messageController.patchMessage,
  (req, res) => {
    return res.status(200).json(res.locals.message);
  }
);

router.delete(
  '/:id',
  messageController.deleteMessage,
  (req, res) => (
    res.status(200).json({ message: 'Message deleted.' })
  )
);

module.exports = router;
