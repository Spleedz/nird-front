$(document).ready(function() {
    
    // ============================================
    // COMPTEUR DE VISITEURS ANIMÉ
    // ============================================
    var count = 0;
    var targetCount = Math.floor(Math.random() * 5000) + 1000;
    var counterInterval = setInterval(function() {
        count += Math.floor(Math.random() * 50) + 10;
        if (count >= targetCount) {
            count = targetCount;
            clearInterval(counterInterval);
        }
        $('#visitor-count').text(count);
        $('#visitor-count-side').text(count); // NOUVEAU : sync sidebar
    }, 50);
    
    // Hit counter unique
    var uniqueVisitor = Math.floor(Math.random() * 99999) + 10000;
    $('#unique-visitor').text(uniqueVisitor);
    
    // IP simulée
    var fakeIP = Math.floor(Math.random() * 256) + '.' + 
                 Math.floor(Math.random() * 256) + '.' + 
                 Math.floor(Math.random() * 256) + '.' + 
                 Math.floor(Math.random() * 256);
    $('#user-ip').text(fakeIP);
    
    // Heure en temps réel
    function updateTime() {
        var now = new Date();
        var hours = ('0' + now.getHours()).slice(-2);
        var minutes = ('0' + now.getMinutes()).slice(-2);
        var seconds = ('0' + now.getSeconds()).slice(-2);
        $('#current-time').text(hours + ':' + minutes + ':' + seconds);
    }
    updateTime();
    setInterval(updateTime, 1000);
    
    
    // ============================================
    // EFFET BLINK (années 2000)
    // ============================================
    setInterval(function() {
        $('.blink').css('visibility', function(i, v) {
            return v === 'hidden' ? 'visible' : 'hidden';
        });
    }, 500);
    
    
    // ============================================
    // SMOOTH SCROLL NAVIGATION
    // ============================================
    $('#menu a, .sidebar-menu a').click(function(e) {
        var target = $(this).attr('href');
        if (target.indexOf('#') === 0 && target.length > 1) {
            e.preventDefault();
            var element = $(target);
            if (element.length) {
                $('html, body').animate({
                    scrollTop: element.offset().top - 20
                }, 800);
            }
        }
    });
    
    
    // ============================================
    // CARROUSEL D'IMAGES (COMPOSANT DYNAMIQUE)
    // ============================================
    var currentSlide = 0;
    var slides = $('.carousel-img');
    var totalSlides = slides.length;
    
    function showSlide(n) {
        slides.hide();
        currentSlide = (n + totalSlides) % totalSlides;
        $(slides[currentSlide]).fadeIn(300);
        $('#carousel-indicator').text((currentSlide + 1) + ' / ' + totalSlides);
    }
    
    $('#next-carousel').click(function() {
        showSlide(currentSlide + 1);
    });
    
    $('#prev-carousel').click(function() {
        showSlide(currentSlide - 1);
    });
    
    // Auto-play
    var autoplayInterval = setInterval(function() {
        showSlide(currentSlide + 1);
    }, 4000);
    
    // Pause au survol
    $('.carousel-img').hover(
        function() { 
            clearInterval(autoplayInterval); 
        },
        function() {
            autoplayInterval = setInterval(function() {
                showSlide(currentSlide + 1);
            }, 4000);
        }
    );
    
    
    // ============================================
    // QUIZ INTERACTIF
    // ============================================
    var score = 0;
    var answered = 0;
    var $quizScore = $('#quiz-score');
    
    $('.quiz-option').click(function() {
        var $this = $(this);
        var $question = $this.parent();
        
        // Vérifier si déjà répondu
        if ($question.find('.correct, .incorrect').length > 0) {
            return;
        }
        
        answered++;
        var isCorrect = $this.attr('data-correct') === 'true';
        
        if (isCorrect) {
            $this.addClass('correct');
            score++;
        } else {
            $this.addClass('incorrect');
            $question.find('.quiz-option[data-correct="true"]').addClass('correct');
        }
        
        // Score final
        if (answered === 3) {
            var messages = [
                '📚 ' + score + '/3 - Lis les ressources pour en apprendre plus !',
                '👍 BIEN ! ' + score + '/3 - Continue ton apprentissage !',
                '🎉 PARFAIT ! ' + score + '/3 - Tu es un vrai résistant numérique ! 🛡️'
            ];
            var messageIndex = (score === 3) ? 2 : ((score === 2) ? 1 : 0);
            $quizScore.text(messages[messageIndex]);
        }
    });
    
    // Reset quiz
    $('#reset-quiz').click(function() {
        $('.quiz-option').removeClass('correct incorrect');
        $quizScore.text('');
        score = 0;
        answered = 0;
    });
    
    
    // ============================================
    // ANIMATION BOUTONS
    // ============================================
    $(document).on('mouseenter', '.button-2000', function() {
        $(this).css('font-size', '14px');
    }).on('mouseleave', '.button-2000', function() {
        $(this).css('font-size', '13px');
    });
    
});