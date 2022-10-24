import {
  createRandomArray
} from './data.js';


const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const canvasElement = document.querySelector('#map-canvas');
canvasElement.style = 'overflow-y: scroll';

const typesEngToRus = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const offers = createRandomArray();
offers.forEach(({ author, offer }) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price}₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typesEngToRus[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;
  const cardFeatures = cardElement.querySelector('.popup__features');
  const featuresLength = cardFeatures.children.length;
  for (let i = 0; i < featuresLength; i++) {
    cardFeatures.removeChild(cardElement.querySelector('.popup__feature'));
  }
  if (offer.features.length === 0) {
    cardFeatures.classList.add('visually-hidden');
  } else {
    for (let i = 0; i < offer.features.length; i++) {
      const feature = document.createElement('li');
      cardFeatures.appendChild(feature);
      feature.classList.add('popup__feature', `popup__feature--${offer.features[i]}`);
    }
  }
  const cardDescription = cardElement.querySelector('.popup__description');
  if (offer.description !== undefined) {
    cardDescription.textContent = offer.description;
  } else {
    cardDescription.classList.add('visually-hidden');
  }
  const userPhotoList = cardElement.querySelector('.popup__photos');
  const userPhoto = cardElement.querySelector('.popup__photo');
  userPhotoList.removeChild(userPhoto);
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
});
