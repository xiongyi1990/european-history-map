/** Compact historical year for labels; never show a negative year as an AD date. */
export const boundaryYearLabel=(year:number)=>year<0?`公元前 ${Math.abs(year)} 年`:`${year} 年`;
/** Historical chronology has no year zero. */
export const boundaryYearDistance=(a:number,b:number)=>Math.abs((a<0?a+1:a)-(b<0?b+1:b));
