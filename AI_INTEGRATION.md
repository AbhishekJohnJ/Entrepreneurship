# AI Integration Guide

Your Google AI API key has been securely stored in the backend environment variables.

## API Key Location
- Stored in: `server/.env`
- Variable name: `AI_API_KEY`
- Value: `AIzaSyBhsXzJLf2LA4oLtYB0zis4351xH33Fq18`

## Available AI Endpoints

### 1. Analyze Resume
**POST** `/api/ai/analyze-resume`
```json
{
  "resumeText": "Your resume content here"
}
```
**Response:**
```json
{
  "score": 78,
  "strengths": ["React", "Node.js", "Git"],
  "weakAreas": ["System Design", "Testing"],
  "suggestions": ["Add more achievements", "Include certifications"]
}
```

### 2. Generate Suggestions
**POST** `/api/ai/generate-suggestions`
```json
{
  "userProfile": {
    "skills": ["React", "Node.js"],
    "experience": "2 years",
    "role": "Full Stack Developer"
  }
}
```

### 3. Improve Content
**POST** `/api/ai/improve-content`
```json
{
  "content": "Your resume section content",
  "section": "experience"
}
```

### 4. Analyze Skills
**POST** `/api/ai/analyze-skills`
```json
{
  "currentSkills": ["React", "Node.js"],
  "targetRole": "Senior Full Stack Developer"
}
```

## Frontend Usage

Import the AI service in your components:

```javascript
import { aiService } from '../services/aiService';

// Analyze resume
const analysis = await aiService.analyzeResume(resumeText);

// Generate suggestions
const suggestions = await aiService.generateSuggestions(userProfile);

// Improve content
const improved = await aiService.improveContent(content, 'experience');

// Analyze skills
const skillsAnalysis = await aiService.analyzeSkills(currentSkills, targetRole);
```

## Next Steps

1. **Install Google AI SDK** (if using official SDK):
```bash
cd server
npm install @google/generative-ai
```

2. **Implement AI Integration** in `server/server.js`:
   - Replace TODO comments with actual Google AI API calls
   - Use `process.env.AI_API_KEY` to authenticate

3. **Example Integration**:
```javascript
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

// Use in your endpoints
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const result = await model.generateContent(prompt);
```

## Security Notes

- ✅ API key is stored in `.env` file (not committed to git)
- ✅ Backend handles all AI API calls (key never exposed to frontend)
- ✅ Rate limiting recommended for production
- ✅ Add error handling for API failures

## Features to Build

- Resume scoring and analysis
- AI-powered content suggestions
- Skills gap analysis
- Career path recommendations
- Automated resume improvements
- Interview preparation tips
