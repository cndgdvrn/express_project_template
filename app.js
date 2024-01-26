require("express-async-errors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const router = require("./src/routers/index.js");
const { handleServerError } = require("./src/helpers/handleError.js");

//CUSTOM ERROR HANDLER
const custom_error_handler = require("./src/middlewares/custom_error_handler.js");
//SAVE LOGS TO DB
//const saveLogsToDb = require("./src/helpers/saveLogsToDb.js");
const { corsOptionsDelegate } = require("./src/helpers/corsOptions.js");
const { rateLimiter } = require("./src/middlewares/lib/rate_limiter.js");


//DB CONNECTION
require("./src/config/db/db.js");

const app = express();

app.use(cors(corsOptionsDelegate));

app.use(rateLimiter)

/* app.use(
  morgan("tiny", {
    stream: {
      write: (message) => {
        saveLogsToDb(message);
      },
    },
  })
);
*/
app.use(morgan("tiny"));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(express.static("public"));

app.use(
  mongoSanitize({
    allowDots: false,
    replaceWith: "_",
  })
);


app.use("/api", router);

app.use(custom_error_handler);

app.listen(PORT, handleServerError);
