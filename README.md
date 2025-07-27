# AI Prompt Engineer Chrome Extension - Enhanced Version

A powerful Chrome extension that transforms simple keywords into detailed, professional prompts for AI interactions. Features advanced prompt engineering, structured outputs, and enterprise-grade security.

## 🚀 Quick Start

**Installation (2 minutes):**
1. Download files → Load in chrome://extensions → Enable Developer mode → Load unpacked
2. Visit ChatGPT/Claude/DeepSeek → Click floating button → Enter keywords → Generate!

**Example:** Keywords: `modern dashboard, React, dark theme` → Professional development prompt with architecture, best practices, and implementation guide.

> 📖 **Full Setup**: See `INSTALLATION.md` for detailed instructions with troubleshooting

## 🚀 Enhanced Features

### **Advanced Prompt Engineering**
- **Structured Prompts**: Task-specific templates with organized sections
- **Professional Quality**: Expert-level prompt engineering for optimal results
- **Multi-Mode Support**: Specialized prompts for different use cases
- **Fallback System**: Offline templates when API is unavailable

### **Task-Specific Optimization**
- **🎨 Image Generation**: Detailed visual specifications, style guides, technical parameters
- **💻 Code Development**: Architecture patterns, best practices, testing frameworks
- **✍️ Content Writing**: Audience targeting, tone guidance, structure templates
- **📊 Data Analysis**: Methodology frameworks, validation criteria, deliverable formats
- **🎭 Creative Projects**: Innovation guidelines, brand alignment, impact metrics
- **🌐 Web Development**: Technical stacks, UX/UI principles, performance standards
- **⚡ General Tasks**: Adaptable templates for any requirement

### **Security & Privacy**
- **🔒 API Key Protection**: Secured in background script, never exposed to users
- **🛡️ No Data Collection**: Keywords processed but not stored or logged
- **🔐 Encrypted Communication**: All API calls use HTTPS encryption
- **👤 User Privacy**: No tracking, profiling, or personal data collection

## 🛠 Technical Enhancements

### **Structured Prompt Generation**
Each prompt type includes:
- **Clear Objectives**: Specific goals and success criteria
- **Technical Requirements**: Detailed specifications and constraints
- **Quality Standards**: Professional benchmarks and best practices
- **Implementation Guidelines**: Step-by-step methodologies
- **Validation Criteria**: Success metrics and evaluation methods

### **Intelligent Fallback System**
```javascript
// Enhanced error handling with comprehensive fallbacks
if (apiAvailable) {
  // AI-generated structured prompt
} else {
  // Professional template with task-specific guidance
}
```

### **Modern Architecture**
- **ES6+ Classes**: Object-oriented design for better maintainability
- **Async/Await**: Modern JavaScript for clean asynchronous operations
- **Error Boundaries**: Comprehensive error handling and user feedback
- **Performance Optimized**: Efficient API calls and DOM manipulation

## 🛠 Installation & Setup

### **Quick Installation (5 minutes)**
1. **Download**: Save all extension files to a folder named `prompt-engineer-extension`
2. **Chrome Extensions**: Navigate to `chrome://extensions/`
3. **Developer Mode**: Enable the toggle in the top-right corner
4. **Load Extension**: Click "Load unpacked" and select your folder
5. **Ready**: Look for the floating button with your logo on any LLM website

> 📖 **Detailed Instructions**: See `INSTALLATION.md` for step-by-step setup with troubleshooting
> 🎨 **Custom Branding**: Replace `icons/logo.png` with your own brand logo

### **File Structure Requirements**
```
prompt-engineer-extension/
├── manifest.json          # Extension configuration
├── background.js          # Secure API handling
├── content.js             # Website integration
├── styles.css             # Modern UI styling
├── popup.html & popup.js  # Extension popup
├── config.js              # Configuration settings
├── icons/                 # Extension icons and logos
│   ├── icon16.png         # 16x16 icon for toolbar
│   ├── icon48.png         # 48x48 icon for management
│   ├── icon128.png        # 128x128 icon for store
│   ├── icon.svg           # Vector icon source
│   └── logo.png           # Custom brand logo
├── README.md              # This documentation
├── INSTALLATION.md        # Detailed setup guide
├── SECURITY.md            # Security & privacy info
└── CHANGELOG.md           # Version history
```

### **First Time Usage**
1. **Visit any supported LLM website**: ChatGPT, Claude, DeepSeek, Gemini, etc.
2. **Find the floating button**: Look for your custom logo in the bottom-right corner
3. **Open the interface**: Click the button to access the prompt generator
4. **Enter keywords**: Type 3-4 descriptive keywords (e.g., "responsive website, modern design, React")
5. **Select task type**: Choose the most appropriate option for your needs
6. **Generate prompt**: Click "✨ Generate Prompt" for AI-enhanced results
7. **Use your prompt**: Click "🚀 Insert" to add to chat or "📋 Copy" to clipboard

> 💡 **Pro Tip**: Start with simple keywords and experiment with different task types to see how they affect the generated prompts

## 🎯 Supported Platforms

### **LLM Websites**
- **ChatGPT** (chat.openai.com, chatgpt.com) - Full integration
- **Claude** (claude.ai) - Full integration  
- **DeepSeek** (chat.deepseek.com) - Full integration
- **Google Gemini** (gemini.google.com) - Full integration
- **Bing Chat** (bing.com) - Full integration
- **Poe** (poe.com) - Full integration
- **You.com** - Full integration

