function animate() {
    setTimeout(function() {
      const animation = gsap.timeline()
        .set("#imgDiv", {
          // xPercent: -50,
          // yPercent: -50,
          x: 0,
          y: 0,
          // x: innerWidth / 2,
          // y: innerHeight / 2,
          scale: 0.9
        }, 0)
        .set("#contentDiv", {
          opacity: 0
        }, 0)
        .to("#imgDiv", {
          xPercent: 0,
          yPercent: 0,
          // x: 0,
          // y: 0,
          x: - innerWidth / 2,
          y: - innerHeight / 2,
          scale: 0.3,
          ease: "power1.out",
          duration: 1
        }, 0)
        
        .to("#contentDiv", {
          opacity: 1,
          duration: 1
        }, 0);
    }, 1000);
  }
  
