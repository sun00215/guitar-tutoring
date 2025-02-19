
// 页面滚动时改变导航栏样式
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 语言切换功能
const languageBtn = document.querySelector('.language-btn');
const languageOptions = document.querySelector('.language-options');
const languageOptionBtns = document.querySelectorAll('.language-option');

// 切换语言选项的显示/隐藏
languageBtn.addEventListener('click', () => {
    languageOptions.classList.toggle('show');
});

// 点击页面其他地方时隐藏语言选项
document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-switch')) {
        languageOptions.classList.remove('show');
    }
});

// 语言切换功能
function changeLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang-' + lang + ']').forEach(element => {
        element.textContent = element.getAttribute('data-lang-' + lang);
    });
    languageOptions.classList.remove('show');
}

// 为每个语言选项添加点击事件
languageOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        changeLanguage(lang);
    });
});

// 视频加载功能
function loadVideo(element) {
    const videoId = element.getAttribute('data-video-id');
    const iframe = document.createElement('iframe');
    iframe.src = `//player.bilibili.com/player.html?bvid=${videoId}&page=1&high_quality=1&danmaku=0`;
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('scrolling', 'no');
    element.parentNode.replaceChild(iframe, element);
}
