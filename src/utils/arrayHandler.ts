interface TreeNode {
  [key: string]: any;
  children?: TreeNode[];
}

export const flattenTree = (tree: any): TreeNode[] => {
	return tree.reduce((acc: TreeNode[], node: TreeNode) => {
		acc.push(node)
		if (node.children) {
			acc.push(...flattenTree(node.children))
		}
		return acc
	}, [])
}
