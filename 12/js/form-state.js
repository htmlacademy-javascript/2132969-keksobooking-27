const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const disabledFields = document.querySelectorAll('select.map__filetr, fieldset');

const disableForm = () => {
  disabledFields.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const changeFormState = () => {
  adForm.classList.toggle('ad-form--disabled');
  mapFilter.classList.toggle('map__filters--disabled');
  disableForm();
};

changeFormState();

export { changeFormState };
