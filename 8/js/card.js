import {
  createRandomArray
} from './data.js';
import { randomNumber } from './math.js';


const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const canvasElement = document.querySelector('#map-canvas');

export const typesEngToRus = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const offers = createRandomArray();
const generateCard = ({ author, offer }) => {
  const cardElement = cardTemplate.cloneNode(true);
  const popupTitle = cardElement.querySelector('.popup__title');
  const popupAdress = cardElement.querySelector('.popup__text--address');
  const popupPrice = cardElement.querySelector('.popup__text--price');
  const popupType = cardElement.querySelector('.popup__type');
  const popupCapacity = cardElement.querySelector('.popup__text--capacity');
  const popupTime = cardElement.querySelector('.popup__text--time');
  const popupFeaturesList = cardElement.querySelector('.popup__features');
  const popupDescription = cardElement.querySelector('.popup__description');
  const userPhotoList = cardElement.querySelector('.popup__photos');
  const userPhoto = cardElement.querySelector('.popup__photo');
  popupTitle.textContent = offer.title;
  popupAdress.textContent = offer.address;
  popupPrice.textContent = `${offer.price}₽/ночь`;
  popupType.textContent = typesEngToRus[offer.type];
  popupCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupTime.textContent = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;
  const featuresLength = popupFeaturesList.children.length;
  for (let i = 0; i < featuresLength; i++) {
    popupFeaturesList.removeChild(cardElement.querySelector('.popup__feature'));
  }
  if (offer.features.length === 0) {
    popupFeaturesList.classList.add('visually-hidden');
  } else {
    for (let i = 0; i < offer.features.length; i++) {
      const feature = document.createElement('li');
      popupFeaturesList.appendChild(feature);
      feature.classList.add('popup__feature', `popup__feature--${offer.features[i]}`);
    }
  }
  if (offer.description !== undefined) {
    popupDescription.textContent = offer.description;
  } else {
    popupDescription.classList.add('visually-hidden');
  }
  cardElement.querySelector('.popup__photos').removeChild(userPhoto);
  if (offer.photos.length !== 0) {
    for (let i = 0; i < offer.photos.length; i++) {
      const userPhotoCloned = userPhoto.cloneNode(true);
      userPhotoCloned.src = offer.photos[i];
      userPhotoList.appendChild(userPhotoCloned);
    }
  } else {
    userPhotoList.classList.add('visually-hidden');
  }
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  canvasElement.appendChild(cardElement);
};

generateCard(offers[randomNumber(0, offers.length - 1)]);
