/**
 * @copyright 20109 ChoWonmin <0108257@gmail.com>
 * @license MIT
 * @description datastructure visualization library
 * @param {String} [renderer] html svg tag
 * @param {Object} [datastructure] jagu datastructure
 */

import * as d3 from 'd3';
import stackVis from './lib/stackVis';
import queueVis from './lib/queueVis';
import priorityQueueVis from './lib/priorityQueueVis';

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

let vis = null;

if(isBrowser()) {
  window.d3 = d3;
  vis = (render, datastructure) => {

    const renderer = d3.select(render);
    const data = datastructure;

    const stack = () => stackVis(renderer, data);
    const queue = () => queueVis(renderer, data);
    const priorityQueue = () => priorityQueueVis(renderer, data);

    return {
      stack,
      queue,
      priorityQueue
    }

  };
}

export default vis;
