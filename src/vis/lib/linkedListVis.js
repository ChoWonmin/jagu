/**
 * @copyright 2019 ChoWonmin <0108257@gmail.com>
 * @license MIT
 * @description priority queue visualization library
 * @param {Object} [renderer] d3 render object
 * @param {Object} [datastructure] jagu datastructure
 */

const linkedListVis = (renderer, datastructure) => {

  const root = renderer;
  const backgroundG = root.append('g');
  const foregroundG = root.append('g');
  const activeG = root.append('g');

  const width = root.node().getBoundingClientRect().width;

  const height = root.node().getBoundingClientRect().height;

  const data = datastructure;

  const draw = () => {

  };

  const addFirst = () => {

  };

  const clear = () => {

  };

  return {
    draw,
    addFirst,
    clear
  }

};

export default linkedListVis();
