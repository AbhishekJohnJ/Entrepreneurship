// AI Service for interacting with Google AI API

const AI_API_ENDPOINT = 'http://localhost:5000/api/ai';

export const aiService = {
  // Analyze resume content
  analyzeResume: async (resumeText) => {
    try {
      const response = await fetch(`${AI_API_ENDPOINT}/analyze-resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze resume');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Generate resume suggestions
  generateSuggestions: async (userProfile) => {
    try {
      const response = await fetch(`${AI_API_ENDPOINT}/generate-suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userProfile }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate suggestions');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Improve resume content
  improveContent: async (content, section) => {
    try {
      const response = await fetch(`${AI_API_ENDPOINT}/improve-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, section }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to improve content');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Analyze skills gap
  analyzeSkills: async (currentSkills, targetRole) => {
    try {
      const response = await fetch(`${AI_API_ENDPOINT}/analyze-skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentSkills, targetRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze skills');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
};
