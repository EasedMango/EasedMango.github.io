(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  const updateButtonIcon = (theme) => {
    const themeIcon = document.getElementById('theme-icon')
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'bi bi-moon'
      } else if (theme === 'light') {
        themeIcon.className = 'bi bi-sun'
      } else {
        themeIcon.className = 'bi bi-circle-half'
      }
    }
  }

  setTheme(getPreferredTheme())
  updateButtonIcon(getPreferredTheme())

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme)
          updateButtonIcon(theme)
        })
      })

    // Add toggle button functionality
    const themeToggleButton = document.getElementById('theme-toggle')
    themeToggleButton.addEventListener('click', () => {
      const currentTheme = getStoredTheme() || getPreferredTheme()
      let newTheme

      // Toggle logic: light -> dark -> auto -> light...
      switch (currentTheme) {
        case 'light':
          newTheme = 'dark'
          break
        case 'dark':
          newTheme = 'auto'
          break
        default:
          newTheme = 'light'
      }

      setStoredTheme(newTheme)
      setTheme(newTheme)
      updateButtonIcon(newTheme)
    })
  })
})()




  document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('iframe, video');

    const observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.5 // Trigger when 50% of the video is out of view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The video is in view, allow it to play (if it's a video element)
                if (entry.target.tagName === 'VIDEO') {
                    entry.target.play();
                }
            } else {
                // The video is out of view, stop it
                if (entry.target.tagName === 'IFRAME') {
                    entry.target.src = entry.target.src; // Reset the iframe to stop playback
                } else if (entry.target.tagName === 'VIDEO') {
                    entry.target.pause(); // Pause HTML5 video
                }
            }
        });
    }, observerOptions);

    videos.forEach(video => {
        observer.observe(video);
    });
});
