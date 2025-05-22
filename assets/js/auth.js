'use strict';

/**
 * Auth modal functionality
 */

const userBtn = document.querySelector('[aria-label="user"]');

// Create auth modal element
const authModal = document.createElement('div');
authModal.classList.add('auth-modal');
authModal.innerHTML = `
  <div class="auth-modal-content">
    <button class="nav-close-btn" aria-label="close auth" title="Close Auth">
      <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
    </button>
    
    <div class="auth-tabs">
      <button class="auth-tab active" data-tab="login">Login</button>
      <button class="auth-tab" data-tab="signup">Sign Up</button>
    </div>

    <form class="auth-form login-form active" data-form="login">
      <div class="form-group">
        <input type="email" name="email" class="input-field" placeholder="Email" required>
      </div>
      <div class="form-group">
        <input type="password" name="password" class="input-field" placeholder="Password" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>

    <form class="auth-form signup-form" data-form="signup">
      <div class="form-group">
        <input type="email" name="email" class="input-field" placeholder="Email" required>
      </div>
      <div class="form-group">
        <input type="password" name="password" class="input-field" placeholder="Password" required>
      </div>
      <div class="form-group">
        <input type="password" name="confirmPassword" class="input-field" placeholder="Confirm Password" required>
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
  </div>
`;

document.body.appendChild(authModal);

// Get DOM elements
const authCloseBtn = authModal.querySelector('.nav-close-btn');
const authTabs = authModal.querySelectorAll('.auth-tab');
const authForms = authModal.querySelectorAll('.auth-form');

// Toggle auth modal
const toggleAuthModal = () => {
  authModal.classList.toggle('active');
  overlay.classList.toggle('active');
};

// Switch between login and signup forms
const switchAuthForm = (clickedTab) => {
  const targetForm = clickedTab.dataset.tab;

  authTabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === targetForm);
  });

  authForms.forEach(form => {
    form.classList.toggle('active', form.dataset.form === targetForm);
  });
};

// Event listeners
userBtn.addEventListener('click', toggleAuthModal);
authCloseBtn.addEventListener('click', toggleAuthModal);
overlay.addEventListener('click', toggleAuthModal);

authTabs.forEach(tab => {
  tab.addEventListener('click', () => switchAuthForm(tab));
});

// Handle form submissions
authForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log(`${form.dataset.form} form submitted`);
  });
});