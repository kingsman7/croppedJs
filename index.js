function el(id) {
  return document.getElementById(id);
}
const imgCanvas = el('canvas')
const canvas = new fabric.Canvas('canvas'); 
let ctx = imgCanvas.getContext("2d");

imgCanvas.onmousemove = ()=>{
  let cRect = imgCanvas.getBoundingClientRect();
  let x = Math.round(e.clientX - cRect.left);
  let y = Math.round(e.clientY - cRect.top)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  console.log(x, y)
}
const botton2 = el('fileUpload2')
const croppied = el('crop')
let imgScr = null

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
      })
      
      canvas.centerObject(imgFabri)
      imgFabri.set({globalCompositeOperation: 'destination-over'}); //set gCO for yellow
      imgScr = imgFabri
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

croppied.onclick =  function () {

  let sourceX = 150;
  let sourceY = 0;
  let sourceWidth = 150;
  let sourceHeight = 150;
  let destWidth = sourceWidth;
  let destHeight = sourceHeight;
  let destX = canvas.width / 2 - destWidth / 2;
  let destY = canvas.height / 2 - destHeight / 2;
  
  console.log(ctx)
  
  let note = document.createElement("img")
  note.setAttribute('src', imgScr.toDataURL('image/jpg'))
  imagendel = note.getAttribute('src')
  
  //ctx.drawImage(imagendel,inicioX,InicioY,desdex,desdey,destX,destY,destWidth,destHeight)
  ctx.drawImage(imagendel,sourceX,sourceY,sourceWidth,sourceHeight,destX,destY,destWidth,destHeight)
  document.body.insertBefore(note, croppied)
  
};

