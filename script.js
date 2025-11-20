// Aguardar carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Configurar botões de CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Adicionar efeito visual de clique
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = '';
                
                // Simular download ou redirecionamento
                showDownloadModal();
            }, 150);
        });
        
        // Adicionar suporte para teclado (Enter e Space)
        button.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Tornar botões focáveis
        button.setAttribute('tabindex', '0');
    });

    // Interceptar clique no link #preco para rolar sem mostrar hash na URL
    const precoLink = document.querySelector('a[href="#preco"]');
    if (precoLink) {
        precoLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('preco');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    history.replaceState(null, '', window.location.pathname + window.location.search);
                }, 500);
            }
        });
    }
    
    // Função para mostrar modal de download
    function showDownloadModal() {
        // Criar modal simples
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            margin: 20px;
            font-size: 1.2rem;
            line-height: 1.6;
        `;
        
        modalContent.innerHTML = `
            <h3 style="color: #2c5aa0; margin-bottom: 1.5rem; font-size: 1.8rem;">Preparando seu Download!</h3>
            <p style="margin-bottom: 1rem; color: #555;">Seu pendrive virtual com + de 500 modões está sendo preparado.</p>
            <p style="margin-bottom: 2rem; color: #555;">Por favor, aguarde alguns instantes...</p>
            <div style="width: 60px; height: 60px; border: 5px solid #f3f3f3; border-top: 5px solid #28a745; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 2rem;"></div>
            <button id="closeModal" style="background: #2c5aa0; color: white; border: none; padding: 1rem 2rem; border-radius: 10px; font-size: 1.1rem; cursor: pointer;">Fechar</button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Adicionar animação de spin
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Fechar modal
        document.getElementById('closeModal').addEventListener('click', function() {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        // Fechar ao clicar fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }
        });
        
        // Simular processo de download
        setTimeout(() => {
            modalContent.innerHTML = `
                <h3 style="color: #28a745; margin-bottom: 1.5rem; font-size: 1.8rem;">Download Concluído!</h3>
                <p style="margin-bottom: 1rem; color: #555;">Seu pendrive virtual está pronto!</p>
                <p style="margin-bottom: 2rem; color: #555;">As músicas foram organizadas nas pastas:</p>
                <ul style="text-align: left; margin-bottom: 2rem; color: #555;">
                    <li>VERSOS e NARRAÇÕES</li>
                    <li>MODÃO RAIZ DE VERDADE</li>
                    <li>GAÚCHAS, BAILÃO E FANDANGO</li>
                </ul>
                <button id="closeModal2" style="background: #28a745; color: white; border: none; padding: 1rem 2rem; border-radius: 10px; font-size: 1.1rem; cursor: pointer;">OK</button>
            `;
            
            document.getElementById('closeModal2').addEventListener('click', function() {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            });
        }, 3000);
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
            card.innerHTML = `
                <div class="comment-header">
                    <div class="user-avatar"><div class="avatar-placeholder">${(name[0] || 'C').toUpperCase()}</div></div>
                    <div class="user-info">
                        <strong class="testimonial-name">${name}</strong>
                        <span class="comment-time">Agora</span>
                    </div>
                </div>
                <p class="testimonial-text">${text}</p>
                <div class="comment-actions">
                    <button class="like-btn">👍 Curtir</button>
                    <button class="reply-btn">💬 Responder</button>
                    <button class="hide-btn">👁️ Ocultar</button>
                </div>
                <div class="comment-stats">
                    <span class="likes-count">⭐ ${rating}</span>
                </div>
            `;
            grid.prepend(card);
            commentForm.reset();
        });
    }
    
    console.log('Site Pendrive Virtual carregado com sucesso!');
    console.log('Atalhos disponíveis:');
    console.log('- Ctrl + P: Imprimir página');
    console.log('- Ctrl + Alt + C: Alternar alto contraste');
});