function gcd(a, b){
  let min;
  if (a < b) {
    min = a
  } else {
    min = d
  }
  let del;
  for (let i = 1; i <= min; i++){
    if (a % i == 0 && b % i == 0){
      del = i
    }
  }
  return del;
}

console.log(gcd(35, 56));
