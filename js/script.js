// Aguardar carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Configurar botões de CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = ''; }, 150);
        });
        
        button.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        button.setAttribute('tabindex', '0');
    });

    // Interceptar cliques em qualquer link #preco e rolar suavemente (mobile e desktop)
    const precoLinks = document.querySelectorAll('a[href="#preco"]');
    if (precoLinks.length) {
        precoLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.getElementById('preco');
                if (target) {
                    try {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } catch (_) {
                        window.location.hash = '#preco';
                    }
                    setTimeout(() => {
                        history.replaceState(null, '', window.location.pathname + window.location.search);
                    }, 600);
                }
            });
        });
    }
    
    
    
    // Adicionar animação suave ao scroll
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
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.feature-card, .artist-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Adicionar funcionalidade de impressão (para idosos que preferem papel)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
    });
    
    // Melhorar acessibilidade com alto contraste
    let highContrast = false;
    
    // Verificar preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
        highContrast = true;
    }
    
    // Adicionar atalho para alternar alto contraste (Ctrl + Alt + C)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.altKey && e.key === 'c') {
            e.preventDefault();
            highContrast = !highContrast;
            document.body.classList.toggle('high-contrast', highContrast);
            
            // Mostrar notificação
            showNotification(highContrast ? 'Alto contraste ativado' : 'Alto contraste desativado');
        }
    });
    
    // Função para mostrar notificações simples
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2c5aa0;
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-size: 1.1rem;
            z-index: 1001;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    // Adicionar suporte a leitor de tela para imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('alt')) {
            img.setAttribute('alt', 'Imagem do artista ou produto');
        }
    });

    

    // Formulário de novo comentário
    const commentForm = document.getElementById('new-comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('comment-name').value.trim() || 'Cliente';
            const rating = document.getElementById('comment-rating').value;
            const text = document.getElementById('comment-text').value.trim();
            if (!text) return;

            const grid = document.querySelector('.testimonials-grid');
            const card = document.createElement('div');
            card.className = 'testimonial-card facebook-comment';
            const stars = '★'.repeat(Math.max(1, Math.min(5, parseInt(rating, 10) || 5))) + '☆'.repeat(5 - Math.max(1, Math.min(5, parseInt(rating, 10) || 5)));
            card.innerHTML = `
                <div class="comment-header">
                    <div class="user-avatar"><div class="avatar-placeholder">${(name[0] || 'C').toUpperCase()}</div></div>
                    <div class="user-info">
                        <strong class="testimonial-name">${name}</strong>
                        <span class="comment-time">Agora</span>
                    </div>
                </div>
                <p class="testimonial-text">${text}</p>
                <div class="comment-stars" aria-label="Avaliação: ${rating} de 5">${stars}</div>
            `;
            grid.prepend(card);
            commentForm.reset();
        });
    }

    // FAQ toggle
    const faqButtons = document.querySelectorAll('.faq-question');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!expanded));
        });
    });
    const floatingCta = document.getElementById('floating-cta');
    if (floatingCta) {
        setTimeout(() => { floatingCta.style.display = 'flex'; }, 3000);
    }
    
    console.log('Site Pendrive Virtual carregado com sucesso!');
    console.log('Atalhos disponíveis:');
    console.log('- Ctrl + P: Imprimir página');
    console.log('- Ctrl + Alt + C: Alternar alto contraste');
});