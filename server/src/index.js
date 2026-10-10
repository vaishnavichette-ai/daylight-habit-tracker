import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import habitRoutes from './routes/habits.js';
import completionRoutes from './routes/completions.js';
const app=express();
app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173'}));app.use(express.json({limit:'32kb'}));
app.get('/api/health',(_req,res)=>res.json({status:'ok',service:'daylight-api'}));
app.use('/api/auth',authRoutes);app.use('/api/habits',habitRoutes);app.use('/api/completions',completionRoutes);
app.use((err,_req,res,_next)=>{console.error(err);if(err.name==='ValidationError')return res.status(400).json({message:Object.values(err.errors).map(x=>x.message).join(' ')});res.status(500).json({message:'Something went wrong. Please try again.'})});
const port=process.env.PORT||5000;
if(!process.env.JWT_SECRET){console.error('JWT_SECRET must be set in server/.env');process.exit(1)}
mongoose.connect(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/daylight').then(()=>app.listen(port,()=>console.log(`Daylight API listening on port ${port}`))).catch(err=>{console.error('MongoDB connection failed:',err.message);process.exit(1)});
