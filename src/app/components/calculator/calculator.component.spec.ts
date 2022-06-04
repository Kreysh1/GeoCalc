import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // PRUEBAS PARA GEODESICO A UTM
  it('Geo2UTM() ===> Resultados', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    const mockedData = {latitud:'104 25 15.267', longitud:'79 38 23.756'};
    const expectedData = {UTM_Norte:11607275.327, UTM_Este:462193.631}

    const result = app.Geo2UTM(mockedData.latitud, mockedData.longitud);

    expect(result).toEqual(expectedData);
  });

  // PRUEBAS PARA GEODESICO A TME
  // it('Geo2UTM() ===> Resultados', () => {
  //   const fixture = TestBed.createComponent(CalculatorComponent);
  //   const app = fixture.componentInstance;
  //   const mockedData = {latitud:'104 25 15.267', longitud:'79 38 23.756'};
  //   const expectedData = {UTM_Norte:11607275.327, UTM_Este:462193.631}

  //   const result = app.Geo2UTM(mockedData.latitud, mockedData.longitud);

  //   expect(result).toEqual(expectedData);
  // });

  // PRUEBAS PARA TME A GEODESICO
  // it('Geo2UTM() ===> Resultados', () => {
  //   const fixture = TestBed.createComponent(CalculatorComponent);
  //   const app = fixture.componentInstance;
  //   const mockedData = {latitud:'104 25 15.267', longitud:'79 38 23.756'};
  //   const expectedData = {UTM_Norte:11607275.327, UTM_Este:462193.631}

  //   const result = app.Geo2UTM(mockedData.latitud, mockedData.longitud);

  //   expect(result).toEqual(expectedData);
  // });

  // PRUEBAS PARA TME A UTM
  // it('Geo2UTM() ===> Resultados', () => {
  //   const fixture = TestBed.createComponent(CalculatorComponent);
  //   const app = fixture.componentInstance;
  //   const mockedData = {latitud:'104 25 15.267', longitud:'79 38 23.756'};
  //   const expectedData = {UTM_Norte:11607275.327, UTM_Este:462193.631}

  //   const result = app.Geo2UTM(mockedData.latitud, mockedData.longitud);

  //   expect(result).toEqual(expectedData);
  // });

  // PRUEBAS PARA TME A TME
  // it('Geo2UTM() ===> Resultados', () => {
  //   const fixture = TestBed.createComponent(CalculatorComponent);
  //   const app = fixture.componentInstance;
  //   const mockedData = {latitud:'104 25 15.267', longitud:'79 38 23.756'};
  //   const expectedData = {UTM_Norte:11607275.327, UTM_Este:462193.631}

  //   const result = app.Geo2UTM(mockedData.latitud, mockedData.longitud);

  //   expect(result).toEqual(expectedData);
  // });

  // PRUEBAS PARA UTM A GEODESICO
  // it('Geo2UTM() ===> Resultados', () => {
  //   const fixture = TestBed.createComponent(CalculatorComponent);
  //   const app = fixture.componentInstance;
  //   const mockedData = {latitud:'104 25 15.267', longitud:'79 38 23.756'};
  //   const expectedData = {UTM_Norte:11607275.327, UTM_Este:462193.631}

  //   const result = app.Geo2UTM(mockedData.latitud, mockedData.longitud);

  //   expect(result).toEqual(expectedData);
  // });

  // PRUEBAS PARA UTM A TME
  // it('Geo2UTM() ===> Resultados', () => {
  //   const fixture = TestBed.createComponent(CalculatorComponent);
  //   const app = fixture.componentInstance;
  //   const mockedData = {latitud:'104 25 15.267', longitud:'79 38 23.756'};
  //   const expectedData = {UTM_Norte:11607275.327, UTM_Este:462193.631}

  //   const result = app.Geo2UTM(mockedData.latitud, mockedData.longitud);

  //   expect(result).toEqual(expectedData);
  // });

  // PRUEBAS PARA ZONAS UTM
  // it('Geo2UTM() ===> Resultados', () => {
  //   const fixture = TestBed.createComponent(CalculatorComponent);
  //   const app = fixture.componentInstance;
  //   const mockedData = {latitud:'104 25 15.267', longitud:'79 38 23.756'};
  //   const expectedData = {UTM_Norte:11607275.327, UTM_Este:462193.631}

  //   const result = app.Geo2UTM(mockedData.latitud, mockedData.longitud);

  //   expect(result).toEqual(expectedData);
  // });
  
});
