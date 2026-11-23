/**
 * HomeNode // Yasir Personal Engineering Portfolio
 * Fast, SEO-optimized, accessible, client-side engine
 */

(function () {
  'use strict';

  // State
  const state = {
    category: 'all',
    search: '',
    sort: 'featured',
    projects: window.__PROJECTS_DATA__ || []
  };

  // DOM Elements
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const searchInput = document.getElementById('project-search');
  const searchClear = document.getElementById('search-clear');
  const sortSelect = document.getElementById('project-sort');
  const categoryTabs = document.querySelectorAll('.category-tab');
  const projectsGrid = document.getElementById('projects-grid');
  const resultsCount = document.getElementById('results-count');
  const emptyState = document.getElementById('empty-state');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const toastEl = document.getElementById('toast');

  // Modal Elements
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalImpactSection = document.getElementById('modal-impact-section');
  const modalImpact = document.getElementById('modal-impact');
  const modalCategory = document.getElementById('modal-category');
  const modalLang = document.getElementById('modal-lang');
  const modalLangDot = document.getElementById('modal-lang-dot');
  const modalTags = document.getElementById('modal-tags');
  const modalCloneCmd = document.getElementById('modal-clone-cmd');
  const copyCloneBtn = document.getElementById('copy-clone-btn');
  const modalGithubBtn = document.getElementById('modal-github-btn');
  const modalDemoBtn = document.getElementById('modal-demo-btn');

  // Language Colors
  const LANG_COLORS = {
    "Python": "#3572A5",
    "JavaScript": "#f1e05a",
    "TypeScript": "#3178c6",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "Shell": "#89e051",
    "Dockerfile": "#384d54",
    "Dart": "#00B4AB",
    "PHP": "#4F5D95",
    "CMake": "#DA3434",
    "None": "#6e7681",
    "Other": "#8b949e"
  };

  /* ==========================================================================
     Theme Management
     ========================================================================== */
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
      });
    }

    // Listen for OS preference change
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#090d16' : '#f8fafc');
    }
  }

  /* ==========================================================================
     Toast Notifications
     ========================================================================== */
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2500);
  }

  /* ==========================================================================
     Filtering & Sorting Engine
     ========================================================================== */
  function updateProjectsView() {
    const cards = Array.from(projectsGrid.querySelectorAll('.project-card'));
    const query = state.search.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = card.getAttribute('data-title') || '';
      const tags = card.getAttribute('data-tags') || '';
      const lang = card.getAttribute('data-lang') || '';
      const desc = (card.querySelector('.card-desc')?.textContent || '').toLowerCase();

      // Check category match
      const categoryMatch = (state.category === 'all' || category === state.category);

      // Check search match
      let searchMatch = true;
      if (query) {
        searchMatch = title.includes(query) || 
                      tags.includes(query) || 
                      lang.includes(query) || 
                      desc.includes(query);
      }

      if (categoryMatch && searchMatch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Reorder visible cards based on sorting
    sortVisibleCards(cards);

    // Update Counter
    if (resultsCount) {
      resultsCount.innerHTML = `Showing <strong>${visibleCount}</strong> of ${cards.length} repositories`;
    }

    // Empty state handling
    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.style.display = 'block';
        projectsGrid.style.display = 'none';
      } else {
        emptyState.style.display = 'none';
        projectsGrid.style.display = 'grid';
      }
    }
  }

  function sortVisibleCards(cards) {
    const sortedCards = [...cards].sort((a, b) => {
      if (state.sort === 'featured') {
        const aFeatured = a.classList.contains('is-featured') ? 1 : 0;
        const bFeatured = b.classList.contains('is-featured') ? 1 : 0;
        if (aFeatured !== bFeatured) return bFeatured - aFeatured;
        const aPush = a.getAttribute('data-pushed') || '';
        const bPush = b.getAttribute('data-pushed') || '';
        return bPush.localeCompare(aPush);
      } else if (state.sort === 'recent') {
        const aPush = a.getAttribute('data-pushed') || '';
        const bPush = b.getAttribute('data-pushed') || '';
        return bPush.localeCompare(aPush);
      } else if (state.sort === 'name') {
        const aTitle = a.getAttribute('data-title') || '';
        const bTitle = b.getAttribute('data-title') || '';
        return aTitle.localeCompare(bTitle);
      } else if (state.sort === 'stars') {
        const aStars = parseInt(a.getAttribute('data-stars') || '0', 10);
        const bStars = parseInt(b.getAttribute('data-stars') || '0', 10);
        return bStars - aStars;
      }
      return 0;
    });

    sortedCards.forEach(card => projectsGrid.appendChild(card));
  }

  /* Debounce helper */
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  /* ==========================================================================
     Project Modal
     ========================================================================== */
  function openProjectModal(projectId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project || !modalBackdrop) return;

    modalTitle.textContent = project.title || project.name;
    modalDesc.textContent = project.description || '';
    
    // Category Badge
    modalCategory.textContent = (project.category || 'devops').toUpperCase();
    modalCategory.className = `category-badge cat-${project.category || 'devops'}`;

    // Language
    const lang = project.language || 'DevOps';
    modalLang.textContent = lang;
    modalLangDot.style.backgroundColor = LANG_COLORS[lang] || '#8b949e';

    // Impact
    if (project.impact) {
      modalImpactSection.style.display = 'block';
      modalImpact.textContent = project.impact;
    } else {
      modalImpactSection.style.display = 'none';
    }

    // Tags
    modalTags.innerHTML = '';
    (project.tags || []).forEach(t => {
      const span = document.createElement('span');
      span.className = 'project-tag';
      span.textContent = t;
      modalTags.appendChild(span);
    });

    // Git Clone Command
    const cloneUrl = `git clone ${project.html_url}.git`;
    modalCloneCmd.textContent = cloneUrl;

    // Links
    modalGithubBtn.href = project.html_url;
    if (project.demo) {
      modalDemoBtn.href = project.demo;
      modalDemoBtn.style.display = 'inline-flex';
    } else {
      modalDemoBtn.style.display = 'none';
    }

    // Show modal & prevent background scroll
    modalBackdrop.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Focus close button
    modalCloseBtn?.focus();
  }

  function closeProjectModal() {
    if (!modalBackdrop) return;
    modalBackdrop.style.display = 'none';
    document.body.style.overflow = '';
  }

  /* ==========================================================================
     Event Listeners
     ========================================================================== */
  function setupEventListeners() {
    // Search input
    if (searchInput) {
      const onSearch = debounce(() => {
        state.search = searchInput.value;
        if (searchClear) {
          searchClear.style.display = state.search ? 'flex' : 'none';
        }
        updateProjectsView();
      }, 150);

      searchInput.addEventListener('input', onSearch);
    }

    // Search clear
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          state.search = '';
          searchClear.style.display = 'none';
          searchInput.focus();
          updateProjectsView();
        }
      });
    }

    // Sort select
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sort = e.target.value;
        updateProjectsView();
      });
    }

    // Category Tabs
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        state.category = tab.getAttribute('data-filter') || 'all';
        updateProjectsView();
      });
    });

    // Reset filters button
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        state.category = 'all';
        state.search = '';
        state.sort = 'featured';
        if (searchInput) searchInput.value = '';
        if (searchClear) searchClear.style.display = 'none';
        if (sortSelect) sortSelect.value = 'featured';
        categoryTabs.forEach(t => {
          const isAll = t.getAttribute('data-filter') === 'all';
          t.classList.toggle('active', isAll);
          t.setAttribute('aria-selected', isAll ? 'true' : 'false');
        });
        updateProjectsView();
      });
    }

    // Details button clicks (Delegation)
    document.addEventListener('click', (e) => {
      const detailsBtn = e.target.closest('.view-details-btn');
      if (detailsBtn) {
        const id = detailsBtn.getAttribute('data-project-id');
        if (id) openProjectModal(id);
      }
    });

    // Modal Close
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeProjectModal);
    }
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeProjectModal();
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop && modalBackdrop.style.display === 'flex') {
        closeProjectModal();
      }
    });

    // Copy Clone Command in Modal
    if (copyCloneBtn) {
      copyCloneBtn.addEventListener('click', () => {
        const text = modalCloneCmd?.textContent || '';
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
            showToast('Git clone command copied!');
          }).catch(() => {
            showToast('Failed to copy');
          });
        }
      });
    }

    // Copy Email Buttons
    document.querySelectorAll('.copy-email-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const email = btn.getAttribute('data-email') || 'aayasir217@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
        }).catch(() => {
          showToast('Failed to copy');
        });
      });
    });

    // Mobile Navigation Menu Toggle
    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      });

      // Close mobile nav when clicking a link
      navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Back to top button
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ==========================================================================
     Optional Live GitHub API Stats Enhancement (Non-blocking)
     ========================================================================== */
  function fetchLiveGitHubStats() {
    const userUrl = 'https://api.github.com/users/aayasir2177';
    fetch(userUrl)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        const reposStat = document.getElementById('stat-repos');
        if (reposStat && data.public_repos) {
          reposStat.textContent = data.public_repos;
        }
        const syncIndicator = document.getElementById('live-sync-indicator');
        if (syncIndicator) {
          syncIndicator.title = `Live data verified from GitHub (Updated ${new Date(data.updated_at).toLocaleDateString()})`;
        }
      })
      .catch(() => {
        // Silent catch: network offline or rate limit, static data is already rendered
      });
  }

  /* ==========================================================================
     Initialization
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupEventListeners();
    updateProjectsView();
    fetchLiveGitHubStats();
  });

})();
