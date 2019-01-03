import avlTree from './lib/avlTree';
import binarySearchTree from './lib/binarySearchTree';
import graph from './lib/graph';
import linkedList from './lib/linkedList';
import matrix from './lib/matrix';
import priorityQueue from './lib/priorityQueue';
import queue from './lib/queue';
import set from './lib/set';
import stack from './lib/stack';
import trie from './lib/trie';
import vis from './vis/vis';

const jagu = {
  avlTree,
  binarySearchTree,
  graph,
  linkedList,
  matrix,
  queue,
  priorityQueue,
  set,
  stack,
  trie,
};

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

if (isBrowser()) {
  jagu.vis = vis;
  window.jagu = jagu;
}

export default jagu;
