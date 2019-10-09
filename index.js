function el(id) {
 return document.getElementById(id);
}
const canvas = new fabric.Canvas('canvas'); 


const botton2 = el('fileUpload2')
const croppied = el('crop')
botton2.onchange = function (e) {
  var reader = new FileReader();
  reader.onload = function (f) {
    let imObj = new Image()
    imObj.src = f.target.result;
    imObj.onload = () => {
      const imgFabri = new fabric.Image(imObj)
      mainImage = imgFabri
      mainImage.set({
        transparentCorners: false,
        cornerColor: 'red',
        cornerStrokeColor: 'red',
        borderColor: 'red',
        cornerSize: 12,
        padding: 10,
        cornerStyle: 'circle',
        borderDashArray: [3, 3]
      });
      canvas.centerObject(mainImage)
      mainImage.set({globalCompositeOperation: 'destination-over'});
      canvas.add(mainImage)
    }
  }
  reader.readAsDataURL(e.target.files[0])
};
 
var clipPath = new fabric.Rect({
  width: 400,
  height: 200,
  fill:'transparent',
  opacity: 1,
  strokeWidth:1,
  stroke:'red',
  selectable: false,
  lockMovementX : true,
  lockMovementY : true
}); 

//let img = document.createElement('img')
//img.src = 'hotel.jpg'

canvas.centerObject(clipPath)
canvas.add(clipPath)

croppied.onclick =  function () {
  //if (canvas.getActiveObject()){
     let object = canvas.getActiveObject()  
     let img = document.createElement('img')
     img.src = object.toDataURL("image/png")
     const xstart = clipPath.aCoords.bl.x - object.aCoords.bl.x
     const ystart = clipPath.aCoords.tl.y - object.aCoords.tl.y
     const width = clipPath.aCoords.br.x -clipPath.aCoords.bl.x
     const height = clipPath.aCoords.bl.y-clipPath.aCoords.tl.y
     const x = clipPath.left
     const y = clipPath.top
     //const xend = width*mainImage.scaleX
     //const yend = height*mainImage.scaleY
     console.log(`xstart: ${xstart}` )
     console.log(`ystart: ${ystart}` )
     console.log(`width: ${width}` )
     console.log(`height: ${height}` )
     console.log(`x: ${x}` )
     console.log(`y: ${y}` )
     //console.log(`xend: ${xend}` )
     //console.log(`yend: ${yend}` )
        
     const ctx = canvas.getContext('2d')
     newImg = new Image();
     newImg.src = img.src;
     debugger
     
     newImg.onload = function () {
       ctx.drawImage(img,xstart,ystart,width,height,x,y,width,height)
     }
     //
    
    canvas.remove(mainImage)
    //const finalImg = document.createElement('img')
    //finalImg.src = canvasFinal.toDataURL("image/png")
    document.body.appendChild(img) 

 // }else{
 //   alert('seleccione la imagen')
 //}
};



