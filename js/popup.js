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
  const popupPhotoList = popupElement.querySelector('.popup__photos');
  const popupPhoto = popupElement.querySelector('.popup__photo');
  const popupAvatar = popupElement.querySelector('.popup__avatar');

  if (popupTitle) {
    popupTitle.textContent = offer.title;
  } else {
    popupTitle.remove();
  }

  if (popupAdress) {
    popupAdress.textContent = offer.address;
  } else {
    popupAdress.remove();
  }

  if (popupPrice) {
    popupPrice.textContent = `${offer.price}₽/ночь`;
  } else {
    popupPrice.remove();
  }

  if (popupType) {
    popupType.textContent = typesEngToRus[offer.type];
  } else {
    popupType.remove();
  }

  if (popupCapacity) {
    popupCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    popupCapacity.remove();
  }

  if (popupTime) {
    popupTime.textContent = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;
  } else {
    popupTime.remove();
  }

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

  popupPhotoList.removeChild(popupPhoto);
  if (offer.photos && offer.photos.length !== 0) {
    for (let i = 0; i < offer.photos.length; i++) {
      const userPhotoCloned = popupPhoto.cloneNode(true);
      userPhotoCloned.src = offer.photos[i];
      popupPhotoList.appendChild(userPhotoCloned);
    }
  } else {
    popupPhotoList.remove();
  }

  if (popupAvatar) {
    popupAvatar.src = author.avatar;
  } else {
    popupAvatar.remove();
  }

  return popupElement;
};

export { generatePopup };
