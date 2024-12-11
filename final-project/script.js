import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as topojson from "https://cdn.jsdelivr.net/npm/topojson@3/+esm";
import versor from "https://cdn.jsdelivr.net/npm/versor@0.0.3/+esm";

///// set canvas dimensions.
const width = 600;
const height = 600;
const canvas = document.getElementById("map");
canvas.width = width;
canvas.height = height;

const context = canvas.getContext("2d");

// define a projection.
const projection = d3
  .geoOrthographic()
  .precision(0.1)
  .translate([width / 2, height / 2]);

// define a path generator.
const path = d3.geoPath(projection, context);
// load land and country data.
const landDataUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json";
const countriesDataUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

let animateToPoint;

d3.json(landDataUrl).then((world) => {
  const land = topojson.feature(world, world.objects.land);

  d3.json(countriesDataUrl).then((world) => {
    const countries = topojson.feature(world, world.objects.countries).features;

    // render the map.
    function render() {
      context.clearRect(0, 0, width, height);
      context.beginPath();
      path({ type: "Sphere" }); // draw globe outline.
      context.fillStyle = "#0E1B45"; // dark blue background.
      context.fill();

      context.beginPath();
      path(land); // draw land.
      context.fillStyle = "#03583D"; // green land.
      context.fill();
      context.strokeStyle = "#000";
      context.stroke();

      // draw countries.
      context.beginPath();
      countries.forEach((country) => {
        path(country);
      });
      context.strokeStyle = "#333";
      context.lineWidth = 0.5;
      context.stroke();
    }

    render();

    // add drag interaction.
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

    // function to place a marker at a specific latitude and longitude
    function placeMarker(longitude, latitude) {
      // convert latitude and longitude to the corresponding pixel coordinates on the canvas
      const [x, y] = projection([longitude, latitude]);

      // draw a small circle (marker) at the coordinates
      context.beginPath();
      context.arc(x, y, 10, 0, 2 * Math.PI); // Small circle with radius 5
      context.fillStyle = "#0B84FF"; // blue marker color
      context.fill();
      context.strokeStyle = "#C7C7CB"; // grey border around the marker
      context.lineWidth = 3;
      context.stroke();
    }

    // animate zooming to a specific point and placing a marker
    animateToPoint = function animateToPoint(
      longitude,
      latitude,
      zoomLevel = 1200
    ) {
      const transitionDuration = 2000; // duration of animation in milliseconds

      // animate the zoom and rotation
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

      // place marker after the zoom and pan are done
      setTimeout(() => {
        placeMarker(longitude, latitude);
      }, transitionDuration); // marker is placed at the end of the transition
    };
  });
});
// code for dragging interaction and globe found at https://observablehq.com/@d3/versor-dragging

document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll(".region-heading");
  const articleContainer = document.querySelector("#article-container-dynamic");

  // function to filter articles based on multiple keywords
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
    articleContainer.innerHTML = ""; // clear existing content

    const articleHeading = document.createElement("div");
    articleHeading.innerHTML = "<p> Articles </p>";
    articleHeading.className = "article-heading";
    articleContainer.appendChild(articleHeading);

    if (articles.length === 0) {
      articleContainer.innerHTML = "<p>No articles found for this region.</p>";
      return;
    }

    articles.forEach((article) => {
      const articleDiv = document.createElement("div");
      articleDiv.className = "article";

      // format the date
      const pubDate = article.pub_date
        ? new Date(article.pub_date).toLocaleDateString()
        : "No date available";

      articleDiv.innerHTML = `
              <hr class="article-separator"/>
      <h2><a href="${article.web_url}" target="_blank">${
        article.headline?.main || "No headline available"
      }</a></h3>
        <p><strong>Author:</strong> ${article.byline?.original || "Unknown"}</p>
        <p><strong>Published on:</strong> ${pubDate}</p> <!-- Display the publication date -->
        <p>${article.snippet || "No snippet available"}</p>
      `;

      articleContainer.appendChild(articleDiv);
    });
  }

  // fetch JSON data for each heading
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      headings.forEach((heading) => {
        heading.addEventListener("click", () => {
          // remove 'active' class from all headings
          headings.forEach((h) => h.classList.remove("active"));

          // add 'active' class to the clicked heading
          heading.classList.add("active");

          // get the keywords from the clicked heading's text content
          const keywords = heading.textContent.trim().split("-");

          // filter articles using the keywords
          const filteredArticles = filterArticlesByKeywords(data, keywords);

          // update the UI with the filtered articles
          displayArticles(filteredArticles);

          // define coordinates for regions (adjust as necessary)
          let regionCoordinates;

          // check region heading and assign coordinates
          if (heading.textContent.includes("Israel" || "Palestine")) {
            regionCoordinates = [35.0461, 31.8516];
          }
          if (heading.textContent.includes("Ukraine" || "Russia")) {
            regionCoordinates = [37.5844, 48.739];
          }
          if (heading.textContent.includes("Syria")) {
            regionCoordinates = [36.2768, 33.5132];
          }
          if (heading.textContent.includes("Myanmar")) {
            regionCoordinates = [95.956, 21.9162];
          }
          if (heading.textContent.includes("Sudan")) {
            regionCoordinates = [30.2176, 12.8628];
          }

          // trigger the zoom animation to the region
          if (regionCoordinates) {
            animateToPoint(regionCoordinates[0], regionCoordinates[1]);
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });
});

document.getElementById("title").addEventListener("click", function () {
  location.reload(); // this will reload the page when user clicks NYT WORLDVIEW
});
