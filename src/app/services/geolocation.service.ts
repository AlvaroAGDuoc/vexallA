///<reference path="../../.././node_modules/@types/googlemaps/index.d.ts"/>
import { Injectable } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  
  mapa!: google.maps.Map;

  constructor(private geolocation: Geolocation) {  }


  inicioMapa(divMap) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.cargarMapa(resp, divMap) 
    }).catch((error) => {
      console.log('Error obteniendo la localización', error);
    });
  
  }
  

  cargarMapa(position: any, divMap): any {
    const opciones = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.mapa = new google.maps.Map((divMap.nativeElement), opciones)
  }


  calcularRuta(ruta1: string, ruta2: string, distancia) {
    const directionService = new google.maps.DirectionsService();
    const directionRender = new google.maps.DirectionsRenderer();

    directionRender.setMap(this.mapa);

    directionService.route({
      origin: ruta1,
      destination: ruta2,
      travelMode: google.maps.TravelMode.DRIVING
    }, resultado => {
      console.log(resultado);
      directionRender.setDirections(resultado)

      distancia = resultado.routes[0].legs[0].distance.text;

     (document.getElementById('distancia') as HTMLElement).innerText = 'La distancia de tu recorrido es de: ' + distancia
    })
  } 

  cargarAutoComplete(rutaInicio, rutaFin ) {
    const autocomplete = new google.maps.places.Autocomplete((rutaInicio.nativeElement), {
      componentRestrictions: {
        country: ["CL"]
      },
      fields: ["address_components", "geometry"],
      types: ["establishment"]
    })

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place: any = autocomplete.getPlace();
      console.log('El place completo es: ', place)

      this.mapa.setCenter(place.geometry.location);
      const marker = new google.maps.Marker({
        position: place.geometry.location
      });
      marker.setMap(this.mapa);
    })

    const autocomplete2 = new google.maps.places.Autocomplete((rutaFin.nativeElement), {
      componentRestrictions: {
        country: ["CL"]
      },
      fields: ["address_components", "geometry"],
      types: ["address"],
    })

    google.maps.event.addListener(autocomplete2, 'place_changed', () => {
      const place2: any = autocomplete2.getPlace();
      console.log('El place completo es: ', place2)

      this.mapa.setCenter(place2.geometry.location);
      const marker = new google.maps.Marker({
        position: place2.geometry.location
      });
      marker.setMap(this.mapa);
    })


  }

}


