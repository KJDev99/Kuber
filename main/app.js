document.addEventListener('DOMContentLoaded', function () {

    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuContent = document.getElementById('menuContent');
    const closeMenu = document.getElementById('closeMenu');
    const menuIcon = document.getElementById('menuIcon');

    function openMenu() {
        menuOverlay.classList.remove('invisible', 'opacity-0');
        menuOverlay.classList.add('visible', 'opacity-100');
        menuContent.classList.remove('translate-x-full');
        menuContent.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
    }

    function closeMenuFunc() {
        menuOverlay.classList.remove('visible', 'opacity-100');
        menuOverlay.classList.add('invisible', 'opacity-0');
        menuContent.classList.remove('translate-x-0');
        menuContent.classList.add('translate-x-full');
        document.body.style.overflow = 'auto';
    }

    menuToggle.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFunc);

    menuOverlay.addEventListener('click', function (e) {
        if (e.target === menuOverlay) {
            closeMenuFunc();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMenuFunc();
        }
    });

    const sliderInput = document.getElementById('sliderInput');
    const sliderThumb = document.getElementById('sliderThumb');
    const sliderFill = document.getElementById('sliderFill');
    const clientCount = document.getElementById('clientCount');
    const monthlyIncome = document.getElementById('monthlyIncome');

    const baseIncome = 33600;
    let currentValue = 5;

    function updateSlider(value) {
        currentValue = value;

        const percentage = ((value - 1) / (15 - 1)) * 100;
        sliderFill.style.width = `${percentage}%`;
        sliderThumb.style.left = `${percentage}%`;

        clientCount.textContent = value;
        const income = baseIncome * value;
        monthlyIncome.textContent = income.toLocaleString('ru-RU') + ' ₽';
    }

    sliderInput.addEventListener('input', function () {
        updateSlider(parseInt(this.value));
    });

    let isDragging = false;

    sliderThumb.addEventListener('mousedown', function (e) {
        isDragging = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;

        const sliderRect = sliderInput.getBoundingClientRect();
        let newValue = Math.round(((e.clientX - sliderRect.left) / sliderRect.width) * (15 - 1) + 1);

        newValue = Math.max(1, Math.min(15, newValue));

        sliderInput.value = newValue;
        updateSlider(newValue);
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    sliderThumb.addEventListener('touchstart', function (e) {
        isDragging = true;
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
    });

    function onTouchMove(e) {
        if (!isDragging) return;
        const sliderRect = sliderInput.getBoundingClientRect();
        let newValue = Math.round(((e.touches[0].clientX - sliderRect.left) / sliderRect.width) * (15 - 1) + 1);
        newValue = Math.max(1, Math.min(15, newValue));
        sliderInput.value = newValue;
        updateSlider(newValue);
    }

    function onTouchEnd() {
        isDragging = false;
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    }

    updateSlider(currentValue);
});