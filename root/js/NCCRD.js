/*
 * Copyright (c) 2016 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */

/*global define, WorldWind*/


define(['worldwind'],
    function ($) {
        "use strict";
        /**
         * Assembles the NCCRD data.
         *
         * @constructor
         * @param {WorldWind.WorldWindow} wwd A WorldWindow object hosting a virtual globe
         * @returns {Explorer}
         */


        var NCCRD = function (wwd, url) {

            var self = this;
            this.wwd = wwd;
            this.url = url;
            var placemarkLayer = new WorldWind.RenderableLayer("NCCRD");

            var go = function (url) {
                fetch(url, {
                    mode: 'no-cors'
                }).then(function (response) {
                    return (response.json())
                }).then(handleGeoJSON);
            };


            var handleGeoJSON = function (data) {
                var i;
                // Define the images we'll use for the placemarks.
                var images = [
                    "red.png",
                    "green.png",
                    "blue.png"
                ];
                for (i = 0; i < data.length; i++) {
                    if (data[i]['geometry']['type'] == "Point") {
                        if (data[i]['properties']['typology'] == 1) {
                            var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
                            // placemarkAttributes.imageSource = "./images/";
                            placemarkAttributes.imageScale = 2;
                            placemarkAttributes.imageColor = WorldWind.Color.WHITE;
                            placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
                                WorldWind.OFFSET_FRACTION, 0.5,
                                WorldWind.OFFSET_FRACTION, 1.0);
                            placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
                            placemarkAttributes.drawLeaderLine = true;
                            placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;
                            var highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
                            highlightAttributes.imageScale = 3;
                            placemarkAttributes.imageSource = "./images/red.png";
                            //add info here
                            var placemark = new WorldWind.Placemark(new WorldWind.Position(data[i]['geometry']['coordinates'][1], data[i]['geometry']['coordinates'][0], 1e2), true, null);
                            placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
                            placemark.highlightAttributes = highlightAttributes;
                            placemark.label = data[i]['properties']['id'];
                            placemark.text= data[i]['data']['startYear']+","+data[i]['data']['endYear'];
                            placemark.displayName = data[i]['properties']['name'];
                            placemark.attributes = placemarkAttributes;
                            // Add the placemark to the layer.
                            // this.markerManager.doAddMarkerToLayer(placemark)
                            placemarkLayer.addRenderable(placemark);
                        } else if (data[i]['properties']['typology'] === 2) {
                            var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
                            // placemarkAttributes.imageSource = "./images/";
                            placemarkAttributes.imageScale = 2;
                            placemarkAttributes.imageColor = WorldWind.Color.WHITE;
                            placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
                                WorldWind.OFFSET_FRACTION, 0.5,
                                WorldWind.OFFSET_FRACTION, 1.0);
                            placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
                            placemarkAttributes.drawLeaderLine = true;
                            placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;
                            var highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
                            highlightAttributes.imageScale = 3;
                            placemarkAttributes.imageSource = "./images/" + images[1];
                            //add info here
                            var placemark = new WorldWind.Placemark(new WorldWind.Position(data[i]['geometry']['coordinates'][1], data[i]['geometry']['coordinates'][0], 1e2), true, null);
                            placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

                            placemark.highlightAttributes = highlightAttributes;
                            placemark.label = data[i]['properties']['id'];
                            placemark.text= data[i]['data']['startYear']+","+data[i]['data']['endYear'];
                            placemark.displayName = data[i]['properties']['name'];
                            placemark.attributes = placemarkAttributes;
                            // Add the placemark to the layer.
                            // this.markerManager.doAddMarkerToLayer(placemark)
                            placemarkLayer.addRenderable(placemark);
                        } else if (data[i]['properties']['typology'] === 3) {
                            var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
                            // placemarkAttributes.imageSource = "./images/";
                            placemarkAttributes.imageScale = 2;
                            placemarkAttributes.imageColor = WorldWind.Color.WHITE;
                            placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
                                WorldWind.OFFSET_FRACTION, 0.5,
                                WorldWind.OFFSET_FRACTION, 1.0);
                            placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
                            placemarkAttributes.drawLeaderLine = true;
                            placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;
                            var highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
                            highlightAttributes.imageScale = 3;
                            placemarkAttributes.imageSource = "./images/" + images[2];
                            //add info here
                            var placemark = new WorldWind.Placemark(new WorldWind.Position(data[i]['geometry']['coordinates'][1], data[i]['geometry']['coordinates'][0], 1e2), true, null);
                            placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

                            placemark.highlightAttributes = highlightAttributes;
                            placemark.label = data[i]['properties']['id'];
                            placemark.text= data[i]['data']['startYear']+","+data[i]['data']['endYear'];
                            placemark.displayName = data[i]['properties']['name'];
                            placemark.attributes = placemarkAttributes;
                            // placemark.setp
                            // Add the placemark to the layer.
                            // this.markerManager.doAddMarkerToLayer(placemark)
                            placemarkLayer.addRenderable(placemark);
                        }
                    }
                }
            };


            go(url);

            return placemarkLayer;

        };


        return NCCRD;
    });
