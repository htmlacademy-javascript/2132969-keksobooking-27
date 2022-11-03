/* eslint-disable no-console */
const adForm = document.querySelector('.ad-form');
const defaultConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
};

const pristine = new Pristine(adForm, defaultConfig, true);

const adFormRoomNumber = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');
const adFormType = adForm.querySelector('#type');
const adFormTitle = adForm.querySelector('#title');
const adFormPrice = adForm.querySelector('#price');
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');

const onTypeChange = () => {
  pristine.validate(adFormPrice);
  pristine.validate(adFormType);
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

adFormPrice.addEventListener('input', onTypeChange);
adFormType.addEventListener('change', onPriceChange);
adFormCapacity.addEventListener('change', onCapacityChange);
adFormRoomNumber.addEventListener('change', onRoomNumberChange);

const validateIsNotEmpty = (value) => value;
pristine.addValidator(adFormTitle, validateIsNotEmpty, 'Поле обязательно для заполнения');
const validateTitleLength = (value) => value.length >= 30 && value.length <= 100;
pristine.addValidator(adFormTitle, validateTitleLength, 'От 30 до 100 символов');
pristine.addValidator(adFormPrice, validateIsNotEmpty, 'Поле обязательно для заполнения');
const validatePriceIsZero = (value) => value !== '0';
pristine.addValidator(adFormPrice, validatePriceIsZero, 'Бесплатный сыр только в мышеловке');
const validatePriceIsLessThenZero = (value) => value >= 0;
pristine.addValidator(adFormPrice, validatePriceIsLessThenZero, 'Вы не можете доплачивать постояльцам');
const validatePriceMax = (value) => value <= 100000;
pristine.addValidator(adFormPrice, validatePriceMax, 'Цена не может быть больше 100000');

const typeToMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const typeToPricePlaceholder = () => {
  adFormPrice.placeholder = typeToMinPrice[adFormType.value];
  return true;
};

pristine.addValidator(adFormPrice, typeToPricePlaceholder, 'this');

const validateTypeToMinPrice = (value) => value >= typeToMinPrice[adFormType.value];

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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('valid');
  } else {
    console.log('not valid');
  }
});
