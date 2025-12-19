import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';
import adminRoutes from "./routes/adminRoute.js";

const app = express();
const port = process.env.PORT || 5000;

await connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.get('/', (req, res) => res.send("API is working"));
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
app.use("/api/admin", adminRoutes);

app.get('/api/admin/customers', async (req, res) => {
  const customers = await Customer.find(); 
  res.json(customers);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
