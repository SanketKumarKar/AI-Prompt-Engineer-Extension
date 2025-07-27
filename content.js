// Content script to inject prompt generation interface into LLM websites
let promptInterface = null;
let isInterfaceVisible = false;

// Platform detection for optimization
function detectCurrentPlatform() {
  const hostname = window.location.hostname.toLowerCase();
  const supportedPlatforms = {
    'chatgpt.com': 'chatgpt',
    'chat.openai.com': 'chatgpt',
    'claude.ai': 'claude',
    'perplexity.ai': 'perplexity',
    'chat.deepseek.com': 'deepseek',
    'gemini.google.com': 'gemini',
    'bard.google.com': 'gemini',
    'copilot.microsoft.com': 'copilot',
    'poe.com': 'poe',
    'huggingface.co': 'huggingface'
  };

  // Check for exact matches first
  for (const [domain, platform] of Object.entries(supportedPlatforms)) {
    if (hostname === domain || hostname.endsWith('.' + domain)) {
      return platform;
    }
  }

  // Check for partial matches (e.g., subdomains)
  for (const [domain, platform] of Object.entries(supportedPlatforms)) {
    if (hostname.includes(domain.split('.')[0])) {
      return platform;
    }
  }

  return 'general'; // Default fallback
}

// Initialize the extension when DOM is ready
document.addEventListener('DOMContentLoaded', initializeExtension);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}

function initializeExtension() {
  const platform = detectCurrentPlatform();
  console.log(`AI Prompt Engineer: Initializing on ${window.location.hostname} (detected: ${platform})`);
  
  // Wait a bit for the page to fully load
  setTimeout(() => {
    createPromptInterface();
    addToggleButton();
    addPlatformIndicator(platform);
  }, 2000);
}

function createPromptInterface() {
  if (promptInterface) return;

  const platform = detectCurrentPlatform();
  const platformInfo = getPlatformOptimizationInfo(platform);

  promptInterface = document.createElement('div');
  promptInterface.id = 'ai-prompt-engineer-interface';
  promptInterface.innerHTML = `
    <div class="ape-container">
      <div class="ape-header">
        <h3>AI Prompt Engineer</h3>
        <div class="ape-platform-badge">
          ${platformInfo.emoji} ${platformInfo.name}
        </div>
        <button class="ape-close" onclick="togglePromptInterface()">×</button>
      </div>
      <div class="ape-content">
        <div class="ape-input-group">
          <label for="ape-keywords">Enter Keywords <span style="color: #64748b; font-weight: 400;">(3-4 recommended)</span>:</label>
          <input type="text" id="ape-keywords" placeholder="e.g., responsive website, modern design, React">
        </div>
        <div class="ape-input-group">
          <label for="ape-task-type">Task Type:</label>
          <select id="ape-task-type">
            <option value="general">General Purpose</option>
            <option value="image-generation">🎨 Image Generation</option>
            <option value="code-generation">💻 Code & Development</option>
            <option value="writing">✍️ Writing & Content</option>
            <option value="analysis">📊 Analysis & Research</option>
            <option value="creative">🎭 Creative & Brainstorming</option>
            <option value="website">🌐 Website Development</option>
          </select>
        </div>
        <div class="ape-platform-info">
          <small>✨ Optimized for ${platformInfo.name} with ${platformInfo.style} formatting</small>
        </div>
        <div class="ape-actions">
          <button id="ape-generate" class="ape-btn-primary">✨ Generate ${platformInfo.name} Prompt</button>
          <button id="ape-clear" class="ape-btn-secondary">🗑️ Clear</button>
        </div>
        <div class="ape-output">
          <label>Generated Prompt:</label>
          <textarea id="ape-result" readonly placeholder="Your expertly crafted ${platformInfo.name}-optimized prompt will appear here..."></textarea>
          <div class="ape-output-actions">
            <button id="ape-copy" class="ape-btn-secondary">📋 Copy</button>
            <button id="ape-insert" class="ape-btn-primary">🚀 Insert</button>
          </div>
        </div>
        <div id="ape-loading" class="ape-loading" style="display: none;">
          <div class="ape-spinner"></div>
          <span>Crafting your ${platformInfo.name}-optimized prompt...</span>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(promptInterface);
  attachEventListeners();
}

function addToggleButton() {
  const toggleButton = document.createElement('div');
  toggleButton.id = 'ape-toggle-button';
  
  // Create an image element for the logo
  const logoImg = document.createElement('img');
  logoImg.src = chrome.runtime.getURL('icons/logo.png');
  logoImg.alt = 'AI Prompt Engineer';
  logoImg.style.width = '32px';
  logoImg.style.height = '32px';
  logoImg.style.borderRadius = '6px';
  
  // Fallback if logo doesn't load
  logoImg.onerror = function() {
    toggleButton.innerHTML = '🤖';
    toggleButton.style.fontSize = '28px';
  };
  
  toggleButton.appendChild(logoImg);
  toggleButton.title = 'AI Prompt Engineer - Click to generate prompts';
  toggleButton.onclick = togglePromptInterface;
  
  document.body.appendChild(toggleButton);
}

function addPlatformIndicator(platform) {
  const platformInfo = getPlatformOptimizationInfo(platform);
  
  // Create a small platform indicator that appears briefly
  const indicator = document.createElement('div');
  indicator.id = 'ape-platform-indicator';
  indicator.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      z-index: 10001;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    ">
      ${platformInfo.emoji} AI Prompt Engineer: ${platformInfo.name} optimization active
    </div>
  `;
  
  document.body.appendChild(indicator);
  
  // Show and hide the indicator
  setTimeout(() => {
    indicator.firstElementChild.style.opacity = '1';
  }, 500);
  
  setTimeout(() => {
    indicator.firstElementChild.style.opacity = '0';
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
    }, 300);
  }, 3000);
}

