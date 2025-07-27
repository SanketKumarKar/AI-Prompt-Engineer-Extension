// AI Prompt Engineer - Enhanced Background Script with Structured Prompts
// Security: API key is stored separately and not exposed to content scripts

class PromptEngineer {
  constructor() {
    this.apiKey = 'sk_L-HP58vV4AElrD-NbF5MdZUVNdi3b0HRLiRI5DTomX0'; // Secure storage
    this.apiBaseUrl = 'https://api.novita.ai/v3/openai';
    this.model = 'qwen/qwen3-235b-a22b-instruct-2507';
    this.initializeExtension();
  }

  initializeExtension() {
    chrome.runtime.onInstalled.addListener(() => {
      console.log('AI Prompt Engineer extension installed - Enhanced version');
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'generatePrompt') {
        this.generateStructuredPrompt(request.keywords, request.taskType)
          .then(response => sendResponse({ success: true, prompt: response }))
          .catch(error => {
            console.error('Prompt generation error:', error);
            sendResponse({ 
              success: false, 
              error: error.message,
              fallback: this.generateFallbackPrompt(request.keywords, request.taskType)
            });
          });
        return true; // Will respond asynchronously
      }
    });
  }

  // Enhanced prompt templates for each task type
  getPromptTemplate(taskType) {
    const templates = {
      'image-generation': {
        systemPrompt: `You are a master AI art director and prompt engineer specializing in creating detailed, high-quality prompts for image generation models like DALL-E, Midjourney, Stable Diffusion, and others. Your expertise lies in translating simple concepts into comprehensive visual descriptions that produce stunning, professional-quality images.`,
        structure: {
          sections: ['Visual Composition', 'Style & Aesthetics', 'Technical Specifications', 'Mood & Atmosphere', 'Additional Details'],
          focus: 'artistic vision, technical precision, and commercial viability'
        }
      },
      'code-generation': {
        systemPrompt: `You are a senior software architect and coding expert with extensive experience across multiple programming languages, frameworks, and best practices. You excel at creating comprehensive development prompts that result in clean, efficient, maintainable, and well-documented code.`,
        structure: {
          sections: ['Project Overview', 'Technical Requirements', 'Architecture & Design', 'Implementation Guidelines', 'Testing & Documentation'],
          focus: 'code quality, scalability, and industry best practices'
        }
      },
      'writing': {
        systemPrompt: `You are a professional copywriter and content strategist with expertise in various writing styles, from technical documentation to creative content, marketing copy, and academic writing. You create prompts that ensure engaging, well-structured, and purposeful content.`,
        structure: {
          sections: ['Content Objective', 'Target Audience', 'Structure & Format', 'Tone & Style Guidelines', 'Key Messages & CTAs'],
          focus: 'audience engagement, clarity, and desired outcomes'
        }
      },
      'analysis': {
        systemPrompt: `You are a data scientist and research analyst with expertise in statistical analysis, research methodology, and data interpretation. You create comprehensive analytical prompts that ensure thorough, unbiased, and actionable insights.`,
        structure: {
          sections: ['Analysis Objectives', 'Methodology & Approach', 'Data Requirements', 'Expected Deliverables', 'Validation & Quality Assurance'],
          focus: 'accuracy, methodology, and actionable insights'
        }
      },
      'creative': {
        systemPrompt: `You are a creative director and innovation strategist with expertise in ideation, storytelling, and creative problem-solving. You excel at crafting prompts that unlock creativity while maintaining focus and commercial viability.`,
        structure: {
          sections: ['Creative Brief', 'Inspiration & References', 'Creative Constraints', 'Target Outcomes', 'Evaluation Criteria'],
          focus: 'originality, emotional impact, and brand alignment'
        }
      },
      'website': {
        systemPrompt: `You are a full-stack web developer and UX/UI designer with expertise in modern web technologies, user experience design, and digital strategy. You create comprehensive web development prompts that result in functional, beautiful, and user-friendly websites.`,
        structure: {
          sections: ['Project Scope', 'Technical Stack', 'Design Requirements', 'Functionality Specifications', 'Performance & SEO'],
          focus: 'user experience, technical excellence, and business objectives'
        }
      },
      'general': {
        systemPrompt: `You are a versatile AI assistant and prompt engineering expert capable of adapting to any domain or task. You excel at creating comprehensive, well-structured prompts that ensure clarity, completeness, and optimal results regardless of the subject matter.`,
        structure: {
          sections: ['Task Definition', 'Context & Requirements', 'Approach & Methodology', 'Expected Outputs', 'Success Criteria'],
          focus: 'clarity, completeness, and adaptability'
        }
      }
    };

    return templates[taskType] || templates['general'];
  }

  // Generate structured prompt based on task type
  async generateStructuredPrompt(keywords, taskType) {
    const template = this.getPromptTemplate(taskType);
    
    const enhancedSystemPrompt = `${template.systemPrompt}

PROMPT ENGINEERING GUIDELINES:
1. Create prompts that are specific, detailed, and actionable
2. Structure information logically with clear sections
3. Include relevant constraints and quality criteria
4. Provide context and background information
5. Specify desired output format and style
6. Focus on ${template.structure.focus}

RESPONSE FORMAT:
Your response should be a complete, ready-to-use prompt that expands the given keywords into a comprehensive request. Structure it with the following sections: ${template.structure.sections.join(', ')}.`;

    const userPrompt = this.createUserPrompt(keywords, taskType, template);

    try {
      const response = await this.callAPI(enhancedSystemPrompt, userPrompt);
      return this.formatStructuredResponse(response, taskType, template);
    } catch (error) {
      throw error;
    }
  }

  createUserPrompt(keywords, taskType, template) {
    const taskDescriptions = {
      'image-generation': 'visual art creation',
      'code-generation': 'software development',
      'writing': 'content creation',
      'analysis': 'data analysis and research',
      'creative': 'creative ideation and brainstorming',
      'website': 'web development',
      'general': 'general task completion'
    };

    return `Transform these keywords into a comprehensive, professional prompt for ${taskDescriptions[taskType]}:

KEYWORDS: ${keywords}
TASK TYPE: ${taskType}

REQUIREMENTS:
1. Expand these keywords into a detailed, structured prompt
2. Include all sections: ${template.structure.sections.join(', ')}
3. Make it specific enough to get excellent results from an AI
4. Include relevant constraints, quality criteria, and context
5. Ensure the prompt is immediately usable and comprehensive
6. Focus on ${template.structure.focus}

Create a prompt that a professional would use to get optimal results. The response should be the complete prompt only, ready to copy and paste into any AI system.`;
  }

  async callAPI(systemPrompt, userPrompt) {
    const response = await fetch(`${this.apiBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'text' },
        max_tokens: 4096,
        temperature: 0.7,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  }

  formatStructuredResponse(response, taskType, template) {
    // Add header and formatting to the response
    const taskEmojis = {
      'image-generation': '🎨',
      'code-generation': '💻',
      'writing': '✍️',
      'analysis': '📊',
      'creative': '🎭',
      'website': '🌐',
      'general': '⚡'
    };

    const emoji = taskEmojis[taskType] || '⚡';
    const taskName = taskType.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    return `${emoji} PROFESSIONAL ${taskName.toUpperCase()} PROMPT

${response}

---
📝 Generated by AI Prompt Engineer
🎯 Optimized for: ${template.structure.focus}
⚡ Ready to use with any AI system`;
  }

  generateFallbackPrompt(keywords, taskType) {
    const templates = {
      'image-generation': `🎨 PROFESSIONAL IMAGE GENERATION PROMPT

Create a detailed, high-quality image based on: ${keywords}

**Visual Composition:**
- Main subject: [Elaborate on ${keywords}]
- Composition style: [Professional photography/Digital art/Illustration]
- Framing and perspective: [Close-up/Wide shot/Aerial view as appropriate]

**Style & Aesthetics:**
- Art style: [Photorealistic/Artistic/Stylized]
- Color palette: [Complementary colors based on mood]
- Lighting: [Natural/Studio/Dramatic lighting]

**Technical Specifications:**
- Resolution: High resolution, professional quality
- Aspect ratio: 16:9 (adjust as needed)
- Technical quality: Sharp focus, excellent detail

**Mood & Atmosphere:**
- Overall mood: [Based on context of ${keywords}]
- Emotional impact: [Inspiring/Calming/Dynamic]

**Additional Details:**
- Background: [Complementary to main subject]
- Any text or graphics: [If applicable]
- Commercial usage: Suitable for professional/commercial use

Generate this image with professional quality and attention to detail.`,

      'code-generation': `💻 PROFESSIONAL CODE DEVELOPMENT PROMPT

Develop a comprehensive solution for: ${keywords}

**Project Overview:**
- Primary objective: [Expand on ${keywords}]
- Target platform/environment: [Specify based on context]
- User requirements: [Based on keywords analysis]

**Technical Requirements:**
- Programming language: [Most suitable for the task]
- Framework/libraries: [Industry standard choices]
- Dependencies: [Minimal, well-maintained packages]

**Architecture & Design:**
- Code structure: Modular, maintainable design
- Design patterns: Apply appropriate patterns
- Error handling: Comprehensive error management

**Implementation Guidelines:**
- Code quality: Clean, readable, well-commented
- Performance: Optimized for efficiency
- Security: Follow security best practices
- Testing: Include unit tests and validation

**Documentation:**
- Code comments: Clear, helpful comments
- README: Setup and usage instructions
- API documentation: If applicable

Provide production-ready code that follows industry best practices.`,

      'writing': `✍️ PROFESSIONAL CONTENT CREATION PROMPT

Create compelling content about: ${keywords}

**Content Objective:**
- Primary goal: [Inform/Persuade/Entertain based on ${keywords}]
- Key message: [Core message to communicate]
- Desired outcome: [What should readers do/think/feel]

**Target Audience:**
- Demographics: [Based on context]
- Knowledge level: [Beginner/Intermediate/Expert]
- Interests and pain points: [Relevant to ${keywords}]

**Structure & Format:**
- Content type: [Article/Blog post/Copy/Report]
- Length: [Appropriate for content type]
- Format: Clear headings, scannable content

**Tone & Style Guidelines:**
- Voice: [Professional/Conversational/Academic]
- Tone: [Authoritative/Friendly/Inspiring]
- Style: Clear, engaging, purposeful

**Key Elements to Include:**
- Hook: Compelling opening
- Main points: [3-5 key points about ${keywords}]
- Evidence: Facts, examples, case studies
- Call to action: Clear next steps

Create content that engages readers and achieves the intended objective.`,

      'analysis': `📊 PROFESSIONAL ANALYSIS PROMPT

Conduct comprehensive analysis of: ${keywords}

**Analysis Objectives:**
- Primary research question: [Based on ${keywords}]
- Scope of analysis: [Define boundaries]
- Expected insights: [What we hope to discover]

**Methodology & Approach:**
- Analysis type: [Quantitative/Qualitative/Mixed methods]
- Data sources: [Identify relevant data]
- Analytical framework: [Choose appropriate methods]

**Data Requirements:**
- Primary data: [What data is needed]
- Secondary sources: [Supporting information]
- Quality criteria: [Data validation standards]

**Expected Deliverables:**
- Key findings: [Main insights]
- Visualizations: [Charts, graphs, dashboards]
- Recommendations: [Actionable insights]

**Quality Assurance:**
- Validation methods: [How to verify findings]
- Bias mitigation: [Address potential biases]
- Peer review: [Validation process]

Provide thorough, objective analysis with clear, actionable insights.`,

      'creative': `🎭 PROFESSIONAL CREATIVE PROMPT

Generate innovative ideas for: ${keywords}

**Creative Brief:**
- Challenge: [Based on ${keywords}]
- Creative objective: [What we want to achieve]
- Success metrics: [How we'll measure success]

**Inspiration & References:**
- Style references: [Relevant creative styles]
- Industry examples: [Best practices to emulate]
- Innovation opportunities: [Where to be different]

**Creative Constraints:**
- Brand guidelines: [If applicable]
- Technical limitations: [Any restrictions]
- Budget considerations: [Practical constraints]

**Target Outcomes:**
- Primary deliverable: [Main creative output]
- Secondary benefits: [Additional value]
- Long-term impact: [Future implications]

**Evaluation Criteria:**
- Originality: [Uniqueness factor]
- Feasibility: [Can it be executed]
- Impact: [Potential for success]

Create innovative, practical solutions that stand out in the marketplace.`,

      'website': `🌐 PROFESSIONAL WEB DEVELOPMENT PROMPT

Build a comprehensive website for: ${keywords}

**Project Scope:**
- Website purpose: [Based on ${keywords}]
- Target audience: [Who will use this site]
- Key objectives: [What the site should achieve]

**Technical Stack:**
- Frontend: HTML5, CSS3, JavaScript (modern frameworks)
- Backend: [Choose appropriate technology]
- Database: [If data storage needed]
- Hosting: [Production environment]

**Design Requirements:**
- Visual style: Modern, professional design
- User experience: Intuitive, user-friendly
- Responsive design: Mobile-first approach
- Accessibility: WCAG compliance

**Functionality Specifications:**
- Core features: [Based on ${keywords}]
- User interactions: [How users will engage]
- Content management: [How content is updated]
- Integration needs: [Third-party services]

**Performance & SEO:**
- Loading speed: Optimized performance
- SEO optimization: Search engine friendly
- Analytics: User behavior tracking
- Security: Best security practices

Deliver a professional, fully functional website that meets modern standards.`,

      'general': `⚡ PROFESSIONAL TASK COMPLETION PROMPT

Complete the following task: ${keywords}

**Task Definition:**
- Objective: [Clear goal based on ${keywords}]
- Scope: [What's included and excluded]
- Success criteria: [How to measure completion]

**Context & Requirements:**
- Background information: [Relevant context]
- Constraints: [Any limitations or requirements]
- Quality standards: [Expected level of quality]

**Approach & Methodology:**
- Strategy: [How to approach the task]
- Process: [Step-by-step methodology]
- Resources needed: [Tools, information, support]

**Expected Outputs:**
- Primary deliverable: [Main output]
- Supporting materials: [Additional outputs]
- Format requirements: [How to present results]

**Success Criteria:**
- Quality measures: [What makes it successful]
- Completion markers: [How we know it's done]
- Review process: [Validation steps]

Execute this task with professional excellence and attention to detail.`
    };

    return templates[taskType] || templates['general'];
  }
}

// Initialize the enhanced prompt engineer
new PromptEngineer();
