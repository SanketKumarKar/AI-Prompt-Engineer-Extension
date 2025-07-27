// Configuration file - Keep this secure and don't expose in production
const CONFIG = {
  // API Configuration - In production, this should be loaded from environment variables
  API: {
    KEY: 'sk_L-HP58vV4AElrD-NbF5MdZUVNdi3b0HRLiRI5DTomX0',
    BASE_URL: 'https://api.novita.ai/v3/openai',
    MODEL: 'qwen/qwen3-235b-a22b-instruct-2507',
    MAX_TOKENS: 4096,
    TEMPERATURE: 0.7,
    TOP_P: 0.9
  },
  
  // Extension Configuration
  EXTENSION: {
    NAME: 'AI Prompt Engineer',
    VERSION: '1.0.0',
    DEBUG: false
  }
};

// Export for background script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
