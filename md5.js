/* MD5 (hexMD5) untuk login CHAP hotspot MikroTik */
function hexMD5(s){
  function rl(n,c){return (n<<c)|(n>>>(32-c));}
  function add(x,y){return (x+y)|0;}
  var K=[],i;
  for(i=0;i<64;i++)K[i]=Math.floor(Math.abs(Math.sin(i+1))*4294967296)|0;
  var S=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,
         5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,
         4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,
         6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
  /* string biner (karakter 0-255) -> byte */
  var b=[];
  for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);
  var len=b.length;
  b.push(128);
  while(b.length%64!==56)b.push(0);
  var bits=len*8;
  for(i=0;i<4;i++)b.push((bits>>>(8*i))&255);
  for(i=0;i<4;i++)b.push(0);
  var a0=0x67452301,b0=0xefcdab89|0,c0=0x98badcfe|0,d0=0x10325476;
  for(var o=0;o<b.length;o+=64){
    var M=[];
    for(i=0;i<16;i++)M[i]=b[o+i*4]|(b[o+i*4+1]<<8)|(b[o+i*4+2]<<16)|(b[o+i*4+3]<<24);
    var A=a0,B=b0,C=c0,D=d0,F,g;
    for(i=0;i<64;i++){
      if(i<16){F=(B&C)|(~B&D);g=i;}
      else if(i<32){F=(D&B)|(~D&C);g=(5*i+1)%16;}
      else if(i<48){F=B^C^D;g=(3*i+5)%16;}
      else{F=C^(B|~D);g=(7*i)%16;}
      F=add(add(F,A),add(K[i],M[g]));
      A=D;D=C;C=B;B=add(B,rl(F,S[i]));
    }
    a0=add(a0,A);b0=add(b0,B);c0=add(c0,C);d0=add(d0,D);
  }
  var out="",w=[a0,b0,c0,d0],j;
  for(i=0;i<4;i++)for(j=0;j<4;j++){
    var v=(w[i]>>>(8*j))&255;
    out+=(v<16?"0":"")+v.toString(16);
  }
  return out;
}
