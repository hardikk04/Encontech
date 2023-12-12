function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
    multiplier: 0.7,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

loco();

const t1 = gsap.timeline();

t1.to(".page2", {
  top: "-30vh",
  scrollTrigger: {
    scroller: ".main",
    trigger: ".page2",
    start: "top 100%",
    // pin: true,
    scrub: true,
    // markers: true,
  },
});

const page2Elem = document.querySelectorAll(".page2-elem");
const page2H3 = document.querySelectorAll(".page2-elem > h3");
const page2RightImg = document.querySelector(".page2-right>img");
const page2Img = [
  "https://encontech.nl/wp-content/uploads/2023/10/laboratory.jpg",
  "https://encontech.nl/wp-content/uploads/2023/10/pipelines.jpg",
  "https://encontech.nl/wp-content/uploads/2023/10/container.jpg",
  "https://encontech.nl/wp-content/uploads/2023/10/factory-plant.jpg",
  "https://encontech.nl/wp-content/uploads/2023/10/environment.jpg",
];

console.log(page2Img[1]);

page2H3.forEach((h1, index) => {
  h1.addEventListener("click", () => {
    page2RightImg.src = page2Img[index];
    for (let i = 0; i <= page2Elem.length; i++) {
      if (i === index) {
        gsap.to(page2Elem[index], {
          height: "10vh",
        });
      } else {
        gsap.to(page2Elem[i], {
          height: "3vh",
        });
      }
    }
  });
});