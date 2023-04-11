export const orderAlpha =(a, b)=>{
    if( a.name < b.name ) return -1;
    if( b.name > a.name ) return 1;
    return 0;
}

export const ratingMin = (a,b)=>{
   return  a.rating - b.rating;
}

export const ratingMax = (a,b) =>{
    return b.rating - a.rating
}