window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx;
var firstFlag = true;
 
function onDragOver(event){ 
  event.preventDefault(); 
} 
  
function onDrop(event){
  onAddFile(event);
  event.preventDefault(); 
}  
 
function onAddFile(event) {
  var files;
  var reader = new FileReader();
  
  if(event.target.files){
    files = event.target.files;
  }else{ 
    files = event.dataTransfer.files;   
  }    
 
  reader.onload = function (event) {
 
    if(firstFlag){
      audioCtx =  new AudioContext(); 
      firstFlag = false;     
    }    
    
    audioCtx.decodeAudioData(reader.result).then(function(source) {
      
      // 曲の秒数
      alert(source.duration + "秒\n"+
            "サンプリング周波数 : " + source.sampleRate);
      
    const sample_frequency = source.sampleRate;
    const num_frames = source.sampleRate * source.duration;
    console.log(sample_frequency);
    console.log(num_frames);
    console.log(source);      
      
    }).catch(function(e){
      alert("It is a format not supported.\n"+e);
    });     
  };
  
  if (files[0]){    
    reader.readAsArrayBuffer(files[0]); 
    document.getElementById("inputfile").value = "";
  }
}      

