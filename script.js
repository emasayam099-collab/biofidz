gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  // Hide Loader
  gsap.to("#loader",{opacity:0,duration:.8,onComplete:()=>{document.getElementById("loader").style.display="none"}});

  // Hero Animation
  gsap.from(".hero-text h1",{y:80,opacity:0,duration:1});
  gsap.from(".hero-text p",{y:50,opacity:0,delay:.4,duration:1});
  gsap.from(".btn-primary",{scale:0,delay:.8,duration:.5,ease:"back.out(1.7)"});

  // Scroll reveal
  gsap.utils.toArray(".reveal").forEach(el=>{
    gsap.from(el,{scrollTrigger:{trigger:el,start:"top 85%"},y:50,opacity:0,duration:1});
  });
});

// Hamburger Toggle
document.querySelector(".hamburger").addEventListener("click",()=>{
  document.querySelector(".nav-links").classList.toggle("active");
});