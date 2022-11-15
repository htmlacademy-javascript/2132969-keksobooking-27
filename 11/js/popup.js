const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const typesEngToRus = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const generatePopup = ({ author, offer }) => {
  const popupElement = popupTemplate.cloneNode(true);
  const popupTitle = popupElement.querySelector('.popup__title');
  const popupAdress = popupElement.querySelector('.popup__text--address');
  const popupPrice = popupElement.querySelector('.popup__text--price');
  const popupType = popupElement.querySelector('.popup__type');
  const popupCapacity = popupElement.querySelector('.popup__text--capacity');
  const popupTime = popupElement.querySelector('.popup__text--time');
  const popupFeaturesList = popupElement.querySelector('.popup__features');
  const popupDescription = popupElement.querySelector('.popup__description');
  const userPhotoList = popupElement.querySelector('.popup__photos');
  const userPhoto = popupElement.querySelector('.popup__photo');
  popupTitle.textContent = offer.title;
  popupAdress.textContent = offer.address;
  popupPrice.textContent = `${offer.price}₽/ночь`;
  popupType.textContent = typesEngToRus[offer.type];
  popupCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupTime.textContent = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;
  const featuresLength = popupFeaturesList.children.length;
  for (let i = 0; i < featuresLength; i++) {
    popupFeaturesList.removeChild(popupElement.querySelector('.popup__feature'));
  }
  if (!offer.features || offer.features.length === 0) {
    popupFeaturesList.remove();
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
    popupDescription.remove();
  }
  popupElement.querySelector('.popup__photos').removeChild(userPhoto);
  if (offer.photos && offer.photos.length !== 0) {
    for (let i = 0; i < offer.photos.length; i++) {
      const userPhotoCloned = userPhoto.cloneNode(true);
      userPhotoCloned.src = offer.photos[i];
      userPhotoList.appendChild(userPhotoCloned);
    }
  } else {
    userPhotoList.remove();
  }
  popupElement.querySelector('.popup__avatar').src = author.avatar;
  return popupElement;
};

export { generatePopup };
