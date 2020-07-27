const findNode = (id, currentNode) => {
  let i, currentChild, result;
  if (id === currentNode.id) {
    return currentNode;
  } else {
    if (currentNode.children) {
      for (i = 0; i < currentNode.children.length; i++) {
        currentChild = currentNode.children[i];
        result = findNode(id, currentChild);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }
};

export default findNode;
