// JavaScript交互效果

// 显示响应弹窗
function showResponse(choice) {
    const modal = document.getElementById('response-modal');
    const message = document.getElementById('modal-message');
    
    if (choice === 'yes') {
        message.innerHTML = `
            <h3>太棒了！❤️</h3>
            <p>我真的很开心你愿意做我的女朋友！从今往后，我会用我的全部去爱你，保护你，让你每天都幸福快乐！</p>
            <p>让我们一起创造更多美好的回忆吧！</p>
        `;
    } else {
        message.innerHTML = `
            <h3>没关系，我会等你 😊</h3>
            <p>我知道感情需要时间，我会一直在这里等你，直到你准备好为止。</p>
            <p>无论结果如何，我都很感谢你给我这个机会表达我的心意。</p>
        `;
    }
    
    modal.style.display = 'block';
    
    // 添加更多爱心效果
    createHearts();
}

// 关闭模态弹窗
function closeModal() {
    const modal = document.getElementById('response-modal');
    modal.style.display = 'none';
}

// 点击模态弹窗外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('response-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// 创建更多爱心效果
function createHearts() {
    const heartsContainer = document.querySelector('.hearts');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = `${Math.random() * 20 + 10}px`;
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.opacity = Math.random() * 0.7 + 0.3;
            heart.style.animation = `float ${Math.random() * 5 + 5}s linear infinite`;
            heart.style.pointerEvents = 'none';
            
            heartsContainer.appendChild(heart);
            
            // 动画结束后移除爱心
            setTimeout(() => {
                heart.remove();
            }, 10000);
        }, i * 100);
    }
}

// 页面加载完成后添加动画效果
window.addEventListener('load', function() {
    // 添加滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.timeline-item, .reason-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // 添加鼠标跟随效果
    document.addEventListener('mousemove', function(e) {
        const hearts = document.querySelectorAll('.hearts div');
        hearts.forEach(heart => {
            const rect = heart.getBoundingClientRect();
            const heartCenterX = rect.left + rect.width / 2;
            const heartCenterY = rect.top + rect.height / 2;
            
            const deltaX = e.clientX - heartCenterX;
            const deltaY = e.clientY - heartCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            // 如果鼠标离爱心很近，让爱心移动
            if (distance < 100) {
                const moveX = deltaX / 10;
                const moveY = deltaY / 10;
                heart.style.transform = `translate(${moveX}px, ${moveY}px) rotate(0deg)`;
                
                // 一段时间后恢复
                setTimeout(() => {
                    heart.style.transform = 'translate(0, 0) rotate(0deg)';
                }, 300);
            }
        });
    });
});

// 防止"让我考虑一下"按钮被点击，使其总是移动到其他位置
window.addEventListener('load', function() {
    const noButton = document.querySelector('.btn-no');
    
    // 移除点击事件
    noButton.onclick = function(e) {
        e.preventDefault();
        return false;
    };
    
    // 鼠标靠近时随机移动到页面其他位置
    noButton.addEventListener('mouseenter', function() {
        const button = this;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // 随机生成新位置，确保按钮在可视区域内
        const newX = Math.random() * (windowWidth - 200);
        const newY = Math.random() * (windowHeight - 100);
        
        // 使用动画效果移动按钮
        button.style.transition = 'all 0.3s ease';
        button.style.position = 'fixed';
        button.style.left = `${newX}px`;
        button.style.top = `${newY}px`;
        button.style.zIndex = '1000';
        
        // 改变按钮文本增加趣味性
        const texts = ['不要点我！', '点那个红色的！', '你知道该点哪个', '❤ 红色按钮 ❤', '明智的选择'];
        button.textContent = texts[Math.floor(Math.random() * texts.length)];
    });
    
    // 当按钮离开视口时，将其带回原位置
    noButton.addEventListener('mouseleave', function() {
        // 延迟一下再移回，增加趣味性
        setTimeout(() => {
            const button = this;
            button.style.position = '';
            button.style.left = '';
            button.style.top = '';
            button.style.transform = '';
            button.textContent = '让我考虑一下';
        }, 1000);
    });
});