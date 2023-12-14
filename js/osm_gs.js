//URL Geoserver
var url_geoserver = "http://localhost:8080/geoserver/wms";
//noms des couches
var name_layer_landuse = "formation_gs:gis_osm_landuse_a_free_1";
var name_layer_roads = "formation_gs:gis_osm_roads_free_1";
var name_layer_pois = "formation_gs:gis_osm_pois_free_1";
var name_layer_places = "formation_gs:gis_osm_places_free_1";
var name_layer_adm1 = "formation_gs:civ_adm1";
var name_layer_adm2 = "formation_gs:civ_adm2";
var name_layer_adm3 = "formation_gs:civ_adm3";
var name_layer_Abidjan_HR_ext = "formation_gs:Abidjan_HR_ext";
var name_coordinates = "formation_gs:point_shapes";
var name_polygons = "formation_gs:polygon_shapes";
var name_lines = "formation_gs:line_shapes";
//déclaration des couches openlayers
var lyr_osm = new ol.layer.Tile({
    title: 'OSM',
    type: 'base',
    visible: true,
    source: new ol.source.OSM()
});
//déclaration des couches openlayers
var lyr_osm = new ol.layer.Tile({
    title: 'OSM',
    type: 'base',
    visible: true,
    source: new ol.source.OSM()
});
var lyr_landuse = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
        url: url_geoserver,
        params: {"LAYERS": name_layer_landuse, "TILED": "true"}
    })),
    title: "Occupation du sol"
});
var lyr_roads = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
        url: url_geoserver,
        params: {"LAYERS": name_layer_roads, "TILED": "true"}
    })),
    title: "Routes"
});
var lyr_pois = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
        url: url_geoserver,
        params: {"LAYERS": name_layer_pois, "TILED": "true"}
    })),
    title: "POIs"
});
var lyr_places = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
        url: url_geoserver,
        params: {"LAYERS": name_layer_places, "TILED": "true"}
    })),
    title: "Lieux"
});
var lyr_adm1 = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
        url: url_geoserver,
        params: {"LAYERS": name_layer_adm1, "TILED": "true"}
    })),
    title: "adm1"
});
var lyr_adm2 = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
        url: url_geoserver,
        params: {"LAYERS": name_layer_adm2, "TILED": "true"}
    })),
    title: "adm2"
});
var lyr_adm3 = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
        url: url_geoserver,
        params: {"LAYERS": name_layer_adm3, "TILED": "true"}
    })),
    title: "adm3"
});
var coordinates = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
        url: url_geoserver,
        params: {"LAYERS": name_coordinates, "TILED": "true"}
    })),
    title: "points"
});
var polygons = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
        url: url_geoserver,
        params: {"LAYERS": name_polygons, "TILED": "true"}
    })),
    title: "polygons"
});
var lines = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
        url: url_geoserver,
        params: {"LAYERS": name_lines, "TILED": "true"}
    })),
    title: "lines"
});
var lyr_Abidjan_HR_ext = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
        url: url_geoserver,
        params: {"LAYERS": name_layer_Abidjan_HR_ext, "TILED": "true"}
    })),
    title: "image"
});
//visibilité par défaut des couches au chargement de la carte

lyr_landuse.setVisible(true);
lyr_roads.setVisible(true);
lyr_pois.setVisible(true);
lyr_places.setVisible(true);
lyr_adm1.setVisible(true);
lyr_adm2.setVisible(true);
lyr_adm3.setVisible(true);
lyr_Abidjan_HR_ext.setVisible(true);
lyr_osm.setVisible(true);
coordinates.setVisible(true);
polygons.setVisible(true);
lines.setVisible(true);
//déclaration de la liste des couches à afficher dans un ordre précis
//Definition des popups pour affichage des infos

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
closer.onclick = function() {
    container.style.display = 'none';
    closer.blur();
    return false;
};

var overlayPopup = new ol.Overlay({
    element: container
});

