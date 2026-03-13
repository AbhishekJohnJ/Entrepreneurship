const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://abhishekjohnj411_db_user:<db_password>@cluster4.usw81tp.mongodb.net/portfolio_builder?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Register user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


// AI Routes

// Analyze resume
app.post('/api/ai/analyze-resume', async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    // TODO: Integrate with Google AI API using process.env.AI_API_KEY
    // For now, return mock data
    const analysis = {
      score: 78,
      strengths: ['React', 'Node.js', 'Git'],
      weakAreas: ['System Design', 'Testing'],
      suggestions: [
        'Add more quantifiable achievements',
        'Include relevant certifications',
        'Improve technical skills section'
      ]
    };

    res.json(analysis);
  } catch (error) {
    console.error('AI analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
});

// Generate suggestions
app.post('/api/ai/generate-suggestions', async (req, res) => {
  try {
    const { userProfile } = req.body;

    if (!userProfile) {
      return res.status(400).json({ error: 'User profile is required' });
    }

    // TODO: Integrate with Google AI API using process.env.AI_API_KEY
    const suggestions = {
      careerPath: 'Senior Full Stack Developer',
      skillsToLearn: ['Docker', 'Kubernetes', 'AWS'],
      projectIdeas: [
        'Build a microservices architecture',
        'Create a CI/CD pipeline',
        'Develop a scalable API'
      ]
    };

    res.json(suggestions);
  } catch (error) {
    console.error('AI suggestions error:', error);
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
});

// Improve content
app.post('/api/ai/improve-content', async (req, res) => {
  try {
    const { content, section } = req.body;

    if (!content || !section) {
      return res.status(400).json({ error: 'Content and section are required' });
    }

    // TODO: Integrate with Google AI API using process.env.AI_API_KEY
    const improvedContent = {
      original: content,
      improved: `Enhanced version of: ${content}`,
      changes: ['Made more concise', 'Added action verbs', 'Quantified results']
    };

    res.json(improvedContent);
  } catch (error) {
    console.error('AI improve content error:', error);
    res.status(500).json({ error: 'Failed to improve content' });
  }
});

// Analyze skills
app.post('/api/ai/analyze-skills', async (req, res) => {
  try {
    const { currentSkills, targetRole } = req.body;

    if (!currentSkills || !targetRole) {
      return res.status(400).json({ error: 'Current skills and target role are required' });
    }

    // TODO: Integrate with Google AI API using process.env.AI_API_KEY
    const analysis = {
      matchPercentage: 75,
      missingSkills: ['Docker', 'Kubernetes', 'System Design'],
      strongSkills: ['React', 'Node.js', 'MongoDB'],
      learningPath: [
        { skill: 'Docker', priority: 'High', estimatedTime: '2 weeks' },
        { skill: 'Kubernetes', priority: 'Medium', estimatedTime: '3 weeks' },
        { skill: 'System Design', priority: 'High', estimatedTime: '4 weeks' }
      ]
    };

    res.json(analysis);
  } catch (error) {
    console.error('AI skills analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze skills' });
  }
});
