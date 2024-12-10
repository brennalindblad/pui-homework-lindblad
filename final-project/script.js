import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as topojson from "https://cdn.jsdelivr.net/npm/topojson@3/+esm";
import versor from "https://cdn.jsdelivr.net/npm/versor@0.0.3/+esm";

d3.select("body").append("h1").text("Hello, D3!");

// Set canvas dimensions.
const width = 800;
const height = 600;
const canvas = document.getElementById("map");
canvas.width = width;
canvas.height = height;

const context = canvas.getContext("2d");

// Define a projection.
const projection = d3
  .geoOrthographic()
  .precision(0.1)
  .translate([width / 2, height / 2]);

// Define a path generator.
const path = d3.geoPath(projection, context);

// Load land data.
const landDataUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json";

d3.json(landDataUrl).then((world) => {
  const land = topojson.feature(world, world.objects.land);

  // Render the map.
  function render() {
    context.clearRect(0, 0, width, height);
    context.beginPath();
    path({ type: "Sphere" }); // Draw globe outline.
    // context.fillStyle = "#172963"; // dark blue background.
    context.fillStyle = "#000000"; // black background.
    context.fill();

    context.beginPath();
    path(land); // Draw land.
    // context.fillStyle = "#01724E"; // Green land.
    context.fillStyle = "#FFFFFF"; // white land.
    context.fill();
    context.strokeStyle = "#000";
    context.stroke();
  }

  render();

  // Add drag interaction.
  const dragBehavior = d3.drag().on("start", dragStarted).on("drag", dragged);

  d3.select(canvas).call(dragBehavior);

  let v0, q0, r0;

  function dragStarted(event) {
    v0 = versor.cartesian(projection.invert([event.x, event.y]));
    q0 = versor((r0 = projection.rotate()));
  }

  function dragged(event) {
    const v1 = versor.cartesian(
      projection.rotate(r0).invert([event.x, event.y])
    );
    const q1 = versor.multiply(q0, versor.delta(v0, v1));
    projection.rotate(versor.rotation(q1));
    render();
  }
});

// import * as THREE from "three";

// const globeGeometry = new THREE.SphereGeometry(5, 64, 64);
// const globeMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
// const globe = new THREE.Mesh(globeGeometry, globeMaterial);
// scene.add(globe);

// function latLongToVector3(lat, lon, radius) {
//   const phi = (90 - lat) * (Math.PI / 180);
//   const theta = (lon + 180) * (Math.PI / 180);
//   const x = -(radius * Math.sin(phi) * Math.cos(theta));
//   const y = radius * Math.cos(phi);
//   const z = radius * Math.sin(phi) * Math.sin(theta);
//   return new THREE.Vector3(x, y, z);
// }

// const marker = new THREE.Mesh(
//   new THREE.SphereGeometry(0.1),
//   new THREE.MeshBasicMaterial({ color: 0xff0000 })
// );
// marker.position.copy(latLongToVector3(lat, lon, globeRadius));
// scene.add(marker);

// const slider = document.getElementById("yearSlider");
// const yearDisplay = document.getElementById("selectedYear");

// // Set the year when the slider value changes
// slider.oninput = function () {
//   yearDisplay.innerHTML = this.value;
// };
// function outputUpdate(num) {
//   document.querySelector("#output").value = num;
// }

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Access the articles array within the response
    const articles = data.response.docs;

    // Filter articles from January 2000
    // const january2000Articles = articles.filter((article) => {
    //   const pubDate = new Date(article.pub_date); // Convert pub_date to Date object
    //   return pubDate.getFullYear() === 2000 && pubDate.getMonth() === 0; // Check if it's January 2000
    // });

    // Filter articles where "glocations" contains "Turkey"
    const filteredArticles = articles.filter((article) => {
      // Check if "glocations" exists and if it contains "Turkey"
      const glocations = article.keywords
        .filter((keyword) => keyword.name === "glocations")
        .map((keyword) => keyword.value);

      // If 'glocations' contains 'X', keep this article
      return glocations.includes("Israel");
    });

    console.log(filteredArticles); // Log the filtered articles

    // Log the filtered articles
    // console.log(articles);
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });

// fetch("data.json") // Path to your local JSON file
//   .then((response) => response.json()) // Parse the JSON data
//   .then((data) => {
//     // Filter articles from January 2000
//     const january2000Articles = data.response.docs.filter((article) => {
//       // Extract the publication date (assuming it's in the 'pub_date' field)
//       const pubDate = new Date(article.pub_date);

//       // Check if the date is from January 2000
//       return pubDate.getFullYear() === 2000 && pubDate.getMonth() === 0;
//     });

//     // Log the filtered articles
//     console.log("Articles from January 2000:", january2000Articles);

//     // You can now use the filtered articles for display or further processing
//   })
//   .catch((error) => {
//     console.error("Error loading the JSON file:", error);
//   });
