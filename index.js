import { faq } from "./data/faq.js";
import { members } from "./data/members.js";

window.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initValidationForm();
  initAnimationContainer();
  initMembersPagination();
  initFaqPagination();
});

function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = anchor.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

function initValidationForm() {
  const form = document.querySelector(".form");
  if (!form) return;

  (form,
    addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.querySelector("#name").value;
      const email = document.querySelector("#mail").value;

      if (name.length < 3) {
        alert("Ingresa el nombre denuevo.");
        return;
      }
      if (!validator(email)) {
        alert("Email inválido.");
        return;
      }

      alert("Datos guardados con éxito.");
      console.log(`Datos guardados name:${name}, email:${email}`);
      form.reset();
      return;
    }));
}

function validator(email) {
  return /^[^/s@]+@[^/s@]+\.[^/s@]+$/.test(email);
}

function initAnimationContainer() {
  const containers = document.querySelectorAll(
    ".container_text, .container_title",
  );
  if (containers.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-container");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.4,
    },
  );

  containers.forEach((el) => observer.observe(el));
}

function initMembersPagination(){
    const data = members;
    const card = document.querySelector('.members_card_container');
    let direction = '';
    const arrow_left = document.querySelector('#members_arrow_left');
    const arrow_right = document.querySelector('#members_arrow_right');
    
    data.forEach((el) => {
        card.innerHTML += `
            <div class = 'members_card'>
                <div class = 'card_title'>
                    <h3>${el.name}</h3>
                </div>
                <div class = 'card_text'>
                    <p>${el.area}</p>
                </div>
            </div>
        `;
    });

    arrow_left.addEventListener('click', (e) => {
        e.preventDefault();
        direction = 'left'
        moveSlider(direction);
    });
    arrow_right.addEventListener('click', (e) => {
        e.preventDefault();
        direction = 'right'
        moveSlider(direction);
    });
    
    let currentIndex = 0;
    
    function moveSlider(direction){
        const cardContainer = document.querySelector('.members_card_container');
        const totalCards = document.querySelectorAll('.members_card').length;
        const cardWidth = 20;

        if(direction === 'right'){
            if(currentIndex < totalCards - 1) currentIndex++;
            else currentIndex = 0;
        } else {
            if(currentIndex > 0) currentIndex--;
            else currentIndex = totalCards - 1;
        }

        cardContainer.style.transform = `translateX(-${currentIndex * cardWidth}rem)`;
    }
}

function initFaqPagination(){
    const data = faq;
    const card = document.querySelector('.faq_card_container');
    let direction = '';
    const arrow_left = document.querySelector('#faq_arrow_left');
    const arrow_right = document.querySelector('#faq_arrow_right');
    
    data.forEach((el) => {
        card.innerHTML += `
            <div class = 'faq_card'>
                <div class = 'card_title'>
                    <h3>${el.quest}</h3>
                </div>
                <div class = 'card_text'>
                    <p>${el.ans}</p>
                </div>
            </div>
        `;
    });

    arrow_left.addEventListener('click', (e) => {
        e.preventDefault();
        direction = 'left'
        moveSlider(direction);
    });
    arrow_right.addEventListener('click', (e) => {
        e.preventDefault();
        direction = 'right'
        moveSlider(direction);
    });
    
    let currentIndex = 0;
    
    function moveSlider(direction){
        const cardContainer = document.querySelector('.faq_card_container');
        const totalCards = document.querySelectorAll('.faq_card').length;
        const cardWidth = 20;

        if(direction === 'right'){
            if(currentIndex < totalCards - 1) currentIndex++;
            else currentIndex = 0;
        } else {
            if(currentIndex > 0) currentIndex--;
            else currentIndex = totalCards - 1;
        }

        cardContainer.style.transform = `translateX(-${currentIndex * cardWidth}rem)`;
    }
}