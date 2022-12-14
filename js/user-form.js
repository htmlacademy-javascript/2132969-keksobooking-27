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
const errorContainer = errorTemplate.cloneNode('true');
const successContainer = successTemplate.cloneNode('true');

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
pristine.addValidator(adFormTitle, validateIsNotEmpty, '???????? ?????????????????????? ?????? ????????????????????');
const validateTitleLength = (value) => value.length >= TITLE_MIN_LENGTH && value.length <= TITLE_MAX_LENGTH;
pristine.addValidator(adFormTitle, validateTitleLength, `???? ${TITLE_MIN_LENGTH} ???? ${TITLE_MAX_LENGTH} ????????????????`);
pristine.addValidator(adFormPrice, validateIsNotEmpty, '???????? ?????????????????????? ?????? ????????????????????');
const validatePriceIsLessThenZero = (value) => value >= PRICE_MIN_VALUE;
pristine.addValidator(adFormPrice, validatePriceIsLessThenZero, '???? ???? ???????????? ?????????????????????? ??????????????????????');
const validatePriceMax = (value) => value <= PRICE_MAX_VALUE;
pristine.addValidator(adFormPrice, validatePriceMax, `???????? ???? ?????????? ???????? ???????????? ${PRICE_MAX_VALUE}`);

const validateTypeToMinPrice = () => !adFormPrice.value || adFormPrice.value >= typeToMinPrice[adFormType.value];

pristine.addValidator(adFormPrice, validateTypeToMinPrice, '?????????????? ?????????????????? ????????');

const roomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const validateCapacity = () => roomsToGuests[adFormRoomNumber.value].includes(adFormCapacity.value);

pristine.addValidator(adFormCapacity, validateCapacity, '???????????????????????? ???????????????????? ????????????');

const onTimeOutChange = () => { adFormTimeIn.value = adFormTimeOut.value; };
const onTimeInChange = () => { adFormTimeOut.value = adFormTimeIn.value; };

adFormTimeOut.addEventListener('change', onTimeOutChange);
adFormTimeIn.addEventListener('change', onTimeInChange);

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

const createErrorMessage = () => {
  document.body.appendChild(errorContainer);
};

const closeErrorMessage = () => {
  errorContainer.remove();
  document.body.removeEventListener('click', errorMessageClickHandler);
  document.removeEventListener('keydown', errorMessageEscHandler);
};

function errorMessageClickHandler() {
  closeErrorMessage();
}

function errorMessageEscHandler (evt) {
  if (evt.key === 'Escape') {
    closeErrorMessage();
  }
}

function errorMessageButtonHandler () {
  closeErrorMessage();
}

const sendingFormErrorMessage = () => {
  createErrorMessage();
  document.body.addEventListener('click', errorMessageClickHandler);
  document.addEventListener('keydown', errorMessageEscHandler);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', errorMessageButtonHandler);
};

const createSuccessMessage = () => {
  document.body.appendChild(successContainer);
  setTimeout(() => {
    successContainer.remove();
  }, TIMEOUT_SUCCESS_MESSAGE);
};

const closeSuccesMessage = () => {
  successContainer.remove();
  document.body.removeEventListener('click', successMessageClickHandler);
  document.removeEventListener('keydown', successMessageEscHandler);
};

function successMessageClickHandler() {
  closeSuccesMessage();
}

function successMessageEscHandler(evt) {
  if (evt.key === 'Escape') {
    closeSuccesMessage();
  }
}

const sendingFormSuccessMessage = () => {
  createSuccessMessage();
  document.body.addEventListener('click', successMessageClickHandler);
  document.addEventListener('keydown', successMessageEscHandler);
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


