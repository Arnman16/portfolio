const projects = [
  {
    name: "Car Tiles",
    thumbnail: require("./images/carTilesThumb2.png"),
    image: require("./images/carTiles3.png"),
    summary: "A car game made with Vue.js and Canvas",
    details:
      "A fun race-against-the-clock car game made with HTML5 Canvas, Vue3 - Composition API, and styled with Tailwind CSS",
    github: "https://github.com/Arnman16/car-tiles",
    stack: [
      { tech: "Vue.js", icon: "mdi-vuejs" },
      { tech: "Javascript", icon: "mdi-language-javascript" },
      { tech: "Tailwind", icon: "mdi-tailwind" },
      { tech: "Firebase", icon: "mdi-firebase" },
    ],
    demo: "https://car-tiles.web.app",
    flex: 6,
  },
  {
    name: "Roll Play Stage",
    thumbnail: require("./images/RollPlayStageThumb.png"),
    image: require("./images/RollPlayStageToken.png"),
    summary: "An experiment with HTML5 canvas and Firebase real-time database.",
    details:
      "An experiment with HTML5 canvas and Firebase real-time database. Check out the link below, you can drag images from other sites into the canvas.",
    github: "https://github.com/Arnman16/roll-play-stage",
    stack: [
      { tech: "Vue.js", icon: "mdi-vuejs" },
      { tech: "Vuetify", icon: "mdi-vuetify" },
      { tech: "Javascript", icon: "mdi-language-javascript" },
      { tech: "Firebase", icon: "mdi-firebase" },
    ],
    demo: "https://roll-play-stage.web.app",
    flex: 6,
  },
  {
    name: "Portfolio",
    thumbnail: require("./images/aaronnoseworthyThumb.png"),
    image: require("./images/aaronnoseworthyBoth2.png"),
    summary: "My personal portfolio and blog site.",
    details: "My personal portfolio and blog site.",
    github: "https://github.com/arnman16/portfolio",
    stack: [
      { tech: "Vue.js", icon: "mdi-vuejs" },
      { tech: "Vuetify", icon: "mdi-vuetify" },
      { tech: "Javascript", icon: "mdi-language-javascript" },
      { tech: "Firebase", icon: "mdi-firebase" },
    ],
    demo: "https://aaronnoseworthy.com",
    flex: 6,
  },
  {
    name: "Log Helper",
    thumbnail: require("./images/LogHelper.png"),
    image: require("./images/LogHelper.png"),
    summary: "A tailor made log keeping tool made with Python and PyQT5.",
    details: "A tailor made log keeping tool made with Python and PyQT5.",
    github: "https://github.com/Arnman16/LogHelper",
    stack: [{ tech: "Python", icon: "mdi-language-python" }],
    demo: "",
    flex: 6,
  },
  {
    name: "Dart City",
    thumbnail: require("./images/dartCity.png"),
    image: require("./images/dartCity.png"),
    summary: "A dart scorer made with Vue.js and Vuetify",
    details: "A simple dart scorer made with Vue.js and Vuetify",
    github: "https://github.com/arnman16/dart-city",
    stack: [
      { tech: "Vue.js", icon: "mdi-vuejs" },
      { tech: "Vuetify", icon: "mdi-vuetify" },
      { tech: "Javascript", icon: "mdi-language-javascript" },
    ],
    demo: "https://arnman16.github.io/dart-city/",
    flex: 6,
  },
  {
    name: "SVP Tools",
    thumbnail: require("./images/SVPTools.png"),
    image: require("./images/SVPTools.png"),
    summary:
      "A tool created with Java and JavaFX to visualize and manipulate CDT sensor data profiles.",
    details:
      "A tool created with Java and JavaFX to visualize and manipulate CDT sensor data profiles.",
    github: "https://github.com/arnman16/",
    stack: [{ tech: "Java", icon: "mdi-language-java" }],
    demo: "",
    flex: 6,
  },
  {
    name: "TrackBox",
    thumbnail: require("./images/TrackBoxScreen1.png"),
    image: require("./images/TrackBoxScreen2.png"),
    summary:
      "A collection of online tools designed for working with sub sea sensor data made with Python, Django, and Vue.js",
    details:
      "A collection of online tools designed for working with sub sea sensor data made with Python, Django, and Vue.js",
    github: "https://github.com/Arnman16/TrackBox",
    stack: [
      { tech: "Python", icon: "mdi-language-python" },
      { tech: "Django", icon: "mdi-alpha-d-circle-outline" },
      { tech: "Vue.js", icon: "mdi-vuejs" },
    ],
    demo: "",
    flex: 6,
  },
];

export default projects;
