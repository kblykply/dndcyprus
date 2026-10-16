/* Geçitkale — 360° arazi sahnesi (üretilmiş panorama). */
var APP_DATA = {
 "scenes": [
  {
   "id": "gk-field360",
   "name": "Arazi — 360°",
   "levels": [
    {
     "tileSize": 256,
     "size": 256,
     "fallbackOnly": true
    },
    {
     "tileSize": 512,
     "size": 512
    },
    {
     "tileSize": 512,
     "size": 1024
    },
    {
     "tileSize": 512,
     "size": 2048
    }
   ],
   "faceSize": 2048,
   "initialViewParameters": {
    "pitch": 0.10472,
    "yaw": 0.0,
    "fov": 1.5707963267948966
   },
   "linkHotspots": [],
   "infoHotspots": []
  },
  {
   "id": "gk-land",
   "name": "gk-land",
   "levels": [
    {
     "tileSize": 256,
     "size": 256,
     "fallbackOnly": true
    },
    {
     "tileSize": 512,
     "size": 512
    },
    {
     "tileSize": 512,
     "size": 1024
    },
    {
     "tileSize": 512,
     "size": 2048
    }
   ],
   "faceSize": 2048,
   "initialViewParameters": {
    "pitch": 0.436332,
    "yaw": 0.0,
    "fov": 1.5707963267948966
   },
   "linkHotspots": [
    {
     "yaw": 0.0,
     "pitch": 0.02618,
     "rotation": 0,
     "target": "gk-field360"
    },
    {
     "yaw": 1.151917,
     "pitch": -0.10472,
     "rotation": 0,
     "target": "gk-parcels"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "gk-parcels",
   "name": "gk-parcels",
   "levels": [
    {
     "tileSize": 256,
     "size": 256,
     "fallbackOnly": true
    },
    {
     "tileSize": 512,
     "size": 512
    },
    {
     "tileSize": 512,
     "size": 1024
    },
    {
     "tileSize": 512,
     "size": 2048
    }
   ],
   "faceSize": 2048,
   "initialViewParameters": {
    "pitch": 0.436332,
    "yaw": 0.0,
    "fov": 1.5707963267948966
   },
   "linkHotspots": [
    {
     "yaw": 0.10472,
     "pitch": 0.113446,
     "rotation": 0,
     "target": "gk-field360"
    },
    {
     "yaw": -1.308997,
     "pitch": -0.061087,
     "rotation": 0,
     "target": "gk-horizon"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "gk-horizon",
   "name": "gk-horizon",
   "levels": [
    {
     "tileSize": 256,
     "size": 256,
     "fallbackOnly": true
    },
    {
     "tileSize": 512,
     "size": 512
    },
    {
     "tileSize": 512,
     "size": 1024
    },
    {
     "tileSize": 512,
     "size": 2048
    }
   ],
   "faceSize": 2048,
   "initialViewParameters": {
    "pitch": 0.139626,
    "yaw": 0.0,
    "fov": 1.5707963267948966
   },
   "linkHotspots": [
    {
     "yaw": -0.10472,
     "pitch": 0.069813,
     "rotation": 0,
     "target": "gk-field360"
    },
    {
     "yaw": 1.308997,
     "pitch": -0.017453,
     "rotation": 0,
     "target": "gk-land"
    }
   ],
   "infoHotspots": []
  }
 ]
};
