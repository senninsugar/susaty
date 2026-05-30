import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
cors: {
origin: "*"
}
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const onlineUsers = new Map();

io.on("connection", (socket) => {
console.log("socket connected:", socket.id);

socket.on("join", (userId) => {
onlineUsers.set(userId, socket.id);
});

socket.on("disconnect", () => {
for (const [userId, socketId] of onlineUsers.entries()) {
if (socketId === socket.id) {
onlineUsers.delete(userId);
break;
}
}
});
});

app.get("/api/health", (req, res) => {
res.json({
success: true,
service: "sasuty"
});
});

app.post("/api/posts", async (req, res) => {
try {

```
const {
  userId,
  username,
  content
} = req.body;

if (!userId || !username || !content) {
  return res.status(400).json({
    success: false,
    message: "missing fields"
  });
}

const postId = uuidv4();

await db.execute({
  sql: `
    INSERT INTO posts (
      id,
      user_id,
      username,
      content
    )
    VALUES (?, ?, ?, ?)
  `,
  args: [
    postId,
    userId,
    username,
    content
  ]
});

const post = {
  id: postId,
  user_id: userId,
  username,
  content,
  created_at: new Date().toISOString()
};

io.emit("new-post", post);

res.json({
  success: true,
  post
});
```

} catch (error) {

```
console.error(error);

res.status(500).json({
  success: false,
  message: error.message
});
```

}
});

app.get("/api/posts", async (req, res) => {
try {

```
const result = await db.execute(`
  SELECT *
  FROM posts
  ORDER BY created_at DESC
  LIMIT 100
`);

res.json({
  success: true,
  posts: result.rows
});
```

} catch (error) {

```
res.status(500).json({
  success: false,
  message: error.message
});
```

}
});

app.get("/api/posts/:id", async (req, res) => {
try {

```
const result = await db.execute({
  sql: `
    SELECT *
    FROM posts
    WHERE id = ?
  `,
  args: [req.params.id]
});

if (!result.rows.length) {
  return res.status(404).json({
    success: false,
    message: "post not found"
  });
}

res.json({
  success: true,
  post: result.rows[0]
});
```

} catch (error) {

```
res.status(500).json({
  success: false,
  message: error.message
});
```

}
});

app.delete("/api/posts/:id", async (req, res) => {
try {

```
await db.execute({
  sql: `
    DELETE FROM posts
    WHERE id = ?
  `,
  args: [req.params.id]
});

io.emit("delete-post", req.params.id);

res.json({
  success: true
});
```

} catch (error) {

```
res.status(500).json({
  success: false,
  message: error.message
});
```

}
});

app.get("/api/profile/:userId", async (req, res) => {
try {

```
const result = await db.execute({
  sql: `
    SELECT *
    FROM posts
    WHERE user_id = ?
    ORDER BY created_at DESC
  `,
  args: [req.params.userId]
});

res.json({
  success: true,
  posts: result.rows
});
```

} catch (error) {

```
res.status(500).json({
  success: false,
  message: error.message
});
```

}
});

app.get("/api/search", async (req, res) => {
try {

```
const q = req.query.q || "";

const result = await db.execute({
  sql: `
    SELECT *
    FROM posts
    WHERE content LIKE ?
    ORDER BY created_at DESC
    LIMIT 50
  `,
  args: [`%${q}%`]
});

res.json({
  success: true,
  results: result.rows
});
```

} catch (error) {

```
res.status(500).json({
  success: false,
  message: error.message
});
```

}
});

app.get("/api/notifications/:userId", async (req, res) => {
try {

```
const result = await db.execute({
  sql: `
    SELECT *
    FROM notifications
    WHERE user_id = ?
    ORDER BY created_at DESC
  `,
  args: [req.params.userId]
});

res.json({
  success: true,
  notifications: result.rows
});
```

} catch (error) {

```
res.status(500).json({
  success: false,
  message: error.message
});
```

}
});

app.use(
express.static(
path.join(__dirname, "dist")
)
);

app.get(/^(?!/api).*/, (req, res) => {
res.sendFile(
path.join(__dirname, "dist", "index.html")
);
});

const PORT =
process.env.PORT ||
3000;

server.listen(PORT, () => {
console.log(
`Sasuty running on port ${PORT}`
);
});
