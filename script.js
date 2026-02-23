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
    // isAuto true değilse ve autoSlider tanımlıysa zamanlayıcıyı durdur
    if (!isAuto && typeof autoSlider !== 'undefined') {
        clearInterval(autoSlider);
    }

    const slider = button.closest('.oda-slider');
    
    // 1. İHTİMAL: Önce bizim yeni kurduğumuz şık yapıyı (slide-item) ara
    let slides = slider.querySelectorAll('.slider-images .slide-item');
    
    // 2. İHTİMAL: Eğer bulamazsa (yani o odayı henüz güncellemediysen), eski resim yapısını (img) kullan
    if (slides.length === 0) {
        slides = slider.querySelectorAll('.slider-images > img');
    }
    
    // Eğer o bölümde hiçbir resim yoksa, hata vermemesi için işlemi sessizce durdur
    if (slides.length === 0) return; 

    // Aktif olan slaytı bul
    let index = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    if (index === -1) index = 0; 

    // Slaytı değiştir
    slides[index].classList.remove('active');
    index = (index + direction + slides.length) % slides.length;
    slides[index].classList.add('active');
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

function translatePage(langCode, retryCount = 0) {
    const googleCombo = document.querySelector('.goog-te-combo');
    
    if (googleCombo) {
        googleCombo.value = langCode;
        googleCombo.dispatchEvent(new Event('change'));
    } else {
        // En fazla 10 kez denesin (yaklaşık 5 saniye bekleme)
        if (retryCount < 10) {
            console.warn("Google Translate widget'ı bekleniyor...");
            setTimeout(() => translatePage(langCode, retryCount + 1), 500);
        } else {
            // 10 denemeden sonra hala bulamadıysa sonsuz döngüye girmeden durur
            console.error("Google Translate altyapısı yüklenemedi. Lütfen internet bağlantınızı kontrol edip sayfayı yenileyin.");
        }
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


const googleYorumlari = [
    { isim: "Tuba Altun", yorum: "15 senedir geliyoruz güzel küçük bir aile işletmesi çalışanlar güleryüzlü ve odaların temizliği güzeldi , akşam yemeği yok ama kahvaltısı lezzetli ve çeşitli huzurlu sakin bir tatil için güzel bir işletme", puan: "⭐⭐⭐⭐⭐" },
    { isim: "Zeynep Özen", yorum: "Çıralı’da çok güzel bir tatil geçirdim. Odalar çok konforluydu, herkes güler yüzlü ve ilgiliydi çok memnun kaldım. Keyifli ve huzurlu bir tatil geçirmek isteyen herkese tavsiye ederim.", puan: "⭐⭐⭐⭐⭐" },
    { isim: "Fly Yoga", yorum: "Прекрасное уютное место!И очень душевные хозяева, вкусные завтраки и супер йога зал", puan: "⭐⭐⭐⭐⭐" },
    { isim: "Claudia Kostka", yorum: "Cirali, für mich die schönste Bucht am Mittelmeer und das Özge-Hotel eine traumhafte Oase - 5 Minuten vom Meer. Bungalows in einem Garten mit Obstbäumen, Palmen und Blumen geführt von einer bezauberten Familie. Das reichhaltige Frühstück besteht aus im Garten gereiften Gemüse, selbst hergestellter Marmelade und anderen Leckereien. Wunderbar. Das Paradis!", puan: "⭐⭐⭐⭐⭐" },
    { isim: "Wilma Busker", yorum: "For nature, peace and a quiet place you must visit Özge Hotel & Bungalows. Clean bungalows in a beautiful garden and on walking distance of a lovely beach. Very friendly owners and staff. After one visit you want to return every year!", puan: "⭐⭐⭐⭐⭐" },
];

function yorumlariGoster() {
    const container = document.getElementById('dynamic-reviews-container');
    if(!container) return;

    // Yorum havuzunu karıştır ve ilk 3 tanesini al
    const secilenYorumlar = [...googleYorumlari]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    container.innerHTML = secilenYorumlar.map(item => `
        <div class="review-card">
            <div class="stars">${item.puan}</div>
            <p>"${item.yorum}"</p>
            <span class="reviewer">- ${item.isim}</span>
        </div>
    `).join('');
}

// Sayfa yüklendiğinde yorumları getir
document.addEventListener('DOMContentLoaded', yorumlariGoster);