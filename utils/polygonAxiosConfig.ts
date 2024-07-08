const config = {
  headers: { Authorization: `Bearer ${process.env.POLYGON_API_KEY}` },
  baseURL: "https://api.polygon.io",
};

export default config;
