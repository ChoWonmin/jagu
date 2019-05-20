/**
 * avl tree node
 * @function
 */
const node = (v, p, l, r) => {
  let value = v;
  let parent = p || null;
  let left = l || null;
  let right = r || null;
  let height = 1;

  /**
   * @param {object} value
   */
  const setValue = (val) => {
    value = val;
  };

  /**
   * @returns {string|number}
   */
  const getValue = () => value;

  /**
   * @param {object} pr
   */
  const setParent = (pr) => {
    parent = pr;
  };

  /**
   * @returns {object} node
   */
  const getParent = () => parent;

  /**
   * @param {BinaryNode} node
   */
  const setLeft = (lf) => {
    left = lf;
  };

  /**
   * @returns {object} node
   */
  const getLeft = () => left;

  /**
   * @param {object} rg
   */
  const setRight = (rg) => {
    right = rg;
  };

  /**
   * @returns {BinaryNode}
   */
  const getRight = () => right;


  /**
   * @param {number} height
   */
  const setHeight = (h) => {
    height = h;
  };

  /**
   * @returns {number}
   */
  const getHeight = () => height;

  // avl tree node api
  return {
    setValue,
    getValue,
    setParent,
    getParent,
    setRight,
    getRight,
    setLeft,
    getLeft,
    setHeight,
    getHeight
  };
};

/**
 * binary search tree
 * @function
 */
