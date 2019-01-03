# jagu

> Data Structure and Visualization javascript library

## Install

### Node
```sh
npm install jagu
```

## Including jagu

### Vue
```js
import 'jagu';
```

## Usage

### Datastructure
```js
const avlTree = jagu.avlTree();
const binarySearchTree = jagu.binarySearchTree();
const graph = jagu.graph();
const linkedList = jagu.linkedList();
const priorityQueue = jagu.priorityQueue();
const queue = jagu.queue();
const set = jagu.set();
const stack = jagu.stack();
const trie = jagu.trie();
```

### Visualization
```js
const stack = jagu.stack();

/**
 * @name vis
 * @param {String} [renderer] html svg tag
 * @param {Object} [datastructure] jagu datastructure
 */
const stackVis = jagu.vis('.stack', stack).stack();  
```

#### example :: stack

```html
<style>
    svg.stack {
      width: 200px;
      height: 480px;
      background-color: #ececec;
    }
</style>

<div class="wrapper">
  <svg class="stack"></svg>

  <input id="stack-push-input" placeholder="push value">
  <div id="stack-push-btn" class="btn">
    push
  </div>

  <div id='stack-pop-btn' class="btn">
    pop
  </div>
</div>

<script>
  const stack = jagu.stack();

  for (let i=0; i<5; i++) {
    stack.push(i);
  }

  const stackVis = jagu.vis('.stack', stack).stack();

  stackVis.draw();

  document.getElementById('stack-push-btn').addEventListener('click', ()=>{
    const val = document.getElementById('stack-push-input').value;
    stackVis.push(val);
  });

  document.getElementById('stack-pop-btn').addEventListener('click', ()=>{
    stackVis.pop();
  });

</script>    
```
