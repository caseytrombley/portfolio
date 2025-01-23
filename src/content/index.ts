const introText = `I'm a Senior Front-End Software Engineer with over 20 years of professional experience in building intuitive, user-friendly web applications. My passion for drawing, JavaScript, and CSS drives me to create seamless, interactive experiences from the ground up.`;

const introText2 = `From concept to completion, I specialize in transforming designs into fully functional, responsive apps that make a difference. Take a look at some of the projects I've worked on, and feel free to reach out if you're interested in collaborating or learning more about my work!`;


const experience = [
  {
    title: "Senior Software Engineer",
    company: "Explore Learning",
    dates: "November 2022 - November 2024",
    description: "Designed and developed javascript-based web apps. Developed front end systems."
  },
  {
    title: "Front-End Developer",
    company: "Algaecal",
    dates: "December 2019 - October 2022",
    description: "Designed and developed javascript-based web apps. Developed front end systems. " +
      "Developed content management systems."
  },
  {
    title: "Software Engineer",
    company: "Liberty Mutual",
    dates: "September 2015 - November 2019",
    description: "Built apps using React and graphQL. Developed design systems."
  },
  {
    title: "UI/UX Engineer",
    company: "EBSCO Industries",
    dates: "May 2011 - August 2015",
    description: "Developed design systems and pattern libraries."
  },
  {
    title: "Web Designer",
    company: "Promosis",
    dates: "February 2010 - April 2011",
    description: "Designed and developed websites. Designed advertisements and brand collateral."
  },
  {
    title: "Web Designer",
    company: "Freelance",
    dates: "June 2006 - February 2010",
    description: "Drew and designed graphics for print and screen. Developed animated websites."
  }
];

const tickLabels = {
  0: "1990s",
  1: "2000s",
  2: "2010s",
  3: "2020s"
};

