document.addEventListener("DOMContentLoaded", (event) => {
    //---------------------------------------------------------------//
    // Initialize AOS:
    //---------------------------------------------------------------//
    AOS.init();
    //---------------------------------------------------------------//


    //---------------------------------------------------------------//
    // Back to top:
    //---------------------------------------------------------------//
    btnBackToTop = document.getElementById("lnkBackToTop");
    scrollDown = document.getElementById("scroll-down");
    window.onscroll = function() { scrollFunction() };
    
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btnBackToTop.style.display = "block";
            scrollDown.style.display = "none";
        } else {
            btnBackToTop.style.display = "none";
            scrollDown.style.display = "block";
        }
    }
    //---------------------------------------------------------------//


    //---------------------------------------------------------------//
    // Create typed description:
    //---------------------------------------------------------------//
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
    //---------------------------------------------------------------//

    
    //---------------------------------------------------------------//
    // Side effect:
    //---------------------------------------------------------------//
    let ie = (function(){
        let undef,rv = -1; // Return value assumes failure.
        let ua = window.navigator.userAgent;
        let msie = ua.indexOf('MSIE ');
        let trident = ua.indexOf('Trident/');

        if (msie > 0) {
            // IE 10 or older => return version number
            rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        } else if (trident > 0) {
            // IE 11 (or newer) => return version number
            let rvNum = ua.indexOf('rv:');
            rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
        }

        return ((rv > -1) ? rv : undef);
    }());


    // disable/enable scroll (mousewheel and keys)
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    let keys = [32, 37, 38, 39, 40], wheelIter = 0;

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
        e.preventDefault();
        e.returnValue = false;  
    }

    function keydown(e) {
        for (let i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                preventDefault(e);
                return;
            }
        }
    }

    function touchmove(e) {
        preventDefault(e);
    }

    function wheel(e) {
        // for IE 
        //if( ie ) {
            //preventDefault(e);
        //}
    }

    function disable_scroll() {
        window.onmousewheel = document.onmousewheel = wheel;
        document.onkeydown = keydown;
        document.body.ontouchmove = touchmove;
    }

    function enable_scroll() {
        window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;  
    }

    let docElem = window.document.documentElement,
        scrollVal,
        isRevealed, 
        noscroll, 
        isAnimating,
        container = document.getElementById( 'main-container' ),
        trigger = container.querySelector( 'button.trigger' );

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }
    
    function scrollPage() {
        scrollVal = scrollY();
        
        if( noscroll && !ie ) {
            if( scrollVal < 0 ) return false;
            // keep it that way
            window.scrollTo( 0, 0 );
        }

        if( classie.has( container, 'notrans' ) ) {
            classie.remove( container, 'notrans' );
            return false;
        }

        if( isAnimating ) {
            return false;
        }
        
        if( scrollVal > 0 && !isRevealed ){
            toggle(1);
        }
    }

    function toggle( reveal ) {
        isAnimating = true;
        
        if( reveal ) {
            classie.add( container, 'modify' );
        }
        else {
            noscroll = true;
            disable_scroll();
            classie.remove( container, 'modify' );
        }

        // simulating the end of the transition:
        setTimeout( function() {
            isRevealed = !isRevealed;
            isAnimating = false;
            if( reveal ) {
                noscroll = false;
                enable_scroll();
            }
        }, 600 );
    }

    // refreshing the page:
    let pageScroll = scrollY();
    noscroll = pageScroll === 0;
    
    disable_scroll();
    
    if( pageScroll ) {
        isRevealed = true;
        classie.add( container, 'notrans' );
        classie.add( container, 'modify' );
    }
    
    window.addEventListener( 'scroll', scrollPage );
    trigger.addEventListener( 'click', function() { toggle( 'reveal' ); } );
    //---------------------------------------------------------------//


    //---------------------------------------------------------------//
    // Remove Preloader:
    //---------------------------------------------------------------//
    const preloader = document.getElementById('divPreloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }
    //---------------------------------------------------------------//
});