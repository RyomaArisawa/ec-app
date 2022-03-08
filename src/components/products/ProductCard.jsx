import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { MoreVert } from '@material-ui/icons';
import { deleteProduct } from '../../reducks/products/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% - 16px)',
      height: 200,
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)',
      height: 400,
    },
  },
  content: {
    height: '30%',
    padding: '16px 8px',
    display: 'flex',
    alignItems: 'center',
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  media: {
    height: '70%',
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16,
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const images =
    props.images.length > 0
      ? props.images
      : [
          'https://firebasestorage.googleapis.com/v0/b/ec-app-6bf39.appspot.com/o/images%2F2520233538443046489115838442957?alt=media&token=205c53b4-299c-4e29-a58b-176f5c51620e',
        ];
  const path = images[0].path;
  const price = props.price.toLocaleString();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={path}
        component="img"
        onClick={() => dispatch(push(`/product/edit/${props.id}`))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push(`/product/edit/${props.id}`))}>
          <Typography color="textSecondary" component="p">
            {props.name}
          </Typography>
          <Typography className={classes.price} component="p">
            ¥{price}
          </Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              dispatch(push(`/product/edit/${props.id}`));
              handleClose();
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(props.id));
              handleClose();
            }}
          >
            削除する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
