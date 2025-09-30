const express = require('express');
const productsRouter = require('../routes/products');
const userRouter = require('../routes/users');
const rootRouters = require('../routes/root');
const { isLoggedin } = require('../middleware/isLoggedin');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173'
}));



app.use('/api/products', isLoggedin, productsRouter);
app.use('/api/users', userRouter);
app.use(rootRouters);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});