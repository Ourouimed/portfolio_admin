const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? process.env.ALLOW_CORS_URL.split(",")
    : [
        "http://localhost:5173",
      ];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without origin (Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default corsOptions;