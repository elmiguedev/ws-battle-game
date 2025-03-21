declare var global: any;

// Declaramos `window` como `global` en Node.js
global.window = global;

// Importar los módulos
// @ts-ignore
const wrtc = require('wrtc');
const BinaryPack = require('binary-pack');
const path = require('path');
const XMLHttpRequest2 = require('xmlhttprequest').XMLHttpRequest;
const BlobBuilder = require("BlobBuilder");

const RTCPeerConnection2 = wrtc.RTCPeerConnection;
const RTCSessionDescription2 = wrtc.RTCSessionDescription;
const RTCIceCandidate2 = wrtc.RTCIceCandidate;
console.log("Importado todo")

// Configuración de `location` como un objeto simple
global.location = { protocol: 'http' };
global.BlobBuilder = BlobBuilder;
global.XMLHttpRequest = XMLHttpRequest2;
global.RTCPeerConnection = RTCPeerConnection2;
global.RTCSessionDescription = RTCSessionDescription2;
global.RTCIceCandidate = RTCIceCandidate2;