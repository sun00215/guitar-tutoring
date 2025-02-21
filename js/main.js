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

// 移动端菜单控制
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// 点击导航链接时关闭菜单
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// 添加汉堡菜单样式
const hamburgerStyle = document.createElement('style');
hamburgerStyle.textContent = `
    .hamburger {
        display: none;
        width: 30px;
        height: 20px;
        position: relative;
    }

    .hamburger span {
        display: block;
        width: 100%;
        height: 2px;
        background-color: var(--text-color);
        position: absolute;
        transition: all 0.3s;
    }

    .hamburger span:nth-child(1) { top: 0; }
    .hamburger span:nth-child(2) { top: 9px; }
    .hamburger span:nth-child(3) { top: 18px; }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg);
        top: 9px;
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg);
        top: 9px;
    }

    @media (max-width: 768px) {
        .hamburger {
            display: block;
        }
    }
`;

document.head.appendChild(hamburgerStyle);
