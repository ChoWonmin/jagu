/**
 * @copyright 20109 ChoWonmin <0108257@gmail.com>
 * @license MIT
 * @description datastructure visualization library
 * @param {String} [renderer] html svg tag
 * @param {Object} [datastructure] jagu datastructure
 */

import * as d3 from 'd3';
import stackVis from './lib/stackVis';

window.d3 = d3;

const vis = (render, datastructure) => {

  const renderer = d3.select(render);
  const data = datastructure;

  const stack = () => stackVis(renderer, data);

  return {
    stack,
  }

};

export default vis;
