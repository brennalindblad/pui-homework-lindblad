import * as THREE from "three";

const globeGeometry = new THREE.SphereGeometry(5, 64, 64);
const globeMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const globe = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globe);

function latLongToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

const marker = new THREE.Mesh(
  new THREE.SphereGeometry(0.1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
marker.position.copy(latLongToVector3(lat, lon, globeRadius));
scene.add(marker);

const slider = document.getElementById("yearSlider");
const yearDisplay = document.getElementById("selectedYear");

// Set the year when the slider value changes
slider.oninput = function () {
  yearDisplay.innerHTML = this.value;
};
function outputUpdate(num) {
  document.querySelector("#output").value = num;
}

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
