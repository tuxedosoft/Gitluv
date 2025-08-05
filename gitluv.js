/* ----------------------------------

Gitlux Github Sharing Widget
Developer : Tuxedosoft (http://tuxedosoft.com)
Version   : 1.0.0
Released  : 5th, August, 2025

-------------------------------------*/


// Widget Configuration
const widgetConfig = {
    position: 'right', // 'left' or 'right'
    enableConfetti: true,
    enablePulse: true,
    enableFloating: true
};

let isOpen = false;
const githubButton = document.getElementById('githubButton');
const githubOptions = document.getElementById('githubOptions');
const successAnimation = document.getElementById('successAnimation');
const confettiContainer = document.getElementById('confettiContainer');
const floatingWidget = document.querySelector('.github-floating-widget');

// Initialize widget position
function initializeWidgetPosition() {
    if (widgetConfig.position === 'left') {
        floatingWidget.classList.add('left');
    } else {
        floatingWidget.classList.remove('left');
    }
}

// Function to change widget position
function setWidgetPosition(position) {
    if (position === 'left' || position === 'right') {
        widgetConfig.position = position;
        initializeWidgetPosition();
        console.log(`GitHub widget position changed to: ${position}`);
    }
}

// Initialize widget on page load
initializeWidgetPosition();

// Sample repository data (in a real app, this would come from GitHub API)
const repoData = {
    owner: 'username',
    repo: 'amazing-project',
    url: 'https://github.com/username/amazing-project',
    description: 'An amazing open source project'
};

// Confetti function
function createConfetti() {
    const colors = ['#24292e', '#586069', '#0366d6', '#28a745', '#d73a49', '#6f42c1', '#f1f8ff', '#f6f8fa'];
    const confettiCount = 150;
    
    // Get button position for explosion center
    const buttonRect = githubButton.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Position confetti at button center
        confetti.style.left = buttonCenterX + 'px';
        confetti.style.top = buttonCenterY + 'px';
        confetti.style.position = 'fixed';
        
        // Random explosion direction and distance
        const angle = Math.random() * 360;
        const distance = Math.random() * 200 + 50; // 50-250px from center
        const endX = buttonCenterX + Math.cos(angle * Math.PI / 180) * distance;
        const endY = buttonCenterY + Math.sin(angle * Math.PI / 180) * distance;
        
        // Random animation properties
        const duration = Math.random() * 1.5 + 1.5; // 1.5-3 seconds
        const delay = Math.random() * 0.5; // 0-0.5 seconds delay
        
        confetti.style.animationDelay = delay + 's';
        confetti.style.animationDuration = duration + 's';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Random confetti shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.borderRadius = '0';
        }
        
        // Random sizes
        const size = Math.random() * 8 + 5;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // Random colors
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Set custom animation for explosion effect
        confetti.style.setProperty('--end-x', (endX - buttonCenterX) + 'px');
        confetti.style.setProperty('--end-y', (endY - buttonCenterY) + 'px');
        confetti.style.animation = `confetti-explosion ${duration}s ${delay}s ease-out forwards`;
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, (duration + delay) * 1000 + 1000);
    }
}

// Add pulse animation on page load
if (widgetConfig.enablePulse) {
    setTimeout(() => {
        githubButton.classList.add('pulse');
    }, 1000);
}

function toggleGitHub() {
    isOpen = !isOpen;
    
    if (isOpen) {
        githubButton.classList.add('active');
        githubOptions.classList.add('show');
        githubButton.classList.remove('pulse');
        // Create confetti when button is clicked and opens
        if (widgetConfig.enableConfetti) {
            createConfetti();
        }
    } else {
        githubButton.classList.remove('active');
        githubOptions.classList.remove('show');
        // Restart pulse animation after closing
        if (widgetConfig.enablePulse) {
            setTimeout(() => {
                githubButton.classList.add('pulse');
            }, 500);
        }
    }
}

function githubAction(action) {
    let message = '';
    let url = '';

    switch (action) {
        case 'star':
            message = 'Repository starred! ⭐';
            url = `https://github.com/${repoData.owner}/${repoData.repo}`;
            break;
        case 'fork':
            message = 'Repository forked! 🍴';
            url = `https://github.com/${repoData.owner}/${repoData.repo}/fork`;
            break;
        case 'follow':
            message = 'User followed! 👤';
            url = `https://github.com/${repoData.owner}`;
            break;
        case 'watch':
            message = 'Repository watched! 👁️';
            url = `https://github.com/${repoData.owner}/${repoData.repo}`;
            break;
        case 'issue':
            message = 'Issue page opened! 🐛';
            url = `https://github.com/${repoData.owner}/${repoData.repo}/issues/new`;
            break;
        case 'share':
            message = 'Repository shared! 📤';
            shareRepository();
            return;
        case 'clone':
            message = 'Clone URL copied! 📋';
            copyToClipboard(`git clone https://github.com/${repoData.owner}/${repoData.repo}.git`);
            break;
        case 'download':
            message = 'ZIP download started! 📦';
            url = `https://github.com/${repoData.owner}/${repoData.repo}/archive/refs/heads/main.zip`;
            break;
    }

    if (url) {
        window.open(url, '_blank');
    }
    
    showSuccess(message);
}

function shareRepository() {
    const shareData = {
        title: `${repoData.owner}/${repoData.repo}`,
        text: repoData.description,
        url: repoData.url
    };

    if (navigator.share) {
        navigator.share(shareData);
        showSuccess('Repository shared via native sharing! 📤');
    } else {
        // Fallback for browsers that don't support native sharing
        copyToClipboard(repoData.url);
        showSuccess('Repository URL copied to clipboard! 📋');
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

function showSuccess(message) {
    successAnimation.textContent = message;
    successAnimation.classList.add('show');
    
    setTimeout(() => {
        successAnimation.classList.remove('show');
    }, 2000);
}

// Close GitHub options when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.github-floating-widget') && isOpen) {
        toggleGitHub();
    }
});

// Add some fun interactions
githubButton.addEventListener('mouseenter', () => {
    if (!isOpen) {
        githubButton.style.transform = 'scale(1.05)';
    }
});

githubButton.addEventListener('mouseleave', () => {
    if (!isOpen) {
        githubButton.style.transform = 'scale(1)';
    }
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
        toggleGitHub();
    }
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

githubButton.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

githubButton.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    const swipeDistance = touchStartY - touchEndY;
    
    if (swipeDistance > 50 && !isOpen) {
        toggleGitHub();
    } else if (swipeDistance < -50 && isOpen) {
        toggleGitHub();
    }
});

// Add some random floating animation
function addFloatingAnimation() {
    const widget = document.querySelector('.github-floating-widget');
    widget.style.animation = 'floating 3s ease-in-out infinite';
}

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Start floating animation after a delay
if (widgetConfig.enableFloating) {
    setTimeout(addFloatingAnimation, 2000);
}