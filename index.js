function el(id) {
  return document.getElementById(id);
}
const canvas = new fabric.Canvas('canvas'); 
const imgCanvas = el('canvas')
let ctx = imgCanvas.getContext("2d");

/* imgCanvas.onclick = (e) => {
  var cRect = canvas.getBoundingClientRect();
  //
  var canvasX = Math.round(e.clientX - cRect.left); //
  var canvasY = Math.round(e.clientY - cRect.top);
  //
  ctx.clearRect(0, 0, canvas.width, canvas.height); //
  console.log("X: "+canvasX+", Y: "+canvasY);
}; */

const botton2 = el('fileUpload2')
const croppied = el('crop')
let imgScr = null

botton2.onchange = function (e) {
  var reader = new FileReader();
  reader.onload = function (f) {
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
  stroke: '#00ff00',
  strokeWidth: 1,
  fill: 'transparent',
  selectable: false,
  hasControls : false,
  lockMovementX : true,
  lockMovementY : true
});
canvas.add(red);

croppied.onclick =  function () {
  if (canvas.getActiveObject()){
    
    object = canvas.getActiveObject()
    
    object.left = red.left
    object.top = red.top
    
    var eLeft = red.get('left');
    var eTop = red.get('top');
    var left = eLeft - object.left;
    var top = eTop - object.top;
    
    left *= 1;
    top *= 1;

    var eWidth = red.get('width');
    var eHeight = red.get('height');
    var eScaleX = red.get('scaleX');
    var eScaleY = red.get('scaleY');
    var width = eWidth * 1;
    var height = eHeight * 1;
    console.log(-(eWidth / 2) + left)
    console.log(-(eHeight / 2) + top)
    
      object.clipTo = (ctx)=>{
        ctx.rect(-(eWidth / 2) + left, -(eHeight / 2) + top, parseInt(width * eScaleX), parseInt(eScaleY * height));
      }
      
      //canvas.remove(red)
      canvas.renderAll()
    let note = document.createElement("img")
    note.setAttribute('src', imgScr.toDataURL('image/jpg'))
    imagendel = note.getAttribute('src')
    document.body.insertBefore(note, botton2)
  }else{
    alert('seleccione la imagen')
  }
};

