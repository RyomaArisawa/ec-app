import React, { useCallback, useState, useEffect } from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { CheckCircle, Delete, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { TextInput } from '../UIkit';

const useStyles = makeStyles({
  iconCell: {
    height: 28,
    width: 28,
  },
  checkIcon: {
    float: 'right',
  },
});

const SetSizeArea = (props) => {
  const classes = useStyles();

  const [index, setIndex] = useState(0),
    [size, setSize] = useState(''),
    [quantity, setQuantity] = useState(0);

  const inputSize = useCallback(
    (event) => {
      setSize(event.target.value);
    },
    [setSize]
  );

  const inputQuantity = useCallback(
    (event) => {
      setQuantity(event.target.value);
    },
    [setQuantity]
  );

  const addSize = (index, size, quantity) => {
    if (size === '' || quantity === '') {
      // Required input is blank
      return false;
    } else {
      if (index === props.sizes.length) {
        props.setSizes((prevState) => [
          ...prevState,
          { size: size, quantity: quantity },
        ]);
        setIndex(index + 1);
        setSize('');
        setQuantity(0);
      } else {
        const newSizes = props.sizes;
        newSizes[index] = { size: size, quantity: quantity };
        props.setSizes(newSizes);
        setIndex(newSizes.length);
        setSize('');
        setQuantity(0);
      }
    }
  };

  const editSize = (index, size, quantity) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  const deleteSize = (deleteIndex) => {
    const newSizes = props.sizes.filter((item, i) => i !== deleteIndex);
    props.setSizes(newSizes);
  };

  useEffect(() => {
    setIndex(props.sizes.length);
  }, [props.sizes.length]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell}></TableCell>
              <TableCell className={classes.iconCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map((item, i) => (
                <TableRow key={item.size}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => editSize(i, item.size, item.quantity)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => deleteSize(i)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="center">
          <TextInput
            fullWidth={false}
            label={'サイズ'}
            multiline={false}
            required={true}
            rows={1}
            value={size}
            type={'text'}
            onChange={inputSize}
          />
          <TextInput
            fullWidth={false}
            label={'数量'}
            multiline={false}
            required={true}
            rows={1}
            value={quantity}
            type={'number'}
            onChange={inputQuantity}
          />
        </div>
        <IconButton
          className={classes.checkIcon}
          onClick={() => addSize(index, size, quantity)}
        >
          <CheckCircle />
        </IconButton>
      </TableContainer>
    </div>
  );
};

export default SetSizeArea;
