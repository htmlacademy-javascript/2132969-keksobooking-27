const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const filterFields = Array.from(mapFilter.children);
const formFields = Array.from(adForm.children);

const disableForm = () => {
  formFields.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const disableFields = () => {
  filterFields.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const changeFormState = () => {
  adForm.classList.toggle('ad-form--disabled');
  disableForm();
};

const changeFilterState = () => {
  mapFilter.classList.toggle('map__filters--disabled');
  disableFields();
};

export { changeFormState, changeFilterState };
