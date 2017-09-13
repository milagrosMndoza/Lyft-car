'use strict';

const app3 = {   
    map: undefined,
    markerOrigin: undefined,
    detailLocationOrigin: undefined,

    init: function () {
        app3.map = new google.maps.Map(document.getElementById("map"), {
            zoom: 10,
            center: {
                lat: -33.4724728,
                lng: -70.9100251
            },
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false
        });

        let inputOrigin = document.getElementById('origen');
        let autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin);
        autocompleteOrigin.bindTo('bounds', app3.map);
        app3.detailLocationOrigin = new google.maps.InfoWindow();
        app3.markerOrigin = app3.createMarker(app3.map);
        app3.createListener(autocompleteOrigin, app3.detailLocationOrigin, app3.markerOrigin);
        let inputDestinity = document.getElementById('destino');
        let autocompleteDestinity = new google.maps.places.Autocomplete(inputDestinity);
        autocompleteDestinity.bindTo('bounds', app3.map);
        let detailLocationDestination = new google.maps.InfoWindow();
        let markerDestinity = app3.createMarker2(app3.map);

        app3.createListener(autocompleteDestinity, detailLocationDestination, markerDestinity);
        /* Mi ubicación actual */
        app3.searchMyUbication();
       // document.getElementById("encuentrame").addEventListener("click", app3.searchMyUbication);
        /* Ruta */
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;

        document.getElementById("ruta").addEventListener("click", function () {
            app3.drawRoute(directionsService, directionsDisplay)
        });

        directionsDisplay.setMap(app3.map);
    },

    createListener: function (autocomplete, detailUbication, marker) {
        autocomplete.addListener('place_changed', function () {
            detailUbication.close();
            marker.setVisible(false);
            let place = autocomplete.getPlace();
            app3.marcarUbicacion(place, detailUbication, marker);
        });
    },

    searchMyUbication: function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(app3.markAutomaticLocation, app3.funcionError);
        }
    },

    funcionError: function (error) {
        alertify.alert("Tenemos un problema para encontrar tu ubicación");
    },

    markAutomaticLocation: function (posicion) {
        let latitud, longitud;
        latitud = posicion.coords.latitude;
        longitud = posicion.coords.longitude;

        app3.markerOrigin.setPosition(new google.maps.LatLng(latitud, longitud));
        app3.map.setCenter({
            lat: latitud,
            lng: longitud
        });
        app3.map.setZoom(17);
        app3.markerOrigin.setVisible(true);
        app3.detailLocationOrigin.setContent('<div><strong>Mi ubicación actual</strong><br>');
        app3.detailLocationOrigin.open(app3.map, app3.markerOrigin);
    },

    marcarUbicacion: function (place, detailUbication, marker) {
        if (!place.geometry) {
            // Error si no encuentra el lugar indicado
            window.alert("No encontramos el lugar que indicaste: '" + place.name + "'");
            return;
        }
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            app3.map.fitBounds(place.geometry.viewport);
        } else {
            app3.map.setCenter(place.geometry.location);
            app3.map.setZoom(17);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        let address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
        }

        detailUbication.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        detailUbication.open(app3.map, marker);
    },

    createMarker: function (map) {
        let icono = {
            url: 'assets/img/user.png',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        };

        let marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            icon: icono,
            anchorPoint: new google.maps.Point(0, -29)
        });

        return marker;
    },
    createMarker2: function (map) {
        let icono = {
            url: 'https://ameriflex-production.imgix.net/df8bf8158e43d6eb4aa758b7a39a68e4.png',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        };

        let marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            icon: icono,
            anchorPoint: new google.maps.Point(0, -29)
        });

        return marker;
    },

    drawRoute: function (directionsService, directionsDisplay) {
        let origin = document.getElementById("origen").value;
        let destination = document.getElementById('destino').value;

        if (destination != "" && destination != "") {
            directionsService.route({
                    origin: origin,
                    destination: destination,
                    travelMode: "DRIVING"
                },
                function (response, status) {
                    if (status === "OK") {
                        directionsDisplay.setDirections(response);
                    } else {
                        app3.errorRoute();
                    }
                });
        }
    },

    errorRoute: function () {
        alertify.alert("No ingresaste un origen y un destino validos");
    }

}

function initMap() {
    app3.init();
}
