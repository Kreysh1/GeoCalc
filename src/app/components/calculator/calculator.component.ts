import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  Latitud:string = "23 15 34.7562";
  Longitud:string = "111 12 32.6231";

  LatitudG:number;
  LatitudM:number;
  LatitudS:number;

  LongitudG:number;
  LongitudM:number;
  LongitudS:number;


  Calcular(Latitud:string,Longitud:string){

    //DATUM
    let a:number = 6378137;
    let b:number = 6356752.3141;
    let c:number = (Math.pow(a, 2)/b);
    let e:number = ((Math.pow(a, 2)-Math.pow(b, 2))/Math.pow(a, 2));                    //e2
    let ee:number = ((Math.pow(a, 2)-Math.pow(b, 2))/Math.pow(b, 2));;                  //e'2
    let f:number = ((a-b)/a);                                                           //Achatamiento del Elipsoide de Referencia
    let n:number = ((a-b)/(a+b));

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

    //CONSTANTES PARA CALCULO
    let Ko:number = 0.9996;                                                             //Factor de Escala
    let No:number = 0;                                                                  //Falso Norte
    let Eo:number = 500000;                                                             //Falso Este
    let Zone:number = 12;                                                               //Zona UTM
    let Lo:number = 183-(6*Zone);                                                       //Longitud Meridiano Central
    let Lp:number = LongitudDecimal;                                                    //Longitud Geodesica del Punto

    //CALCULAR DISTANCIA MERIDIONAL
    let A0:number = 0.994977106051944;
    let A1:number = 0.005001851767455;
    let A2:number = 0.004184862497658;
    let A4:number = 0.000021791815429;
    let A6:number = 0.000000123060249;
    let A8:number = 0.000000000744632;

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

  ngOnInit(): void {
  }
}
