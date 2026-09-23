const scenes = [...document.querySelectorAll('.scene')];
const chapters = [...document.querySelectorAll('.chapters button')];
const articles = [...document.querySelectorAll('.story-copy article')];
const progress = document.querySelector('.progress span');
const video = document.querySelector('.scene video');
if (video) video.play().then(() => document.querySelector('.scene--1').classList.add('video-ready')).catch(() => {});

function updateStory() {
  const first = articles[0].offsetTop;
  const last = articles.at(-1).offsetTop + articles.at(-1).offsetHeight - innerHeight;
  progress.style.transform = `scaleX(${Math.max(0, Math.min(1, (scrollY - first) / (last - first)))})`;
  let current = 0;
  articles.forEach((article, i) => { if (article.getBoundingClientRect().top <= innerHeight * .48) current = i; });
  scenes.forEach((scene, i) => scene.classList.toggle('active', i === current));
  chapters.forEach((button, i) => button.classList.toggle('active', i === current));
}
addEventListener('scroll', updateStory, {passive:true});
addEventListener('resize', updateStory);
chapters.forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.target).scrollIntoView({behavior:'smooth'})));
document.querySelectorAll('.choices button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.choices button').forEach(item => item.classList.toggle('active', item === button));
  document.querySelector('.answer').textContent = button.dataset.answer === 'continue'
    ? 'Значит, система уже работает без постоянного ручного управления. Это редкий и хороший результат.'
    : 'Это не про незаменимость. Это сигнал: решения, границы и ответственность пока живут в голове руководителя.';
}));
updateStory();
