import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as topojson from "https://cdn.jsdelivr.net/npm/topojson@3/+esm";
import versor from "https://cdn.jsdelivr.net/npm/versor@0.0.3/+esm";

///// Set canvas dimensions.
const width = 600;
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
// Load land and country data.
const landDataUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json";
const countriesDataUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

let animateToPoint;

d3.json(landDataUrl).then((world) => {
  const land = topojson.feature(world, world.objects.land);

  d3.json(countriesDataUrl).then((world) => {
    const countries = topojson.feature(world, world.objects.countries).features;

    // Render the map.
    function render() {
      context.clearRect(0, 0, width, height);
      context.beginPath();
      path({ type: "Sphere" }); // Draw globe outline.
      context.fillStyle = "#0E1B45"; // dark blue background.
      context.fill();

      context.beginPath();
      path(land); // Draw land.
      context.fillStyle = "#03583D"; // green land.
      context.fill();
      context.strokeStyle = "#000";
      context.stroke();

      // Draw countries.
      context.beginPath();
      countries.forEach((country) => {
        path(country);
      });
      context.strokeStyle = "#333";
      context.lineWidth = 0.5;
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

    // Function to place a marker at a specific latitude and longitude
    function placeMarker(longitude, latitude) {
      // Convert latitude and longitude to the corresponding pixel coordinates on the canvas
      const [x, y] = projection([longitude, latitude]);

      // Draw a small circle (marker) at the coordinates
      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI); // Small circle with radius 5
      context.fillStyle = "#FF5733"; // Orange marker color
      context.fill();
      context.strokeStyle = "#FFFFFF"; // White border around the marker
      context.lineWidth = 1;
      context.stroke();
    }

    // Animate zooming to a specific point and placing a marker
    animateToPoint = function animateToPoint(
      longitude,
      latitude,
      zoomLevel = 600
    ) {
      const transitionDuration = 2000; // Duration of animation in milliseconds

      // Animate the zoom and rotation
      d3.transition()
        .duration(transitionDuration)
        .tween("rotate", () => {
          const targetRotation = [-longitude, -latitude];
          const currentRotation = projection.rotate();
          return function (t) {
            projection.rotate([
              currentRotation[0] + (targetRotation[0] - currentRotation[0]) * t,
              currentRotation[1] + (targetRotation[1] - currentRotation[1]) * t,
            ]);
            render();
          };
        })
        .tween("scale", () => {
          const currentScale = projection.scale();
          return function (t) {
            projection.scale(currentScale + (zoomLevel - currentScale) * t);
            render();
          };
        });

      // Place marker after the zoom and pan are done
      setTimeout(() => {
        placeMarker(longitude, latitude);
      }, transitionDuration); // Marker is placed at the end of the transition
    };
  });
});

const ISRAEL_COORDINATES = [-74.006, 40.7128];
setTimeout(() => {
  animateToPoint(ISRAEL_COORDINATES[0], ISRAEL_COORDINATES[1]);
}, 1000);

// Example of zooming to specific coordinates:
// Zoom to New York (Longitude: -74.0060, Latitude: 40.7128)

// code found from https://observablehq.com/@d3/versor-dragging

// not using this
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

///// articles code
document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll(".region-heading");
  const articleContainer = document.querySelector("#article-container-dynamic");

  // Function to filter articles based on multiple keywords
  function filterArticlesByKeywords(data, keywords) {
    return data.response.docs.filter((article) => {
      const glocations = article.keywords
        .filter((keywordObj) => keywordObj.name === "glocations")
        .map((keywordObj) => keywordObj.value);

      return keywords.some((keyword) => {
        const inHeadline = article.headline?.main
          ?.toLowerCase()
          .includes(keyword.toLowerCase());
        return glocations.includes(keyword) || inHeadline;
      });
    });
  }

  function displayArticles(articles) {
    articleContainer.innerHTML = ""; // Clear existing content

    if (articles.length === 0) {
      articleContainer.innerHTML = "<p>No articles found for this region.</p>";
      return;
    }

    articles.forEach((article) => {
      const articleDiv = document.createElement("div");
      articleDiv.className = "article";

      // Format the date
      const pubDate = article.pub_date
        ? new Date(article.pub_date).toLocaleDateString()
        : "No date available";

      articleDiv.innerHTML = `
      <h3><a href="${article.web_url}" target="_blank">${
        article.headline?.main || "No headline available"
      }</a></h3>
        <p><strong>Author:</strong> ${article.byline?.original || "Unknown"}</p>
        <p><strong>Published on:</strong> ${pubDate}</p> <!-- Display the publication date -->
        <p>${article.lead_paragraph || "No lead paragraph available"}</p>
      `;

      articleContainer.appendChild(articleDiv);
    });
  }

  // Fetch JSON data
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      headings.forEach((heading) => {
        heading.addEventListener("click", () => {
          // Remove 'active' class from all headings
          headings.forEach((h) => h.classList.remove("active"));

          // Add 'active' class to the clicked heading
          heading.classList.add("active");

          // Get the keywords from the clicked heading's text content
          const keywords = heading.textContent.trim().split("-");

          // Filter articles using the keywords
          const filteredArticles = filterArticlesByKeywords(data, keywords);

          // Update the UI with the filtered articles
          displayArticles(filteredArticles);
        });
      });
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });
});
