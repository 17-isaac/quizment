export default function performanceCal(streakCount,TStreak,mazeLvlCount,TMazeLvl,mazeWeightage,streakWeightage){
   
  
    const overallPreformance=(streakCount/TStreak)*streakWeightage+(mazeLvlCount/TMazeLvl)*mazeWeightage
   
     
       return overallPreformance
         
     }