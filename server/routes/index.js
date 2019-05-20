const routes = require("./routes");
const router = express.Router();

routes.forEach(route => router.use(...route));

module.exports = router;