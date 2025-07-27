// AI Prompt Engineer - Optimized Background Script
// Enhanced for performance, token efficiency, and effective prompt generation

class PromptEngineer {
  constructor() {
    this.apiKey = 'sk_L-HP58vV4AElrD-NbF5MdZUVNdi3b0HRLiRI5DTomX0';
    this.apiBaseUrl = 'https://api.novita.ai/v3/openai';
    this.model = 'qwen/qwen3-235b-a22b-instruct-2507';
    this.promptCache = new Map();
    this.maxRetries = 3;
    this.retryDelay = 1000;
    this.supportedPlatforms = [
      'chatgpt.com', 'chat.openai.com', 'claude.ai', 'perplexity.ai', 
      'chat.deepseek.com', 'gemini.google.com', 'copilot.microsoft.com',
      'poe.com', 'huggingface.co', 'bard.google.com'
    ];
    this.initializeExtension();
  }

  initializeExtension() {
    chrome.runtime.onInstalled.addListener(() => {
      console.log('AI Prompt Engineer extension installed - Optimized version');
    });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'generatePrompt') {
      this.generateOptimizedPrompt(request.keywords, request.taskType, request.platform)
        .then(response => sendResponse({ success: true, prompt: response }))
        .catch(error => {
          console.error('Prompt generation error:', error);
          sendResponse({ 
            success: false, 
            error: error.message,
            fallback: this.generateFallbackPrompt(request.keywords, request.taskType, request.platform)
          });
        });
      return true;
    }
  });
  }

  // Optimized template system - Concise but powerful
  getOptimizedTemplate(taskType) {
    const coreTemplates = {
      'image-generation': {
        roleDefinition: 'Expert AI art director with 15+ years in visual design and commercial photography',
        systemFocus: 'Transform keywords into comprehensive visual specifications with technical precision',
        outputStructure: ['Visual Concept', 'Technical Specs', 'Style Guide', 'Quality Standards'],
        keyPrinciples: 'role clarity, systematic composition, technical accuracy'
      },
      'code-generation': {
        roleDefinition: 'Senior software architect with expertise in modern development practices',
        systemFocus: 'Create production-ready code solutions with clean architecture',
        outputStructure: ['Architecture Overview', 'Implementation Plan', 'Code Standards', 'Testing Strategy'],
        keyPrinciples: 'clean code, scalability, best practices'
      },
      'writing': {
        roleDefinition: 'Professional content strategist with expertise in audience engagement',
        systemFocus: 'Develop compelling content that achieves specific objectives',
        outputStructure: ['Content Strategy', 'Audience Analysis', 'Structure Plan', 'Optimization Guidelines'],
        keyPrinciples: 'audience focus, engagement, clear messaging'
      },
      'analysis': {
        roleDefinition: 'Senior data analyst with expertise in research methodology',
        systemFocus: 'Conduct rigorous analysis delivering actionable insights',
        outputStructure: ['Research Framework', 'Methodology', 'Analysis Plan', 'Validation Process'],
        keyPrinciples: 'data integrity, methodical approach, actionable insights'
      },
      'creative': {
        roleDefinition: 'Creative director with proven innovation strategy experience',
        systemFocus: 'Generate breakthrough ideas balancing creativity with viability',
        outputStructure: ['Creative Brief', 'Ideation Framework', 'Concept Development', 'Feasibility Assessment'],
        keyPrinciples: 'innovation, practical creativity, strategic alignment'
      },
      'website': {
        roleDefinition: 'Full-stack developer and UX specialist with modern web expertise',
        systemFocus: 'Build user-centered websites with exceptional performance',
        outputStructure: ['Project Scope', 'Technical Architecture', 'UX Strategy', 'Performance Plan'],
        keyPrinciples: 'user experience, technical excellence, performance optimization'
      },
      'general': {
        roleDefinition: 'Domain expert with systematic problem-solving expertise',
        systemFocus: 'Deliver comprehensive solutions with professional excellence',
        outputStructure: ['Problem Analysis', 'Solution Framework', 'Implementation Strategy', 'Quality Assurance'],
        keyPrinciples: 'systematic thinking, comprehensive solutions, quality delivery'
      }
    };

    return coreTemplates[taskType] || coreTemplates['general'];
  }

  // Keyword analysis for dynamic prompt optimization
  analyzeKeywords(keywords) {
    const keywordArray = keywords.toLowerCase().split(/[,\s]+/).filter(k => k.length > 2);
    const complexity = keywordArray.length;
    const technicalTerms = keywordArray.filter(k => 
      /^(api|database|framework|algorithm|architecture|design|performance|security|responsive|modern|professional)$/i.test(k)
    ).length;
    
    return {
      count: complexity,
      technical: technicalTerms > 0,
      complexity: complexity > 4 ? 'high' : complexity > 2 ? 'medium' : 'low',
      primaryKeywords: keywordArray.slice(0, 4).join(', '),
      contextualHints: this.extractContextualHints(keywordArray)
    };
  }

  extractContextualHints(keywords) {
    const contexts = {
      technical: ['api', 'database', 'framework', 'algorithm', 'code', 'development'],
      design: ['ui', 'ux', 'design', 'visual', 'aesthetic', 'layout', 'modern'],
      business: ['strategy', 'marketing', 'growth', 'revenue', 'customer', 'market'],
      creative: ['creative', 'innovative', 'artistic', 'original', 'concept', 'idea']
    };

    for (const [context, terms] of Object.entries(contexts)) {
      if (terms.some(term => keywords.includes(term))) {
        return context;
      }
    }
    return 'general';
  }

  // Platform-specific optimizations
  getPlatformOptimization(platform) {
    const platformOptimizations = {
      'perplexity.ai': {
        name: 'Perplexity',
        style: 'research-focused',
        format: 'structured-analysis',
        bulletStyle: '• ',
        emphasis: 'citations and sources',
        specialInstructions: 'Include research methodology and source verification requirements'
      },
      'chatgpt.com': {
        name: 'ChatGPT',
        style: 'conversational-detailed',
        format: 'comprehensive-bullets',
        bulletStyle: '• ',
        emphasis: 'step-by-step reasoning',
        specialInstructions: 'Use clear section headers and detailed bullet points'
      },
      'claude.ai': {
        name: 'Claude',
        style: 'analytical-structured',
        format: 'hierarchical-bullets',
        bulletStyle: '• ',
        emphasis: 'logical flow and analysis',
        specialInstructions: 'Organize with nested bullet points and clear reasoning chains'
      },
      'chat.deepseek.com': {
        name: 'DeepSeek',
        style: 'technical-precise',
        format: 'code-focused-bullets',
        bulletStyle: '• ',
        emphasis: 'technical accuracy',
        specialInstructions: 'Include technical specifications and implementation details'
      },
      'gemini.google.com': {
        name: 'Gemini',
        style: 'multimodal-comprehensive',
        format: 'structured-comprehensive',
        bulletStyle: '• ',
        emphasis: 'multimodal integration',
        specialInstructions: 'Consider text, image, and other media integration'
      },
      'general': {
        name: 'Universal',
        style: 'adaptable-structured',
        format: 'universal-bullets',
        bulletStyle: '• ',
        emphasis: 'clarity and structure',
        specialInstructions: 'Use clear, universally compatible formatting'
      }
    };

    return platformOptimizations[platform] || platformOptimizations['general'];
  }

  // Main optimized prompt generation with platform detection
  async generateOptimizedPrompt(keywords, taskType, platform = 'general') {
    // Check cache first
    const cacheKey = `${taskType}-${keywords}-${platform}`;
    if (this.promptCache.has(cacheKey)) {
      return this.promptCache.get(cacheKey);
    }

    const template = this.getOptimizedTemplate(taskType);
    const analysis = this.analyzeKeywords(keywords);
    const platformOptimization = this.getPlatformOptimization(platform);
    
    const optimizedSystemPrompt = this.buildSystemPrompt(template, analysis, platformOptimization);
    const optimizedUserPrompt = this.buildUserPrompt(keywords, taskType, template, analysis, platformOptimization);

    try {
      const response = await this.callAPIWithRetry(optimizedSystemPrompt, optimizedUserPrompt);
      const formattedResponse = this.formatOptimizedResponse(response, taskType, template, platform);
      
      // Cache successful responses
      this.promptCache.set(cacheKey, formattedResponse);
      return formattedResponse;
    } catch (error) {
      throw error;
    }
  }

  buildSystemPrompt(template, analysis, platformOptimization) {
    const complexityGuidance = {
      low: 'Focus on clarity and essential elements',
      medium: 'Balance detail with conciseness',
      high: 'Provide comprehensive, multi-faceted approach'
    };

    return `You are a ${template.roleDefinition}. ${template.systemFocus}.

OPTIMIZATION DIRECTIVE: ${complexityGuidance[analysis.complexity]}
CONTEXT: ${analysis.contextualHints} domain focus
TECHNICAL LEVEL: ${analysis.technical ? 'High' : 'Standard'}
PLATFORM: Optimized for ${platformOptimization.name} (${platformOptimization.style})

PROMPT ENGINEERING FRAMEWORK:
1. ROLE CLARITY: Define specific expert persona with clear credentials
2. SYSTEMATIC APPROACH: Use structured thinking (analyze → strategize → implement → validate)
3. OUTPUT STRUCTURE: Organize response using: ${template.outputStructure.join(' → ')}
4. BULLET FORMATTING: Use ${platformOptimization.bulletStyle}for all lists and structured content
5. QUALITY FOCUS: Emphasize ${template.keyPrinciples}

PLATFORM SPECIFIC OPTIMIZATION:
${platformOptimization.specialInstructions}

Generate a professional, immediately actionable prompt optimized for ${analysis.complexity} complexity scenarios with detailed bullet point structure.`;
  }

  buildUserPrompt(keywords, taskType, template, analysis, platformOptimization) {
    const taskMap = {
      'image-generation': 'visual content creation',
      'code-generation': 'software development',
      'writing': 'content creation',
      'analysis': 'data analysis and research',
      'creative': 'creative ideation',
      'website': 'web development',
      'general': 'task completion'
    };

    return `Create an optimized ${taskMap[taskType]} prompt from these keywords: "${analysis.primaryKeywords}"

REQUIREMENTS:
${platformOptimization.bulletStyle}Integrate advanced prompt engineering: role definition, systematic reasoning, structured output
${platformOptimization.bulletStyle}Adapt to ${analysis.complexity} complexity level with ${analysis.contextualHints} context
${platformOptimization.bulletStyle}Structure using: ${template.outputStructure.join(' | ')}
${platformOptimization.bulletStyle}Focus on: ${template.keyPrinciples}
${platformOptimization.bulletStyle}Include validation criteria and quality checkpoints
${platformOptimization.bulletStyle}Ensure immediate usability with ${platformOptimization.name} AI system
${platformOptimization.bulletStyle}Use detailed bullet point formatting for all structured content
${platformOptimization.bulletStyle}Emphasize ${platformOptimization.emphasis}

PLATFORM OPTIMIZATION:
${platformOptimization.bulletStyle}Format: ${platformOptimization.format}
${platformOptimization.bulletStyle}Style: ${platformOptimization.style}
${platformOptimization.bulletStyle}Special instructions: ${platformOptimization.specialInstructions}

Deliver a comprehensive, structured prompt with detailed bullet points that maximizes AI performance and output quality.`;
  }

  async callAPIWithRetry(systemPrompt, userPrompt, retryCount = 0) {
    try {
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
          max_tokens: 2048, // Optimized for efficiency
          temperature: 0.6, // Slightly more focused
          top_p: 0.85 // Better quality control
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      if (retryCount < this.maxRetries) {
        console.log(`Retry attempt ${retryCount + 1} after error:`, error.message);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * (retryCount + 1)));
        return this.callAPIWithRetry(systemPrompt, userPrompt, retryCount + 1);
      }
      throw error;
    }
  }

  formatOptimizedResponse(response, taskType, template, platform) {
    const taskEmojis = {
      'image-generation': '🎨',
      'code-generation': '💻',
      'writing': '✍️',
      'analysis': '📊',
      'creative': '🎭',
      'website': '🌐',
      'general': '⚡'
    };

    const platformEmojis = {
      'perplexity.ai': '🔍',
      'chatgpt.com': '🤖',
      'claude.ai': '🧠',
      'chat.deepseek.com': '🔬',
      'gemini.google.com': '✨',
      'general': '🌐'
    };

    const emoji = taskEmojis[taskType] || '⚡';
    const platformEmoji = platformEmojis[platform] || '🌐';
    const taskName = taskType.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    return `${emoji} OPTIMIZED ${taskName.toUpperCase()} PROMPT

${response}

---
🚀 Generated by AI Prompt Engineer - Enhanced Edition
${platformEmoji} Optimized for: ${platform.replace('.com', '').replace('.ai', '').toUpperCase()}
🎯 Focus: ${template.keyPrinciples}
⚡ Advanced patterns: Role definition, systematic reasoning, structured output
💡 Ready for immediate use with detailed bullet point formatting`;
  }

  // Streamlined fallback prompts - Concise but effective
  generateFallbackPrompt(keywords, taskType, platform = 'general') {
    const template = this.getOptimizedTemplate(taskType);
    const analysis = this.analyzeKeywords(keywords);
    const platformOptimization = this.getPlatformOptimization(platform);

    const fallbackTemplates = {
      'image-generation': this.generateImageFallback(keywords, template, analysis, platformOptimization),
      'code-generation': this.generateCodeFallback(keywords, template, analysis, platformOptimization),
      'writing': this.generateWritingFallback(keywords, template, analysis, platformOptimization),
      'analysis': this.generateAnalysisFallback(keywords, template, analysis, platformOptimization),
      'creative': this.generateCreativeFallback(keywords, template, analysis, platformOptimization),
      'website': this.generateWebsiteFallback(keywords, template, analysis, platformOptimization),
      'general': this.generateGeneralFallback(keywords, template, analysis, platformOptimization)
    };

    return fallbackTemplates[taskType] || fallbackTemplates['general'];
  }

  generateImageFallback(keywords, template, analysis, platformOptimization) {
    const bullet = platformOptimization.bulletStyle;
    return `🎨 OPTIMIZED IMAGE GENERATION PROMPT

**ROLE & OBJECTIVE:**
You are a ${template.roleDefinition}. Create a detailed visual representation of: ${keywords}

**SYSTEMATIC APPROACH:**
${bullet}ANALYZE: Break down "${analysis.primaryKeywords}" into core visual elements
${bullet}COMPOSE: Structure elements using professional design principles
${bullet}SPECIFY: Define technical requirements for production quality
${bullet}VALIDATE: Ensure commercial viability and brand consistency

**VISUAL SPECIFICATIONS:**
${bullet}Concept: [Expand ${keywords} with specific visual details]
${bullet}Style: [Professional/Artistic/Commercial - based on context]
${bullet}Technical Requirements:
  ${bullet}4K resolution minimum
  ${bullet}Professional lighting setup
  ${bullet}Optimal composition rules
  ${bullet}Color palette optimization
${bullet}Quality Standards:
  ${bullet}Sharp focus throughout
  ${bullet}Balanced exposure
  ${bullet}Commercial-grade appeal

**DELIVERABLE:**
Generate a professional-quality image that effectively communicates the concept with technical excellence and commercial appeal.

**PLATFORM OPTIMIZATION FOR ${platformOptimization.name.toUpperCase()}:**
${bullet}${platformOptimization.specialInstructions}
${bullet}Format style: ${platformOptimization.format}
${bullet}Emphasis on: ${platformOptimization.emphasis}`;
  }

  generateCodeFallback(keywords, template, analysis, platformOptimization) {
    const bullet = platformOptimization.bulletStyle;
    return `💻 OPTIMIZED CODE DEVELOPMENT PROMPT

**ROLE & OBJECTIVE:**
You are a ${template.roleDefinition}. Develop a comprehensive solution for: ${keywords}

**DEVELOPMENT METHODOLOGY:**
${bullet}ANALYZE: Understand requirements for "${analysis.primaryKeywords}"
${bullet}DESIGN: Create clean, scalable architecture
${bullet}IMPLEMENT: Write production-ready code with best practices
${bullet}VALIDATE: Include testing and documentation

**TECHNICAL APPROACH:**
${bullet}Language Selection:
  ${bullet}Optimal for ${keywords}
  ${bullet}Performance considerations
  ${bullet}Ecosystem compatibility
${bullet}Architecture Design:
  ${bullet}Clean, modular structure
  ${bullet}Maintainable design patterns
  ${bullet}Scalability planning
${bullet}Standards & Practices:
  ${bullet}Industry best practices
  ${bullet}SOLID principles
  ${bullet}Code review protocols
${bullet}Quality Assurance:
  ${bullet}80%+ test coverage
  ${bullet}Comprehensive documentation
  ${bullet}Performance benchmarks

**DELIVERABLE:**
Provide production-ready code with setup instructions, tests, and documentation that demonstrates professional development standards.

**PLATFORM OPTIMIZATION FOR ${platformOptimization.name.toUpperCase()}:**
${bullet}${platformOptimization.specialInstructions}
${bullet}Format style: ${platformOptimization.format}
${bullet}Emphasis on: ${platformOptimization.emphasis}`;
  }

  generateWritingFallback(keywords, template, analysis, platformOptimization) {
    const bullet = platformOptimization.bulletStyle;
    return `✍️ OPTIMIZED CONTENT CREATION PROMPT

**ROLE & OBJECTIVE:**
You are a ${template.roleDefinition}. Create compelling content about: ${keywords}

**CONTENT STRATEGY:**
${bullet}RESEARCH: Analyze "${analysis.primaryKeywords}" and target audience
${bullet}STRUCTURE: Organize for maximum engagement and clarity
${bullet}OPTIMIZE: Ensure SEO and readability standards
${bullet}VALIDATE: Confirm value delivery and call-to-action effectiveness

**CONTENT FRAMEWORK:**
${bullet}Objective: [Inform/Persuade/Engage based on ${keywords}]
${bullet}Audience Definition:
  ${bullet}Demographics and psychographics
  ${bullet}Knowledge level and expertise
  ${bullet}Pain points and motivations
${bullet}Structure Plan:
  ${bullet}Compelling hook/introduction
  ${bullet}Main content with supporting evidence
  ${bullet}Clear call-to-action
${bullet}Quality Standards:
  ${bullet}Professional tone and voice
  ${bullet}Fact-based, actionable insights
  ${bullet}SEO optimization
  ${bullet}Readability and engagement

**DELIVERABLE:**
Create engaging, well-researched content that achieves specific objectives while providing genuine value to readers.

**PLATFORM OPTIMIZATION FOR ${platformOptimization.name.toUpperCase()}:**
${bullet}${platformOptimization.specialInstructions}
${bullet}Format style: ${platformOptimization.format}
${bullet}Emphasis on: ${platformOptimization.emphasis}`;
  }

  generateAnalysisFallback(keywords, template, analysis, platformOptimization) {
    const bullet = platformOptimization.bulletStyle;
    return `📊 OPTIMIZED ANALYSIS PROMPT

**ROLE & OBJECTIVE:**
You are a ${template.roleDefinition}. Conduct comprehensive analysis of: ${keywords}

**ANALYTICAL METHODOLOGY:**
${bullet}HYPOTHESIZE: Define research questions for "${analysis.primaryKeywords}"
${bullet}COLLECT: Identify relevant, high-quality data sources
${bullet}ANALYZE: Apply appropriate statistical methods and frameworks
${bullet}VALIDATE: Verify findings and assess reliability

**RESEARCH FRAMEWORK:**
${bullet}Research Objectives:
  ${bullet}Define specific questions based on ${keywords}
  ${bullet}Establish success metrics
  ${bullet}Set scope and limitations
${bullet}Methodology Selection:
  ${bullet}Quantitative/Qualitative/Mixed methods
  ${bullet}Statistical significance requirements
  ${bullet}Sample size calculations
${bullet}Data Collection:
  ${bullet}Primary and secondary sources
  ${bullet}Quality assurance protocols
  ${bullet}Bias mitigation strategies
${bullet}Analysis Tools:
  ${bullet}Statistical software platforms
  ${bullet}Visualization tools
  ${bullet}Reporting frameworks
${bullet}Quality Control:
  ${bullet}Peer review process
  ${bullet}Confidence intervals
  ${bullet}Reproducibility checks

**DELIVERABLE:**
Provide rigorous analysis with executive summary, methodology, findings, and actionable recommendations.

**PLATFORM OPTIMIZATION FOR ${platformOptimization.name.toUpperCase()}:**
${bullet}${platformOptimization.specialInstructions}
${bullet}Format style: ${platformOptimization.format}
${bullet}Emphasis on: ${platformOptimization.emphasis}`;
  }

  generateCreativeFallback(keywords, template, analysis, platformOptimization) {
    const bullet = platformOptimization.bulletStyle;
    return `🎭 OPTIMIZED CREATIVE PROMPT

**ROLE & OBJECTIVE:**
You are a ${template.roleDefinition}. Generate innovative concepts for: ${keywords}

**CREATIVE METHODOLOGY:**
${bullet}INSPIRE: Research trends and successful examples for "${analysis.primaryKeywords}"
${bullet}IDEATE: Generate multiple concepts using proven techniques
${bullet}DEVELOP: Refine promising ideas with practical considerations
${bullet}VALIDATE: Test against objectives and feasibility constraints

**INNOVATION FRAMEWORK:**
${bullet}Creative Brief:
  ${bullet}Define challenge and objectives for ${keywords}
  ${bullet}Target audience and market context
  ${bullet}Success criteria and metrics
${bullet}Constraints & Parameters:
  ${bullet}Brand guidelines and voice
  ${bullet}Technical limitations
  ${bullet}Budget considerations
  ${bullet}Timeline requirements
${bullet}Ideation Approach:
  ${bullet}Divergent thinking techniques
  ${bullet}User-centered design principles
  ${bullet}Strategic alignment checks
  ${bullet}Cross-industry inspiration
${bullet}Evaluation Metrics:
  ${bullet}Originality and uniqueness
  ${bullet}Feasibility assessment
  ${bullet}Market impact potential
  ${bullet}Implementation complexity

**DELIVERABLE:**
Create innovative, practical concepts with clear implementation paths and success measurements.

**PLATFORM OPTIMIZATION FOR ${platformOptimization.name.toUpperCase()}:**
${bullet}${platformOptimization.specialInstructions}
${bullet}Format style: ${platformOptimization.format}
${bullet}Emphasis on: ${platformOptimization.emphasis}`;
  }

  generateWebsiteFallback(keywords, template, analysis, platformOptimization) {
    const bullet = platformOptimization.bulletStyle;
    return `🌐 OPTIMIZED WEB DEVELOPMENT PROMPT

**ROLE & OBJECTIVE:**
You are a ${template.roleDefinition}. Build a comprehensive website for: ${keywords}

**DEVELOPMENT STRATEGY:**
${bullet}PLAN: Define scope and requirements for "${analysis.primaryKeywords}"
${bullet}DESIGN: Create user-centered UX/UI with modern standards
${bullet}DEVELOP: Implement with performance and accessibility focus
${bullet}OPTIMIZE: Ensure SEO, security, and cross-browser compatibility

**TECHNICAL FRAMEWORK:**
${bullet}Technology Stack:
  ${bullet}Modern frontend/backend technologies suited for ${keywords}
  ${bullet}Framework selection rationale
  ${bullet}Third-party integrations
${bullet}Design Specifications:
  ${bullet}Responsive, mobile-first approach
  ${bullet}Accessibility standards (WCAG 2.1 AA)
  ${bullet}User experience optimization
  ${bullet}Brand consistency and visual hierarchy
${bullet}Performance Requirements:
  ${bullet}Core Web Vitals compliance
  ${bullet}Page load optimization
  ${bullet}CDN and caching strategies
  ${bullet}Performance monitoring setup
${bullet}Quality Assurance:
  ${bullet}Cross-browser testing protocols
  ${bullet}Security best practices
  ${bullet}SEO optimization checklist
  ${bullet}Code review standards

**DELIVERABLE:**
Build a professional, fully functional website with technical documentation and deployment guide.

**PLATFORM OPTIMIZATION FOR ${platformOptimization.name.toUpperCase()}:**
${bullet}${platformOptimization.specialInstructions}
${bullet}Format style: ${platformOptimization.format}
${bullet}Emphasis on: ${platformOptimization.emphasis}`;
  }

  generateGeneralFallback(keywords, template, analysis, platformOptimization) {
    const bullet = platformOptimization.bulletStyle;
    return `⚡ OPTIMIZED TASK COMPLETION PROMPT

**ROLE & OBJECTIVE:**
You are a ${template.roleDefinition}. Complete the task: ${keywords}

**SYSTEMATIC APPROACH:**
${bullet}ANALYZE: Understand requirements and constraints for "${analysis.primaryKeywords}"
${bullet}STRATEGIZE: Develop comprehensive approach with risk mitigation
${bullet}EXECUTE: Implement using best practices and quality standards
${bullet}VALIDATE: Ensure deliverables meet objectives and quality criteria

**IMPLEMENTATION FRAMEWORK:**
${bullet}Scope Definition:
  ${bullet}Define based on ${keywords}
  ${bullet}Identify key deliverables
  ${bullet}Set success metrics
  ${bullet}Establish timeline milestones
${bullet}Methodology:
  ${bullet}Systematic problem-solving approach
  ${bullet}Iterative refinement process
  ${bullet}Risk assessment and mitigation
  ${bullet}Quality checkpoints
${bullet}Quality Standards:
  ${bullet}Professional standards compliance
  ${bullet}Stakeholder alignment verification
  ${bullet}Industry best practices
  ${bullet}Performance benchmarks
${bullet}Validation Process:
  ${bullet}Success metrics evaluation
  ${bullet}Peer review protocol
  ${bullet}Continuous improvement feedback
  ${bullet}Documentation standards

**DELIVERABLE:**
Provide comprehensive solution with clear implementation guidance and quality assurance measures.

**PLATFORM OPTIMIZATION FOR ${platformOptimization.name.toUpperCase()}:**
${bullet}${platformOptimization.specialInstructions}
${bullet}Format style: ${platformOptimization.format}
${bullet}Emphasis on: ${platformOptimization.emphasis}`;
  }
}

// Initialize the optimized prompt engineer
new PromptEngineer();
