function minDigit(x){
  let min = x%10;
  while ( x> 0){
    if ( x % 10 < min){
      min = x % 10;
    }
    x = (x - x % 10) / 10
  }
  return min
}

console.log(minDigit(999399))