function attachEventListeners() {
  const generateBtn = document.getElementById('ape-generate');
  const clearBtn = document.getElementById('ape-clear');
  const copyBtn = document.getElementById('ape-copy');
  const insertBtn = document.getElementById('ape-insert');
  const keywordsInput = document.getElementById('ape-keywords');

  generateBtn.addEventListener('click', generatePrompt);
  clearBtn.addEventListener('click', clearFields);
  copyBtn.addEventListener('click', copyPrompt);
  insertBtn.addEventListener('click', insertPrompt);
  
  // Allow Enter key to generate prompt
  keywordsInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      generatePrompt();
    }
  });

  // Add input validation and hints
  keywordsInput.addEventListener('input', (e) => {
    const value = e.target.value;
    const keywordCount = value.split(',').filter(k => k.trim().length > 0).length;
    
    // Update placeholder based on input
    if (keywordCount === 0) {
      e.target.style.borderColor = '#e2e8f0';
    } else if (keywordCount < 2) {
      e.target.style.borderColor = '#f59e0b';
    } else {
      e.target.style.borderColor = '#10b981';
    }
  });

  // Add task type change handler for better UX
  const taskSelect = document.getElementById('ape-task-type');
  taskSelect.addEventListener('change', (e) => {
    const taskType = e.target.value;
    updatePlaceholderForTaskType(taskType);
  });
}

function updatePlaceholderForTaskType(taskType) {
  const keywordsInput = document.getElementById('ape-keywords');
  const placeholders = {
    'image-generation': 'e.g., cyberpunk cityscape, neon lights, rain',
    'code-generation': 'e.g., React components, responsive design, hooks',
    'writing': 'e.g., technical blog post, beginner audience, tutorial',
    'analysis': 'e.g., market research, consumer behavior, trends',
    'creative': 'e.g., brand story, emotional connection, innovation',
    'website': 'e.g., e-commerce platform, modern UI, mobile-first',
    'general': 'e.g., project management, automation, efficiency'
  };
  
  keywordsInput.placeholder = placeholders[taskType] || placeholders['general'];
}

function togglePromptInterface() {
  if (!promptInterface) return;
  
  isInterfaceVisible = !isInterfaceVisible;
  promptInterface.style.display = isInterfaceVisible ? 'block' : 'none';
}

