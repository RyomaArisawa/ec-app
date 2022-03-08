import React from 'react';
import { IconButton } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/styles';
import { storage } from '../../firebase';
import { ImagePreview } from './index';

const useStyles = makeStyles({
  icon: {
    height: 28,
    width: 28,
  },
});

const ImageArea = (props) => {
  const classes = useStyles();

  const uploadImage = (event) => {
    const file = event.target.files;
    let blob = new Blob(file, { type: 'image/jpeg' });

    //Generate random 16 digits strings
    const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => [n % S.length])
      .join('');

    const uploadRef = storage.ref('images').child(fileName);
    const uploadTask = uploadRef.put(blob);

    uploadTask.then(() => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        const newImage = { id: fileName, path: downloadURL };
        props.setImages((prevState) => [...prevState, newImage]);
      });
    });
  };

  const deleteImage = async (id) => {
    const ret = window.confirm('この画像を消去しますか？');
    if (!ret) {
      return false;
    } else {
      const newImages = props.images.filter((image) => image.id !== id);
      props.setImages(newImages);
      return storage.ref('images').child(id).delete();
    }
  };

  return (
    <div>
      <div className="p-grid__list-images">
        {props.images.length > 0 &&
          props.images.map((image) => (
            <ImagePreview
              key={image.id}
              path={image.path}
              id={image.id}
              delete={deleteImage}
            />
          ))}
      </div>
      <div className="u-text-right">
        <span>商品を登録する</span>
        <IconButton>
          <label>
            <AddPhotoAlternateIcon className={classes.icon} />
            <input
              className="u-display-none"
              type="file"
              id="image"
              onChange={(event) => uploadImage(event)}
            />
          </label>
        </IconButton>
      </div>
    </div>
  );
};

export default ImageArea;