const timelineData = [
  {
    title: "The early days: 1990s - 2000s",
    description: `
    <div class="body">
      <p>Ah, the 1990s—a time when grunge was king, cassettes and floppy disks ruled supreme, and the internet was still wearing diapers. I spent my days in school, eventually making my way to college as the decade wrapped up, and my nights were filled with a deep love for graphic arts. Inspired by the vibrant worlds of Nintendo games and comic books, I dove headfirst into Photoshop and Illustrator, crafting questionable logos, chaotic gradients, and enough clip art to crash a printer.</p>
      <div class="image"><img src='/90s-1.png' alt='image' /></div>
    </div>

    <div class="body">
      <div class="image"><img src='/90s-2.png' alt='image' /></div>
      <p>Then, one day, I stumbled upon the internet—this dazzling, pixelated frontier that felt like crossing an event horizon into the future. Suddenly, graphic design wasn’t enough. Enter Macromedia Studio: Dreamweaver, Flash, and Fireworks became my new tools of the trade. I built websites with spinning logos, animated buttons, and marquee text that screamed, “Welcome to 1999!” Flash was my muse—I was convinced it could make any website a masterpiece, as long as visitors didn’t mind waiting five minutes for it to load.</p>

    </div>
    <p>The web during that era felt like an uncharted frontier, full of untamed possibilities. I used every tool at my disposal to craft a digital world that felt impossibly futuristic. It wasn’t perfect, but it was mine—a vibrant mix of digital dreams inspired by the video games that first ignited my creative passion.</p>`
  },
  {
    title: "My Early 2000s to 2010s Adventure: From CSS Chaos to Modern Web",
    description:
      "The early 2000s were a wild time. While the world was obsessed with The Lord of the Rings, I was on my own epic journey, slogging through mountains of CSS bugs in sprawling applications. This was before the fancy JavaScript frameworks we take for granted today—back then, you just had raw JS, trial-and-error, and the faint hope that Internet Explorer wouldn’t ruin your day (spoiler: it always did).\n" +
      "I earned my CSS chops the hard way, wrangling box models like they were feral beasts. “Pixel-perfect” was a phrase people actually said out loud, and I made it happen with blood, sweat, and liberal use of float: left. It was like living in a world where everything was a Rube Goldberg machine, but hey, it worked (most of the time).\n" +
      "For a while, I was still living the Flash dream, creating interactive websites with Macromedia’s Flash and ActionScript. It was glorious. But then 2007 came, and Steve Jobs dropped the bomb. The iPhone rolled in, Flash was declared obsolete, and suddenly it felt like Gandalf himself had told me, “It is time to leave that world behind.” So, I did.\n" +
      "The web was moving fast, and by the 2010s, responsive design had changed everything. Tables for layouts were a thing of the past (thankfully), and CSS3 gave me tools I could only dream of in the early days. As frameworks like jQuery came into the picture, I realized the web wasn’t just evolving—it was sprinting into the future.\n" +
      "Those years weren’t easy, but they were foundational. I came out the other side with stronger skills, a much thicker skin, and a profound respect for the fact that somehow, the web has always survived us developers."
  },
  {
    title: "The 2010s: From Bootstrap Beginnings to Modern Web Wizardry",
    description:
    "The 2010s were like stepping into a whole new web universe. By this time, I had CSS in a headlock and JavaScript finally felt like less of a rebellious teenager. The rise of responsive design was a game-changer—I still remember my first time meeting Bootstrap and thinking, \"You mean I don’t have to build grids from scratch anymore? What sorcery is this?\"\n" +
      "JavaScript frameworks were popping up like mushrooms after a rainstorm. AngularJS, React, Vue—everyone had their favorite. It was a bit like the Game of Thrones of web dev, except no one was getting stabbed (although debugging IE11 came pretty close). I started dabbling in modern web stacks and said goodbye to the old ways, like writing vanilla AJAX calls and wrestling with jQuery spaghetti.\n" +
      "Then there was the \"everything must be mobile-friendly\" era. With smartphones becoming glued to everyone’s hands, the stakes were high. I became a pro at media queries and spent way too much time testing layouts on every screen size imaginable. Honestly, I probably knew more about iPhone resolutions than Apple themselves.\n" +
      "Oh, and then came Node.js. JavaScript could run on servers now? Mind blown. It felt like discovering Gandalf was also a kickass fighter, not just a guy with a big hat. By the end of the decade, I was neck-deep in the modern web stack—building apps with Vue, managing state like a boss, and feeling like a proper full-stack sorcerer.\n" +
      "The 2010s were a whirlwind of learning, adapting, and leveling up. The web wasn’t just a collection of pages anymore; it had evolved into a rich, dynamic ecosystem—and I was ready to keep pushing forward into whatever came next."
  },
  {
    title: "2020 to Present: Riding the Waves of the Modern Web",
    description:
      "The 2020s kicked off with a plot twist no one saw coming—working from home became the default, and suddenly, every meeting had a “You’re still on mute” moment. But while the world was figuring out Zoom etiquette, I was deep in the trenches of modern web development.\n" +
      "By now, JavaScript frameworks had matured into full-blown ecosystems. Vue, my trusty companion, became second nature, and tools like Pinia and Vite made development faster and more streamlined than ever. The web had gone headless, serverless, and downright futuristic, and I was all in.\n" +
      "CSS, my old nemesis turned best friend, kept evolving too. Utility-first frameworks like Tailwind made styling feel like assembling IKEA furniture (minus the missing screws). But let’s be honest—there are still moments when flexbox feels like decoding an ancient prophecy.\n" +
      "And then there was AI—tools like ChatGPT came along, and suddenly I could brainstorm ideas or troubleshoot code with a robot assistant (who doesn’t judge me for forgetting regex syntax). Speaking of automation, the rise of CI/CD pipelines meant deployments became smoother than ever, and watching green build statuses still gives me a little dopamine hit.\n" +
      "These days, I’m focused on building interactive apps that bring data to life. Teachers, students, teams—you name it, I’m crafting tools that make complex things feel simple and intuitive. The modern web is all about experiences, and I’m loving the challenge of making them engaging and accessible to everyone.\n" +
      "The 2020s aren’t over yet, but one thing’s clear: the web is only getting more exciting, and I’m here for the ride."
  }
];

export { introText, experience, tickLabels, timelineData }
