import { sendRequest } from './fetch.js';
import { resetAddress, resetMapPosition, generateDefaultMarkers, clearSecondaryPins } from './map.js';
import { mapFiltersContainer } from './filter.js';
import { resetPreviews } from './upload-images.js';

const MINPRICE = 1000;
const MAXPRICE = 100000;
const TIMEOUT_SUCCESS_MESSAGE = 2000;
const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const PRICE_MIN_VALUE = 0;
const PRICE_MAX_VALUE = 100000;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const adForm = document.querySelector('.ad-form');
const submitButton = adForm.querySelector('.ad-form__submit');
const adFormRoomNumber = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');
const adFormType = adForm.querySelector('#type');
const adFormTitle = adForm.querySelector('#title');
const adFormPrice = adForm.querySelector('#price');
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');

const defaultConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
};

const pristine = new Pristine(adForm, defaultConfig, true);
const typeToMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const onTypeChange = () => {
  if (!adFormPrice.value) {
    adFormPrice.placeholder = typeToMinPrice[adFormType.value];
  } else {
    pristine.validate(adFormPrice);
    pristine.validate(adFormType);
  }
};

const onPriceChange = () => {
  pristine.validate(adFormPrice);
  pristine.validate(adFormType);
};

const onCapacityChange = () => {
  pristine.validate(adFormCapacity);
  pristine.validate(adFormRoomNumber);
};

const onRoomNumberChange = () => {
  pristine.validate(adFormCapacity);
  pristine.validate(adFormRoomNumber);
};

adFormPrice.addEventListener('input', onPriceChange);
adFormType.addEventListener('change', onTypeChange);
adFormCapacity.addEventListener('change', onCapacityChange);
adFormRoomNumber.addEventListener('change', onRoomNumberChange);

const validateIsNotEmpty = (value) => value;
pristine.addValidator(adFormTitle, validateIsNotEmpty, 'Поле обязательно для заполнения');
const validateTitleLength = (value) => value.length >= TITLE_MIN_LENGTH && value.length <= TITLE_MAX_LENGTH;
pristine.addValidator(adFormTitle, validateTitleLength, `От ${TITLE_MIN_LENGTH} до ${TITLE_MAX_LENGTH} символов`);
pristine.addValidator(adFormPrice, validateIsNotEmpty, 'Поле обязательно для заполнения');
const validatePriceIsLessThenZero = (value) => value >= PRICE_MIN_VALUE;
pristine.addValidator(adFormPrice, validatePriceIsLessThenZero, 'Вы не можете доплачивать постояльцам');
const validatePriceMax = (value) => value <= PRICE_MAX_VALUE;
pristine.addValidator(adFormPrice, validatePriceMax, `Цена не может быть больше ${PRICE_MAX_VALUE}`);

const validateTypeToMinPrice = () => {
  if (!adFormPrice.value) {
    return true;
  } else if (adFormPrice.value >= typeToMinPrice[adFormType.value]) {
    return true;
  }
};

pristine.addValidator(adFormPrice, validateTypeToMinPrice, 'Слишком маленькая цена');

const roomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const validateCapacity = () => roomsToGuests[adFormRoomNumber.value].includes(adFormCapacity.value);

pristine.addValidator(adFormCapacity, validateCapacity, 'Недопустимое количество комнат');

const timeOutEqualsTimeIn = () => { adFormTimeIn.value = adFormTimeOut.value; };
const timeInEqualsTimeOut = () => { adFormTimeOut.value = adFormTimeIn.value; };

adFormTimeOut.addEventListener('change', timeOutEqualsTimeIn);
adFormTimeIn.addEventListener('change', timeInEqualsTimeOut);

noUiSlider.create(sliderElement, {
  range: {
    min: MINPRICE,
    max: MAXPRICE,
  },
  start: MINPRICE,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

adFormType.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: typeToMinPrice[adFormType.value],
      max: MAXPRICE,
    },
  });
  if (adFormPrice.value) {
    sliderElement.noUiSlider.updateOptions({
      start: typeToMinPrice[adFormType.value]
    });
    adFormPrice.placeholder = typeToMinPrice[adFormType.value];
    adFormPrice.value = '';
  }
});

sliderElement.noUiSlider.on('update', () => {
  adFormPrice.value = sliderElement.noUiSlider.get();
  pristine.validate(adFormPrice);
});

adFormPrice.addEventListener('change', () => {
  sliderElement.noUiSlider.set(adFormPrice.value);
});

adFormPrice.value = '';

const changeSubmitButtonState = () => {
  submitButton.disabled = !submitButton.disabled;
};

const sendingFormErrorMessage = () => {
  const errorContainer = errorTemplate.cloneNode('true');
  const errorButton = errorContainer.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    errorContainer.remove();
  });
  document.body.addEventListener('click', () => {
    errorContainer.remove();
  });
  document.addEventListener('keydown', ({ key }) => {
    if (key === 'Escape') {
      errorContainer.remove();
    }
  });
  document.body.appendChild(errorContainer);
};

const sendingFormSuccessMessage = () => {
  const successContainer = successTemplate.cloneNode('true');
  document.body.appendChild(successContainer);
  setTimeout(() => {
    successContainer.remove();
  }, TIMEOUT_SUCCESS_MESSAGE);
};

const resetFiltersToDefault = () => {
  mapFiltersContainer.reset();
};

const onSuccess = () => {
  changeSubmitButtonState();
  adForm.reset();
  resetAddress();
  sendingFormSuccessMessage();
  resetFiltersToDefault();
};

const onError = () => {
  sendingFormErrorMessage();
  changeSubmitButtonState();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  changeSubmitButtonState();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(adForm);
    sendRequest(onSuccess, onError, 'POST', formData);
  } else {
    changeSubmitButtonState();
  }
});

adForm.addEventListener('reset', () => {
  adFormPrice.placeholder = MINPRICE;
  sliderElement.noUiSlider.reset();
  resetMapPosition();
  resetAddress();
  pristine.reset();
  resetFiltersToDefault();
  clearSecondaryPins();
  generateDefaultMarkers();
  resetPreviews();
});


