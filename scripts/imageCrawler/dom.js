function getTitleFromComponent(component) {
  return component.title.slice(0, -5).trim();
}

function getUrlFromComponent(component) {
  return (
    component.attributes.src.value || component.attributes["data-src"].value
  );
}

function getAllUrls(document) {
  const images = Array.from(document.getElementsByClassName("card")).filter(
    img => img.id !== "card-tooltip-img"
  );
  const urls = {};
  images.forEach((img, idx) => {
    const title = cleanName(getTitleFromComponent(img));
    const url = getUrlFromComponent(img);
    urls[title] = cleanUrl(url);
  });
  return urls;
}

function cleanUrl(url) {
  const chars = url.split("");
  const trailIdx = chars.findIndex(c => c === "?");
  return chars.slice(0, trailIdx).join("");
}

function cleanName(name) {
  const symbols = ["/"];
  return name
    .split("")
    .filter(c => symbols.indexOf(c) === -1)
    .join("")
    .split(" ")
    .filter(term => term.length > 0)
    .join(" ");
}

module.exports = { getAllUrls };
