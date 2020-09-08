const ObjectToCSV = (node, result = []) => {
  if (node) {
    result.push({
      email: node.email,
      name: node.name,
      title: node.title,
      manager: node.manager || "",
    });
    node.children.forEach((child) => ObjectToCSV(child, result));
    return result;
  }
};

export default ObjectToCSV;
