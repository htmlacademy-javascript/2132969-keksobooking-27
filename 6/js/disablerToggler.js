const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const disabledFields = document.querySelectorAll('select.map__filetr, fieldset');
const disableFunction = () => {
  disabledFields.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const disablerToggler = () => {
  adForm.classList.toggle('ad-form--disabled');
  mapFilter.classList.toggle('map__filters--disabled');
  disableFunction();
};

disablerToggler();
