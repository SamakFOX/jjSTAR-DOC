(() => {
  const button = document.createElement('button');
  button.textContent = '문구 편집';
  button.style.cssText = 'position:fixed;right:20px;bottom:20px;z-index:1000;border:1px solid #005da8;border-radius:8px;padding:10px 16px;background:#005da8;color:white;font:600 14px Pretendard,sans-serif;cursor:pointer;box-shadow:0 2px 10px #0002';
  button.addEventListener('click', () => {
    const current = typeof docs !== 'undefined' && typeof currentIndex !== 'undefined' ? docs[currentIndex] : null;
    const query = current?.path ? '?path=' + encodeURIComponent(current.path) : '';
    window.open('/__editor/' + query, '_blank', 'noopener');
  });
  document.body.append(button);
})();
