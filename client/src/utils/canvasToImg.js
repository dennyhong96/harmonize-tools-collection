/**
 * @function canvasToImg
 * Transforms html canvs into img file and downloads it
 * @param {string} uri data uri of the html canvas
 * @param {name} name name of the img file to be downloaded
 */
const canvasToImg = (uri, name) => {
  let link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  link = undefined;
};

export default canvasToImg;
