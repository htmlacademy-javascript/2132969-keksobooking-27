const FILE_TYPES = ['svg', 'jpg', 'jpeg', 'png'];
const DEFAULT_IMAGE = 'img/muffin-grey.svg';

const userAvatarFileChoser = document.querySelector('#avatar');
const userPhotosFileChoser = document.querySelector('#images');
const previewAvatar = document.querySelector('.ad-form-header__preview').children[0];
const previewPhoto = document.querySelector('.ad-form__photo');

userAvatarFileChoser.addEventListener('change', () => {
  const file = userAvatarFileChoser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it)
  );
  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

userPhotosFileChoser.addEventListener('change', () => {
  const file = userPhotosFileChoser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it)
  );
  if (matches) {
    previewPhoto.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    previewPhoto.style.backgroundSize = 'cover';
  }
});

const resetPreviews = () => {
  previewAvatar.src = DEFAULT_IMAGE;
  previewPhoto.style = '';
};

export {resetPreviews };
