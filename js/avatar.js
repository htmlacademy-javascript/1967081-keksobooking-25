const NO_PHOTO_IMG = '../img/muffin-grey.svg';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const IMG_HEIGHT = 44;
const IMG_WIDTH = 40;
const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const adsFileChooser = document.querySelector('#images');


const onChangeAvatar = () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
};

const onChangeAdsImg = () => {
  const file = adsFileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  const adsPreview = document.querySelector('.ad-form__photo img');
  if (matches) {
    adsPreview.src = URL.createObjectURL(file);
  }
};

const addAdsSrc = ()=> {
  const adsDiv = document.querySelector('.ad-form__photo');
  const adsImg = document.createElement('img');
  adsImg.alt = 'Фото объявления';
  adsImg.height = IMG_HEIGHT;
  adsImg.width = IMG_WIDTH;
  adsImg.src = NO_PHOTO_IMG;
  adsDiv.append(adsImg);
};

const addImages =() => {
  addAdsSrc();
  avatarFileChooser.addEventListener('change', onChangeAvatar);
  adsFileChooser.addEventListener('change', onChangeAdsImg);
};

export { addImages, NO_PHOTO_IMG };
