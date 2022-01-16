// Unsplash API
const count = 30;
const apiKey = `X1Ec7n9tv9nfhc_CXoMiJFpggrQQAaaiT2estWnl0Uw`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const mainContainer = document.querySelector(".main-container");
const imageContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");

let ready = false;

const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const renderImages = function (data) {
  data.forEach((el) => {
    const item = document.createElement("a");
    setAttributes(item, { href: el.links.html });
    const image = document.createElement("img");
    setAttributes(image, {
      src: el.urls.regular,
      alt: el.alt_description,
    });
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
};

const getImages = function () {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl);
  xhr.onload = function () {
    const response = this.responseText;
    const data = JSON.parse(response);
    renderImages(data);
    loader.hidden = true;

    ready = true;
  };
  xhr.send();
};

const init = function () {};

getImages();

const infinityScroll = function () {
  if (
    window.scrollY >= document.body.offsetHeight - 1000 - window.innerHeight &&
    ready
  ) {
    console.log("launched");
    ready = false;
    getImages();
  }
};

window.addEventListener("scroll", infinityScroll);
