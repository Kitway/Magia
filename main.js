const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
const menuBtnIcon = menuBtn.querySelector('i');
const track = document.getElementById('image-track');

menuBtn.addEventListener('click', (e) => {
	navLinks.classList.toggle('open');

	const isOpen = navLinks.classList.contains('open');
	menuBtnIcon.setAttribute('class', isOpen ? 'ri-close-line' : 'ri-menu-line');
});

navLinks.addEventListener('click', (e) => {
	navLinks.classList.remove('open');
	menuBtnIcon.setAttribute('class', 'ri-menu-line');
});

const scrollRevealOption = {
	distance: '50px',
	origin: 'bottom',
	duration: 1000,
};

ScrollReveal().reveal('.header__container h1', {
	...scrollRevealOption,
});
ScrollReveal().reveal('.header__container p', {
	...scrollRevealOption,
	delay: 500,
});
ScrollReveal().reveal('.header__container form', {
	...scrollRevealOption,
	delay: 1000,
});

const swiper = new Swiper('.swiper', {
	slidesPerView: 'auto',
	spaceBetween: 20,
	pagination: {
		el: '.swiper-pagination',
	},
});

window.onmousedown = (e) => {
	track.dataset.mouseDownAt = e.clientX;
};
window.onmouseup = () => {
	track.dataset.mouseDownAt = '0';
	track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = (e) => {
	if (track.dataset.mouseDownAt === '0') return;

	const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
		maxDelta = window.innerWidth / 2;

	const percentage = (mouseDelta / maxDelta) * -100,
		nextPercentageUnconstrained =
			parseFloat(track.dataset.prevPercentage) + percentage,
		nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

	track.dataset.percentage = nextPercentage;

	track.animate(
		{
			transform: `translate(${nextPercentage}%, -50%)`,
		},
		{ duration: 1200, fill: 'forwards' }
	);

	for (const image of track.getElementsByClassName('image')) {
		image.animate(
			{
				objectPosition: `${100 + nextPercentage}% center`,
			},
			{ duration: 1200, fill: 'forwards' }
		);
	}
};