// Geometries
var point = new ol.geom.Point(
    ol.proj.transform([-5.690183, 7.786829], 'EPSG:4326', 'EPSG:3857')
);
var circle = new ol.geom.Circle(
    ol.proj.transform([-5.690183, 7.786829], 'EPSG:4326', 'EPSG:3857'),
    450000

);

// Features
var pointFeature = new ol.Feature(point);
var circleFeature = new ol.Feature(circle);

// Source and vector layer
var vectorSource = new ol.source.Vector({
    projection: 'EPSG:4326',
    features: [pointFeature, circleFeature]
});

var style = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 100, 50, 0.3)'
    }),
    stroke: new ol.style.Stroke({
        width: 2,
        color: 'rgba(255, 100, 50, 0.8)'
    }),
    image: new ol.style.Circle({
        fill: new ol.style.Fill({
            color: 'rgba(55, 200, 150, 0.5)'
        }),
        stroke: new ol.style.Stroke({
            width: 1,
            color: 'rgba(55, 200, 150, 0.8)'
        }),
        radius: 7
    })
});
var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: style
});

var mapView = new ol.View({
    center: ol.proj.transform([-5.690183, 7.786829], 'EPSG:4326', 'EPSG:3857'),
    zoom: 7
});

var scaleLineControl = new ol.control.ScaleLine();
var layersList= [    new ol.layer.Tile({
    title: 'OSM',
    type: 'base',
    visible: true,
    source: new ol.source.OSM()
}),lyr_landuse,lyr_roads,lyr_pois,lyr_places,lyr_adm1,lyr_adm2,lyr_adm3, coordinates,polygons,lines,lyr_Abidjan_HR_ext,vectorLayer];


// Define the interactions outside the click event
var selectInteraction = new ol.interaction.Select();
var drawPointInteraction = new ol.interaction.Draw({
    type: 'Point',
    source: vectorLayer.getSource()
});
var drawLineInteraction = new ol.interaction.Draw({
    type: 'LineString',
    source: vectorLayer.getSource()
});
var drawPolygonInteraction = new ol.interaction.Draw({
    type: 'Polygon',
    source: vectorLayer.getSource()
});

vectorLayer.getSource().on('addfeature', function (event) {
    var drawnFeature = event.feature;
    var geometry = drawnFeature.getGeometry();
    var type = geometry.getType();

    // Convert the geometry to Well-Known Text (WKT)
    var format = new ol.format.WKT();
    var wktGeometry = format.writeGeometry(geometry);

    // Send data to the Node.js server
    fetch('http://localhost:3000/store-zone-click', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            featureType: type,
            geometry: wktGeometry
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(`${type} feature saved successfully with ID:`, data.id);
        })
        .catch(error => {
            console.error(`Error saving ${type} feature:`, error);
        });
});













var modifyInteraction = new ol.interaction.Modify({
    features: new ol.Collection(vectorLayer.getSource().getFeatures())
});

// Create the map with interactions
var map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    layers: layersList,
    view: mapView,
    overlays: [overlayPopup],
    controls: ol.control.defaults().extend([scaleLineControl]),
    interactions: ol.interaction.defaults().extend([
        selectInteraction,
        drawPointInteraction,
        drawLineInteraction,
        drawPolygonInteraction,
        modifyInteraction
    ])
});

// Attach click event to toggle interactions
$('div.btn-group button').on('click', function(event) {
    var id = event.target.id;

    // Update active interaction
    selectInteraction.setActive(id === "select");
    drawPointInteraction.setActive(id === "point");
    drawLineInteraction.setActive(id === "line");
    drawPolygonInteraction.setActive(id === "polygon");
    modifyInteraction.setActive(id === "modify");
});



var layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: 'Légende'
});
map.addControl(layerSwitcher);


map.setLayerGroup(new ol.layer.Group({ layers: layersList }));


var MousePosition = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326'
});


