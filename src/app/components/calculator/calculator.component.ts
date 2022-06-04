import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }
  //<============================================================ DATUM ==================================================================>
  DatumControl:string = "ITRF92";

  onDatum(value:string){
    this.DatumControl = value;
  }

  a:number;
  b:number;
  c:number;
  e:number;
  ee:number;
  f:number;
  n:number;
  A0:number;
  A1:number;
  A2:number;
  A4:number;
  A6:number;
  A8:number;

  //<============================================ CONTROL DEL SELECT (combobox) =========================================================>
  selected:string;
  selectedItem:string;

  onSelected(value:string){

    //TRANSFORMACION # 1
    if(value == "Geo2UTM"){
      this.UI1 = true;
      this.notDatum = false;
    }
    else{
      this.UI1 = false;
    }
    //TRANSFORMACION # 2
    if(value == "Geo2TME"){
      this.UI2 = true;
      this.notDatum = false;
    }
    else{
      this.UI2 = false;
    }
    //TRANSFORMACION # 3
    if(value == "TME2Geo"){
      this.UI3 = true;
      this.notDatum = false;
    }
    else{
      this.UI3 = false;
    }
    //TRANSFORMACION # 4
    if(value == "TME2UTM"){
      this.UI4 = true;
      this.notDatum = false;
    }
    else{
      this.UI4 = false;
    }
    //TRANSFORMACION # 5
    if(value == "TME2TME"){
      this.UI5 = true;
      this.notDatum = false;
    }
    else{
      this.UI5 = false;
    }
    //TRANSFORMACION # 6
    if(value == "UTM2Geo"){
      this.UI6 = true;
      this.notDatum = false;
    }
    else{
      this.UI6 = false;
    }
    //TRANSFORMACION # 7
    if(value == "UTM2TME"){
      this.UI7 = true;
      this.notDatum = false;
    }
    else{
      this.UI7 = false;
    }
    //TRANSFORMACION # 8
    if(value == "UTMZones"){
      this.UI8 = true;
      this.notDatum = false;
    }
    else{
      this.UI8 = false;
    }
    //TRANSFORMACION # 9
    if(value == "CompGeo"){
      this.UI9 = true;
      this.notDatum = true;
    }
    else{
      this.UI9 = false;
    }
    //TRANSFORMACION # 10
    if(value == "CompUTM"){
      this.UI10 = true;
      this.notDatum = true;
    }
    else{
      this.UI10 = false;
    }
    //TRANSFORMACION # 11
    if(value == "CompTME"){
      this.UI11 = true;
      this.notDatum = true;
    }
    else{
      this.UI11 = false;
    }
  } 

  //<============================= UI DEFINITION (Controla el cambio de interfaces mostradas) ===========================================>
  UI1:boolean;
  UI2:boolean;
  UI3:boolean;
  UI4:boolean;
  UI5:boolean;
  UI6:boolean;
  UI7:boolean;
  UI8:boolean;
  UI9:boolean;
  UI10:boolean;
  UI11:boolean;
  notDatum:boolean;

  //<=============================================== AREA DE RESULTADOS =================================================================>
  resultados:string = "";           //Es el texto que se muestra en el textarea

  //<============================= VARIABLES DE ENTRADA (Obtenidas desde el formulario) =================================================>
  Latitud:string;
  Longitud:string;
  Meridiano:string;
  MeridianoFinal:string;
  Norte:number;
  Este:number;
  Zona:number;
  ZonaFinal:number;

  // VARIABLES AUXILIARES
  Latitud_Aux:string;
  Longitud_Aux:string;
  Meridiano_Aux:string;
  MeridianoFinal_Aux:string;
  Norte_Aux:number;
  Este_Aux:number;
  Zona_Aux:number;
  ZonaFinal_Aux:number;

  ///// FUNCIONES REPETIDAS
  public TME2Geo_Rep(Norte:number,Este:number,Meridiano:string){
    //MERIDIANO CENTRAL
    let z = Meridiano.split(" ", 3);

    let MeridianoG = Number(z[0]);                                                             //Meridiano Central Grados
    let MeridianoM = Number(z[1]);                                                             //Meridiano Minutos
    let MeridianoDecimal:number = MeridianoG+(MeridianoM/60);                                 //Meridiano en Decimal

    this.setDatum();

    //CONSTANTES PARA CALCULO
    let Ko:number = 1;                                                                  //Factor de Escala
    let No:number = 0;                                                                  //Falso Norte
    let Eo:number = 500000;                                                             //Falso Este
    let Lo:number = MeridianoDecimal;                                                   //Longitud Meridiano Central (DECIMAL)

    //VARIABLES DE LA INVERSA
    let E:number = (Este-Eo)/Ko;
    let N:number = (Norte-No)/Ko;

    let Oo:number = (this.b)*((N-No)/(this.A0*Math.pow(this.a,2)));
    let So:number = (this.A0*(Math.pow(this.a,2)/this.b)*Oo)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(Oo)*Math.cos(Oo)))*(1+(this.A2*Math.pow(Math.sin(Oo),2))+(this.A4*Math.pow(Math.sin(Oo),4))+(this.A6*Math.pow(Math.sin(Oo),6))+(this.A8*Math.pow(Math.sin(Oo),8))));
    let O1:number = Oo+(((this.b)*((N-No-So)))/(this.A0*Math.pow(this.a,2)));
    let S1:number = (this.A0*(Math.pow(this.a,2)/this.b)*O1)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(O1)*Math.cos(O1)))*(1+(this.A2*Math.pow(Math.sin(O1),2))+(this.A4*Math.pow(Math.sin(O1),4))+(this.A6*Math.pow(Math.sin(O1),6))+(this.A8*Math.pow(Math.sin(O1),8))));
    let O2:number = O1+(((this.b)*((N-No-S1)))/(this.A0*Math.pow(this.a,2)));
    let S2:number = (this.A0*(Math.pow(this.a,2)/this.b)*O2)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(O2)*Math.cos(O2)))*(1+(this.A2*Math.pow(Math.sin(O2),2))+(this.A4*Math.pow(Math.sin(O2),4))+(this.A6*Math.pow(Math.sin(O2),6))+(this.A8*Math.pow(Math.sin(O2),8))));
    let O3:number = O2+(((this.b)*((N-No-S2)))/(this.A0*Math.pow(this.a,2)));

    let Ob:number = O3;
    let t2b:number = Math.pow((Math.tan(Ob)),2);
    let n2b:number = this.e*Math.pow((Math.cos(Ob)),2);
    let Nb:number = (this.a)/(Math.sqrt((1-(this.e*Math.pow((Math.sin(Ob)),2)))));
    let Mb:number = (this.a*(1-this.e))/(Math.pow((1-(this.e*Math.pow((Math.sin(Ob)),2))),3/2));
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

    //this.resultados += `Conversión de Coordenadas UTM a Geodésicas (YYYY-MM-DD HH:MM:SS)\nLatitud: ${LatitudG} ${LatitudM} ${LatitudS}\nLongitud: ${LongitudG} ${LongitudM} ${LongitudS}\n`;
    
    this.Latitud_Aux = `${LatitudG} ${LatitudM} ${LatitudS}`;
    this.Longitud_Aux = `${LongitudG} ${LongitudM} ${LongitudS}`;
  }

  public UTM2Geo_Rep(Norte:number,Este:number,Zona:number){
    this.setDatum();

    //CONSTANTES PARA CALCULO
    let Ko:number = 0.9996;                                                             //Factor de Escala
    let No:number = 0;                                                                  //Falso Norte
    let Eo:number = 500000;                                                             //Falso Este
    let Lo:number = 183-(6*Zona);                                                       //Longitud Meridiano Central

    //VARIABLES DE LA INVERSA
    let E:number = (Este-Eo)/Ko;
    let N:number = (Norte-No)/Ko;

    let Oo:number = (this.b)*((N-No)/(this.A0*Math.pow(this.a,2)));
    let So:number = (this.A0*(Math.pow(this.a,2)/this.b)*Oo)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(Oo)*Math.cos(Oo)))*(1+(this.A2*Math.pow(Math.sin(Oo),2))+(this.A4*Math.pow(Math.sin(Oo),4))+(this.A6*Math.pow(Math.sin(Oo),6))+(this.A8*Math.pow(Math.sin(Oo),8))));
    let O1:number = Oo+(((this.b)*((N-No-So)))/(this.A0*Math.pow(this.a,2)));
    let S1:number = (this.A0*(Math.pow(this.a,2)/this.b)*O1)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(O1)*Math.cos(O1)))*(1+(this.A2*Math.pow(Math.sin(O1),2))+(this.A4*Math.pow(Math.sin(O1),4))+(this.A6*Math.pow(Math.sin(O1),6))+(this.A8*Math.pow(Math.sin(O1),8))));
    let O2:number = O1+(((this.b)*((N-No-S1)))/(this.A0*Math.pow(this.a,2)));
    let S2:number = (this.A0*(Math.pow(this.a,2)/this.b)*O2)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(O2)*Math.cos(O2)))*(1+(this.A2*Math.pow(Math.sin(O2),2))+(this.A4*Math.pow(Math.sin(O2),4))+(this.A6*Math.pow(Math.sin(O2),6))+(this.A8*Math.pow(Math.sin(O2),8))));
    let O3:number = O2+(((this.b)*((N-No-S2)))/(this.A0*Math.pow(this.a,2)));

    let Ob:number = O3;
    let t2b:number = Math.pow((Math.tan(Ob)),2);
    let n2b:number = this.e*Math.pow((Math.cos(Ob)),2);
    let Nb:number = (this.a)/(Math.sqrt((1-(this.e*Math.pow((Math.sin(Ob)),2)))));
    let Mb:number = (this.a*(1-this.e))/(Math.pow((1-(this.e*Math.pow((Math.sin(Ob)),2))),3/2));
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

    //this.resultados += `Conversión de Coordenadas UTM a Geodésicas (YYYY-MM-DD HH:MM:SS)\nLatitud: ${LatitudG} ${LatitudM} ${LatitudS}\nLongitud: ${LongitudG} ${LongitudM} ${LongitudS}\n`;

    this.Latitud_Aux = `${LatitudG} ${LatitudM} ${LatitudS}`;
    this.Longitud_Aux = `${LongitudG} ${LongitudM} ${LongitudS}`;
  }

  public Geo2UTM_Rep(Latitud:string,Longitud:string,Zona:number){
    this.setDatum();

    //COORDENADAS
    let x = Latitud.split(" ", 3);
    let y = Longitud.split(" ", 3);

    let LatitudG = Number(x[0]);                                                        //Latitud Grados
    let LatitudM = Number(x[1]);                                                        //Latitud Minutos
    let LatitudS = Number(x[2]);                                                        //Latitud Segundos
    let LatitudDecimal = (LatitudG+(LatitudM/60)+(LatitudS/3600));                      //Latitud en Decimal
    let LatitudRadians = (LatitudDecimal * (Math.PI/180));                              //Latitud en Radianes

    let LongitudG = Number(y[0]);                                                       //Longitud Grados
    let LongitudM = Number(y[1]);                                                       //Longitud Minutos
    let LongitudS = Number(y[2]);                                                       //Longitud Segundos
    let LongitudDecimal = (LongitudG+(LongitudM/60)+(LongitudS/3600));                  //Longitud en Decimal
    let LongitudRadians = (LongitudDecimal * (Math.PI/180));                            //Longitud en Radianes

    //CONSTANTES PARA CALCULO
    let Ko:number = 0.9996;                                                             //Factor de Escala
    let No:number = 0;                                                                  //Falso Norte
    let Eo:number = 500000;                                                             //Falso Este
    let Lp:number = LongitudDecimal;                                                    //Longitud Geodesica del Punto
    let Zone:number = Zona;                                                             //Zona UTM
    let Lo:number = 183-(6*Zone);                                                       //Longitud Meridiano Central

    //VARIABLES DEL CALCULO
    let N:number = (this.a/(Math.sqrt(1-this.e*Math.pow(Math.sin(LatitudRadians),2))));
    let L:number = ((Lo-Lp) * (Math.PI/180));                                           //Diferencia de longitudes en Radianes
    let tt:number = (Math.pow((Math.tan(LatitudRadians)),2));
    let nn:number = (this.ee*Math.pow((Math.cos(LatitudRadians)),2));
    let dist:number = (this.A0*(Math.pow(this.a,2)/this.b)*LatitudRadians)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(LatitudRadians)*Math.cos(LatitudRadians)))*(1+(this.A2*Math.pow(Math.sin(LatitudRadians),2))+(this.A4*Math.pow(Math.sin(LatitudRadians),4))+(this.A6*Math.pow(Math.sin(LatitudRadians),6))+(this.A8*Math.pow(Math.sin(LatitudRadians),8))));
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
    this.Norte_Aux = UTM_Norte;
    this.Este_Aux = UTM_Este;

    this.resultados += `Conversión de Coordenadas Geodésicas a UTM (YYYY-MM-DD HH:MM:SS)\nNorte: ${UTM_Norte}\nEste: ${UTM_Este}\nZona: ${Zone}\n`;

  }

  public Geo2TME_Rep(Latitud:string,Longitud:string,Meridiano:string){
    this.setDatum();

    //COORDENADAS
    let x = Latitud.split(" ", 3);
    let y = Longitud.split(" ", 3);
    let z = Meridiano.split(" ", 2);

    let LatitudG = Number(x[0]);                                                        //Latitud Grados
    let LatitudM = Number(x[1]);                                                        //Latitud Minutos
    let LatitudS = Number(x[2]);                                                        //Latitud Segundos
    let LatitudDecimal = (LatitudG+(LatitudM/60)+(LatitudS/3600));                      //Latitud en Decimal
    let LatitudRadians = (LatitudDecimal * (Math.PI/180));                              //Latitud en Radianes

    let LongitudG = Number(y[0]);                                                       //Longitud Grados
    let LongitudM = Number(y[1]);                                                       //Longitud Minutos
    let LongitudS = Number(y[2]);                                                       //Longitud Segundos
    let LongitudDecimal = (LongitudG+(LongitudM/60)+(LongitudS/3600));                  //Longitud en Decimal
    let LongitudRadians = (LongitudDecimal * (Math.PI/180));                            //Longitud en Radianes

    let MeridianoG = Number(z[0]);                                                      //Meridiano Central Grados
    let MeridianoM = Number(z[1]);                                                      //Meridiano Minutos
    let MeridianoDecimal = (MeridianoG+(MeridianoM/60));                                //Meridiano en Decimal

    //CONSTANTES PARA CALCULO
    let Ko:number = 1;                                                                  //Factor de Escala
    let No:number = 0;                                                                  //Falso Norte
    let Eo:number = 500000;                                                             //Falso Este
    let Lo:number = MeridianoDecimal;                                                   //Longitud Meridiano Central
    let Lp:number = LongitudDecimal;                                                    //Longitud Geodesica del Punto
    let Zone:number = 30 - Math.trunc(Lp/6);                                            //Zona UTM
    
    //VARIABLES DEL CALCULO
    let N:number = (this.a/(Math.sqrt(1-this.e*Math.pow(Math.sin(LatitudRadians),2))));
    let L:number = ((Lo-Lp) * (Math.PI/180));                                           //Diferencia de longitudes en Radianes
    let tt:number = (Math.pow((Math.tan(LatitudRadians)),2));
    let nn:number = (this.ee*Math.pow((Math.cos(LatitudRadians)),2));
    let dist:number = (this.A0*(Math.pow(this.a,2)/this.b)*LatitudRadians)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(LatitudRadians)*Math.cos(LatitudRadians)))*(1+(this.A2*Math.pow(Math.sin(LatitudRadians),2))+(this.A4*Math.pow(Math.sin(LatitudRadians),4))+(this.A6*Math.pow(Math.sin(LatitudRadians),6))+(this.A8*Math.pow(Math.sin(LatitudRadians),8))));
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
    this.Norte_Aux = TME_Norte;
    this.Este_Aux = TME_Este;

    //this.resultados += `Conversión de Coordenadas TME a Geodésicas (YYYY-MM-DD HH:MM:SS)\nNorte: ${TME_Norte}\nEste: ${TME_Este}\nZona: ${Zone}\n`;
  }
  ////

  Geo2UTM(Latitud:string,Longitud:string){
    this.setDatum();

    //COORDENADAS
    let x = Latitud.split(" ", 3);
    let y = Longitud.split(" ", 3);

    let LatitudG = Number(x[0]);                                                        //Latitud Grados
    let LatitudM = Number(x[1]);                                                        //Latitud Minutos
    let LatitudS = Number(x[2]);                                                        //Latitud Segundos
    let LatitudDecimal = (LatitudG+(LatitudM/60)+(LatitudS/3600));                      //Latitud en Decimal
    let LatitudRadians = (LatitudDecimal * (Math.PI/180));                              //Latitud en Radianes

    let LongitudG = Number(y[0]);                                                       //Longitud Grados
    let LongitudM = Number(y[1]);                                                       //Longitud Minutos
    let LongitudS = Number(y[2]);                                                       //Longitud Segundos
    let LongitudDecimal = (LongitudG+(LongitudM/60)+(LongitudS/3600));                  //Longitud en Decimal
    let LongitudRadians = (LongitudDecimal * (Math.PI/180));                            //Longitud en Radianes

    //CONSTANTES PARA CALCULO
    let Ko:number = 0.9996;                                                             //Factor de Escala
    let No:number = 0;                                                                  //Falso Norte
    let Eo:number = 500000;                                                             //Falso Este
    let Lp:number = LongitudDecimal;                                                    //Longitud Geodesica del Punto
    let Zone:number = 30 - Math.trunc(Lp/6);                                            //Zona UTM
    let Lo:number = 183-(6*Zone);                                                       //Longitud Meridiano Central

    //VARIABLES DEL CALCULO
    let N:number = (this.a/(Math.sqrt(1-this.e*Math.pow(Math.sin(LatitudRadians),2))));
    let L:number = ((Lo-Lp) * (Math.PI/180));                                           //Diferencia de longitudes en Radianes
    let tt:number = (Math.pow((Math.tan(LatitudRadians)),2));
    let nn:number = (this.ee*Math.pow((Math.cos(LatitudRadians)),2));
    let dist:number = (this.A0*(Math.pow(this.a,2)/this.b)*LatitudRadians)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(LatitudRadians)*Math.cos(LatitudRadians)))*(1+(this.A2*Math.pow(Math.sin(LatitudRadians),2))+(this.A4*Math.pow(Math.sin(LatitudRadians),4))+(this.A6*Math.pow(Math.sin(LatitudRadians),6))+(this.A8*Math.pow(Math.sin(LatitudRadians),8))));
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

    UTM_Norte = this.precisionRound(UTM_Norte, 3);
    UTM_Este = this.precisionRound(UTM_Este, 3);

    this.resultados += `Conversión de Coordenadas Geodésicas a UTM (YYYY-MM-DD HH:MM:SS)\nNorte: ${UTM_Norte}\nEste: ${UTM_Este}\nZona: ${Zone}\n`;

    console.log(`Latitud => |  G:${LatitudG} M:${LatitudM} S:${LatitudS} | Decimal:${LatitudDecimal} Radianes:${LatitudRadians}`);
    console.log(`Longitud => |  G:${LongitudG} M:${LongitudM} S:${LongitudS} | Decimal:${LongitudDecimal} Radianes:${LongitudRadians}`);

    // console.log(
    //   `DATUM => |  
    //   a:${a} b:${b} c:${c}
    //   e2:${e} e'2:${ee}
    //   f:${f} n:${n}`
    // );

    console.log(
      `VARIABLES => |  
      N:${N} L:${L}
      tt:${tt} nn:${nn}`
    );

    console.log(`NORTE:${UTM_Norte}  ESTE:${UTM_Este}`);

    return {UTM_Norte, UTM_Este};
  }

  Geo2TME(Latitud:string,Longitud:string,Meridiano:string){
    this.setDatum();

    //COORDENADAS
    let x = Latitud.split(" ", 3);
    let y = Longitud.split(" ", 3);
    let z = Meridiano.split(" ", 2);

    let LatitudG = Number(x[0]);                                                        //Latitud Grados
    let LatitudM = Number(x[1]);                                                        //Latitud Minutos
    let LatitudS = Number(x[2]);                                                        //Latitud Segundos
    let LatitudDecimal = (LatitudG+(LatitudM/60)+(LatitudS/3600));                      //Latitud en Decimal
    let LatitudRadians = (LatitudDecimal * (Math.PI/180));                              //Latitud en Radianes

    let LongitudG = Number(y[0]);                                                       //Longitud Grados
    let LongitudM = Number(y[1]);                                                       //Longitud Minutos
    let LongitudS = Number(y[2]);                                                       //Longitud Segundos
    let LongitudDecimal = (LongitudG+(LongitudM/60)+(LongitudS/3600));                  //Longitud en Decimal
    let LongitudRadians = (LongitudDecimal * (Math.PI/180));                            //Longitud en Radianes

    let MeridianoG = Number(z[0]);                                                      //Meridiano Central Grados
    let MeridianoM = Number(z[1]);                                                      //Meridiano Minutos
    let MeridianoDecimal = (MeridianoG+(MeridianoM/60));                                //Meridiano en Decimal

    //CONSTANTES PARA CALCULO
    let Ko:number = 1;                                                                  //Factor de Escala
    let No:number = 0;                                                                  //Falso Norte
    let Eo:number = 500000;                                                             //Falso Este
    let Lo:number = MeridianoDecimal;                                                   //Longitud Meridiano Central
    let Lp:number = LongitudDecimal;                                                    //Longitud Geodesica del Punto
    let Zone:number = 30 - Math.trunc(Lp/6);                                            //Zona UTM
    
    //VARIABLES DEL CALCULO
    let N:number = (this.a/(Math.sqrt(1-this.e*Math.pow(Math.sin(LatitudRadians),2))));
    let L:number = ((Lo-Lp) * (Math.PI/180));                                           //Diferencia de longitudes en Radianes
    let tt:number = (Math.pow((Math.tan(LatitudRadians)),2));
    let nn:number = (this.ee*Math.pow((Math.cos(LatitudRadians)),2));
    let dist:number = (this.A0*(Math.pow(this.a,2)/this.b)*LatitudRadians)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(LatitudRadians)*Math.cos(LatitudRadians)))*(1+(this.A2*Math.pow(Math.sin(LatitudRadians),2))+(this.A4*Math.pow(Math.sin(LatitudRadians),4))+(this.A6*Math.pow(Math.sin(LatitudRadians),6))+(this.A8*Math.pow(Math.sin(LatitudRadians),8))));
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

    this.resultados += `Conversión de Coordenadas TME a Geodésicas (YYYY-MM-DD HH:MM:SS)\nNorte: ${TME_Norte}\nEste: ${TME_Este}\nZona: ${Zone}\n`;

    console.log(`Latitud => |  G:${LatitudG} M:${LatitudM} S:${LatitudS} | Decimal:${LatitudDecimal} Radianes:${LatitudRadians}`);
    console.log(`Longitud => |  G:${LongitudG} M:${LongitudM} S:${LongitudS} | Decimal:${LongitudDecimal} Radianes:${LongitudRadians}`);

    // console.log(
    //   `DATUM => |  
    //   a:${a} b:${b} c:${c}
    //   e2:${e} e'2:${ee}
    //   f:${f} n:${n}`
    // );

    // console.log(
    //   `VARIABLES => |  
    //   N:${N} L:${L}
    //   tt:${tt} nn:${nn}`
    // );

    console.log(`NORTE:${TME_Norte}  ESTE:${TME_Este}`);
  }

  TME2Geo(Norte:number,Este:number,Meridiano:string){
    //MERIDIANO CENTRAL
    let z = Meridiano.split(" ", 3);

    let MeridianoG = Number(z[0]);                                                             //Meridiano Central Grados
    let MeridianoM = Number(z[1]);                                                             //Meridiano Minutos
    let MeridianoDecimal:number = MeridianoG+(MeridianoM/60);                                 //Meridiano en Decimal

    this.setDatum();

    //CONSTANTES PARA CALCULO
    let Ko:number = 1;                                                                  //Factor de Escala
    let No:number = 0;                                                                  //Falso Norte
    let Eo:number = 500000;                                                             //Falso Este
    let Lo:number = MeridianoDecimal;                                                   //Longitud Meridiano Central (DECIMAL)

    //VARIABLES DE LA INVERSA
    let E:number = (Este-Eo)/Ko;
    let N:number = (Norte-No)/Ko;

    let Oo:number = (this.b)*((N-No)/(this.A0*Math.pow(this.a,2)));
    let So:number = (this.A0*(Math.pow(this.a,2)/this.b)*Oo)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(Oo)*Math.cos(Oo)))*(1+(this.A2*Math.pow(Math.sin(Oo),2))+(this.A4*Math.pow(Math.sin(Oo),4))+(this.A6*Math.pow(Math.sin(Oo),6))+(this.A8*Math.pow(Math.sin(Oo),8))));
    let O1:number = Oo+(((this.b)*((N-No-So)))/(this.A0*Math.pow(this.a,2)));
    let S1:number = (this.A0*(Math.pow(this.a,2)/this.b)*O1)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(O1)*Math.cos(O1)))*(1+(this.A2*Math.pow(Math.sin(O1),2))+(this.A4*Math.pow(Math.sin(O1),4))+(this.A6*Math.pow(Math.sin(O1),6))+(this.A8*Math.pow(Math.sin(O1),8))));
    let convergencia1:number = N-S1;
    let O2:number = O1+(((this.b)*((N-No-S1)))/(this.A0*Math.pow(this.a,2)));
    let S2:number = (this.A0*(Math.pow(this.a,2)/this.b)*O2)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(O2)*Math.cos(O2)))*(1+(this.A2*Math.pow(Math.sin(O2),2))+(this.A4*Math.pow(Math.sin(O2),4))+(this.A6*Math.pow(Math.sin(O2),6))+(this.A8*Math.pow(Math.sin(O2),8))));
    let convergencia2:number = N-S2;
    let O3:number = O2+(((this.b)*((N-No-S2)))/(this.A0*Math.pow(this.a,2)));
    let S3:number = (this.A0*(Math.pow(this.a,2)/this.b)*O3)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(O3)*Math.cos(O3)))*(1+(this.A2*Math.pow(Math.sin(O3),2))+(this.A4*Math.pow(Math.sin(O3),4))+(this.A6*Math.pow(Math.sin(O3),6))+(this.A8*Math.pow(Math.sin(O3),8))));
    let convergencia3:number = N-S3;

    let Ob:number = O3;
    let t2b:number = Math.pow((Math.tan(Ob)),2);
    let n2b:number = this.e*Math.pow((Math.cos(Ob)),2);
    let Nb:number = (this.a)/(Math.sqrt((1-(this.e*Math.pow((Math.sin(Ob)),2)))));
    let Mb:number = (this.a*(1-this.e))/(Math.pow((1-(this.e*Math.pow((Math.sin(Ob)),2))),3/2));
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

    // console.log(`Latitud => |  G:${LatitudG} M:${LatitudM} S:${LatitudS} | Decimal:${LatitudDecimal} Radianes:${LatitudRadians}`);
    // console.log(`Longitud => |  G:${LongitudG} M:${LongitudM} S:${LongitudS} | Decimal:${LongitudDecimal} Radianes:${LongitudRadians}`);

    // console.log(
    //   `DATUM => |  
    //   a:${a} b:${b} c:${c}
    //   e2:${e} e'2:${ee}
    //   f:${f} n:${n}`
    // );

    // console.log(
    //   `VARIABLES => |  
    //   N:${N} L:${L}
    //   tt:${tt} nn:${nn}`
    // );

    this.resultados += `Conversión de Coordenadas UTM a Geodésicas (YYYY-MM-DD HH:MM:SS)\nLatitud: ${LatitudG} ${LatitudM} ${LatitudS}\nLongitud: ${LongitudG} ${LongitudM} ${LongitudS}\n`;

    console.log(`LATITUD:${LatitudY}  LONGITUD:${LongitudX}`);
  }

  TME2UTM(Norte:number,Este:number,Meridiano:string){
    this.TME2Geo_Rep(Norte,Este,Meridiano);
    this.Geo2UTM(this.Latitud_Aux,this.Longitud_Aux);
  }

  TME2TME(Norte:number,Este:number,Meridiano:string,MeridianoFinal:string){
    this.TME2Geo_Rep(Norte,Este,Meridiano);
    this.Geo2TME(this.Latitud_Aux,this.Longitud_Aux,MeridianoFinal);
  }

  UTM2Geo(Norte:number,Este:number,Zona:number){
    this.setDatum();

    //CONSTANTES PARA CALCULO
    let Ko:number = 0.9996;                                                             //Factor de Escala
    let No:number = 0;                                                                  //Falso Norte
    let Eo:number = 500000;                                                             //Falso Este
    let Lo:number = 183-(6*Zona);                                                       //Longitud Meridiano Central

    //VARIABLES DE LA INVERSA
    let E:number = (Este-Eo)/Ko;
    let N:number = (Norte-No)/Ko;

    let Oo:number = (this.b)*((N-No)/(this.A0*Math.pow(this.a,2)));
    let So:number = (this.A0*(Math.pow(this.a,2)/this.b)*Oo)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(Oo)*Math.cos(Oo)))*(1+(this.A2*Math.pow(Math.sin(Oo),2))+(this.A4*Math.pow(Math.sin(Oo),4))+(this.A6*Math.pow(Math.sin(Oo),6))+(this.A8*Math.pow(Math.sin(Oo),8))));
    let O1:number = Oo+(((this.b)*((N-No-So)))/(this.A0*Math.pow(this.a,2)));
    let S1:number = (this.A0*(Math.pow(this.a,2)/this.b)*O1)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(O1)*Math.cos(O1)))*(1+(this.A2*Math.pow(Math.sin(O1),2))+(this.A4*Math.pow(Math.sin(O1),4))+(this.A6*Math.pow(Math.sin(O1),6))+(this.A8*Math.pow(Math.sin(O1),8))));
    let convergencia1:number = N-S1;
    let O2:number = O1+(((this.b)*((N-No-S1)))/(this.A0*Math.pow(this.a,2)));
    let S2:number = (this.A0*(Math.pow(this.a,2)/this.b)*O2)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(O2)*Math.cos(O2)))*(1+(this.A2*Math.pow(Math.sin(O2),2))+(this.A4*Math.pow(Math.sin(O2),4))+(this.A6*Math.pow(Math.sin(O2),6))+(this.A8*Math.pow(Math.sin(O2),8))));
    let convergencia2:number = N-S2;
    let O3:number = O2+(((this.b)*((N-No-S2)))/(this.A0*Math.pow(this.a,2)));
    let S3:number = (this.A0*(Math.pow(this.a,2)/this.b)*O3)-(((this.A1*(Math.pow(this.a,2)/this.b)*Math.sin(O3)*Math.cos(O3)))*(1+(this.A2*Math.pow(Math.sin(O3),2))+(this.A4*Math.pow(Math.sin(O3),4))+(this.A6*Math.pow(Math.sin(O3),6))+(this.A8*Math.pow(Math.sin(O3),8))));
    let convergencia3:number = N-S3;

    let Ob:number = O3;
    let t2b:number = Math.pow((Math.tan(Ob)),2);
    let n2b:number = this.e*Math.pow((Math.cos(Ob)),2);
    let Nb:number = (this.a)/(Math.sqrt((1-(this.e*Math.pow((Math.sin(Ob)),2)))));
    let Mb:number = (this.a*(1-this.e))/(Math.pow((1-(this.e*Math.pow((Math.sin(Ob)),2))),3/2));
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

    // console.log(`Latitud => |  G:${LatitudG} M:${LatitudM} S:${LatitudS} | Decimal:${LatitudDecimal} Radianes:${LatitudRadians}`);
    // console.log(`Longitud => |  G:${LongitudG} M:${LongitudM} S:${LongitudS} | Decimal:${LongitudDecimal} Radianes:${LongitudRadians}`);

    // console.log(
    //   `DATUM => |  
    //   a:${a} b:${b} c:${c}
    //   e2:${e} e'2:${ee}
    //   f:${f} n:${n}`
    // );

    // console.log(
    //   `VARIABLES => |  
    //   N:${N} L:${L}
    //   tt:${tt} nn:${nn}`
    // );

    this.resultados += `Conversión de Coordenadas UTM a Geodésicas (YYYY-MM-DD HH:MM:SS)\nLatitud: ${LatitudG} ${LatitudM} ${LatitudS}\nLongitud: ${LongitudG} ${LongitudM} ${LongitudS}\n`;

    console.log(`LATITUD:${LatitudY}  LONGITUD:${LongitudX}`);
  }

  UTM2TME(Norte:number,Este:number,Zona:number,MeridianoFinal:string){
    this.UTM2Geo_Rep(Norte,Este,Zona);
    this.Geo2TME(this.Latitud_Aux,this.Longitud_Aux,MeridianoFinal);
  }

  Zone2Zone(Norte:number,Este:number,Zona:number,ZonaFinal:number){
    this.UTM2Geo_Rep(Norte,Este,Zona);
    this.Geo2UTM_Rep(this.Latitud_Aux,this.Longitud_Aux,ZonaFinal);
  }

  CompareGeo(){
    this.DatumControl = "ITRF92";
    this.DatumControl = "NAD27";
  }

  CompareUTM(Norte:number,Este:number,Zona:number){
    this.DatumControl = "ITRF92";
    this.UTM2Geo_Rep(Norte,Este,Zona);
    this.DatumControl = "NAD27";
    this.Geo2UTM_Rep(this.Latitud_Aux,this.Longitud_Aux,Zona)
  }

  CompareTME(Norte:number,Este:number,Meridiano:string){
    this.DatumControl = "ITRF92";
    this.TME2Geo_Rep(Norte,Este,Meridiano);
    this.DatumControl = "NAD27";
    this.Geo2TME_Rep(this.Latitud_Aux,this.Longitud_Aux,Meridiano)
    this.resultados += `Conversión de Coordenadas TME a Geodésicas (YYYY-MM-DD HH:MM:SS)\nNorte: ${this.Norte_Aux}\nEste: ${this.Este_Aux}\nMeridiano: ${Meridiano}\n`;
  }

  setDatum(){
    if(this.DatumControl == "ITRF92"){
      this.a = 6378137;           //WGS84 == ITRF92(GRS80)
      this.b = 6356752.3141;      //WGS84 == ITRF92(GRS80)
    }
    else{
      this.a = 6378206.4;         //NAD27
      this.b = 6356583.8;         //NAD27
    }
    
    this.c = (Math.pow(this.a, 2)/this.b);
    this.e = ((Math.pow(this.a, 2)-Math.pow(this.b, 2))/Math.pow(this.a, 2));                    //e2
    this.ee = ((Math.pow(this.a, 2)-Math.pow(this.b, 2))/Math.pow(this.b, 2));;                  //e'2
    this.f = ((this.a-this.b)/this.a);                                                           //Achatamiento del Elipsoide de Referencia
    this.n = ((this.a-this.b)/(this.a+this.b));

    //CALCULAR DISTANCIA MERIDIONAL (Se calcula en base al DATUM)
    this.A0 = 1-(this.ee*3/4)*(1-(this.ee*15/16)*(1-(this.ee*35/36)*(1-(this.ee*63/64)*(1-(this.ee*99/100)))));
    this.A1 = (this.ee*3/4)*(1-(this.ee*25/16)*(1-(this.ee*77/60)*(1-(this.ee*837/704)*(1-(this.ee*2123/1860)))));
    this.A2 = (this.ee*5/8)*(1-(this.ee*139/144)*(1-(this.ee*1087/1112)*(1-(this.ee*513427/521760))));
    this.A4 = (Math.pow(this.ee, 2)*35/72)*(1-(this.ee*125/64)*(1-(this.ee*221069/150000)));
    this.A6 = (Math.pow(this.ee, 3)*105/256)*(1-(this.ee*1179/400));
    this.A8 = (Math.pow(this.ee, 4)*231/640);  
  }

  ngOnInit(): void {
    this.onSelected("Geo2UTM");
    this.selected = "Geo2UTM";
    this.onDatum("ITRF92");
    this.DatumControl == "ITRF92"
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
    {value: 'CompGeo', viewValue: 'Comparar coordenadas Geodésicas'},
    {value: 'CompUTM', viewValue: 'Comparar coordenadas UTM'},
    {value: 'CompTME', viewValue: 'Comparar coordenadas TME'},
  ];

  datumInterface = [
    {value: 'ITRF92', viewValue: 'ITRF92'},
    {value: 'NAD27', viewValue: 'NAD27'}
  ];

  public precisionRound(number: number, precision: number)
  {
    if (precision < 0)
    {
      let factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    }
    else{
      return +(Math.round(Number(number + "e+" + precision)) + "e-" + precision);
    }
      
  }
}