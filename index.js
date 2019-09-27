function el(id) {
  return document.getElementById(id);
}
const botton2 = el('fileUpload2')
const canvas = new fabric.Canvas('canvas');

botton2.onchange = function (e) {
  console.log(e)
  var reader = new FileReader();
  reader.onload = function (f) {
    console.log(f)
    let imObj = new Image()
    imObj.src = f.target.result;
    imObj.onload = () => {
      let imgFabri = new fabric.Image(imObj)
      imgFabri.set({
        angle: 0,
        let: 0,
        top: 0,
      }).scale(0.9)
      
      canvas.centerObject(imgFabri)
      imgFabri.set({globalCompositeOperation: 'destination-over'}); //set gCO for yellow
      canvas.add(imgFabri)
    }
  }
  reader.readAsDataURL(e.target.files[0])
};

var red = new fabric.Rect({
  top: 150,
  left: 120,
  width: 600,
  height: 200,
  strokeDashArray: [5, 5],
  stroke: 'black',
  strokeWidth: 1,
  fill: 'transparent',
  selectable: false,
});
canvas.add(red);



