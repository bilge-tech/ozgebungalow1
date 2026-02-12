// Otomatik slider geçişi (2 saniyede bir)

const phoneInput = document.querySelector("#userPhone");
const iti = window.intlTelInput(phoneInput, {
    initialCountry: "tr",
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});
let autoSlider = setInterval(() => {
    document.querySelectorAll('.oda-slider').forEach(slider => {
        const nextBtn = slider.querySelector('.next-btn');
        moveSlider(nextBtn, 1, true);
    });
}, 2000);

function moveSlider(button, direction, isAuto = false) {
    if (!isAuto) clearInterval(autoSlider);

    const slider = button.closest('.oda-slider');
    const imgs = slider.querySelectorAll('.slider-images img');
    let index = Array.from(imgs).findIndex(img => img.classList.contains('active'));

    imgs[index].classList.remove('active');
    index = (index + direction + imgs.length) % imgs.length;
    imgs[index].classList.add('active');
}

function toggleOverlay(btn) {
    const card = btn.closest('.oda-kart');
    const overlay = card.querySelector('.oda-bilgi-overlay');
    overlay.classList.toggle('active');
}
// Menü linklerine tıklandığında menüyü otomatik kapat
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle.checked) {
            navToggle.checked = false; // Checkbox'ı kapatır, dolayısıyla menü gizlenir
        }
    });
});

// Slider ve Overlay fonksiyonların aşağıda kalmaya devam etsin...
let currentGalleryIndex = 0;
const slides = document.querySelectorAll('.main-slide');
const thumbs = document.querySelectorAll('.thumb');

function showSlide(index) {
    // Sınırları kontrol et
    if (index >= slides.length) currentGalleryIndex = 0;
    else if (index < 0) currentGalleryIndex = slides.length - 1;
    else currentGalleryIndex = index;

    // Tüm resimleri pasif yap
    slides.forEach(s => s.classList.remove('active'));
    thumbs.forEach(t => t.classList.remove('active'));

    // Seçili resmi aktif yap
    slides[currentGalleryIndex].classList.add('active');
    thumbs[currentGalleryIndex].classList.add('active');
    
    // Küçük resmin otomatik odağa gelmesini sağlar
    thumbs[currentGalleryIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function changeMainSlide(direction) {
    showSlide(currentGalleryIndex + direction);
}

function currentSlide(index) {
    showSlide(index);
}


function sendWhatsApp() {
    const message = document.getElementById('userMessage').value;
    const phone = "905336315400";
    if (message.trim() === "") {
        alert("Lütfen bir mesaj yazın.");
        return;
    }
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function sendEmail() {
    const message = document.getElementById('userMessage').value;
    const email = "info@ozgehotel.com";
    if (message.trim() === "") {
        alert("Lütfen bir mesaj yazın.");
        return;
    }
    const subject = encodeURIComponent("Otel Rezervasyon/Bilgi Talebi");
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
}
window.addEventListener('scroll', () => {
    let current = "";
    const sections = document.querySelectorAll("section"); // Sayfadaki tüm section'ları bul
    const navLinks = document.querySelectorAll(".nav-menu ul li a"); // Menüdeki linkleri bul

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Eğer sayfa o bölümün hizasındaysa (150px pay bırakıyoruz)
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active"); // Önce hepsinden turunculuğu kaldır
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active"); // Sadece o anki bölüme turunculuk ekle
        }
    });
});

function translatePage(langCode) {
    const googleCombo = document.querySelector('.goog-te-combo');
    if (googleCombo) {
        googleCombo.value = langCode;
        googleCombo.dispatchEvent(new Event('change'));
    } else {
        console.error("Google Translate henüz yüklenmedi. Lütfen bir saniye bekleyip tekrar deneyin.");
        // Eğer yüklenmediyse kutuyu bulmaya çalışması için küçük bir gecikme
        setTimeout(() => translatePage(langCode), 500);
    }
}

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150; // Bölümün ne kadar görünmesi gerektiğini belirler
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Sayfa ilk açıldığında da çalışması için (en üstteki bölümler için):
reveal();