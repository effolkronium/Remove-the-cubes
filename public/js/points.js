// Game points
function Points() {
     const pointsElement = $('.Points');
     let pointsNumber = 0;

     updatePointsElement();
    
     this.add = newPoints=>{
         pointsNumber += newPoints;
         updatePointsElement();
     };

     this.getTotalPoints = ()=>pointsNumber;

     function updatePointsElement() {
         pointsElement.html(pointsNumber);
     }
}