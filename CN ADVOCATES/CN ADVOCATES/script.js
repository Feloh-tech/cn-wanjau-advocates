document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
navToggle.addEventListener('click', ()=>{
  mainNav.style.display = mainNav.style.display === 'block' ? '' : 'block';
});

// Simple contact form handler (no backend) — show a confirmation and clear form
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Thank you, your message has been noted. We will contact you shortly.');
  form.reset();
});

// Reviews: store in localStorage (client side only)
const reviewForm = document.getElementById('review-form');
const reviewsList = document.getElementById('reviews-list');

function loadReviews(){
  const raw = localStorage.getItem('cn_reviews');
  const arr = raw ? JSON.parse(raw) : [];
  reviewsList.innerHTML = '';
  arr.reverse().forEach(r => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${escapeHtml(r.name)}</strong> — ${'★'.repeat(r.rating)}<br><small>${escapeHtml(r.message)}</small>`;
    reviewsList.appendChild(li);
  });
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c];
  });
}

reviewForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('rname').value.trim();
  const rating = Number(document.getElementById('rrating').value);
  const message = document.getElementById('rmessage').value.trim();
  if(!name || !message) return alert('Please provide name and review message.');
  const raw = localStorage.getItem('cn_reviews');
  const arr = raw ? JSON.parse(raw) : [];
  arr.push({name, rating, message, date: new Date().toISOString()});
  localStorage.setItem('cn_reviews', JSON.stringify(arr));
  reviewForm.reset();
  loadReviews();
});

loadReviews();
