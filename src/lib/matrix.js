/**
 * @copyright 20109 ChoWonmin <0108257@gmail.com>
 * @license MIT
 * @description Matrix library
 */

const matrix = ( c, r, value = 0 ) => {

  const row = r;
  const col = c;
  let elements = new Array(col);

  const init = () => {
    for (let i = 0; i < col; i++) {
      elements[i] = new Array(row);
      for (let j = 0; j < row; j++) {
        elements[i][j] = value;
      }
    }
  };

  const getRow = () => row;

  const getCol = () => col;

  const getValue = (c, r) => elements[c][r];

  const setValue = (c, r, value) => elements[c][r] = value;

  const each = (action) => {
    elements.forEach((row, col) => {
      row.forEach((e, i) => {
        action(e, col, i);
      })
    })
  };

  const clone = () => {
    const res = matrix(col, row);

    res.each((e,c,r) => {
      res.setValue(c,r, elements[c][r]);
    });
    return res;
  };

  const add = (mat) => {
    if (row === mat.getRow() && col === mat.getCol()) {
      const res = clone();
      res.each( (e, c, r) => {
         res.setValue(c, r, e + mat.getValue(c,r));
      });

      return res;
    }
    return null;
  };

  const multiScala = (k) => {
    const res = clone();

    res.each((e,c,r) => {
      setValue(c, r, e*k);
    });

    return res;
  };

  const multi = (mat) => {
    if (row === mat.getCol()) {
      const res = matrix(col, mat.getRow());

      res.each((e,c,r) => {
        let val = 0;

        for (let i=0; i<row; i++) {
          val += getValue(c,i) * mat.getValue(i,r);
        }

        res.setValue(c,r, val);
      });

      return res;
    }
    return null;
  };

  const toArray2D = () => elements;

  const toArray = () => {
    const res = [];

    elements.forEach(row => {
      row.forEach(e => res.push(e));
    });

    return res;
  };

  init();

  return {
    getRow,
    getCol,
    getValue,
    setValue,
    each,
    clone,
    add,
    multiScala,
    multi,
    toArray2D,
    toArray
  };

};

export default matrix;
