/* Mariachi Beach Club — 360° sahneler (üretilmiş panoramalar). */
var APP_DATA = {
 "scenes": [
  {
   "id": "mc-deck360",
   "name": "İskele Güvertesi",
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
     "yaw": 0.0,
     "pitch": -0.05235987755982988,
     "rotation": 0,
     "target": "mc-rest360"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "mc-rest360",
   "name": "Restoran",
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
    "pitch": 0.174533,
    "yaw": 0.0,
    "fov": 1.5707963267948966
   },
   "linkHotspots": [
    {
     "yaw": 3.0543261909900763,
     "pitch": -0.05235987755982988,
     "rotation": 0,
     "target": "mc-deck360"
    },
    {
     "yaw": -1.5707963267948966,
     "pitch": -0.06981317007977318,
     "rotation": 0,
     "target": "mc-lounge360"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "mc-lounge360",
   "name": "Lounge & Bar",
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
    "pitch": 0.174533,
    "yaw": -2.059489,
    "fov": 1.5707963267948966
   },
   "linkHotspots": [
    {
     "yaw": 0.0,
     "pitch": -0.06981317007977318,
     "rotation": 0,
     "target": "mc-rest360"
    },
    {
     "yaw": 3.141592653589793,
     "pitch": -0.06981317007977318,
     "rotation": 0,
     "target": "mc-deck360"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "mc-front",
   "name": "mc-front",
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
     "yaw": 0.0,
     "pitch": 0.174533,
     "rotation": 0,
     "target": "mc-deck360"
    },
    {
     "yaw": -1.570796,
     "pitch": 0.017453,
     "rotation": 0,
     "target": "mc-beach"
    },
    {
     "yaw": 0.837758,
     "pitch": -0.139626,
     "rotation": 0,
     "target": "mc-rest360"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "mc-aerial",
   "name": "mc-aerial",
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
    "pitch": 0.523599,
    "yaw": 0.0,
    "fov": 1.5707963267948966
   },
   "linkHotspots": [
    {
     "yaw": -1.047198,
     "pitch": -0.191986,
     "rotation": 0,
     "target": "mc-pool"
    },
    {
     "yaw": 0.628319,
     "pitch": 0.174533,
     "rotation": 0,
     "target": "mc-beach"
    },
    {
     "yaw": 1.570796,
     "pitch": 0.02618,
     "rotation": 0,
     "target": "mc-deck360"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "mc-beach",
   "name": "mc-beach",
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
     "yaw": -1.047198,
     "pitch": -0.10472,
     "rotation": 0,
     "target": "mc-pool"
    },
    {
     "yaw": 1.151917,
     "pitch": 0.174533,
     "rotation": 0,
     "target": "mc-deck360"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "mc-cabanas",
   "name": "mc-cabanas",
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
    "pitch": 0.174533,
    "yaw": 0.0,
    "fov": 1.5707963267948966
   },
   "linkHotspots": [
    {
     "yaw": -0.523599,
     "pitch": 0.113446,
     "rotation": 0,
     "target": "mc-deck360"
    },
    {
     "yaw": -1.884956,
     "pitch": -0.10472,
     "rotation": 0,
     "target": "mc-beach"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "mc-pool",
   "name": "mc-pool",
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
    "pitch": 0.174533,
    "yaw": 0.0,
    "fov": 1.5707963267948966
   },
   "linkHotspots": [
    {
     "yaw": 0.0,
     "pitch": -0.10472,
     "rotation": 0,
     "target": "mc-rest360"
    },
    {
     "yaw": -1.361357,
     "pitch": 0.20944,
     "rotation": 0,
     "target": "mc-beach"
    }
   ],
   "infoHotspots": []
  }
 ]
};
