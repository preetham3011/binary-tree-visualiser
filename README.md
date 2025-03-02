# Binary Tree Visualizer

A web-based tool for visualizing binary trees and their operations.

![Binary Tree Visualizer](https://github.com/user-attachments/assets/8eb959bc-7f6b-4641-a980-e26de0345b4b)

## Features

- **Tree Creation**: Build binary trees node by node with a simple interface
- **Node Insertion**: Add nodes specifying parent node values
- **Node Deletion**: Remove leaf nodes with visual highlighting
- **Tree Traversal**: Visualize three types of traversals:
  - Inorder Traversal
  - Preorder Traversal
  - Postorder Traversal
- **Visual Animation**: Animated node insertion and traversal highlighting
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

### Getting Started

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/binary-tree-visualizer.git
   ```
2. Open `index.html` in your browser, or serve it using a local server.

### Creating a Tree

1. Select "Insert Node" from the dropdown menu.
2. To create the root node:
   - Enter the desired value for the root
   - Enter "0" as the parent value
   - Click "Insert Node"
3. To add child nodes:
   - Enter the value for the new node
   - Enter the parent node's value
   - Click "Insert Node"

### Deleting Nodes

1. Select "Delete Node" from the dropdown menu.
2. Enter the value of the node to delete.
3. Click "Delete Node".
   - Note: You can only delete leaf nodes (nodes without children).

### Traversing the Tree

1. Select "Traverse Tree" from the dropdown menu.
2. Choose a traversal type: Inorder, Preorder, or Postorder.
3. Click "Traverse" to see the nodes highlighted in traversal order.

## Implementation Details

- **HTML/CSS/JavaScript**: No external libraries or frameworks required
- **Binary Tree Logic**: Implemented using JavaScript classes
- **Visualization**: Uses DOM manipulation and CSS animations

## Customization

You can customize various aspects of the tree visualization:
- Edit the CSS in `styles.css` to change colors, sizes, and animations
- Modify `script.js` to adjust tree layout, node spacing, or add new features

## Browser Compatibility

Tested and working on:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