async function generatePrompt() {
  const keywords = document.getElementById('ape-keywords').value.trim();
  const taskType = document.getElementById('ape-task-type').value;
  const platform = detectCurrentPlatform(); // Get current platform
  const loading = document.getElementById('ape-loading');
  const resultTextarea = document.getElementById('ape-result');

  if (!keywords) {
    showNotification('Please enter some keywords first!', 'warning');
    document.getElementById('ape-keywords').focus();
    return;
  }

  // Validate keywords length and quality
  const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
  if (keywordArray.length < 2) {
    showNotification('Please enter at least 2 keywords for better results', 'warning');
    return;
  }

  loading.style.display = 'block';
  resultTextarea.value = '';

  try {
    const response = await new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { action: 'generatePrompt', keywords, taskType, platform }, // Include platform
        (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
            return;
          }
          
          if (response && response.success) {
            resolve(response.prompt);
          } else if (response && response.fallback) {
            // Use fallback if API fails but fallback is available
            showNotification(`Using ${platform}-optimized fallback template`, 'info');
            resolve(response.fallback);
          } else {
            reject(new Error(response ? response.error : 'No response received'));
          }
        }
      );
    });

    resultTextarea.value = response;
    loading.style.display = 'none';
    showNotification(`${platform.charAt(0).toUpperCase() + platform.slice(1)}-optimized prompt generated!`, 'success');
    
    // Update UI to show prompt is ready
    const insertBtn = document.getElementById('ape-insert');
    insertBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)';
    setTimeout(() => {
      insertBtn.style.background = '';
    }, 2000);

  } catch (error) {
    console.error('Error generating prompt:', error);
    loading.style.display = 'none';
    
    // Provide a comprehensive fallback prompt with platform optimization
    const fallbackPrompt = createAdvancedFallbackPrompt(keywords, taskType, platform);
    resultTextarea.value = fallbackPrompt;
    
    showNotification(`Generated ${platform}-optimized offline template. Try again for AI-enhanced version.`, 'warning');
  }
}

function createAdvancedFallbackPrompt(keywords, taskType, platform = 'general') {
  const taskInfo = getTaskTypeInfo(taskType);
  const platformInfo = getPlatformOptimizationInfo(platform);
  
  return `${taskInfo.emoji} ${taskInfo.title.toUpperCase()} PROMPT
${platformInfo.emoji} Optimized for ${platformInfo.name}

**Objective:** Create ${taskInfo.description} based on: ${keywords}

${taskInfo.template}

**Platform-Specific Optimization (${platformInfo.name}):**
${platformInfo.bulletFormat} ${platformInfo.optimization}
${platformInfo.bulletFormat} Use ${platformInfo.style} formatting style
${platformInfo.bulletFormat} Focus on ${platformInfo.focus} approach
${platformInfo.bulletFormat} Leverage ${platformInfo.strength} capabilities

**Quality Requirements:**
✅ Professional-grade output
✅ Attention to detail and accuracy  
✅ Industry best practices
✅ User-focused approach
✅ Scalable and maintainable solution

**Keywords Focus:** ${keywords}

**${platformInfo.name}-Specific Instructions:**
${platformInfo.bulletFormat} Structure response with clear ${platformInfo.bulletFormat} bullet points
${platformInfo.bulletFormat} Include detailed sub-points for complex topics
${platformInfo.bulletFormat} Use hierarchical organization for better readability
${platformInfo.bulletFormat} End with actionable next steps

**Additional Notes:**
- Prioritize quality over speed
- Consider current industry trends
- Ensure accessibility and usability
- Include documentation where appropriate

---
🤖 Generated by AI Prompt Engineer (${platformInfo.name}-Optimized Template)
💡 For enhanced prompts, ensure internet connection and try again`;
}

function getPlatformOptimizationInfo(platform) {
  const platformConfigs = {
    'perplexity': {
      name: 'Perplexity',
      emoji: '🔍',
      bulletFormat: '•',
      optimization: 'Research-focused detailed analysis with comprehensive sourcing',
      style: 'structured analytical',
      focus: 'evidence-based research',
      strength: 'information synthesis and fact-checking'
    },
    'chatgpt': {
      name: 'ChatGPT',
      emoji: '🤖',
      bulletFormat: '●',
      optimization: 'Conversational yet comprehensive with detailed explanations',
      style: 'conversational-detailed',
      focus: 'step-by-step guidance',
      strength: 'contextual understanding and dialogue'
    },
    'claude': {
      name: 'Claude',
      emoji: '🎯',
      bulletFormat: '▪',
      optimization: 'Analytical structured responses with hierarchical thinking',
      style: 'analytical-structured',
      focus: 'systematic problem-solving',
      strength: 'nuanced analysis and ethical reasoning'
    },
    'deepseek': {
      name: 'DeepSeek',
      emoji: '⚡',
      bulletFormat: '→',
      optimization: 'Technical precision with code-focused implementation details',
      style: 'technical-precise',
      focus: 'implementation excellence',
      strength: 'technical depth and coding expertise'
    },
    'gemini': {
      name: 'Gemini',
      emoji: '✨',
      bulletFormat: '◆',
      optimization: 'Multimodal comprehensive analysis with visual integration',
      style: 'multimodal-comprehensive',
      focus: 'holistic understanding',
      strength: 'cross-modal reasoning and integration'
    },
    'general': {
      name: 'Universal LLM',
      emoji: '🌐',
      bulletFormat: '•',
      optimization: 'Universal compatibility with platform-agnostic structure',
      style: 'adaptive-comprehensive',
      focus: 'broad compatibility',
      strength: 'universal prompt engineering principles'
    }
  };

  return platformConfigs[platform] || platformConfigs['general'];
}

