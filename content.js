// Content script to inject prompt generation interface into LLM websites
let promptInterface = null;
let isInterfaceVisible = false;

// Initialize the extension when DOM is ready
document.addEventListener('DOMContentLoaded', initializeExtension);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}

function initializeExtension() {
  console.log('AI Prompt Engineer: Initializing on', window.location.hostname);
  
  // Wait a bit for the page to fully load
  setTimeout(() => {
    createPromptInterface();
    addToggleButton();
  }, 2000);
}

function createPromptInterface() {
  if (promptInterface) return;

  promptInterface = document.createElement('div');
  promptInterface.id = 'ai-prompt-engineer-interface';
  promptInterface.innerHTML = `
    <div class="ape-container">
      <div class="ape-header">
        <h3>AI Prompt Engineer</h3>
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
        <div class="ape-actions">
          <button id="ape-generate" class="ape-btn-primary">✨ Generate Prompt</button>
          <button id="ape-clear" class="ape-btn-secondary">🗑️ Clear</button>
        </div>
        <div class="ape-output">
          <label>Generated Prompt:</label>
          <textarea id="ape-result" readonly placeholder="Your expertly crafted prompt will appear here..."></textarea>
          <div class="ape-output-actions">
            <button id="ape-copy" class="ape-btn-secondary">📋 Copy</button>
            <button id="ape-insert" class="ape-btn-primary">🚀 Insert</button>
          </div>
        </div>
        <div id="ape-loading" class="ape-loading" style="display: none;">
          <div class="ape-spinner"></div>
          <span>Crafting your professional prompt...</span>
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
        { action: 'generatePrompt', keywords, taskType },
        (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
            return;
          }
          
          if (response && response.success) {
            resolve(response.prompt);
          } else if (response && response.fallback) {
            // Use fallback if API fails but fallback is available
            showNotification('Using fallback prompt template', 'info');
            resolve(response.fallback);
          } else {
            reject(new Error(response ? response.error : 'No response received'));
          }
        }
      );
    });

    resultTextarea.value = response;
    loading.style.display = 'none';
    showNotification('Professional prompt generated successfully!', 'success');
    
    // Update UI to show prompt is ready
    const insertBtn = document.getElementById('ape-insert');
    insertBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)';
    setTimeout(() => {
      insertBtn.style.background = '';
    }, 2000);

  } catch (error) {
    console.error('Error generating prompt:', error);
    loading.style.display = 'none';
    
    // Provide a comprehensive fallback prompt
    const fallbackPrompt = createAdvancedFallbackPrompt(keywords, taskType);
    resultTextarea.value = fallbackPrompt;
    
    showNotification('Generated offline template. Try again for AI-enhanced version.', 'warning');
  }
}

function createAdvancedFallbackPrompt(keywords, taskType) {
  const taskInfo = getTaskTypeInfo(taskType);
  
  return `${taskInfo.emoji} ${taskInfo.title.toUpperCase()} PROMPT

**Objective:** Create ${taskInfo.description} based on: ${keywords}

${taskInfo.template}

**Quality Requirements:**
✅ Professional-grade output
✅ Attention to detail and accuracy
✅ Industry best practices
✅ User-focused approach
✅ Scalable and maintainable solution

**Keywords Focus:** ${keywords}

**Additional Notes:**
- Prioritize quality over speed
- Consider current industry trends
- Ensure accessibility and usability
- Include documentation where appropriate

---
🤖 Generated by AI Prompt Engineer (Offline Template)
💡 For enhanced prompts, ensure internet connection and try again`;
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
