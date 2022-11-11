/* eslint-disable no-console */
import { disablerToggler } from './disablerToggler.js';
import { generateCard } from './card.js';
import { sendRequest } from './fetch.js';

const LAT = 35.67500;
const LNG = 139.75000;
const MAX_OFFERS = 10;
const adFormAddress = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
let adverts = [];

const map = L.map('map-canvas');
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const additionalPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const markerGroup = L.layerGroup().addTo(map);

const createAdPinMarkers = (offersList) => {
  offersList.forEach((itemOfList) => {
    const additionalMarker = L.marker({
      lat: itemOfList.location.lat,
      lng: itemOfList.location.lng,
    },
    {
      icon: additionalPinIcon,
    },
    );
    additionalMarker.addTo(markerGroup).bindPopup (generateCard(itemOfList));
  });
};

mainMarker.on('moveend', (evt) => {
  adFormAddress.value = `${evt.target.getLatLng().lat.toFixed(5)} ${evt.target.getLatLng().lng.toFixed(5)}`;
  map.setView({
    lat: evt.target.getLatLng().lat,
    lng: evt.target.getLatLng().lng,
  });
});

mainMarker.addTo(map);

resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: LAT,
    lng: LNG,
  });
  map.setView({
    lat: LAT,
    lng: LNG,
  }, 13);
});

const onSuccess = (data) => {
  adverts = data.slice(0, MAX_OFFERS);
  createAdPinMarkers(adverts);
};

const onError = () => {
  console.log('Ошибка api fetch');
};

map.on('load', () => {
  console.log('Карта инициализирована');
  disablerToggler();
  sendRequest(onSuccess, onError, 'GET');
})
  .setView({
    lat: LAT,
    lng: LNG,
  }, 13);
