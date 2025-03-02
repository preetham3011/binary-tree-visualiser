class TreeNode {
  constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.level = null;
      this.htmlElement = null;
  }
}

class BinaryTree {
  constructor() {
      this.root = null;
      this.nodeCount = 0;
  }

  insert(value, parentValue) {
      const newNode = new TreeNode(value);
      if (this.root === null) {
          if (parentValue !== 0) {
              alert('Please input 0 as parent node value to create the root node.');
              return;
          }
          this.root = newNode;
          newNode.level = 0;
      } else {
          const parent = this.findNode(this.root, parentValue);
          if (parent) {
              if (parent.left === null) {
                  parent.left = newNode;
              } else if (parent.right === null) {
                  parent.right = newNode;
              } else {
                  alert('Both child nodes are occupied. Cannot insert more children here.');
                  return;
              }
              newNode.level = parent.level + 1;
          } else {
              alert('Parent node not found');
              return;
          }
      }
      this.nodeCount++;
      this.display();
  }

  findNode(node, value) {
      if (node === null) return null;
      if (node.value === value) return node;
      return this.findNode(node.left, value) || this.findNode(node.right, value);
  }

  // Fixed delete functionality
  delete(value) {
      if (!this.root) {
          alert('Tree is empty');
          return;
      }

      // Highlight the node to be deleted first
      const nodeToDelete = this.findNode(this.root, value);
      if (!nodeToDelete) {
          alert(`Node with value ${value} not found`);
          return;
      }

      // Visual feedback before deletion
      nodeToDelete.htmlElement.classList.add('delete-highlight');
      
      setTimeout(() => {
          // Actual deletion logic
          if (this.root.value === value) {
              // Special case for root
              if (!this.root.left && !this.root.right) {
                  this.root = null;
              } else {
                  alert('Cannot delete root node when it has children');
                  nodeToDelete.htmlElement.classList.remove('delete-highlight');
                  return;
              }
          } else {
              this._deleteNode(this.root, value);
          }
          
          this.nodeCount--;
          this.display();
      }, 1000); // Delay to show highlighting
  }

  _deleteNode(parentNode, value) {
      // Search for the node and its parent
      if (!parentNode) return null;
      
      // Look in left subtree
      if (parentNode.left && parentNode.left.value === value) {
          // Case 1: Node to delete has no children
          if (!parentNode.left.left && !parentNode.left.right) {
              parentNode.left = null;
              return true;
          }
          // Case 2: Node has children
          else {
              alert('Cannot delete a node with children. Remove children first.');
              return false;
          }
      }
      
      // Look in right subtree
      if (parentNode.right && parentNode.right.value === value) {
          // Case 1: Node to delete has no children
          if (!parentNode.right.left && !parentNode.right.right) {
              parentNode.right = null;
              return true;
          }
          // Case 2: Node has children
          else {
              alert('Cannot delete a node with children. Remove children first.');
              return false;
          }
      }
      
      // Recursively search deeper
      return this._deleteNode(parentNode.left, value) || this._deleteNode(parentNode.right, value);
  }

  display() {
      const container = document.getElementById('tree-container');
      container.innerHTML = '';
      if (this.root) {
          const baseGap = 150;
          this.displayNode(this.root, container, container.offsetWidth / 2, 20, baseGap);
      }
  }

  displayNode(node, container, x, y, gap) {
      if (node) {
          const nodeDiv = document.createElement('div');
          nodeDiv.className = 'node';
          nodeDiv.innerHTML = node.value;
          nodeDiv.style.position = 'absolute';
          nodeDiv.style.left = `${x}px`;
          nodeDiv.style.top = `${y}px`;
          container.appendChild(nodeDiv);
          node.htmlElement = nodeDiv;

          setTimeout(() => {
              nodeDiv.classList.add('fade-in');
          }, 0);

          const verticalGap = 100;

          if (!document.getElementById(`level-${node.level}`)) {
              const levelLabel = document.createElement('div');
              levelLabel.className = 'level-label';
              levelLabel.id = `level-${node.level}`;
              levelLabel.innerHTML = `Level ${node.level}`;
              levelLabel.style.left = `${x}px`;
              levelLabel.style.top = `${y}px`;
              container.appendChild(levelLabel);
          }

          if (node.left) {
              const leftX = x - gap;
              const leftY = y + verticalGap;
              this.displayNode(node.left, container, leftX, leftY, gap / 1.5);
              this.connectNodes(nodeDiv, node.left.htmlElement);
          }

          if (node.right) {
              const rightX = x + gap;
              const rightY = y + verticalGap;
              this.displayNode(node.right, container, rightX, rightY, gap / 1.5);
              this.connectNodes(nodeDiv, node.right.htmlElement);
          }
      }
  }

