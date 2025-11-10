// middlewares/security.js
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const cors = require("cors");

// ✅ Configuration CORS : n'autoriser que ton frontend
const allowedOrigins = [
  "https://victorbuga.com", // ton front en production
  "http://localhost:3000",             // pour le dev local
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS non autorisé"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// ✅ Limiteur de requêtes (100 requêtes / 15 min / IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2000,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Trop de requêtes depuis cette IP. Réessayez plus tard.",
});

// ✅ Fonction pour appliquer les protections globales
function applySecurityMiddleware(app) {
  app.use(helmet());       // sécurise les headers HTTP
  app.use(xss());          // nettoie le body / query / params
  app.use(limiter);        // limite les requêtes abusives
  app.use(cors(corsOptions)); // autorise uniquement tes domaines
}

module.exports = applySecurityMiddleware;
