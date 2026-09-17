const langButton=document.querySelector('.lang-switch');
let lang='fr';
langButton.addEventListener('click',()=>{lang=lang==='fr'?'en':'fr';document.documentElement.lang=lang;document.querySelectorAll('[data-fr]').forEach(el=>el.textContent=el.dataset[lang]);const parts=langButton.querySelectorAll('span');parts[0].classList.toggle('active',lang==='fr');parts[1].classList.toggle('active',lang==='en');langButton.setAttribute('aria-label',lang==='fr'?'Switch to English':'Passer en français')});
document.getElementById('year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
