// TrustPuppy Content Protection Script
(function() {
  'use strict';

  // Protection functions
  function initContentProtection() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });

    // Disable keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      // F12 (Developer Tools)
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+A (Select All)
      if (e.ctrlKey && e.keyCode === 65) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+S (Save)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+P (Print)
      if (e.ctrlKey && e.keyCode === 80) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+C (Copy)
      if (e.ctrlKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+X (Cut)
      if (e.ctrlKey && e.keyCode === 88) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+V (Paste)
      if (e.ctrlKey && e.keyCode === 86) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }
    });

    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
      e.preventDefault();
      return false;
    });

    // Disable text selection with mouse
    document.addEventListener('selectstart', function(e) {
      e.preventDefault();
      return false;
    });

    // Clear clipboard only on copy attempts (less intrusive)
    document.addEventListener('copy', function(e) {
      try {
        e.clipboardData.setData('text/plain', '');
        e.preventDefault();
      } catch (err) {
        // Silently handle errors
      }
    });

    // Disable print screen (visual feedback)
    document.addEventListener('keyup', function(e) {
      if (e.keyCode === 44) {
        document.body.style.display = 'none';
        setTimeout(function() {
          document.body.style.display = 'block';
        }, 200);
      }
    });

    // Add invisible watermark
    const watermark = document.createElement('div');
    watermark.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="16" fill="%23000000" opacity="0.015" transform="rotate(-45 150 150)">TrustPuppy Protected Content</text></svg>') repeat;
    `;
    document.body.appendChild(watermark);

    // Developer tools detection (desktop only)
    let devtools = {
      open: false,
      orientation: null
    };
    
    const threshold = 160;
    
    // Check if device is mobile
    function isMobileDevice() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
             ('ontouchstart' in window) ||
             (navigator.maxTouchPoints > 0) ||
             (window.screen.width <= 768);
    }
    
    // Only run dev tools detection on desktop devices
    if (!isMobileDevice()) {
      setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtools.open) {
            devtools.open = true;
            document.body.innerHTML = `
              <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background: #f8f9fa;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20px;
              ">
                <div style="
                  background: white;
                  padding: 40px;
                  border-radius: 10px;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                  max-width: 500px;
                ">
                  <h2 style="color: #0f172a; margin-bottom: 20px;">🔒 Content Protection Active</h2>
                  <p style="color: #6b7280; margin-bottom: 20px;">Developer tools have been detected. Please close them to continue viewing this content.</p>
                  <p style="color: #9ca3af; font-size: 14px;">This content is protected by TrustPuppy security measures.</p>
                </div>
              </div>
            `;
          }
        } else {
          if (devtools.open) {
            devtools.open = false;
            location.reload();
          }
        }
      }, 500);
    }

    // Disable image saving
    document.addEventListener('dragstart', function(e) {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    });

    // Console warning
    console.clear();
    console.log('%c🔒 Content Protection Warning', 'color: red; font-size: 20px; font-weight: bold;');
    console.log('%cThis content is protected by TrustPuppy. Unauthorized access or copying is prohibited.', 'color: #666; font-size: 14px;');
    console.log('%cViolation of these terms may result in legal action.', 'color: #666; font-size: 14px;');

    // Clear console periodically
    setInterval(function() {
      console.clear();
      console.log('%c🔒 Content Protection Active', 'color: red; font-size: 16px; font-weight: bold;');
    }, 3000);
  }

  // Initialize protection when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContentProtection);
  } else {
    initContentProtection();
  }

  // Additional protection for window events
  window.addEventListener('beforeunload', function() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('');
      }
    } catch (e) {
      // Silently handle errors
    }
  });

})();
