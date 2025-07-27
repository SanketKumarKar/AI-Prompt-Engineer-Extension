# 🚀 AI Prompt Engineer Chrome Extension - Installation Guide

## ✨ Quick Setup (5 minutes)

### 📋 Prerequisites
- Google Chrome browser (latest version recommended)
- Basic computer skills (drag, drop, click)
- Novita API access (API key is pre-configured and secured in the extension)

### 🔧 Installation Steps

#### Step 1: Download the Extension
1. Download all files to a folder called `prompt-engineer-extension`
2. Ensure all files are in the same directory:
   ```
   prompt-engineer-extension/
   ├── manifest.json          # Extension configuration
   ├── background.js          # Secure API handling
   ├── content.js             # Website integration
   ├── styles.css             # Modern UI styling
   ├── popup.html             # Extension popup interface
   ├── popup.js               # Popup functionality
   ├── config.js              # Configuration settings
   ├── icons/                 # Extension icons and branding
   │   ├── icon16.png         # 16x16 icon for toolbar
   │   ├── icon48.png         # 48x48 icon for management
   │   ├── icon128.png        # 128x128 icon for store
   │   ├── icon.svg           # Vector icon source
   │   └── logo.png           # Custom brand logo
   ├── README.md              # Detailed documentation
   ├── INSTALLATION.md        # This installation guide
   ├── SECURITY.md            # Security & privacy info
   └── CHANGELOG.md           # Version history & features
   ```

#### Step 2: Open Chrome Extensions
1. Open Google Chrome
2. Type `chrome://extensions/` in the address bar and press Enter
3. **Important**: Toggle ON the "Developer mode" switch (top-right corner)

#### Step 3: Load the Extension
1. Click the **"Load unpacked"** button
2. Navigate to and select the `prompt-engineer-extension` folder
3. Click **"Select Folder"**
4. The extension should now appear in your extensions list with a ✅ green checkmark

#### Step 4: Pin the Extension (Recommended)
1. Click the puzzle piece icon (🧩) in Chrome's toolbar
2. Find "AI Prompt Engineer" in the list
3. Click the pin icon (📌) to pin it to your toolbar

> ✅ **Success Check**: You should see the extension icon in your Chrome toolbar. The floating button will appear automatically when you visit supported LLM websites.

### 🎯 Usage Instructions

