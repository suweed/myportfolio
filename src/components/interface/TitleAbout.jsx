export const TitleAbout = () => {
    return (
        <>
            <div class="title-effect about-section mr-24">
                <div class="msg-title inline-block align-top text-3xl" cursor-class="arrow">{'/* Hola, mi nombre es */'}</div>
                <div class="title-word" cursor-class="arrow"></div>
                {createTitleWords()}
                {activateAnimations()}
            </div>
        </>
    );
}

const createTitleWords = () => {
    waitForElementToExist('.name-titles').then(target => {
        let letters = ['J', 'E', 'S', 'Ú', 'S', ' ','C', 'A', 'R', 'D', 'O', 'Z', 'O'];

        if (document.querySelectorAll('.wordGenerate').length !== 0) {
            document.querySelectorAll('.wordGenerate').forEach((span, idx) => {
                span.remove();
            })
        }

        let spans = '';
        letters.map((letter, idx) => {
            if (idx > 5 && idx < 13) {
                spans += '<span class="wordGenerate lastname">' + letter + '</span>';
            } else {
                spans += '<span class="wordGenerate">' + letter + '</span>';
            }
        });

        document.querySelector(".title-word").insertAdjacentHTML('beforeend', spans);
    });
}

const activateAnimations = () => {
    setTimeout(() => {
        const spans = document.querySelectorAll('.title-word span');

        spans.forEach((span, idx) => {
            span.addEventListener('click', (e) => {
                e.target.classList.add('active');
            });
            span.addEventListener('animationend', (e) => {
                e.target.classList.remove('active');
            });
            setTimeout(() => {
                span.classList.add('active');
            }, 750 * (idx+1))
        });
    }, 1200);
}

const waitForElementToExist = (selector)  =>{
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }
      
      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });
      
      observer.observe(document.body, {
        subtree: true,
        childList: true,
      });
    });
}