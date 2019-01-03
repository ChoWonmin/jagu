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

      each( (e, c, r) => {
         setValue(c, r, e + mat.getValue(c,r));
      });

      console.log(this, 'this');
      return this;
    }
    return null;
  };

  const multiScala = (k) => {
    each((e,c,r) => {
      setValue(c, r, e*k);
    });
    return this;
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
    toArray2D,
    toArray
  };

};


// const m1 = matrix(2,3, 3);
// const m2 = matrix(2,3, 3);
// const m3 = matrix(2,2, 3);
//
// console.log(m1.toArray2D());
// console.log(m1.clone().toArray2D());
// console.log(m1.add(m2).toArray2D());
//
// m1.multyScala(3);
// console.log(m1.toArray2D());

export default matrix;

