
//function that calculate student performance
export default function performanceCal(pts,highestPts,streaks,highestStreaks,ptsWeightage,streakWeightage){
   
  
    const overallPreformance=(pts/highestPts)*ptsWeightage+(streaks/highestStreaks)*streakWeightage
   
    const result= overallPreformance.toFixed(2);
     
       return result
         
     }