function getTaskTypeInfo(taskType) {
  const taskTypes = {
    'image-generation': {
      emoji: '🎨',
      title: 'Professional Image Generation',
      description: 'stunning visual content',
      template: `**Visual Requirements:**
- Style: [Photorealistic/Artistic/Illustration]
- Composition: [Portrait/Landscape/Square format]
- Color scheme: [Vibrant/Monochrome/Pastel/Bold]
- Lighting: [Natural/Studio/Dramatic/Soft]
- Mood: [Professional/Creative/Energetic/Calm]

**Technical Specifications:**
- Resolution: High resolution (4K preferred)
- Quality: Professional/Commercial grade
- Format: [JPEG/PNG/SVG as appropriate]

**Content Details:**
- Main subject: [Elaborate on primary focus]
- Background: [Complementary to main subject]
- Props/Elements: [Supporting visual elements]`
    },
    'code-generation': {
      emoji: '💻',
      title: 'Professional Code Development',
      description: 'robust software solution',
      template: `**Technical Specifications:**
- Language: [Most appropriate for the task]
- Framework: [Modern, well-supported options]
- Architecture: [Clean, modular design]
- Dependencies: [Minimal, security-focused]

**Code Requirements:**
- Structure: Organized, readable codebase
- Documentation: Comprehensive comments and README
- Testing: Unit tests and validation
- Security: Follow OWASP guidelines
- Performance: Optimized for efficiency

**Implementation Details:**
- Error handling: Robust exception management
- Logging: Appropriate logging levels
- Configuration: Environment-based settings`
    },
    'writing': {
      emoji: '✍️',
      title: 'Professional Content Creation',
      description: 'engaging written content',
      template: `**Content Strategy:**
- Audience: [Primary target demographic]
- Purpose: [Inform/Persuade/Entertain/Educate]
- Tone: [Professional/Conversational/Academic/Creative]
- Style: [Formal/Casual/Technical/Narrative]

**Structure Requirements:**
- Format: [Article/Blog/Report/Copy]
- Length: [Appropriate for medium and audience]
- Sections: [Logical organization with headers]
- Flow: [Smooth transitions between ideas]

**Content Elements:**
- Hook: Compelling opening statement
- Key points: [3-5 main arguments/topics]
- Supporting evidence: [Facts, examples, data]
- Call to action: [Clear next steps for readers]`
    },
    'analysis': {
      emoji: '📊',
      title: 'Professional Data Analysis',
      description: 'comprehensive analytical insights',
      template: `**Analysis Framework:**
- Methodology: [Quantitative/Qualitative/Mixed]
- Data sources: [Primary and secondary data]
- Analytical tools: [Appropriate software/techniques]
- Validation: [Cross-reference and verify findings]

**Research Approach:**
- Hypothesis: [Clear research questions]
- Variables: [Dependent and independent factors]
- Sample size: [Statistically significant]
- Timeframe: [Relevant time period]

**Deliverables:**
- Executive summary: [Key findings overview]
- Detailed analysis: [Comprehensive results]
- Visualizations: [Charts, graphs, dashboards]
- Recommendations: [Actionable insights]`
    },
    'creative': {
      emoji: '🎭',
      title: 'Professional Creative Development',
      description: 'innovative creative solution',
      template: `**Creative Direction:**
- Concept: [Core creative idea]
- Theme: [Underlying message/emotion]
- Style: [Visual/Narrative approach]
- Innovation: [Unique differentiators]

**Creative Requirements:**
- Originality: [Fresh, unique perspective]
- Brand alignment: [Consistent with brand values]
- Target impact: [Desired emotional response]
- Scalability: [Adaptable across platforms]

**Execution Details:**
- Format: [Video/Image/Text/Interactive]
- Platforms: [Where it will be used]
- Timeline: [Production schedule]
- Resources: [Required tools and skills]`
    },
    'website': {
      emoji: '🌐',
      title: 'Professional Web Development',
      description: 'modern, functional website',
      template: `**Project Specifications:**
- Website type: [Corporate/E-commerce/Portfolio/Blog]
- Target audience: [Primary user demographics]
- Key objectives: [Business goals and user needs]
- Platform: [CMS/Custom/Framework-based]

**Technical Requirements:**
- Responsive design: Mobile-first approach
- Performance: Fast loading (< 3 seconds)
- SEO: Search engine optimized
- Accessibility: WCAG compliance
- Security: SSL, secure coding practices

**Feature Set:**
- Core functionality: [Essential features]
- User interactions: [Forms, navigation, search]
- Content management: [How content is updated]
- Integrations: [Third-party services/APIs]`
    },
    'general': {
      emoji: '⚡',
      title: 'Professional Task Completion',
      description: 'comprehensive solution',
      template: `**Task Definition:**
- Objective: [Clear, measurable goal]
- Scope: [What's included and excluded]
- Success criteria: [How success is measured]
- Timeline: [Realistic completion timeframe]

**Approach Strategy:**
- Methodology: [Step-by-step process]
- Resources: [Required tools and materials]
- Quality standards: [Expected level of excellence]
- Risk mitigation: [Potential challenges and solutions]

**Deliverables:**
- Primary output: [Main result/product]
- Documentation: [Process and instructions]
- Testing/Validation: [Quality assurance measures]
- Maintenance: [Ongoing support requirements]`
    }
  };

  return taskTypes[taskType] || taskTypes['general'];
}

