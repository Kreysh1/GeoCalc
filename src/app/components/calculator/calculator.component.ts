import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  //UI DEFINITION
  UI1:boolean;
  UI2:boolean;
  UI3:boolean;
  UI4:boolean;
  UI5:boolean;
  UI6:boolean;
  UI7:boolean;
  UI8:boolean;

  //AREA DE RESULTADOS
  resultados:string = "";

  //CONTROL DEL SELECT (combobox)
  selected:string;
  selectedItem:string;

  onSelected(value:string){

    //TRANSFORMACION # 1
    if(value == "Geo2UTM"){
      this.UI1 = true;
    }
    else{
      this.UI1 = false;
    }
    //TRANSFORMACION # 2
    if(value == "Geo2TME"){
      this.UI2 = true;
    }
    else{
      this.UI2 = false;
    }
    //TRANSFORMACION # 3
    if(value == "TME2Geo"){
      this.UI3 = true;
    }
    else{
      this.UI3 = false;
    }
    //TRANSFORMACION # 4
    if(value == "TME2UTM"){
      this.UI4 = true;
    }
    else{
      this.UI4 = false;
    }
    //TRANSFORMACION # 5
    if(value == "TME2TME"){
      this.UI5 = true;
    }
    else{
      this.UI5 = false;
    }
    //TRANSFORMACION # 6
    if(value == "UTM2Geo"){
      this.UI6 = true;
    }
    else{
      this.UI6 = false;
    }
    //TRANSFORMACION # 7
    if(value == "UTM2TME"){
      this.UI7 = true;
    }
    else{
      this.UI7 = false;
    }
    //TRANSFORMACION # 8
    if(value == "UTMZones"){
      this.UI8 = true;
    }
    else{
      this.UI8 = false;
    }

    // {value: 'Geo2UTM', viewValue: 'Geodésicas a UTM'},
    // {value: 'Geo2TME', viewValue: 'Geodésicas a TME'},
    // {value: 'TME2Geo', viewValue: 'TME a Geodésicas'},
    // {value: 'TME2UTM', viewValue: 'TME a UTM'},
    // {value: 'TME2TME', viewValue: 'TME a TME'},
    // {value: 'UTM2Geo', viewValue: 'UTM a Geodésicas'},
    // {value: 'UTM2TME', viewValue: 'UTM a TME'},
    // {value: 'UTMZones', viewValue: 'Cambio de zonas UTM'},
  } 

  //VARIABLES DE ENTRADA
  Latitud:string = "25 41 20.1207898782595";
  Longitud:string = "108 29 45.970220635063";
  Meridiano:string = "105 49 0";
  MeridianoFinal:string = "105 49 0";
  Norte:number = 2848632.771;
  Este:number = 500335.227;
  Zona:number = 12;
  ZonaFinal:number = 12;

  LatitudG:number;
  LatitudM:number;
  LatitudS:number;

  LongitudG:number;
  LongitudM:number;
  LongitudS:number;

  MeridianoG:number;
  MeridianoM:number;
  MeridianoS:number;

  TME2Geo(Norte:number,Este:number,Meridiano:string){
    //MERIDIANO CENTRAL
    let z = Meridiano.split(" ", 3);

    this.MeridianoG = Number(z[0]);                                                             //Meridiano Central Grados
    this.MeridianoM = Number(z[1]);                                                             //Meridiano Minutos
    this.MeridianoS = Number(z[2]);                                                             //Meridiano Segundos
    let MeridianoDecimal:number = this.MeridianoG+(this.MeridianoM/60)+(this.MeridianoS/3600);  //Meridiano en Decimal

    //DATUM
    let a:number = 6378137;
    let b:number = 6356752.3141;
    let c:number = (Math.pow(a, 2)/b);
    let e:number = ((Math.pow(a, 2)-Math.pow(b, 2))/Math.pow(a, 2));                    //e2
    let ee:number = ((Math.pow(a, 2)-Math.pow(b, 2))/Math.pow(b, 2));;                  //e'2
    let f:number = ((a-b)/a);                                                           //Achatamiento del Elipsoide de Referencia
    let n:number = ((a-b)/(a+b));

    //CALCULAR DISTANCIA MERIDIONAL (Se calcula en base al DATUM)
    let A0:number = 0.994977106051944;
    let A1:number = 0.005001851767455;
    let A2:number = 0.004184862497658;
    let A4:number = 0.000021791815429;
    let A6:number = 0.000000123060249;
    let A8:number = 0.000000000744632;

    //CONSTANTES PARA CALCULO
    let Ko:number = 1;                                                             //Factor de Escala
    let No:number = 0;                                                                  //Falso Norte
    let Eo:number = 500000;                                                             //Falso Este
    let Lo:number = MeridianoDecimal;                                                   ////Longitud Meridiano Central (DECIMAL)

    //VARIABLES DE LA INVERSA
    let E:number = (Este-Eo)/Ko;
    let N:number = (Norte-No)/Ko;

    let Oo:number = (b)*((N-No)/(A0*Math.pow(a,2)));
    let So:number = (A0*(Math.pow(a,2)/b)*Oo)-(((A1*(Math.pow(a,2)/b)*Math.sin(Oo)*Math.cos(Oo)))*(1+(A2*Math.pow(Math.sin(Oo),2))+(A4*Math.pow(Math.sin(Oo),4))+(A6*Math.pow(Math.sin(Oo),6))+(A8*Math.pow(Math.sin(Oo),8))));
    let O1:number = Oo+(((b)*((N-No-So)))/(A0*Math.pow(a,2)));
    let S1:number = (A0*(Math.pow(a,2)/b)*O1)-(((A1*(Math.pow(a,2)/b)*Math.sin(O1)*Math.cos(O1)))*(1+(A2*Math.pow(Math.sin(O1),2))+(A4*Math.pow(Math.sin(O1),4))+(A6*Math.pow(Math.sin(O1),6))+(A8*Math.pow(Math.sin(O1),8))));
    let convergencia1:number = N-S1;
    let O2:number = O1+(((b)*((N-No-S1)))/(A0*Math.pow(a,2)));
    let S2:number = (A0*(Math.pow(a,2)/b)*O2)-(((A1*(Math.pow(a,2)/b)*Math.sin(O2)*Math.cos(O2)))*(1+(A2*Math.pow(Math.sin(O2),2))+(A4*Math.pow(Math.sin(O2),4))+(A6*Math.pow(Math.sin(O2),6))+(A8*Math.pow(Math.sin(O2),8))));
    let convergencia2:number = N-S2;
    let O3:number = O2+(((b)*((N-No-S2)))/(A0*Math.pow(a,2)));
    let S3:number = (A0*(Math.pow(a,2)/b)*O3)-(((A1*(Math.pow(a,2)/b)*Math.sin(O3)*Math.cos(O3)))*(1+(A2*Math.pow(Math.sin(O3),2))+(A4*Math.pow(Math.sin(O3),4))+(A6*Math.pow(Math.sin(O3),6))+(A8*Math.pow(Math.sin(O3),8))));
    let convergencia3:number = N-S3;

    let Ob:number = O3;
    let t2b:number = Math.pow((Math.tan(Ob)),2);
    let n2b:number = e*Math.pow((Math.cos(Ob)),2);
    let Nb:number = (a)/(Math.sqrt((1-(e*Math.pow((Math.sin(Ob)),2)))));
    let Mb:number = (a*(1-e))/(Math.pow((1-(e*Math.pow((Math.sin(Ob)),2))),3/2));
    let tb:number = Math.sqrt(t2b);

    let Latitud:number[] = [];
    let Longitud:number[] = [];

    Latitud[0] = Ob;
    Latitud[1] = (Math.pow(E,2)/(Mb*Nb))*(tb/2);
    Latitud[2] = (Math.pow(E,4)/(Mb*Math.pow(Nb,3)))*(tb/24)*(5+(3*t2b)+n2b-(4*Math.pow(n2b,4))-(9*t2b*n2b));
    Latitud[3] = (Math.pow(E,6)/(Mb*Math.pow(Nb,5)))*(tb/720)*(61+(90*t2b)+(46*n2b)+(45*Math.pow(n2b,2))-(252*t2b*n2b)-(3*Math.pow(n2b,2))+(100*Math.pow(n2b,3))-(66*t2b*Math.pow(n2b,2))-(90*n2b*Math.pow(t2b,2))+(88*Math.pow(n2b,4))+(225*Math.pow(t2b,2)*Math.pow(n2b,2))+(84*t2b*Math.pow(n2b,3))-(192*t2b*Math.pow(n2b,4)));
    Latitud[4] = (Math.pow(E,8)/(Mb*Math.pow(Nb,7)))*(tb/40320)*(1385+(3633*t2b)+(4095*Math.pow(t2b,2))+(1575*Math.pow(t2b,3)));
    Latitud[5] = Latitud[0]-Latitud[1]+Latitud[2]-Latitud[3]+Latitud[4];
    Latitud[6] = Latitud[5]/(Math.PI/180);
    
    Longitud[0] = (E)/(Math.cos(Ob)*Nb);
    Longitud[1] = (1/(6*Math.cos(Ob)))*(Math.pow((E/Nb),3))*((1+(2*t2b)+n2b));
    Longitud[2] = (1/(120*Math.cos(Ob)))*(Math.pow((E/Nb),5))*(5+(6*n2b)+(28*t2b)-(3*Math.pow(n2b,2))+(8*t2b*n2b)+(24*Math.pow(t2b,2))-(4*Math.pow(n2b,3))+(4*t2b*Math.pow(n2b,2))+(24*t2b*Math.pow(n2b,3)));
    Longitud[3] = (1/(5040*Math.cos(Ob)))*(Math.pow((E/Nb),7))*(61+(662*t2b)+(1320*Math.pow(t2b,2))+(720*Math.pow(t2b,3))-(234*t2b*Math.pow(n2b,2))+(336*n2b*Math.pow(t2b,2))+(188*n2b)-(772*t2b*Math.pow(n2b,3))-(192*Math.pow(t2b,2)*Math.pow(n2b,2))+(88*Math.pow(n2b,5))-(2392*t2b*Math.pow(n2b,4))+(408*Math.pow(t2b,2)*Math.pow(n2b,3))+(1536*Math.pow(t2b,2)*Math.pow(n2b,4))-(1632*t2b*Math.pow(n2b,5))+(1920*Math.pow(t2b,2)*Math.pow(n2b,5)));
    Longitud[4] = Longitud[0]-Longitud[1]+Longitud[2]-Longitud[3];
    Longitud[5] = Longitud[4]/(Math.PI/180);
    
    let LatitudY:number = Latitud[6];
    let LongitudX:number = Lo-Longitud[5];

    let LatitudG = Math.trunc(LatitudY);
    let LatitudM = Math.trunc((60*(LatitudY-LatitudG)));
    let LatitudS = (LatitudY-LatitudG-LatitudM/60)*3600;

    let LongitudG = Math.trunc(LongitudX);
    let LongitudM = Math.trunc((60*(LongitudX-LongitudG)));
    let LongitudS = (LongitudX-LongitudG-LongitudM/60)*3600;

    // console.log(`Latitud => |  G:${this.LatitudG} M:${this.LatitudM} S:${this.LatitudS} | Decimal:${LatitudDecimal} Radianes:${LatitudRadians}`);
    // console.log(`Longitud => |  G:${this.LongitudG} M:${this.LongitudM} S:${this.LongitudS} | Decimal:${LongitudDecimal} Radianes:${LongitudRadians}`);

    console.log(
      `DATUM => |  
      a:${a} b:${b} c:${c}
      e2:${e} e'2:${ee}
      f:${f} n:${n}`
    );

    // console.log(
    //   `VARIABLES => |  
    //   N:${N} L:${L}
    //   tt:${tt} nn:${nn}`
    // );

    this.resultados += `Conversión de Coordenadas UTM a Geodésicas (YYYY-MM-DD HH:MM:SS)\nLatitud: ${LatitudG} ${LatitudM} ${LatitudS}\nLongitud: ${LongitudG} ${LongitudM} ${LongitudS}\n`;

    console.log(`LATITUD:${LatitudY}  LONGITUD:${LongitudX}`);
  }

  TME2UTM(){

  }

  TME2TME(){

  }

  UTM2Geo(Norte:number,Este:number,Zona:number){
    //DATUM
    let a:number = 6378137;
    let b:number = 6356752.3141;
    let c:number = (Math.pow(a, 2)/b);
    let e:number = ((Math.pow(a, 2)-Math.pow(b, 2))/Math.pow(a, 2));                    //e2
    let ee:number = ((Math.pow(a, 2)-Math.pow(b, 2))/Math.pow(b, 2));;                  //e'2
    let f:number = ((a-b)/a);                                                           //Achatamiento del Elipsoide de Referencia
    let n:number = ((a-b)/(a+b));

    //CALCULAR DISTANCIA MERIDIONAL (Se calcula en base al DATUM)
    let A0:number = 0.994977106051944;
    let A1:number = 0.005001851767455;
    let A2:number = 0.004184862497658;
    let A4:number = 0.000021791815429;
    let A6:number = 0.000000123060249;
    let A8:number = 0.000000000744632;

    //CONSTANTES PARA CALCULO
    let Ko:number = 0.9996;                                                             //Factor de Escala
    let No:number = 0;                                                                  //Falso Norte
    let Eo:number = 500000;                                                             //Falso Este
    let Lo:number = 183-(6*Zona);                                                       //Longitud Meridiano Central

    //VARIABLES DE LA INVERSA
    let E:number = (Este-Eo)/Ko;
    let N:number = (Norte-No)/Ko;

    let Oo:number = (b)*((N-No)/(A0*Math.pow(a,2)));
    let So:number = (A0*(Math.pow(a,2)/b)*Oo)-(((A1*(Math.pow(a,2)/b)*Math.sin(Oo)*Math.cos(Oo)))*(1+(A2*Math.pow(Math.sin(Oo),2))+(A4*Math.pow(Math.sin(Oo),4))+(A6*Math.pow(Math.sin(Oo),6))+(A8*Math.pow(Math.sin(Oo),8))));
    let O1:number = Oo+(((b)*((N-No-So)))/(A0*Math.pow(a,2)));
    let S1:number = (A0*(Math.pow(a,2)/b)*O1)-(((A1*(Math.pow(a,2)/b)*Math.sin(O1)*Math.cos(O1)))*(1+(A2*Math.pow(Math.sin(O1),2))+(A4*Math.pow(Math.sin(O1),4))+(A6*Math.pow(Math.sin(O1),6))+(A8*Math.pow(Math.sin(O1),8))));
    let convergencia1:number = N-S1;
    let O2:number = O1+(((b)*((N-No-S1)))/(A0*Math.pow(a,2)));
    let S2:number = (A0*(Math.pow(a,2)/b)*O2)-(((A1*(Math.pow(a,2)/b)*Math.sin(O2)*Math.cos(O2)))*(1+(A2*Math.pow(Math.sin(O2),2))+(A4*Math.pow(Math.sin(O2),4))+(A6*Math.pow(Math.sin(O2),6))+(A8*Math.pow(Math.sin(O2),8))));
    let convergencia2:number = N-S2;
    let O3:number = O2+(((b)*((N-No-S2)))/(A0*Math.pow(a,2)));
    let S3:number = (A0*(Math.pow(a,2)/b)*O3)-(((A1*(Math.pow(a,2)/b)*Math.sin(O3)*Math.cos(O3)))*(1+(A2*Math.pow(Math.sin(O3),2))+(A4*Math.pow(Math.sin(O3),4))+(A6*Math.pow(Math.sin(O3),6))+(A8*Math.pow(Math.sin(O3),8))));
    let convergencia3:number = N-S3;

    let Ob:number = O3;
    let t2b:number = Math.pow((Math.tan(Ob)),2);
    let n2b:number = e*Math.pow((Math.cos(Ob)),2);
    let Nb:number = (a)/(Math.sqrt((1-(e*Math.pow((Math.sin(Ob)),2)))));
    let Mb:number = (a*(1-e))/(Math.pow((1-(e*Math.pow((Math.sin(Ob)),2))),3/2));
    let tb:number = Math.sqrt(t2b);

    let Latitud:number[] = [];
    let Longitud:number[] = [];

    Latitud[0] = Ob;
    Latitud[1] = (Math.pow(E,2)/(Mb*Nb))*(tb/2);
    Latitud[2] = (Math.pow(E,4)/(Mb*Math.pow(Nb,3)))*(tb/24)*(5+(3*t2b)+n2b-(4*Math.pow(n2b,4))-(9*t2b*n2b));
    Latitud[3] = (Math.pow(E,6)/(Mb*Math.pow(Nb,5)))*(tb/720)*(61+(90*t2b)+(46*n2b)+(45*Math.pow(n2b,2))-(252*t2b*n2b)-(3*Math.pow(n2b,2))+(100*Math.pow(n2b,3))-(66*t2b*Math.pow(n2b,2))-(90*n2b*Math.pow(t2b,2))+(88*Math.pow(n2b,4))+(225*Math.pow(t2b,2)*Math.pow(n2b,2))+(84*t2b*Math.pow(n2b,3))-(192*t2b*Math.pow(n2b,4)));
    Latitud[4] = (Math.pow(E,8)/(Mb*Math.pow(Nb,7)))*(tb/40320)*(1385+(3633*t2b)+(4095*Math.pow(t2b,2))+(1575*Math.pow(t2b,3)));
    Latitud[5] = Latitud[0]-Latitud[1]+Latitud[2]-Latitud[3]+Latitud[4];
    Latitud[6] = Latitud[5]/(Math.PI/180);
    
    Longitud[0] = (E)/(Math.cos(Ob)*Nb);
    Longitud[1] = (1/(6*Math.cos(Ob)))*(Math.pow((E/Nb),3))*((1+(2*t2b)+n2b));
    Longitud[2] = (1/(120*Math.cos(Ob)))*(Math.pow((E/Nb),5))*(5+(6*n2b)+(28*t2b)-(3*Math.pow(n2b,2))+(8*t2b*n2b)+(24*Math.pow(t2b,2))-(4*Math.pow(n2b,3))+(4*t2b*Math.pow(n2b,2))+(24*t2b*Math.pow(n2b,3)));
    Longitud[3] = (1/(5040*Math.cos(Ob)))*(Math.pow((E/Nb),7))*(61+(662*t2b)+(1320*Math.pow(t2b,2))+(720*Math.pow(t2b,3))-(234*t2b*Math.pow(n2b,2))+(336*n2b*Math.pow(t2b,2))+(188*n2b)-(772*t2b*Math.pow(n2b,3))-(192*Math.pow(t2b,2)*Math.pow(n2b,2))+(88*Math.pow(n2b,5))-(2392*t2b*Math.pow(n2b,4))+(408*Math.pow(t2b,2)*Math.pow(n2b,3))+(1536*Math.pow(t2b,2)*Math.pow(n2b,4))-(1632*t2b*Math.pow(n2b,5))+(1920*Math.pow(t2b,2)*Math.pow(n2b,5)));
    Longitud[4] = Longitud[0]-Longitud[1]+Longitud[2]-Longitud[3];
    Longitud[5] = Longitud[4]/(Math.PI/180);
    
    let LatitudY:number = Latitud[6];
    let LongitudX:number = Lo-Longitud[5];

    let LatitudG = Math.trunc(LatitudY);
    let LatitudM = Math.trunc((60*(LatitudY-LatitudG)));
    let LatitudS = (LatitudY-LatitudG-LatitudM/60)*3600;

    let LongitudG = Math.trunc(LongitudX);
    let LongitudM = Math.trunc((60*(LongitudX-LongitudG)));
    let LongitudS = (LongitudX-LongitudG-LongitudM/60)*3600;

    // console.log(`Latitud => |  G:${this.LatitudG} M:${this.LatitudM} S:${this.LatitudS} | Decimal:${LatitudDecimal} Radianes:${LatitudRadians}`);
    // console.log(`Longitud => |  G:${this.LongitudG} M:${this.LongitudM} S:${this.LongitudS} | Decimal:${LongitudDecimal} Radianes:${LongitudRadians}`);

    console.log(
      `DATUM => |  
      a:${a} b:${b} c:${c}
      e2:${e} e'2:${ee}
      f:${f} n:${n}`
    );

    // console.log(
    //   `VARIABLES => |  
    //   N:${N} L:${L}
    //   tt:${tt} nn:${nn}`
    // );

    this.resultados += `Conversión de Coordenadas UTM a Geodésicas (YYYY-MM-DD HH:MM:SS)\nLatitud: ${LatitudG} ${LatitudM} ${LatitudS}\nLongitud: ${LongitudG} ${LongitudM} ${LongitudS}\n`;

    console.log(`LATITUD:${LatitudY}  LONGITUD:${LongitudX}`);

  }

  UTM2TME(){

  }


  Geo2TME(Latitud:string,Longitud:string,Meridiano:string){
    //DATUM
    let a:number = 6378137;
    let b:number = 6356752.3141;
    let c:number = (Math.pow(a, 2)/b);
    let e:number = ((Math.pow(a, 2)-Math.pow(b, 2))/Math.pow(a, 2));                    //e2
    let ee:number = ((Math.pow(a, 2)-Math.pow(b, 2))/Math.pow(b, 2));;                  //e'2
    let f:number = ((a-b)/a);                                                           //Achatamiento del Elipsoide de Referencia
    let n:number = ((a-b)/(a+b));

    //CALCULAR DISTANCIA MERIDIONAL (Se calcula en base al DATUM)
    let A0:number = 0.994977106051944;
    let A1:number = 0.005001851767455;
    let A2:number = 0.004184862497658;
    let A4:number = 0.000021791815429;
    let A6:number = 0.000000123060249;
    let A8:number = 0.000000000744632;

    //COORDENADAS
    let x = Latitud.split(" ", 3);
    let y = Longitud.split(" ", 3);
    let z = Meridiano.split(" ", 3);

    this.LatitudG = Number(x[0]);                                                       //Latitud Grados
    this.LatitudM = Number(x[1]);                                                       //Latitud Minutos
    this.LatitudS = Number(x[2]);                                                       //Latitud Segundos
    let LatitudDecimal = (this.LatitudG+(this.LatitudM/60)+(this.LatitudS/3600));       //Latitud en Decimal
    let LatitudRadians = (LatitudDecimal * (Math.PI/180));                              //Latitud en Radianes

    this.LongitudG = Number(y[0]);                                                      //Longitud Grados
    this.LongitudM = Number(y[1]);                                                      //Longitud Minutos
    this.LongitudS = Number(y[2]);                                                      //Longitud Segundos
    let LongitudDecimal = (this.LongitudG+(this.LongitudM/60)+(this.LongitudS/3600));   //Longitud en Decimal
    let LongitudRadians = (LongitudDecimal * (Math.PI/180));                            //Longitud en Radianes

    this.MeridianoG = Number(z[0]);                                                       //Meridiano Central Grados
    this.MeridianoM = Number(z[1]);                                                       //Meridiano Minutos
    this.MeridianoS = Number(z[2]);                                                       //Meridiano Segundos

    //CONSTANTES PARA CALCULO
    let Ko:number = 1;                                                             //Factor de Escala
    let No:number = 0;                                                                  //Falso Norte
    let Eo:number = 500000;                                                             //Falso Este
    let Zone:number = 12;                                                               //Zona UTM
    let Lo:number = (this.MeridianoG+(this.MeridianoM/60)+(this.MeridianoS/3600));      //Longitud Meridiano Central
    let Lp:number = LongitudDecimal;                                                    //Longitud Geodesica del Punto

    //VARIABLES DEL CALCULO
    let N:number = (a/(Math.sqrt(1-e*Math.pow(Math.sin(LatitudRadians),2))));
    let L:number = ((Lo-Lp) * (Math.PI/180));                                           //Diferencia de longitudes en Radianes
    let tt:number = (Math.pow((Math.tan(LatitudRadians)),2));
    let nn:number = (ee*Math.pow((Math.cos(LatitudRadians)),2));
    let dist:number = (A0*(Math.pow(a,2)/b)*LatitudRadians)-(((A1*(Math.pow(a,2)/b)*Math.sin(LatitudRadians)*Math.cos(LatitudRadians)))*(1+(A2*Math.pow(Math.sin(LatitudRadians),2))+(A4*Math.pow(Math.sin(LatitudRadians),4))+(A6*Math.pow(Math.sin(LatitudRadians),6))+(A8*Math.pow(Math.sin(LatitudRadians),8))));
    let Norte:number[] = [];
    let Este:number[] = [];

    Norte[0] = (N*Math.pow(L,2)*Math.sin(LatitudRadians)*Math.cos(LatitudRadians))/2;
    Norte[1] = ((N*Math.pow(L,4)*Math.sin(LatitudRadians)*Math.pow(Math.cos(LatitudRadians),3))/24)*(5-tt+(9*nn)+(4*Math.pow(nn,2)));
    Norte[2] = ((N*Math.pow(L,6)*Math.sin(LatitudRadians)*Math.pow(Math.cos(LatitudRadians),5))/720)*(61-(58*tt)+(Math.pow(tt,2))+(270*nn)-(330*tt*nn)+(445*Math.pow(nn,2))-(680*tt*Math.pow(nn,2))+(324*Math.pow(nn,3))-(600*tt*Math.pow(nn,3))+(88*Math.pow(nn,4))-(192*tt*Math.pow(nn,4)));
    Norte[3] = ((N*Math.pow(L,8)*Math.sin(LatitudRadians)*Math.pow(Math.cos(LatitudRadians),7))/40320)*(1385-(3111*tt)+(543*Math.pow(tt,2))-(Math.pow(tt,3))+(10899*nn)-(32802*tt*nn)+(9219*Math.pow(tt,2)*nn)+(34419*Math.pow(nn,2))-(129087*tt*Math.pow(nn,2))+(49644*Math.pow(tt,2)*Math.pow(nn,2))+(56385*Math.pow(nn,3))-(252084*tt*Math.pow(nn,3))+(121800*Math.pow(tt,2)*Math.pow(nn,3))+(50856*Math.pow(nn,4))-(263088*tt*Math.pow(nn,4))+(151872*Math.pow(tt,2)*Math.pow(nn,4))+(24048*Math.pow(nn,5))-(140928*tt*Math.pow(nn,5))+(94080*Math.pow(tt,2)*Math.pow(nn,5))+(4672*Math.pow(nn,6))-(30528*tt*Math.pow(nn,6))+(23040*Math.pow(tt,2)*Math.pow(nn,6)));
    Norte[4] = Norte[0]+Norte[1]+Norte[2]+Norte[3];

    Este[0] = (N*L*Math.cos(LatitudRadians));
    Este[1] = ((N*Math.pow(L,3)*Math.pow(Math.cos(LatitudRadians),3))/6) * (1-tt+nn);
    Este[2] = ((N*Math.pow(L,5)*Math.pow(Math.cos(LatitudRadians),5))/120) * (5-(18*tt)+(Math.pow(tt,2))+(14*nn)-(58*tt*nn)+(13*Math.pow(nn,2))-(64*tt*Math.pow(nn,2))+(4*Math.pow(nn,3))-(24*tt*Math.pow(nn,3)));
    Este[3] = ((N*Math.pow(L,7)*Math.pow(Math.cos(LatitudRadians),7))/5040)*(61-(479*tt)+(179*Math.pow(tt,2))-(Math.pow(tt,3)));
    Este[4] = Este[0]+Este[1]+Este[2]+Este[3];


    let TME_Norte:number = (Norte[4]+dist)*Ko+No;
    let TME_Este:number = Este[4]*Ko+Eo;

    console.log(`Latitud => |  G:${this.LatitudG} M:${this.LatitudM} S:${this.LatitudS} | Decimal:${LatitudDecimal} Radianes:${LatitudRadians}`);
    console.log(`Longitud => |  G:${this.LongitudG} M:${this.LongitudM} S:${this.LongitudS} | Decimal:${LongitudDecimal} Radianes:${LongitudRadians}`);

    console.log(
      `DATUM => |  
      a:${a} b:${b} c:${c}
      e2:${e} e'2:${ee}
      f:${f} n:${n}`
    );

    console.log(
      `VARIABLES => |  
      N:${N} L:${L}
      tt:${tt} nn:${nn}`
    );

    console.log(`NORTE:${TME_Norte}  ESTE:${TME_Este}`);
  }

  Geo2UTM(Latitud:string,Longitud:string){

    //DATUM
    let a:number = 6378137;
    let b:number = 6356752.3141;
    let c:number = (Math.pow(a, 2)/b);
    let e:number = ((Math.pow(a, 2)-Math.pow(b, 2))/Math.pow(a, 2));                    //e2
    let ee:number = ((Math.pow(a, 2)-Math.pow(b, 2))/Math.pow(b, 2));;                  //e'2
    let f:number = ((a-b)/a);                                                           //Achatamiento del Elipsoide de Referencia
    let n:number = ((a-b)/(a+b));

    //CALCULAR DISTANCIA MERIDIONAL (Se calcula en base al DATUM)
    let A0:number = 0.994977106051944;
    let A1:number = 0.005001851767455;
    let A2:number = 0.004184862497658;
    let A4:number = 0.000021791815429;
    let A6:number = 0.000000123060249;
    let A8:number = 0.000000000744632;

    //COORDENADAS
    let x = Latitud.split(" ", 3);
    let y = Longitud.split(" ", 3);

    this.LatitudG = Number(x[0]);                                                       //Latitud Grados
    this.LatitudM = Number(x[1]);                                                       //Latitud Minutos
    this.LatitudS = Number(x[2]);                                                       //Latitud Segundos
    let LatitudDecimal = (this.LatitudG+(this.LatitudM/60)+(this.LatitudS/3600));       //Latitud en Decimal
    let LatitudRadians = (LatitudDecimal * (Math.PI/180));                              //Latitud en Radianes

    this.LongitudG = Number(y[0]);                                                      //Longitud Grados
    this.LongitudM = Number(y[1]);                                                      //Longitud Minutos
    this.LongitudS = Number(y[2]);                                                      //Longitud Segundos
    let LongitudDecimal = (this.LongitudG+(this.LongitudM/60)+(this.LongitudS/3600));   //Longitud en Decimal
    let LongitudRadians = (LongitudDecimal * (Math.PI/180));                            //Longitud en Radianes

    //CONSMath.tanTES PARA CALCULO
    let Ko:number = 0.9996;                                                             //Factor de Escala
    let No:number = 0;                                                                  //Falso Norte
    let Eo:number = 500000;                                                             //Falso Este
    let Zone:number = 12;                                                               //Zona UTM
    let Lo:number = 183-(6*Zone);                                                       //Longitud Meridiano Central
    let Lp:number = LongitudDecimal;                                                    //Longitud Geodesica del Punto

    //VARIABLES DEL CALCULO
    let N:number = (a/(Math.sqrt(1-e*Math.pow(Math.sin(LatitudRadians),2))));
    let L:number = ((Lo-Lp) * (Math.PI/180));                                           //Diferencia de longitudes en Radianes
    let tt:number = (Math.pow((Math.tan(LatitudRadians)),2));
    let nn:number = (ee*Math.pow((Math.cos(LatitudRadians)),2));
    let dist:number = (A0*(Math.pow(a,2)/b)*LatitudRadians)-(((A1*(Math.pow(a,2)/b)*Math.sin(LatitudRadians)*Math.cos(LatitudRadians)))*(1+(A2*Math.pow(Math.sin(LatitudRadians),2))+(A4*Math.pow(Math.sin(LatitudRadians),4))+(A6*Math.pow(Math.sin(LatitudRadians),6))+(A8*Math.pow(Math.sin(LatitudRadians),8))));
    let Norte:number[] = [];
    let Este:number[] = [];
    
    Norte[0] = (N*Math.pow(L,2)*Math.sin(LatitudRadians)*Math.cos(LatitudRadians))/2;
    Norte[1] = ((N*Math.pow(L,4)*Math.sin(LatitudRadians)*Math.pow(Math.cos(LatitudRadians),3))/24)*(5-tt+(9*nn)+(4*Math.pow(nn,2)));
    Norte[2] = ((N*Math.pow(L,6)*Math.sin(LatitudRadians)*Math.pow(Math.cos(LatitudRadians),5))/720)*(61-(58*tt)+(Math.pow(tt,2))+(270*nn)-(330*tt*nn)+(445*Math.pow(nn,2))-(680*tt*Math.pow(nn,2))+(324*Math.pow(nn,3))-(600*tt*Math.pow(nn,3))+(88*Math.pow(nn,4))-(192*tt*Math.pow(nn,4)));
    Norte[3] = ((N*Math.pow(L,8)*Math.sin(LatitudRadians)*Math.pow(Math.cos(LatitudRadians),7))/40320)*(1385-(3111*tt)+(543*Math.pow(tt,2))-(Math.pow(tt,3))+(10899*nn)-(32802*tt*nn)+(9219*Math.pow(tt,2)*nn)+(34419*Math.pow(nn,2))-(129087*tt*Math.pow(nn,2))+(49644*Math.pow(tt,2)*Math.pow(nn,2))+(56385*Math.pow(nn,3))-(252084*tt*Math.pow(nn,3))+(121800*Math.pow(tt,2)*Math.pow(nn,3))+(50856*Math.pow(nn,4))-(263088*tt*Math.pow(nn,4))+(151872*Math.pow(tt,2)*Math.pow(nn,4))+(24048*Math.pow(nn,5))-(140928*tt*Math.pow(nn,5))+(94080*Math.pow(tt,2)*Math.pow(nn,5))+(4672*Math.pow(nn,6))-(30528*tt*Math.pow(nn,6))+(23040*Math.pow(tt,2)*Math.pow(nn,6)));
    Norte[4] = Norte[0]+Norte[1]+Norte[2]+Norte[3];

    Este[0] = (N*L*Math.cos(LatitudRadians));
    Este[1] = ((N*Math.pow(L,3)*Math.pow(Math.cos(LatitudRadians),3))/6) * (1-tt+nn);
    Este[2] = ((N*Math.pow(L,5)*Math.pow(Math.cos(LatitudRadians),5))/120) * (5-(18*tt)+(Math.pow(tt,2))+(14*nn)-(58*tt*nn)+(13*Math.pow(nn,2))-(64*tt*Math.pow(nn,2))+(4*Math.pow(nn,3))-(24*tt*Math.pow(nn,3)));
    Este[3] = ((N*Math.pow(L,7)*Math.pow(Math.cos(LatitudRadians),7))/5040)*(61-(479*tt)+(179*Math.pow(tt,2))-(Math.pow(tt,3)));
    Este[4] = Este[0]+Este[1]+Este[2]+Este[3];


    let UTM_Norte:number = (Norte[4]+dist)*Ko+No;
    let UTM_Este:number = Este[4]*Ko+Eo;

    this.resultados += `Conversión de Coordenadas Geodésicas a UTM (YYYY-MM-DD HH:MM:SS)\nNorte: ${UTM_Norte}\nEste: ${UTM_Este}\nZona: ${Zone}\n`;

    console.log(`Latitud => |  G:${this.LatitudG} M:${this.LatitudM} S:${this.LatitudS} | Decimal:${LatitudDecimal} Radianes:${LatitudRadians}`);
    console.log(`Longitud => |  G:${this.LongitudG} M:${this.LongitudM} S:${this.LongitudS} | Decimal:${LongitudDecimal} Radianes:${LongitudRadians}`);

    console.log(
      `DATUM => |  
      a:${a} b:${b} c:${c}
      e2:${e} e'2:${ee}
      f:${f} n:${n}`
    );

    console.log(
      `VARIABLES => |  
      N:${N} L:${L}
      tt:${tt} nn:${nn}`
    );

    console.log(`NORTE:${UTM_Norte}  ESTE:${UTM_Este}`);
  }

  Zone2Zone(){

  }

  ngOnInit(): void {
    this.selected = "Geo2UTM";
  }

  conversiones = [
    {value: 'Geo2UTM', viewValue: 'Geodésicas a UTM'},
    {value: 'Geo2TME', viewValue: 'Geodésicas a TME'},
    {value: 'TME2Geo', viewValue: 'TME a Geodésicas'},
    {value: 'TME2UTM', viewValue: 'TME a UTM'},
    {value: 'TME2TME', viewValue: 'TME a TME'},
    {value: 'UTM2Geo', viewValue: 'UTM a Geodésicas'},
    {value: 'UTM2TME', viewValue: 'UTM a TME'},
    {value: 'UTMZones', viewValue: 'Cambio de zonas UTM'},
  ];


}

