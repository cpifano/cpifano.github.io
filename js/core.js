document.addEventListener("DOMContentLoaded", (event) => {
    //Initialize AOS:
    AOS.init();

    //Back to top:
    btnBackToTop = document.getElementById("lnkBackToTop");
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btnBackToTop.style.display = "block";
        } else {
            btnBackToTop.style.display = "none";
        }
    }

    //Create typed description:
    const typed = document.getElementById('spanTyped');
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items');
        typed_strings = typed_strings.split(',');
        new Typed('#spanTyped', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    // Remove Preloader:
    const preloader = document.getElementById('divPreloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }
});