function clearFields() {
  document.getElementById('ape-keywords').value = '';
  document.getElementById('ape-result').value = '';
  document.getElementById('ape-task-type').value = 'general';
}

function copyPrompt() {
  const resultTextarea = document.getElementById('ape-result');
  if (!resultTextarea.value) {
    showNotification('No prompt to copy!', 'warning');
    return;
  }

  navigator.clipboard.writeText(resultTextarea.value).then(() => {
    const copyBtn = document.getElementById('ape-copy');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✅ Copied!';
    copyBtn.style.background = '#10b981';
    copyBtn.style.color = 'white';
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.background = '';
      copyBtn.style.color = '';
    }, 2000);
    showNotification('Prompt copied to clipboard!', 'success');
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = 'ape-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#6366f1'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 10002;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    animation: slideInNotification 0.3s ease-out forwards;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutNotification 0.3s ease-out forwards';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function insertPrompt() {
  const prompt = document.getElementById('ape-result').value;
  if (!prompt) {
    showNotification('No prompt to insert!', 'warning');
    return;
  }

  const chatInput = findChatInput();
  if (chatInput) {
    // Clear existing content and insert new prompt
    chatInput.value = prompt;
    chatInput.textContent = prompt;
    
    // Trigger input events to notify the chat interface
    ['input', 'change', 'keyup'].forEach(eventType => {
      chatInput.dispatchEvent(new Event(eventType, { bubbles: true }));
    });

    // Focus on the input
    chatInput.focus();
    
    // Hide the interface after insertion
    togglePromptInterface();
    
    showNotification('Prompt inserted successfully!', 'success');
  } else {
    showNotification('Could not find chat input. Prompt copied to clipboard instead.', 'warning');
    // Fallback to copying
    navigator.clipboard.writeText(prompt);
  }
}

function findChatInput() {
  // Common selectors for chat inputs across different LLM websites
  const selectors = [
    'textarea[placeholder*="message"]',
    'textarea[placeholder*="Message"]',
    'textarea[placeholder*="Ask"]',
    'textarea[placeholder*="Type"]',
    'div[contenteditable="true"]',
    'textarea[data-testid="textbox"]',
    '#prompt-textarea',
    '.ProseMirror',
    'textarea[name="message"]',
    'textarea[aria-label*="message"]',
    'textarea[aria-label*="Message"]'
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element && element.offsetParent !== null) { // Check if element is visible
      return element;
    }
  }

  return null;
}

// Make toggle function globally accessible
window.togglePromptInterface = togglePromptInterface;
