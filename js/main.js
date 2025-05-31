// 暗黑模式切换按钮
window.addEventListener('DOMContentLoaded', () => {
  const toggle = document.createElement('button');
  toggle.className = 'toggle-dark';
  toggle.innerText = '🌙/☀️';
  toggle.onclick = () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  };
  document.body.appendChild(toggle);

  // 保留主题设置
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');

  // 相册切换动画
  const albumSection = document.querySelector('.album-transition');
  if (albumSection) {
    setTimeout(() => {
      albumSection.classList.add('show');
    }, 100);
  }

  // 加载骨架屏（示例逻辑）
  const photos = document.querySelectorAll('.photo-card');
  photos.forEach((photo) => {
    photo.classList.add('skeleton');
    setTimeout(() => {
      photo.classList.remove('skeleton');
    }, 800);
  });
});
