export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("Test API called!");
  console.log("Request method:", req.method);
  console.log("Request body:", req.body);

  res.status(200).json({
    success: true,
    message: "Test API is working!",
    timestamp: new Date().toISOString(),
    body: req.body,
  });
}
