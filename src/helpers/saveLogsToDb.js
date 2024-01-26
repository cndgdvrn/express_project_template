const Logs = require("../models/logs");

const saveLogsToDb = async (message) => {
  const [method, url, statusCode] = message.split(" ");

  const log = new Logs({
    method,
    url,
    statusCode,
  });
  await log.save();
};

module.exports = saveLogsToDb;
