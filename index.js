
function el(id) {
  return document.getElementById(id);
}
const botton2 = el('fileUpload2')
const canvas = new fabric.Canvas('canvas');

const rect = new fabric.Rect()
rect.width = 600
rect.height = 200
rect.left = 120
rect.top = 150
rect.hasControls = false
rect.lockMovementX = true
rect.lockMovementY = true
rect.opacity = 0.1
rect.backgroudColor =false

canvas.add(rect)

canvas.backgroundColor = '#c8c8c8';
canvas.renderAll();
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
      canvas.add(imgFabri)
      canvas.renderAll();
    }
  }
  
  reader.readAsDataURL(e.target.files[0])
};
canvas.renderAll()