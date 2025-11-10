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