const avlTree = () => {
  let rootNode = null;
  let nodesCount = 0;

  /**
   * @returns {object} node
   */
  const root = () => rootNode;

  /**
   * @returns {number}
   */
  const count = () => nodesCount;

  /**
   * gets max value node in the tree
   * @returns {object} node
   */
  const max = (startingNode) => {
    let currentNode = startingNode || rootNode;
    while (currentNode !== null && currentNode.getRight() !== null) {
      currentNode = currentNode.getRight();
    }
    return currentNode;
  };

  /**
   * gets min value node in the tree
   * @returns {object} node
   */
  const min = (startingNode) => {
    let currentNode = startingNode || rootNode;
    while (currentNode !== null && currentNode.getLeft() !== null) {
      currentNode = currentNode.getLeft();
    }
    return currentNode;
  };

  /**
   * gets the height of a node
   * @param {object} n - avl node
   * @returns {number}
   */
  const height = n => (n && n.getHeight()) || 0;

  /**
   * updates the height of a node
   * @param {object} n - avl node
   */
  const updateHeight = (n) => {
    if (n !== null) {
      const rightHeight = height(n.getRight());
      const leftHeight = height(n.getLeft());
      n.setHeight(Math.max(rightHeight, leftHeight) + 1);
    }
  };

  /**
   * calculates the balance of a node based on its childrens heights
   * @returns {number}
   */
  const calculateBalance = (n) => {
    if (n !== null) {
      return height(n.getLeft()) - height(n.getRight());
    }
    return 0;
  };

  /**
   * performs a left rotation of a node (counter-clockwise)
   * @param {object} n - the node to be rotated
   */
  const rotateLeft = (n) => {
    const parent = n.getParent();
    const right = n.getRight();
    const rightLeft = right.getLeft();
    n.setRight(rightLeft);
    right.setLeft(n);
    if (n === rootNode) {
      rootNode = right;
    } else if (parent.getValue() < right.getValue()) {
      parent.setRight(right);
    } else if (parent.getValue() > right.getValue()) {
      parent.setLeft(right);
    }
    if (rightLeft !== null) {
      rightLeft.setParent(n);
    }
    n.setParent(right);
    right.setParent(parent);
    updateHeight(n);
    updateHeight(n.getParent());
  };

  /**
   * performs a right rotation of a node (clockwise)
   * @param {object} n - avl node
   */
  const rotateRight = (n) => {
    const parent = n.getParent();
    const left = n.getLeft();
    const leftRight = left.getRight();
    n.setLeft(leftRight);
    left.setRight(n);
    if (n === rootNode) {
      rootNode = left;
    } else if (parent.getValue() > left.getValue()) {
      parent.setLeft(left);
    } else if (parent.getValue() < left.getValue()) {
      parent.setRight(left);
    }
    if (leftRight !== null) {
      leftRight.setParent(n);
    }
    n.setParent(left);
    left.setParent(parent);
    updateHeight(n);
    updateHeight(n.getParent());
  };

  /**
   * performs a left rotation of left child then a right rotation of node
   * @param {object} n - avl node
   */
  const rotateLeftRight = (n) => {
    rotateLeft(n.getLeft());
    rotateRight(n);
  };

  /**
   * performs a right rotation of right child then a left rotation of node
   * @param {object} n - avl node
   */
  const rotateRightLeft = (n) => {
    rotateRight(n.getRight());
    rotateLeft(n);
  };

  /**
   * finds a node in the tree by a given value
   * @param {(string|number)} value
   * @returns {object} node
   */
  const find = (value) => {
    let currentNode = rootNode;
    while (currentNode !== null) {
      if (value > currentNode.getValue()) {
        currentNode = currentNode.getRight();
      } else if (value < currentNode.getValue()) {
        currentNode = currentNode.getLeft();
      } else {
        return currentNode;
      }
    }
    return null;
  };

  /**
   * inserts a node by a given value into the tree
   * @param {(string|number)} value
   */
  const insert = (value) => {
    const balanceNode = (currentNode) => {
      updateHeight(currentNode);
      const balance = calculateBalance(currentNode);
      if (balance > 1) {
        if (value < currentNode.getLeft().getValue()) {
          rotateRight(currentNode);
        } else {
          rotateLeftRight(currentNode);
        }
      } else if (balance < -1) {
        if (value > currentNode.getRight().getValue()) {
          rotateLeft(currentNode);
        } else {
          rotateRightLeft(currentNode);
        }
      }
    };

    const insertFn = (currentNode) => {
      if (currentNode === null) {
        rootNode = node(value);
        nodesCount += 1;
      } else if (value < currentNode.getValue()) {
        if (currentNode.getLeft() === null) {
          currentNode.setLeft(node(value, currentNode));
          nodesCount += 1;
        } else {
          insertFn(currentNode.getLeft());
        }
      } else if (value > currentNode.getValue()) {
        if (currentNode.getRight() === null) {
          currentNode.setRight(node(value, currentNode));
          nodesCount += 1;
        } else {
          insertFn(currentNode.getRight());
        }
      }
      balanceNode(currentNode);
    };

    insertFn(rootNode);
  };

  /**
   * removes a node by a given value from the tree
   * @param {(string|number)} value
   */
  const remove = (value) => {
    const balanceNode = (currentNode) => {
      updateHeight(currentNode);
      const balance = calculateBalance(currentNode);
      if (balance > 1) {
        const left = currentNode.getLeft();
        if (left.getLeft() !== null) {
          rotateRight(currentNode);
        } else if (left.getRight() !== null) {
          rotateLeftRight(currentNode);
        }
      } else if (balance < -1) {
        const right = currentNode.getRight();
        if (right.getRight() !== null) {
          rotateLeft(currentNode);
        } else if (right.getLeft() !== null) {
          rotateRightLeft(currentNode);
        }
      }
    };

    const removeFn = (val, currentNode) => {
      if (currentNode !== null) {
        const left = currentNode.getLeft();
        const right = currentNode.getRight();
        if (val > currentNode.getValue()) {
          removeFn(val, right);
        } else if (val < currentNode.getValue()) {
          removeFn(val, left);
        } else {
          const parent = currentNode.getParent();
          if (right === null && left === null) {
            // remove a node with no children
            if (parent === null) {
              rootNode = null;
            } else if (currentNode.getValue() >= parent.getValue()) {
              parent.setRight(null);
            } else {
              parent.setLeft(null);
            }
            nodesCount -= 1;
          } else if (right === null) {
            // remove a node with a left child
            if (parent === null) {
              rootNode = left;
            } else if (currentNode.getValue() > parent.getValue()) {
              parent.setRight(left);
            } else {
              parent.setLeft(left);
            }
            left.setParent(parent);
            nodesCount -= 1;
          } else if (left === null) {
            // remove a node with a right child
            if (parent === null) {
              rootNode = right;
            } else if (currentNode.getValue() > parent.getValue()) {
              parent.setRight(right);
            } else {
              parent.setLeft(right);
            }
            right.setParent(parent);
            nodesCount -= 1;
          } else {
            // remove a node with two children
            const minRight = min(right);
            currentNode.setValue(minRight.getValue());
            removeFn(minRight.getValue(), minRight);
          }
        }
        balanceNode(currentNode);
      }
    };

    removeFn(value, rootNode);
  };

  /**
   * traverse the avl tree in-order (left-node-right)
   * @param {function} cb - called with each node value
   */
  const traverseInOrder = (cb) => {
    const traverseInOrderFn = (currentNode) => {
      if (currentNode !== null) {
        traverseInOrderFn(currentNode.getLeft());
        cb(currentNode);
        traverseInOrderFn(currentNode.getRight());
      }
    };
    traverseInOrderFn(rootNode);
  };

  /**
   * traverse the avl tree pre-order (node-left-right)
   * @param {function} cb - called with each node value
   */
  const traversePreOrder = (cb) => {
    const traversePreOrderFn = (currentNode) => {
      if (currentNode !== null) {
        cb(currentNode);
        traversePreOrderFn(currentNode.getLeft());
        traversePreOrderFn(currentNode.getRight());
      }
    };
    traversePreOrderFn(rootNode);
  };

  /**
   * traverse the avl tree post-order (left-right-node)
   * @param {function} cb - called with each node value
   */
  const traversePostOrder = (cb) => {
    const traversePostOrderFn = (currentNode) => {
      if (currentNode !== null) {
        traversePostOrderFn(currentNode.getLeft());
        traversePostOrderFn(currentNode.getRight());
        cb(currentNode);
      }
    };
    traversePostOrderFn(rootNode);
  };

  /**
   * traverse the avl tree
   * @param {function} cb - called with each node value
   * @param {string} type - 'inOrder' | 'preOrder' | 'postOrder'
   */
  const traverse = (cb, type) => {
    switch (type) {
      case 'inOrder':
        traverseInOrder(cb);
        break;
      case 'preOrder':
        traversePreOrder(cb);
        break;
      case 'postOrder':
        traversePostOrder(cb);
        break;
      default:
        traverseInOrder(cb);
    }
  };

  /**
   * clears the tree
   */
  const clear = () => {
    rootNode = null;
    nodesCount = 0;
  };

  // avl tree api
  return {
    node,
    root,
    count,
    clear,
    max,
    min,
    find,
    insert,
    remove,
    traverseInOrder,
    traversePreOrder,
    traversePostOrder,
    traverse
  };
};

export default avlTree;