  connectNodes(parentDiv, childDiv) {
      const container = document.getElementById('tree-container');
      const line = document.createElement('div');
      line.className = 'tree-line';

      const x1 = parentDiv.offsetLeft + parentDiv.offsetWidth / 2;
      const y1 = parentDiv.offsetTop + parentDiv.offsetHeight;
      const x2 = childDiv.offsetLeft + childDiv.offsetWidth / 2;
      const y2 = childDiv.offsetTop;

      const length = Math.hypot(x2 - x1, y2 - y1);
      line.style.width = `${length}px`;
      line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
      line.style.left = `${x1}px`;
      line.style.top = `${y1}px`;

      container.appendChild(line);
  }

  inorderTraversal(node, result, callback) {
      if (node) {
          this.inorderTraversal(node.left, result, callback);
          result.push(node);
          callback(node);
          this.inorderTraversal(node.right, result, callback);
      }
  }

  preorderTraversal(node, result, callback) {
      if (node) {
          result.push(node);
          callback(node);
          this.preorderTraversal(node.left, result, callback);
          this.preorderTraversal(node.right, result, callback);
      }
  }

  postorderTraversal(node, result, callback) {
      if (node) {
          this.postorderTraversal(node.left, result, callback);
          this.postorderTraversal(node.right, result, callback);
          result.push(node);
          callback(node);
      }
  }
}

const tree = new BinaryTree();

function toggleOperationFields() {
  document.getElementById('insertControls').style.display = 'none';
  document.getElementById('deleteControls').style.display = 'none';
  document.getElementById('traversalControls').style.display = 'none';
  const operation = document.getElementById('operation').value;
  if (operation === 'insert') document.getElementById('insertControls').style.display = 'block';
  else if (operation === 'delete') document.getElementById('deleteControls').style.display = 'block';
  else if (operation === 'traversal') document.getElementById('traversalControls').style.display = 'block';
}

function insertNode() {
  const value = parseInt(document.getElementById('valueInput').value);
  const parentValue = parseInt(document.getElementById('parentNode').value);
  
  if (isNaN(value) || isNaN(parentValue)) {
      alert('Please enter both node value and parent node value.');
      return;
  }
  tree.insert(value, parentValue);
  document.getElementById('valueInput').value = '';
  document.getElementById('parentNode').value = '';
}

function deleteNode() {
  const value = parseInt(document.getElementById('deleteValue').value);
  
  if (isNaN(value)) {
      alert('Please enter the node value to delete.');
      return;
  }
  
  tree.delete(value);
  document.getElementById('deleteValue').value = '';
}

function traverseTree() {
  const type = document.getElementById('traversalType').value;
  const result = [];
  const highlightDuration = 800;

  const highlightNode = (node, index) => {
      if (node) {
          node.htmlElement.classList.add('traverse-highlight');

          setTimeout(() => {
              node.htmlElement.classList.remove('traverse-highlight');
              if (index < result.length - 1) {
                  highlightNode(result[index + 1], index + 1);
              }
          }, highlightDuration);
      }
  };

  const allNodes = document.querySelectorAll('.node');
  allNodes.forEach(node => node.classList.remove('traverse-highlight'));

  if (type === 'inorder') {
      tree.inorderTraversal(tree.root, result, node => {});
  } else if (type === 'preorder') {
      tree.preorderTraversal(tree.root, result, node => {});
  } else if (type === 'postorder') {
      tree.postorderTraversal(tree.root, result, node => {});
  }

  const traversalResult = result.map(node => node.value).join(' -> ');
  document.getElementById('traversal-result').textContent = `Traversal Order (${type}): ${traversalResult}`;

  if (result.length > 0) {
      highlightNode(result[0], 0);
  }
}

// Initialize the tree on page load
window.addEventListener('load', function() {
  // Reset tree container for proper sizing
  const container = document.getElementById('tree-container');
  container.innerHTML = '';
  toggleOperationFields();
});

// Handle window resize to redraw the tree
window.addEventListener('resize', function() {
  if (tree.root) {
      tree.display();
  }
});
