const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/productivityTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  userId: String,
  productiveTime: Number,
  unproductiveTime: Number,
});

const User = mongoose.model('User', userSchema);

app.post('/api/save-time', async (req, res) => {
  const { domain, timeSpent } = req.body;
  const userId = 'someUniqueUserId'; // This can be retrieved via JWT or login system

  // Classify the website as productive or unproductive
  const isProductive = ['coding.com', 'github.com'].includes(domain);

  const user = await User.findOne({ userId });

  if (user) {
    if (isProductive) {
      user.productiveTime += timeSpent;
    } else {
      user.unproductiveTime += timeSpent;
    }
    await user.save();
  } else {
    const newUser = new User({
      userId,
      productiveTime: isProductive ? timeSpent : 0,
      unproductiveTime: isProductive ? 0 : timeSpent,
    });
    await newUser.save();
  }

  res.status(200).send('Time saved');
});

// Analytics Dashboard (for displaying user stats)
app.get('/dashboard', async (req, res) => {
  const userId = 'someUniqueUserId'; // This can be retrieved via JWT or login system

  const user = await User.findOne({ userId });

  if (user) {
    res.json({
      productiveTime: user.productiveTime,
      unproductiveTime: user.unproductiveTime,
    });
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});
