const express = require('express');
const router = express.Router();
const logger = require('../utils/logger').logger;

router.get('/', function (req, res, next) {
  try {
    logger.info('Check api');
    res.send({
      success: true
    });
  } catch (err) {
    {
      logger.error(err);
      res.status(400);
      res.send({
        success: false,
        msg: 'Something went wrong'
      });
    }
  }
});

module.exports = router;