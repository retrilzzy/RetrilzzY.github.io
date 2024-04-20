// bg behavior
(window.setScroll = () => document.body.style.setProperty('--scroll', scrollY / innerHeight))();
['scroll', 'resize'].forEach(e => addEventListener(e, setScroll));

const bg = document.querySelector('#bg');

addEventListener('touchstart', () => bg.style.setProperty('--multiplier', '0'));
addEventListener('mousemove', ({ clientX, clientY }) => {
    bg.style.setProperty('--tx', `${20 * (clientX - innerWidth / 2) / innerWidth}px`);
    bg.style.setProperty('--ty', `${20 * (clientY - innerHeight / 2) / innerHeight}px`);
});

['mouseenter', 'mouseleave'].forEach(e => document.addEventListener(e, () => {
    if (e === 'mouseleave') bg.removeAttribute('style');
    bg.style.transition = 'transform .1s linear';
    setTimeout(() => bg.style.transition = '', 100);
}));

// scroll arrow
document.querySelector('#arrow svg').addEventListener('click', () => {
    const start = performance.now();

    !function step() {
        const progress = (performance.now() - start) / 200;
        scrollTo({ top: (innerWidth > 780 ? .3 : .8) * innerHeight * easeOutCubic(progress) });
        if (progress < 1) requestAnimationFrame(step);
    }();

    function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
    }
});

// random bg
var images = ['/bg0.webp', '/bg1.webp', '/bg2.webp', '/bg3.jpg', '/bg4.jpg', '/bg5.jpg' , '/bg6.jpg', '/bg7.webp', '/bg8.webp', '/bg9.jpg', '/bg10.jpg'];

var randomImage = Math.floor(Math.random() * 11);

document.querySelector(':root').style.setProperty("--background", "image-set(url('/backgrounds" + images[randomImage] + "') type('image/webp'))");
