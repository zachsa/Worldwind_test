/*
 * Copyright (c) 2016 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */

/*global define, WorldWind*/


define(['Explorer','worldwind'],
    function (Explorer,
              $) {
        "use strict";
        /**
         * Assembles the NCCRD data.
         *
         * @constructor
         * @param {WorldWind.WorldWindow} wwd A WorldWindow object hosting a virtual globe
         * @returns {Explorer}
         */


        var SAEON_WMS = function (explorer, serverAddress, layername) {



            // this.layername=layername;
            // this.explorer = explorer;
            // this.serverAddress = serverAddress.trim();
            serverAddress = serverAddress.replace("Http", "http");
            var self = this,
            request = new XMLHttpRequest(),
                url = WorldWind.WmsUrlBuilder.fixGetMapString(serverAddress);
            url += "service=WMS&request=GetCapabilities&vers";

            request.open("GET", url, true);
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    var xmlDom = request.responseXML,
                        wmsCapsDoc;

                    if (!xmlDom && request.responseText.indexOf("<?xml") === 0) {
                        xmlDom = new window.DOMParser().parseFromString(request.responseText, "text/xml");
                    }

                    if (!xmlDom) {
                        alert(serverAddress + " retrieval failed. It is probably not a WMS server.");
                        return;
                    }

                    wmsCapsDoc = new WorldWind.WmsCapabilities(xmlDom);

                    if (wmsCapsDoc.version) { // if no version, then the URL doesn't point to a caps doc.

                        // Process the servers's capabilities document
                        explorer.globe.layerManager.servers.push(explorer.globe.layerManager.LayerManagerHelper.loadServerCapabilites2(serverAddress, wmsCapsDoc,layername));

                    } else {
                        alert(serverAddress +
                            " WMS capabilities document invalid. The server is probably not a WMS server.");
                    }
                } else if (request.readyState === 4) {
                    if (request.statusText) {
                        alert(request.responseURL + " " + request.status + " (" + request.statusText + ")");
                    } else {
                        alert("Failed to retrieve WMS capabilities from " + serverAddress + ".");
                    }
                }
            };
            // request.send(null);
            return request;


        };


        return SAEON_WMS;
    });
