# 🐙 Gitluv - GitHub Actions Floating Widget

A beautiful, interactive floating widget that provides quick access to common GitHub actions directly from your website. Built with vanilla JavaScript, CSS, and HTML.

![Gitluv Widget Demo](https://img.shields.io/badge/Status-Demo%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Floating Action Button**: Elegant floating GitHub button with smooth animations
- **Quick Actions**: One-click access to common GitHub operations:
  - ⭐ Star Repository
  - 🍴 Fork Repository  
  - 👤 Follow User
  - 👁️ Watch Repository
  - 🐛 Create Issue
  - 📤 Share Repository
  - 📋 Clone Repository
  - 📦 Download ZIP
- **Beautiful Animations**: Smooth transitions, confetti effects, and pulse animations
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Customizable**: Easy to configure position, colors, and behavior
- **Tooltips**: Helpful tooltips for each action
- **Keyboard Support**: ESC key to close the widget
- **Touch Support**: Swipe gestures for mobile devices

## Quick Start

1. **Download the files**:
   ```bash
   git clone https://github.com/yourusername/gitluv.git
   cd gitluv
   ```

2. **Open in your browser**:
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Click the floating GitHub button** and explore the available actions!

## Project Structure

```
gitluv/
├── index.html          # Main HTML file with the widget
├── gitluv.css          # Styles and animations
├── gitluv.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ Customization

### Widget Configuration

Edit the `widgetConfig` object in `gitluv.js`:

```javascript
const widgetConfig = {
    position: 'right',     // 'left' or 'right'
    enableConfetti: true,  // Enable confetti animation
    enablePulse: true,     // Enable pulse animation
    enableFloating: true   // Enable floating animation
};
```

### Repository Data

Update the `repoData` object in `gitluv.js` with your repository information:

```javascript
const repoData = {
    owner: 'your-username',
    repo: 'your-repository',
    url: 'https://github.com/your-username/your-repository',
    description: 'Your amazing project description'
};
```

### Position Control

You can programmatically change the widget position:

```javascript
// Change to left side
setWidgetPosition('left');

// Change to right side  
setWidgetPosition('right');
```

### Styling

The widget uses CSS custom properties and can be easily styled by modifying `gitluv.css`. Key classes:

- `.github-floating-widget` - Main container
- `.github-button` - Main floating button
- `.github-options` - Action buttons container
- `.github-option` - Individual action buttons

## Available Actions

| Action | Icon | Description |
|--------|------|-------------|
| Star | ⭐ | Star the repository |
| Fork | 🍴 | Fork the repository |
| Follow | 👤 | Follow the repository owner |
| Watch | 👁️ | Watch the repository |
| Issue | 🐛 | Create a new issue |
| Share | 📤 | Share repository URL |
| Clone | 📋 | Copy clone URL to clipboard |
| Download | 📦 | Download repository as ZIP |

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## Dependencies

- **Font Awesome 6.0.0** (CDN) - For icons
- **Vanilla JavaScript** - No framework required
- **Modern CSS** - For animations and styling

## Integration

### Adding to Your Website

1. Copy the three files (`index.html`, `gitluv.css`, `gitluv.js`) to your project
2. Include the CSS and JS files in your HTML:
   ```html
   <link rel="stylesheet" href="gitluv.css">
   <script src="gitluv.js"></script>
   ```
3. Add the widget HTML to your page:
   ```html
   <div class="github-floating-widget">
       <div class="github-options" id="githubOptions">
           <!-- Action buttons will be populated by JavaScript -->
       </div>
       <button class="github-button" id="githubButton" onclick="toggleGitHub()">
           <i class="fab fa-github"></i>
       </button>
   </div>
   ```

### WordPress Integration

Add this to your theme's `functions.php`:

```php
function enqueue_gitluv_widget() {
    wp_enqueue_style('gitluv-css', get_template_directory_uri() . '/gitluv.css');
    wp_enqueue_script('gitluv-js', get_template_directory_uri() . '/gitluv.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_gitluv_widget');
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Tuxedosoft** - [Website](http://tuxedosoft.com)

## 🙏 Acknowledgments

- Font Awesome for the beautiful icons
- GitHub for the inspiration
- The open source community for feedback and suggestions

---

⭐ **Star this repository if you found it helpful!** ⭐ 
