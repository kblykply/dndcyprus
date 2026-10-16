/* La Joya — 360° sahneler.
 * Panoramalar projenin kendi render'larından üretildi (Kling equirectangular →
 * equi2cube ile Marzipano küp karoları). Karolar assets/tiles/ altında.
 */
var APP_DATA = {
 "scenes": [
  {
   "id": "lj-court",
   "name": "Havuz Avlusu",
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
   "linkHotspots": [
    {
     "yaw": 2.6179938779914944,
     "pitch": -0.03490658503988659,
     "rotation": 0,
     "target": "lj-roof360"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "lj-roof360",
   "name": "Çatı Terası",
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
    "yaw": -0.523599,
    "fov": 1.5707963267948966
   },
   "linkHotspots": [
    {
     "yaw": -0.5235987755982988,
     "pitch": -0.06981317007977318,
     "rotation": 0,
     "target": "lj-court"
    },
    {
     "yaw": 2.0943951023931953,
     "pitch": -0.10471975511965977,
     "rotation": 0,
     "target": "lj-bed360"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "lj-bed360",
   "name": "Yatak Odası",
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
    "pitch": 0.20944,
    "yaw": 0.087266,
    "fov": 1.5707963267948966
   },
   "linkHotspots": [
    {
     "yaw": -2.6179938779914944,
     "pitch": -0.06981317007977318,
     "rotation": 0,
     "target": "lj-roof360"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "lj-aerial",
   "name": "lj-aerial",
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
    "pitch": 0.488692,
    "yaw": 0.0,
    "fov": 1.5707963267948966
   },
   "linkHotspots": [
    {
     "yaw": -0.20944,
     "pitch": -0.10472,
     "rotation": 0,
     "target": "lj-cabana"
    },
    {
     "yaw": -1.937315,
     "pitch": -0.139626,
     "rotation": 0,
     "target": "lj-facades"
    },
    {
     "yaw": 1.256637,
     "pitch": 0.113446,
     "rotation": 0,
     "target": "lj-court"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "lj-cabana",
   "name": "lj-cabana",
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
     "yaw": -0.15708,
     "pitch": -0.15708,
     "rotation": 0,
     "target": "lj-aerial"
    },
    {
     "yaw": -1.570796,
     "pitch": 0.113446,
     "rotation": 0,
     "target": "lj-court"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "lj-facades",
   "name": "lj-facades",
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
     "yaw": 0.261799,
     "pitch": 0.261799,
     "rotation": 0,
     "target": "lj-court"
    },
    {
     "yaw": -1.570796,
     "pitch": -0.061087,
     "rotation": 0,
     "target": "lj-roof360"
    },
    {
     "yaw": 1.884956,
     "pitch": -0.10472,
     "rotation": 0,
     "target": "lj-street"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "lj-street",
   "name": "lj-street",
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
     "pitch": 0.113446,
     "rotation": 0,
     "target": "lj-facades"
    },
    {
     "yaw": 0.628319,
     "pitch": -0.122173,
     "rotation": 0,
     "target": "lj-roof360"
    }
   ],
   "infoHotspots": []
  },
  {
   "id": "lj-balcony",
   "name": "lj-balcony",
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
     "yaw": -2.225295,
     "pitch": 0.401426,
     "rotation": 0,
     "target": "lj-court"
    }
   ],
   "infoHotspots": []
  }
 ]
};