#### Getting Started
1. **Visit any supported LLM website**:
   - [ChatGPT](https://chatgpt.com)
   - [Claude](https://claude.ai)
   - [DeepSeek](https://chat.deepseek.com)
   - [Google Gemini](https://gemini.google.com)
   - [Bing Chat](https://bing.com/chat)
   - [Poe](https://poe.com)
   - [You.com](https://you.com)

2. **Look for the floating button** with your custom logo in the bottom-right corner of the page
   - The button displays your brand logo from `icons/logo.png`
   - The button appears automatically on supported sites
   - It may take a few seconds to load on first visit
   - If you don't see it, try refreshing the page

3. **Click the button** to open the AI Prompt Engineer interface

#### Creating Your First Prompt
1. **Enter Keywords**: Type 3-4 descriptive keywords
   - Example: `responsive website, modern design, React`
   
2. **Select Task Type**: Choose the most appropriate option:
   - 🎨 **Image Generation** - For DALL-E, Midjourney, etc.
   - 💻 **Code & Development** - Programming tasks
   - ✍️ **Writing & Content** - Articles, blogs, copy
   - 📊 **Analysis & Research** - Data analysis, reports
   - 🎭 **Creative & Brainstorming** - Creative projects
   - 🌐 **Website Development** - Web projects
   - **General Purpose** - Universal tasks

3. **Generate**: Click "✨ Generate Prompt"

4. **Use Your Prompt**:
   - **🚀 Insert**: Automatically adds to chat input (works on most sites)
   - **📋 Copy**: Copies to clipboard for manual pasting (always works)
   - **💡 Tip**: If auto-insert doesn't work, use copy and paste manually

> 🎯 **Best Results**: Use specific, descriptive keywords and select the task type that best matches your goal.

### 🔍 Verify Installation

#### Quick Test
1. **Go to ChatGPT**: Visit [chatgpt.com](https://chatgpt.com)
2. **Look for the button**: Should appear in bottom-right corner within 5 seconds
3. **Test generation**: 
   - Click the button
   - Enter keywords: "modern website design"
   - Select: 🌐 Website Development
   - Click "✨ Generate Prompt"
4. **Success indicators**:
   - Button appears and responds to clicks
   - Interface opens with input fields
   - Prompt generates successfully
   - Copy/Insert buttons work

#### If Test Fails
- **Button missing**: Refresh page, check supported sites list
- **No interface**: Check browser console (F12) for errors
- **Generation fails**: Check internet connection, try fallback prompt
- **Insert doesn't work**: Use copy button instead

### 🔍 Troubleshooting

#### Extension Not Loading
- ✅ **Check files**: Ensure all files are in the same folder (see file structure above)
- ✅ **Verify manifest**: Confirm `manifest.json` is present and not corrupted
- ✅ **Developer mode**: Ensure Developer mode toggle is ON in chrome://extensions
- ✅ **Refresh**: Try refreshing the extensions page (chrome://extensions)
- ✅ **Chrome version**: Update Chrome to latest version if needed

#### Floating Button Not Appearing
- ✅ **Wait**: Button can take 2-5 seconds to appear on page load
- ✅ **Refresh page**: Reload the LLM website completely
- ✅ **Check site support**: Verify the site is in our supported list
- ✅ **Console errors**: Open browser console (F12) and look for red error messages
- ✅ **Extension conflicts**: Try disabling other extensions temporarily
- ✅ **Incognito test**: Try the extension in an incognito window

#### Prompt Generation Fails
- ✅ **Internet connection**: Verify you have a stable internet connection
- ✅ **Wait and retry**: API calls can take 3-10 seconds, try again if it times out
- ✅ **Use fallback**: Extension provides offline fallback prompts when API is unavailable
- ✅ **Check console**: Browser console (F12) shows detailed error information
- ✅ **API status**: If persistent issues, the Novita API might be temporarily down

#### Auto-insertion Not Working
- ✅ Use the "📋 Copy" button instead
- ✅ Try refreshing the LLM website
- ✅ Some sites have different input structures
- ✅ Manual pasting always works as backup

### 🛡️ Security & Privacy

#### What Data is Processed
- **Keywords you enter** - Sent to Novita AI API for prompt generation
- **Generated prompts** - Returned and displayed to you
- **No personal data** - Zero collection of personal information
- **API Key** - Completely secured in background script, never exposed

#### Data Flow & Security
1. Keywords → Extension Background Script → Novita AI API → Enhanced Prompt → You
2. **API Key Protection**: Stored securely, never accessible to users or web content
3. **No data storage**: Nothing is saved locally or remotely
4. **Encrypted communications**: All API calls use HTTPS
5. **No tracking or analytics**: Complete privacy protection

#### Privacy Guarantees
- ✅ **Zero Data Collection**: No storage of keywords, prompts, or user data
- ✅ **API Key Security**: Completely protected using Chrome extension security model
- ✅ **No Tracking**: No analytics, cookies, or user profiling
- ✅ **Local Processing**: Most operations happen in your browser
- ✅ **Open Source**: Code available for security review

### 🎨 Customization Tips

#### Custom Logo & Branding
- **Replace logo**: Update `icons/logo.png` with your own brand logo
- **Logo requirements**: PNG format, square aspect ratio recommended
- **Size recommendations**: 64x64px to 128x128px for best results
- **Icon consistency**: Keep the same visual style across all icons in the folder

#### Keyword Best Practices
- **Be Specific**: "modern responsive website" vs "website"
- **Include Context**: "corporate dashboard, React, dark theme"
- **Add Constraints**: "beginner-friendly, step-by-step, React tutorial"
- **Mention Tools**: "Photoshop, professional headshot, studio lighting"

#### Task Type Selection
- **Image Generation**: Include style, mood, technical specs
- **Code**: Specify language, framework, complexity
- **Writing**: Define audience, tone, length
- **Analysis**: Mention methodology, depth required

### 🚀 Advanced Usage

#### Power User Tips
1. **Chain Prompts**: Use generated prompts as starting points for refinement
2. **Mix Task Types**: Generate a code prompt, then use writing mode for documentation
3. **Iterate**: Generate multiple versions and combine the best parts
4. **Save Favorites**: Copy great prompts to a personal collection

#### Professional Workflows
1. **Content Creation**: Keywords → Writing prompt → AI content → Review → Publish
2. **Development**: Keywords → Code prompt → AI code → Test → Deploy
3. **Design**: Keywords → Image prompt → AI image → Refine → Use

### ⚡ Performance Tips

#### Optimizing Extension Performance
- **Close unused tabs**: Too many AI website tabs can slow down the extension
- **Clear browser cache**: Periodically clear cache for better performance
- **Update Chrome**: Latest Chrome version ensures best compatibility
- **Restart browser**: If extension becomes sluggish, restart Chrome

#### Maximizing AI Results
- **Be specific**: "React dashboard with dark theme" vs "website"
- **Include context**: "beginner tutorial" vs "advanced enterprise solution"
- **Mention tools**: "Figma design, mobile-first" vs "design"
- **Add constraints**: "under 500 words, professional tone" vs "article"

#### Prompt Generation Best Practices
- **Start simple**: Begin with 3-4 core keywords
- **Iterate**: Generate multiple prompts and combine the best parts
- **Task-specific**: Choose the most relevant task type for better results
- **Copy favorites**: Save your best generated prompts for future reference

### 💡 Example Workflows

#### Creating a Website
```
Keywords: "e-commerce store, minimalist design, mobile-first"
Task Type: 🌐 Website Development
Result: Comprehensive development plan with architecture, tech stack, and implementation steps
```

#### Generating Art
```
Keywords: "cyberpunk cityscape, neon lights, rain"
Task Type: 🎨 Image Generation  
Result: Detailed artistic prompt with style, composition, and technical specifications
```

#### Writing Content
```
Keywords: "AI ethics, beginner guide, practical examples"
Task Type: ✍️ Writing & Content
Result: Structured writing prompt with outline, tone, and key points to cover
```

### 🆘 Getting Help

#### Quick Fixes
- **Restart browser** if extension stops working
- **Reload extension** in chrome://extensions
- **Clear browser cache** if issues persist
- **Check for Chrome updates**

#### Advanced Troubleshooting
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for any red error messages
4. Note the error details for support

#### Support Resources
- Check the `README.md` for detailed technical documentation
- Review `SECURITY.md` for privacy and security information
- See `CHANGELOG.md` for latest features and improvements
- Browser console logs help diagnose technical issues
- Most problems are fixed by refreshing the page/browser

#### Documentation Files
- **📖 README.md**: Complete feature documentation and examples
- **🔒 SECURITY.md**: Detailed security and privacy information
- **📝 CHANGELOG.md**: Version history and feature updates
- **⚙️ config.js**: Configuration settings (for developers)
- **🎨 icons/**: Extension icons and branding assets

### 🎉 You're Ready!

The AI Prompt Engineer extension is now installed and ready to supercharge your AI interactions! 

**🚀 Next Steps:**
1. **Bookmark this guide**: Keep `INSTALLATION.md` handy for reference
2. **Read the docs**: Check `README.md` for advanced features and examples
3. **Try different task types**: Experiment with all 7 prompt modes
4. **Build your workflow**: Develop personal prompt generation strategies

**💡 Remember - The extension works best when you:**
- ✅ Use descriptive, specific keywords (not generic ones)
- ✅ Choose the right task type for your project
- ✅ Iterate and refine your prompts for complex tasks
- ✅ Combine multiple generated prompts for comprehensive results
- ✅ Take advantage of both AI generation and fallback templates

**🔧 If you encounter any issues:**
- Check this installation guide first
- Look at browser console (F12) for technical details
- Try the troubleshooting steps above
- Most problems are solved by refreshing the page or browser

**📚 Additional Resources:**
- **README.md**: Complete feature documentation with examples
- **SECURITY.md**: Privacy and security information
- **CHANGELOG.md**: Latest updates and feature additions

---

Happy prompting! 🚀✨

*Transform your simple keywords into professional AI prompts with just a few clicks.*
