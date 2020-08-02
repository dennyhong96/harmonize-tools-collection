const toCsv = (node, result = []) => {
  if (node) {
    result.push({
      email: node.email,
      name: node.name,
      title: node.title,
      manager: node.manager || "",
    });
    node.children.forEach((child) => toCsv(child, result));
    return result;
  }
};
