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
const sliderElement = document.querySelector('.ad-form__slider');

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
const validateTitleLength = (value) => value.length >= 30 && value.length <= 100;
pristine.addValidator(adFormTitle, validateTitleLength, 'От 30 до 100 символов');
pristine.addValidator(adFormPrice, validateIsNotEmpty, 'Поле обязательно для заполнения');
const validatePriceIsLessThenZero = (value) => value >= 0;
pristine.addValidator(adFormPrice, validatePriceIsLessThenZero, 'Вы не можете доплачивать постояльцам');
const validatePriceMax = (value) => value <= 100000;
pristine.addValidator(adFormPrice, validatePriceMax, 'Цена не может быть больше 100000');

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
    min: 1000,
    max: 100000,
  },
  start: 1000,
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
      max: 100000,
    },
    start: typeToMinPrice[adFormType.value]
  });
  if (adFormPrice.value) {
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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('valid');
  } else {
    console.log('not valid');
  }
});

adForm.addEventListener('reset', () => {
  adFormPrice.placeholder = 1000;
});

