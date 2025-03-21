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
    
    // 保存用户语言偏好
    localStorage.setItem('preferredLanguage', lang);
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

// 联系方式交互功能
function callPhone(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
}

function copyWechat(wechatId) {
    navigator.clipboard.writeText(wechatId)
        .then(() => {
            showToast();
        })
        .catch(err => {
            // 如果剪贴板API不可用，使用备用方法
            const textArea = document.createElement('textarea');
            textArea.value = wechatId;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                showToast();
            } catch (err) {
                console.error('无法复制文本: ', err);
                alert('微信号: ' + wechatId);
            }
            
            document.body.removeChild(textArea);
        });
}

function showToast() {
    const toast = document.getElementById('copyToast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// 添加动画类到元素
function addAnimationClasses() {
    const elementsToAnimate = document.querySelectorAll('.section h2, .course-card, .contact-item, .teacher-image');
    
    // 创建一个 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // 只触发一次动画
            }
        });
    }, {
        threshold: 0.1, // 当元素10%可见时触发
        rootMargin: '0px 0px -50px 0px' // 提前触发动画
    });
    
    // 为每个元素添加观察
    elementsToAnimate.forEach((element, index) => {
        // 添加延迟类
        if (element.classList.contains('course-card') || element.classList.contains('contact-item')) {
            const delay = index % 3; // 创建交错效果
            element.classList.add(`delay-${delay + 1}`);
        }
        observer.observe(element);
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 检查是否有保存的语言偏好
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }
    
    // 添加动画类
    addAnimationClasses();
});

// 防止过度滚动行为，提升用户体验
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
