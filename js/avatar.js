const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const adsFileChooser = document.querySelector('#images');
const IMG_HEIGHT = 44;
const IMG_WIDTH = 40;

function onChangeAvatar() {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
}

function onChangeAdsImg() {
  const file = adsFileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  const adsPreview = document.querySelector('.ad-form__photo img');
  if (matches) {
    adsPreview.src = URL.createObjectURL(file);
  }
}

function addAdsSrc() {
  const adsDiv = document.querySelector('.ad-form__photo');
  const adsImg = document.createElement('img');
  adsImg.alt = 'Фото объявления';
  adsImg.height = IMG_HEIGHT;
  adsImg.width = IMG_WIDTH;
  adsImg.src = '../img/muffin-grey.svg';
  adsDiv.append(adsImg);
}

function addImages() {
  addAdsSrc();
  avatarFileChooser.addEventListener('change', onChangeAvatar);
  adsFileChooser.addEventListener('change', onChangeAdsImg);
}

export { addImages };
