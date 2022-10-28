const isDisabled = true;
const disabledFunction = () => {
  const adForm = document.querySelector('.ad-form');
  const mapFilter = document.querySelector('.map__filters');
  const adFormChildElements = adForm.children;
  const mapFilterChildElements = mapFilter.children;
  if (isDisabled) {
    adForm.classList.add('ad-form--disabled');
    mapFilter.classList.add('map__filters--disabled');
    for (let i = 0; i < adFormChildElements.length; i++) {
      adFormChildElements[i].setAttribute('disabled', '');
    }
    for (let i = 0; i < adFormChildElements.length; i++) {
      mapFilterChildElements[i].setAttribute('disabled', '');
    }
  }
};

disabledFunction(isDisabled);