### **Task Types Supported**
- 🎨 **Image Generation** - DALL-E, Midjourney, Stable Diffusion optimized
- 💻 **Code Development** - All programming languages and frameworks
- ✍️ **Content Writing** - Blogs, articles, marketing copy, technical docs
- 📊 **Data Analysis** - Research, statistics, business intelligence
- 🎭 **Creative Projects** - Brainstorming, storytelling, innovation
- 🌐 **Web Development** - Frontend, backend, full-stack projects
- ⚡ **General Tasks** - Universal templates for any requirement

## 💡 Example Usage Scenarios

### **Creating a Website**
```
Keywords: "e-commerce store, minimalist design, mobile-first"
Task Type: 🌐 Website Development
Result: Comprehensive development plan with:
- Technical architecture recommendations
- UI/UX design principles
- Performance optimization strategies
- Security implementation guidelines
- Testing and deployment procedures
```

### **Generating Art**
```
Keywords: "cyberpunk cityscape, neon lights, rain"
Task Type: 🎨 Image Generation  
Result: Detailed artistic prompt with:
- Visual composition guidelines
- Technical specifications (resolution, style, format)
- Mood and atmosphere definitions
- Lighting and color palette instructions
- Commercial usage considerations
```

### **Writing Content**
```
Keywords: "AI ethics, beginner guide, practical examples"
Task Type: ✍️ Writing & Content
Result: Structured writing prompt with:
- Target audience analysis
- Content structure and outline
- Tone and style guidelines
- Key topics and examples to include
- SEO and engagement optimization
```

## 🔒 Security & Privacy

### **API Key Protection**
- **🛡️ Completely Secured**: API key stored only in background script
- **🚫 Never Exposed**: Users cannot access or view the API key
- **🔐 Isolated Processing**: Background script handles all API communications
- **✅ Chrome Security**: Follows Chrome extension security best practices

### **Privacy Guarantees**
- **Zero Data Collection**: No storage of keywords, prompts, or user data
- **No Tracking**: No analytics, cookies, or user profiling
- **Local Processing**: Most operations happen in your browser
- **Encrypted Communications**: All API calls use HTTPS
- **Open Source**: Code available for security review

### **Data Flow**
```
Keywords → Background Script → Novita AI API → Structured Prompt → User
     ↑              ↑                            ↑
No Storage    API Key Secured              No Logging
```

## 🛠 Development

### File Structure
```
prompt-engineer-extension/
├── manifest.json          # Extension configuration & permissions
├── background.js          # Secure API handling & prompt generation
├── content.js             # Website integration & UI injection
├── styles.css             # Modern UI styling with dark mode
├── popup.html & popup.js  # Extension popup interface
├── config.js              # Configuration settings & API setup
├── icons/                 # Extension icons and branding
│   ├── icon16.png         # 16x16 icon for toolbar
│   ├── icon48.png         # 48x48 icon for management page
│   ├── icon128.png        # 128x128 icon for Chrome Web Store
│   ├── icon.svg           # Vector icon source file
│   └── logo.png           # Custom brand logo for floating button
├── README.md              # Complete documentation
├── INSTALLATION.md        # Detailed setup guide
├── SECURITY.md            # Security & privacy documentation
└── CHANGELOG.md           # Version history & features
```

### Key Components

1. **Background Script** (`background.js`): 
   - Secure API communications with Novita AI
   - Advanced prompt engineering with task-specific templates
   - Error handling and fallback systems
   - API key protection and isolation

2. **Content Script** (`content.js`): 
   - Injects modern UI into LLM websites
   - Smart chat input detection across platforms
   - Real-time validation and user feedback
   - Automatic prompt insertion capabilities

3. **Popup Interface** (`popup.html/js`): 
   - Extension status and information
   - Quick access to features and settings
   - Site compatibility indicators

4. **Modern Styling** (`styles.css`): 
   - Responsive design with dark mode support
   - Professional animations and transitions
   - Cross-platform visual consistency

5. **Configuration** (`config.js`):
   - Centralized settings management
   - Environment-ready for production deployment

6. **Icons & Branding** (`icons/` folder):
   - Complete icon set for Chrome extension requirements
   - `icon16.png`, `icon48.png`, `icon128.png`: Standard Chrome extension icons
   - `icon.svg`: Vector source for future icon updates
   - `logo.png`: Custom brand logo displayed on floating button

## 📚 Documentation

### **Available Documentation**
- **📖 README.md**: Complete feature documentation (this file)
- **🚀 INSTALLATION.md**: Step-by-step setup guide with troubleshooting
- **🔒 SECURITY.md**: Detailed security and privacy information
- **📝 CHANGELOG.md**: Version history and feature updates
- **⚙️ config.js**: Technical configuration settings

### **Quick Reference**
- **Installation**: See `INSTALLATION.md` for detailed setup instructions
- **Security**: Review `SECURITY.md` for privacy and API key protection details
- **Updates**: Check `CHANGELOG.md` for latest features and improvements
- **Troubleshooting**: Console logs and error handling information in documentation

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Adding support for more LLM websites
- Improving prompt generation logic
- Enhancing the user interface

## 📄 License

This project is open source and available under the MIT License.

## 🔮 Future Enhancements

- [ ] Custom prompt templates
- [ ] Prompt history and favorites
- [ ] Advanced prompt parameters
- [ ] Team collaboration features
- [ ] Integration with more AI platforms
- [ ] Offline mode capabilities

---

**Made with ❤️ for the AI community**
