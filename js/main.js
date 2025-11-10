// ===============================
// スムーズスクロール
// ===============================

// ページ内リンクを全部取得
const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) =>{
    link.addEventListener('click', (e) => {
        // aタグ本来の動作（瞬間移動）を止める
        e.preventDefault();

        // 移動先の要素を取得
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if(targetElement){
            // スクロール位置を計算
            const rect = targetElement.getBoundingClientRect();
            const offset = window.pageY0ffset + rect.top - 80;

            // スムーズにスクロール
            window.scrollTo({
                top: offset,
                behavior: 'smooth',
            });
        }
    });
});

// ===============================
// スクロールでヘッダーを縮める
// ===============================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if(window.scrollY > 50){
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});

// ===============================
// 予約モーダル 開閉処理
// ===============================
const modal = document.querySelector("#reserveModal");
const openBtn = document.querySelector(".header__btn");
const closeBtn = modal.querySelector(".modal__close");
const overlay = modal.querySelector(".modal__overlay");

if(openBtn && modal) {
    //開く
    openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("is-active");
    });

    //閉じる（×ボタン or 背景クリック）
    [closeBtn, overlay].forEach((el) => {
        el.addEventListener("click", () => {
            modal.classList.remove("is-active");
        });
    });
}

//フォーム送信処理
const form = modal.querySelector(".modal__form");

if(form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault(); //ページ遷移を止める

        const name = form.elements["name"].value;
        const date = form.elements["date"].value;
        const people = form.elements["people"].value;

        //仮の処理:アラート+コンソール出力
        alert(`【仮予約】\n${name} 様\n${date} / ${people} 名様で承りました。` );

        console.log({
            name,
            date,
            people,
        });

        //モーダルを閉じてフォームリセット
        modal.classList.remove("is-active");
        form.reset();
    });
}

// ===============================
// スクロールアニメーション
// ===============================

const animatedElements = document.querySelectorAll(".fade-in");

if (animatedElements.length > 0) {
    if("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if(entry.isIntersecting){
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target); //一度アニメーションしたら監視を外す
                    }
                });
            },
            {
                threshold: 0.2, //要素の20%が見えたら発火
            }
        );

        animatedElements.forEach((el) => observer.observe(el));
    }else{
        //古いブラウザ用フォールバック:常に表示しておく
        animatedElements.forEach((el) => el.classList.add("is-visible"));
    }
}