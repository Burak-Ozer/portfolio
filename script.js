// DAKTILO MOTORU
class TypeWriter {
    constructor(el, words, wait = 3000) {
        this.el = el; this.words = words; this.txt = ''; this.wordIndex = 0;
        this.wait = parseInt(wait, 10); this.type(); this.isDeleting = false;
    }
    type() {
        const i = this.wordIndex % this.words.length;
        const full = this.words[i];
        this.txt = this.isDeleting ? full.substring(0, this.txt.length - 1) : full.substring(0, this.txt.length + 1);
        this.el.innerHTML = this.txt;
        let speed = this.isDeleting ? 80 : 150;
        if (!this.isDeleting && this.txt === full) { speed = this.wait; this.isDeleting = true; }
        else if (this.isDeleting && this.txt === '') { this.isDeleting = false; this.wordIndex++; speed = 500; }
        setTimeout(() => this.type(), speed);
    }
}

// BAŞLATMA VE SCROLL REVEAL
document.addEventListener('DOMContentLoaded', () => {
    // Daktilo başlat
    const el = document.querySelector('.typing-text');
    if(el) {
        const words = JSON.parse(el.getAttribute('data-words'));
        new TypeWriter(el, words);
    }

    // Scroll Animasyonu
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
                
                // Barların dolmasını tetikle
                const bars = el.querySelectorAll('.doluluk');
                bars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // İlk açılışta kontrol
});

var form = document.getElementById("my-form");
    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("status");
  var data = new FormData(event.target);
  var btn = document.getElementById("submit-btn");

  btn.innerHTML = "Gönderiliyor...";
  btn.disabled = true;

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "✅ Mesajınız başarıyla gönderildi!";
      status.style.color = "#00d2ff";
      form.reset();
      btn.innerHTML = "Mesajı Gönder";
      btn.disabled = false;
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "❌ Bir hata oluştu, tekrar dene.";
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "❌ Gönderim sırasında bir sorun oluştu.";
  });
}
form.addEventListener("submit", handleSubmit)