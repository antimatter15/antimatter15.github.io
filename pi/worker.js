function mul_mod(a, b, m){
  return (a * b) % m;
}

function inv_mod(x, y){
  var u = x, 
      v = y, 
      a = 0, 
      c = 1, 
      t, q;
  do {
    q = Math.floor(v / u);
    t = c;
    c = a - q * c;
    a = t;
    t = u;
    u = v - q * u;
    v = t;
  } while(u != 0)
  a = a % y;
  if(a < 0){
    a = y + a
  }
  return a;
}

function pow_mod(a, b, m){
  var r = 1, 
      aa = a;
  while(true){
    if((b & 1) != 0){
      r = mul_mod(r, aa, m);
    }
    b = b >> 1;
    if(b == 0){
      break;
    }
    aa = mul_mod(aa, aa, m);
  }
  return r;
}




function partialPi(a, n, N){
  var vmax = Math.floor (Math.log(2 * N) / Math.log(a));
  var av = 1;
  var s = 0;
  var num = 1;
  var den = 1;
  var v = 0
  var kq = 1
  var kq2 = 1;
  var t;
  
  for (var i = 0; i < vmax; i++){
    av = av * a;
  }

  for (var k = 1; k <= N; k++) {
    t = k;
    if (kq >= a) {
      do {
        t = t / a;
        v--;
      } while ((t % a) == 0);

      kq = 0;
    }
    kq++;
    num = mul_mod(num, t, av);
    t = 2 * k - 1;
    if (kq2 >= a) {
      if (kq2 == a) {
        do {
          t = t / a;
          v++;
        } while ((t % a) == 0);
      }
      kq2 -= a;
    }
    den = mul_mod(den, t, av);
    kq2 += 2;

    if (v > 0) {
      t = inv_mod(den, av);
      t = mul_mod(t, num, av);
      t = mul_mod(t, k, av);

      for (var i = v; i < vmax; i++){
        t = mul_mod(t, a, av);
      }
      s += t;
      if (s >= av){
        s -= av;
      }
    }
  }
  t = pow_mod(10, n - 1, av);
  s = mul_mod(s, t, av);
  
  return (s / av) % 1;
}

//message input: a,n,N
//message output: n,data
onmessage = function(event){
  var parts = event.data.split(',');
  postMessage(parts[1]+','+(partialPi(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]))%1).toString())
}

