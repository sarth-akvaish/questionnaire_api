import express from 'express'
import dotenv from 'dotenv'
import connToDB from './db.js'
import adminRoutes from './routes/adminRoute.js'
import quesRoutes from './routes/quesRoute.js'
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/admin', adminRoutes);

app.use('/api', quesRoutes);

app.get('/', (req, res) => {
    res.json('Hey I am here')
})

app.listen(port, () => {
    connToDB();
    console.log(`Server running on port ${port}`);
});