map.on('pointermove', function(event) {
    var coord3857 = event.coordinate;
    var coord4326 = ol.proj.transform(coord3857, 'EPSG:3857', 'EPSG:4326');
    $('#mouse3857').text(ol.coordinate.toStringXY(coord3857, 2));
    $('#mouse4326').text(ol.coordinate.toStringXY(coord4326, 5));
});



function parseResponse(data) {
    var vectorSource = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(data)
    });
    console.log((new ol.format.GeoJSON()).readFeatures(data));
    var features = vectorSource.getFeatures();
    var str="";
    var district = "";
    var region = "";
    var departement = "";
    for(x in features) {
        var id = features[x].getId();
        console.log(id);
        var props = features[x].getProperties();
        if(id.indexOf("adm1")>-1) district = props["ADM1_FR"];
        if(id.indexOf("adm2")>-1) region = props["ADM2_FR"];
        if(id.indexOf("adm3")>-1) departement = props["ADM3_FR"];
    }
    str = str + "District: " + district+ '<br/>';
    str = str + "Région: " + region+ '<br/>';
    str = str + "Département: " + departement+ '<br/>';
    if(str) {
        str = '<p>' + str + '</p>';
        overlayPopup.setPosition(clicked_coord);
        content.innerHTML = str;
        container.style.display = 'block';
    }
    else{
        container.style.display = 'none';
        closer.blur();
    }
}



var clicked_coord;
var onSingleClick = function(evt) {
    var coord = evt.coordinate;
    console.log(coord);
    var source1 = name_layer_adm1;
    var source2 = name_layer_adm2;
    var source3 = name_layer_adm3;
    var layers_list = source3 + ',' + source2 + ',' + source1;
    var wmslyr_adm1 = new ol.source.TileWMS({
        url: url_geoserver,
        params: {'LAYERS': name_layer_adm1, 'TILED': true},
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
    });
    var view = map.getView();
    var viewResolution = view.getResolution();
    var url=wmslyr_adm1.getFeatureInfoUrl(
        evt.coordinate, viewResolution, view.getProjection(),
        { 'INFO_FORMAT': 'text/javascript',
            'FEATURE_COUNT': 20,
            'LAYERS': layers_list,
            'QUERY_LAYERS': layers_list
        });
    console.log(url);
    if (url) { //call parseResponse(data)
        clicked_coord = coord;
        $.ajax(url,
            {dataType: 'jsonp'}
        ).done(function (data) {
            });
    }

    console.log(coord);
    var coord_wgs84 = ol.proj.toLonLat(coord);
    var str = ol.coordinate.toStringXY(coord_wgs84,6);
    if(str) {
        str = '<p>' + str + '</p>';
        overlayPopup.setPosition(coord);
        content.innerHTML = str;
        container.style.display = 'block';
    }
    else{
        container.style.display = 'none';
        closer.blur();
    }
};
map.on('singleclick', function(evt) {
    onSingleClick(evt);
});

//Geolocation
var geolocation = new ol.Geolocation({
    projection: map.getView().getProjection(),
    tracking: true
});
var marker = new ol.Overlay({
    element: document.getElementById('location'),
    positioning: 'center-center'
});
map.addOverlay(marker);
geolocation.on('change:position', function() { //real time tracking
    map.getView().setCenter(geolocation.getPosition());
    map.getView().setZoom(15);
    marker.setPosition(geolocation.getPosition());
});
// Fonction pour zoomer sur la position de l'utilisateur
function zoomToMyPosition() {
    var coordinates = geolocation.getPosition();
    if (coordinates) {
        map.getView().setCenter(coordinates);
        map.getView().setZoom(15); // ajustez le niveau de zoom selon vos besoins
    } else {
        alert('La position de l\'utilisateur n\'est pas encore disponible.');
    }
}
// Fonction pour zoomer sur l'étendue géographique
function goToFullExtent() {
    // Remplacez les coordonnées et le zoom par ceux de votre région
    var extent = ol.proj.transformExtent([-180, -90, 180, 90], 'EPSG:4326', 'EPSG:3857');
    map.getView().fit(extent, map.getSize());
}