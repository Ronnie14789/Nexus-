export type Severity = 'low' | 'medium' | 'high' | 'critical';

export interface Evidence {
  id: string;
  label: string;
  weight: number;
}
export interface Cause {
  id: string;
  title: string;
  mechanism: string;
  baseScore: number;
  supports: string[];
  contradicts?: string[];
  tests: string[];
  verification: string[];
  knowledgeRefs: string[];
}
export interface DiagnosticModel {
  id: string;
  domain: string;
  title: string;
  summary: string;
  symptoms: string[];
  evidence: Evidence[];
  causes: Cause[];
}

export const diagnosticModels: DiagnosticModel[] = [
  {
    "id": "engine-knock",
    "domain": "Engine rotating assembly",
    "title": "Abnormal crankcase knock",
    "summary": "Separates localized bearing distress, combustion knock and external mechanical noise.",
    "symptoms": [
      "engine knock",
      "crankcase noise",
      "noise under load"
    ],
    "evidence": [
      {
        "id": "load",
        "label": "Noise increases under load",
        "weight": 16
      },
      {
        "id": "heat",
        "label": "Localized connecting-rod or journal heat marks",
        "weight": 24
      },
      {
        "id": "rotation",
        "label": "Bearing rotation or seizure evidence",
        "weight": 28
      },
      {
        "id": "mains-ok",
        "label": "Main bearings comparatively undamaged",
        "weight": 12
      },
      {
        "id": "external-ok",
        "label": "External accessories checked and secure",
        "weight": 8
      }
    ],
    "causes": [
      {
        "id": "rod-bearing",
        "title": "Localized connecting-rod bearing failure",
        "mechanism": "Loss of oil-film integrity causes abnormal contact, heat and journal scoring.",
        "baseScore": 34,
        "supports": [
          "load",
          "heat",
          "rotation",
          "mains-ok"
        ],
        "tests": [
          "Measure the affected journal",
          "Inspect oil feed passages",
          "Check connecting-rod big-end distortion",
          "Compare all bearings"
        ],
        "verification": [
          "Oil pressure meets specification",
          "No abnormal noise remains",
          "Clearances and tightening are documented"
        ],
        "knowledgeRefs": [
          "NAI-AUT-001"
        ]
      },
      {
        "id": "combustion",
        "title": "Combustion-related knock",
        "mechanism": "Injector, timing or cylinder imbalance creates a load-sensitive knock.",
        "baseScore": 18,
        "supports": [
          "load"
        ],
        "contradicts": [
          "heat",
          "rotation"
        ],
        "tests": [
          "Run cylinder contribution test",
          "Review injector correction values",
          "Check rail-pressure stability"
        ],
        "verification": [
          "Cylinder contribution is balanced",
          "Noise is absent through the load range"
        ],
        "knowledgeRefs": [
          "NAI-AUT-004"
        ]
      },
      {
        "id": "external",
        "title": "External rotating-component noise",
        "mechanism": "Loose or damaged accessories transfer noise into the engine structure.",
        "baseScore": 14,
        "supports": [],
        "contradicts": [
          "external-ok",
          "rotation"
        ],
        "tests": [
          "Inspect accessory drive",
          "Check mounts and pulleys"
        ],
        "verification": [
          "Noise source is physically isolated"
        ],
        "knowledgeRefs": [
          "NAI-AUT-001"
        ]
      }
    ]
  },
  {
    "id": "rail-pressure",
    "domain": "Fuel & injection",
    "title": "Low common-rail pressure",
    "summary": "Ranks supply restriction, air ingress, injector leak-off and pressure-control faults.",
    "symptoms": [
      "hard starting",
      "low pulling power",
      "low rail pressure",
      "0559"
    ],
    "evidence": [
      {
        "id": "gap",
        "label": "Commanded pressure remains far above measured pressure",
        "weight": 28
      },
      {
        "id": "air",
        "label": "Air bubbles or loss of priming observed",
        "weight": 22
      },
      {
        "id": "filter",
        "label": "Filter or separator restriction found",
        "weight": 16
      },
      {
        "id": "return",
        "label": "Injector return flow excessive",
        "weight": 24
      },
      {
        "id": "control",
        "label": "IMV or regulator command abnormal",
        "weight": 20
      }
    ],
    "causes": [
      {
        "id": "supply",
        "title": "Low-pressure restriction or air ingress",
        "mechanism": "The high-pressure pump cannot receive stable, bubble-free fuel.",
        "baseScore": 30,
        "supports": [
          "air",
          "filter",
          "gap"
        ],
        "tests": [
          "Observe fuel for bubbles",
          "Measure low-side restriction",
          "Inspect priming-pump seals and unions"
        ],
        "verification": [
          "Fuel remains bubble-free",
          "Rail pressure builds within the required starting time"
        ],
        "knowledgeRefs": [
          "NAI-AUT-004",
          "NAI-AUT-005"
        ]
      },
      {
        "id": "leakoff",
        "title": "Excessive injector return leakage",
        "mechanism": "Internal injector leakage prevents rail pressure from reaching command.",
        "baseScore": 24,
        "supports": [
          "return",
          "gap"
        ],
        "tests": [
          "Perform injector return-flow comparison",
          "Inspect fuel contamination"
        ],
        "verification": [
          "Return flow is within specification",
          "Measured pressure follows command"
        ],
        "knowledgeRefs": [
          "NAI-AUT-004"
        ]
      },
      {
        "id": "control-fault",
        "title": "IMV or rail-pressure regulator fault",
        "mechanism": "Fuel metering or pressure control cannot regulate the rail correctly.",
        "baseScore": 22,
        "supports": [
          "control",
          "gap"
        ],
        "tests": [
          "Check IMV supply, ground and command",
          "Inspect regulator condition",
          "Run an actuator test where supported"
        ],
        "verification": [
          "Control response is stable",
          "No pressure-control fault returns"
        ],
        "knowledgeRefs": [
          "NAI-AUT-004"
        ]
      }
    ]
  },
  {
    "id": "range-shift",
    "domain": "Transmission",
    "title": "High/low range engagement failure",
    "summary": "Maps synchronization, actuation and shaft-support faults.",
    "symptoms": [
      "high range",
      "low range",
      "gear grinding"
    ],
    "evidence": [
      {
        "id": "both",
        "label": "Both high and low range are affected",
        "weight": 16
      },
      {
        "id": "synchro",
        "label": "Synchro cone, ring or sleeve damage confirmed",
        "weight": 28
      },
      {
        "id": "bearing",
        "label": "Bearing fit or shaft support is loose",
        "weight": 24
      },
      {
        "id": "debris",
        "label": "Metal particles are present in the oil",
        "weight": 18
      },
      {
        "id": "actuator",
        "label": "External range actuator operates correctly",
        "weight": 14
      }
    ],
    "causes": [
      {
        "id": "sync",
        "title": "Range synchronizer failure",
        "mechanism": "Damaged friction and engagement surfaces cannot synchronize speed.",
        "baseScore": 34,
        "supports": [
          "synchro",
          "both",
          "actuator"
        ],
        "tests": [
          "Inspect cone contact",
          "Measure sleeve and ring wear",
          "Check engagement teeth"
        ],
        "verification": [
          "Range changes smoothly",
          "No grinding or delayed engagement remains"
        ],
        "knowledgeRefs": [
          "NAI-AUT-002"
        ]
      },
      {
        "id": "support",
        "title": "Shaft or bearing-support misalignment",
        "mechanism": "Loss of support displaces the gear train and causes secondary damage.",
        "baseScore": 28,
        "supports": [
          "bearing",
          "debris"
        ],
        "tests": [
          "Check shaft and bearing fit",
          "Inspect the housing bore",
          "Measure end float and alignment"
        ],
        "verification": [
          "Bearing retention and alignment meet specification"
        ],
        "knowledgeRefs": [
          "NAI-AUT-002",
          "NAI-AUT-015"
        ]
      },
      {
        "id": "actuation",
        "title": "Range actuation fault",
        "mechanism": "Incomplete selector travel prevents full mechanical engagement.",
        "baseScore": 18,
        "supports": [
          "both"
        ],
        "contradicts": [
          "actuator"
        ],
        "tests": [
          "Measure actuator travel",
          "Check control command",
          "Inspect selector fork"
        ],
        "verification": [
          "Full travel and positive engagement are confirmed"
        ],
        "knowledgeRefs": [
          "NAI-AUT-002"
        ]
      }
    ]
  },
  {
    "id": "clutch-return",
    "domain": "Clutch control",
    "title": "Clutch pedal does not return",
    "summary": "Separates pedal binding, booster leakage and master-cylinder piston recovery faults.",
    "symptoms": [
      "clutch pedal stuck",
      "pedal not returning",
      "booster leak"
    ],
    "evidence": [
      {
        "id": "booster-leak",
        "label": "Air leakage at booster joints",
        "weight": 28
      },
      {
        "id": "master-sticks",
        "label": "Master-cylinder piston does not return",
        "weight": 28
      },
      {
        "id": "link-free",
        "label": "Pedal linkage moves freely",
        "weight": 14
      },
      {
        "id": "fluid-leak",
        "label": "Hydraulic leakage or fluid loss found",
        "weight": 20
      }
    ],
    "causes": [
      {
        "id": "booster",
        "title": "Clutch-booster sealing failure",
        "mechanism": "Pressure leakage prevents consistent assisted movement and recovery.",
        "baseScore": 30,
        "supports": [
          "booster-leak",
          "link-free"
        ],
        "tests": [
          "Leak-test booster joints",
          "Check supply pressure and actuator travel"
        ],
        "verification": [
          "No leakage remains",
          "Pedal returns repeatedly"
        ],
        "knowledgeRefs": [
          "NAI-AUT-003"
        ]
      },
      {
        "id": "master",
        "title": "Master-cylinder piston sticking",
        "mechanism": "The piston cannot recover and reopen the compensation path after release.",
        "baseScore": 30,
        "supports": [
          "master-sticks",
          "link-free"
        ],
        "tests": [
          "Observe piston recovery",
          "Inspect fluid condition and bore operation"
        ],
        "verification": [
          "Piston and pedal return fully",
          "Clutch disengagement is normal"
        ],
        "knowledgeRefs": [
          "NAI-AUT-003"
        ]
      },
      {
        "id": "mechanical",
        "title": "Pedal or linkage binding",
        "mechanism": "Mechanical resistance prevents pedal return independently of hydraulic or pneumatic control.",
        "baseScore": 18,
        "supports": [],
        "contradicts": [
          "link-free"
        ],
        "tests": [
          "Disconnect and inspect pedal linkage",
          "Check pivot and return spring"
        ],
        "verification": [
          "Free movement is confirmed"
        ],
        "knowledgeRefs": [
          "NAI-AUT-003"
        ]
      }
    ]
  },
  {
    "id": "hard-steering",
    "domain": "Steering",
    "title": "Steering remains very hard",
    "summary": "Separates pump-output loss, suction-side air entry and mechanical restriction.",
    "symptoms": [
      "hard steering",
      "heavy steering",
      "no assistance"
    ],
    "evidence": [
      {
        "id": "bled",
        "label": "System was bled but remains hard",
        "weight": 18
      },
      {
        "id": "pump-low",
        "label": "Pump pressure or flow is below specification",
        "weight": 30
      },
      {
        "id": "foam",
        "label": "Fluid foaming or pump cavitation noise is present",
        "weight": 20
      },
      {
        "id": "link-free",
        "label": "Mechanical linkage moves freely when isolated",
        "weight": 18
      },
      {
        "id": "binding",
        "label": "Mechanical binding is confirmed",
        "weight": 26
      }
    ],
    "causes": [
      {
        "id": "pump",
        "title": "Hydraulic steering-pump failure",
        "mechanism": "The pump cannot generate the flow and pressure required for assistance.",
        "baseScore": 34,
        "supports": [
          "pump-low",
          "bled",
          "link-free"
        ],
        "tests": [
          "Perform pressure and flow test",
          "Inspect pump drive and suction line"
        ],
        "verification": [
          "Steering effort and hydraulic output meet specification"
        ],
        "knowledgeRefs": [
          "NAI-AUT-006"
        ]
      },
      {
        "id": "air",
        "title": "Air ingress on the suction side",
        "mechanism": "Air entry causes cavitation and unstable pump delivery.",
        "baseScore": 24,
        "supports": [
          "foam",
          "bled"
        ],
        "tests": [
          "Inspect suction hose and clamps",
          "Check reservoir and return flow"
        ],
        "verification": [
          "Fluid remains clear and noise-free"
        ],
        "knowledgeRefs": [
          "NAI-AUT-006"
        ]
      },
      {
        "id": "mechanical",
        "title": "Steering gear or linkage restriction",
        "mechanism": "Mechanical friction prevents movement regardless of hydraulic assistance.",
        "baseScore": 22,
        "supports": [
          "binding"
        ],
        "contradicts": [
          "link-free"
        ],
        "tests": [
          "Isolate linkage",
          "Inspect joints, kingpins and steering gear"
        ],
        "verification": [
          "Free movement is confirmed through full travel"
        ],
        "knowledgeRefs": [
          "NAI-AUT-006"
        ]
      }
    ]
  },
  {
    "id": "low-air-pressure",
    "domain": "Air & braking",
    "title": "Air pressure builds slowly or remains low",
    "summary": "Ranks external leakage, DDU/unloader faults, compressor output and delivery restriction.",
    "symptoms": [
      "low air pressure",
      "slow pressure build",
      "air leak"
    ],
    "evidence": [
      {
        "id": "external-leak",
        "label": "External air leakage is confirmed",
        "weight": 26
      },
      {
        "id": "unloader",
        "label": "DDU or unloader valve leaks continuously",
        "weight": 30
      },
      {
        "id": "compressor-low",
        "label": "Compressor delivery is below specification",
        "weight": 28
      },
      {
        "id": "holds-off",
        "label": "Pressure holds when the engine is stopped",
        "weight": 14
      },
      {
        "id": "restriction",
        "label": "Delivery pipe or dryer restriction found",
        "weight": 22
      }
    ],
    "causes": [
      {
        "id": "unloader-fault",
        "title": "DDU or unloader leakage",
        "mechanism": "Compressed air is discharged before system pressure can accumulate.",
        "baseScore": 34,
        "supports": [
          "unloader"
        ],
        "tests": [
          "Leak-test the unloader assembly",
          "Check governor control lines"
        ],
        "verification": [
          "System reaches cut-out pressure without leakage"
        ],
        "knowledgeRefs": [
          "NAI-AUT-007"
        ]
      },
      {
        "id": "system-leak",
        "title": "External pneumatic leakage",
        "mechanism": "Air loss exceeds compressor replenishment capacity.",
        "baseScore": 28,
        "supports": [
          "external-leak"
        ],
        "tests": [
          "Perform leak test",
          "Isolate circuits",
          "Measure pressure-loss rate"
        ],
        "verification": [
          "Pressure-loss rate meets specification"
        ],
        "knowledgeRefs": [
          "NAI-AUT-007",
          "NAI-AUT-008"
        ]
      },
      {
        "id": "compressor",
        "title": "Low compressor output or delivery restriction",
        "mechanism": "The compressor cannot deliver sufficient air or the delivery path is restricted.",
        "baseScore": 24,
        "supports": [
          "compressor-low",
          "restriction",
          "holds-off"
        ],
        "tests": [
          "Measure compressor output",
          "Inspect delivery pipe and dryer",
          "Check intake restriction"
        ],
        "verification": [
          "Pressure build time meets specification"
        ],
        "knowledgeRefs": [
          "NAI-AUT-007"
        ]
      }
    ]
  },
  {
    "id": "brake-actuator",
    "domain": "Air & braking",
    "title": "Unstable braking with pressure drop",
    "summary": "Separates actuator leakage, circuit leakage and foundation-brake imbalance.",
    "symptoms": [
      "brake actuator leak",
      "spring brake engages",
      "pressure drops"
    ],
    "evidence": [
      {
        "id": "chamber-leak",
        "label": "Brake actuator leaks",
        "weight": 30
      },
      {
        "id": "stroke-difference",
        "label": "Pushrod stroke differs across the axle",
        "weight": 24
      },
      {
        "id": "pressure-drop",
        "label": "Rapid dashboard pressure drop occurs",
        "weight": 24
      },
      {
        "id": "spring-event",
        "label": "Spring brake engages without driver command",
        "weight": 28
      },
      {
        "id": "shoes-ok",
        "label": "Foundation brake friction parts are serviceable",
        "weight": 12
      }
    ],
    "causes": [
      {
        "id": "actuator-failure",
        "title": "Brake-actuator sealing failure",
        "mechanism": "Loss of chamber integrity produces unstable force transmission and pressure loss.",
        "baseScore": 36,
        "supports": [
          "chamber-leak",
          "stroke-difference",
          "pressure-drop",
          "spring-event"
        ],
        "tests": [
          "Leak-test actuator",
          "Compare pushrod stroke",
          "Check release pressure"
        ],
        "verification": [
          "No leakage remains",
          "Stroke is balanced",
          "Service and parking brakes are stable"
        ],
        "knowledgeRefs": [
          "NAI-AUT-008"
        ]
      },
      {
        "id": "circuit-leak",
        "title": "Pneumatic circuit leakage",
        "mechanism": "Air loss elsewhere reduces actuator pressure and can trigger spring-brake application.",
        "baseScore": 24,
        "supports": [
          "pressure-drop",
          "spring-event"
        ],
        "contradicts": [
          "chamber-leak"
        ],
        "tests": [
          "Isolate circuits",
          "Measure pressure-loss rate",
          "Inspect hoses and valves"
        ],
        "verification": [
          "Circuit holds pressure"
        ],
        "knowledgeRefs": [
          "NAI-AUT-007",
          "NAI-AUT-008"
        ]
      },
      {
        "id": "foundation",
        "title": "Foundation-brake imbalance",
        "mechanism": "Mechanical brake differences produce unequal force even with correct chamber pressure.",
        "baseScore": 18,
        "supports": [
          "stroke-difference"
        ],
        "contradicts": [
          "shoes-ok",
          "chamber-leak"
        ],
        "tests": [
          "Inspect adjustment, cam, shoes and drum",
          "Compare mechanical travel"
        ],
        "verification": [
          "Brake force is balanced"
        ],
        "knowledgeRefs": [
          "NAI-AUT-008"
        ]
      }
    ]
  },
  {
    "id": "battery-retention",
    "domain": "Electrical",
    "title": "Battery does not retain charge",
    "summary": "Separates battery internal failure, charging-circuit resistance and key-off draw.",
    "symptoms": [
      "battery drains",
      "not retaining voltage",
      "hard starting"
    ],
    "evidence": [
      {
        "id": "alt-ok",
        "label": "Alternator charging output is normal",
        "weight": 28
      },
      {
        "id": "load-fail",
        "label": "Battery fails load or conductance test",
        "weight": 30
      },
      {
        "id": "drop",
        "label": "High cable or ground voltage drop is measured",
        "weight": 26
      },
      {
        "id": "draw",
        "label": "Abnormal key-off current draw is measured",
        "weight": 24
      }
    ],
    "causes": [
      {
        "id": "battery",
        "title": "Battery internal failure",
        "mechanism": "The battery cannot accept or retain charge despite normal alternator output.",
        "baseScore": 34,
        "supports": [
          "alt-ok",
          "load-fail"
        ],
        "tests": [
          "Fully charge and retest battery",
          "Perform load or conductance test"
        ],
        "verification": [
          "Battery retains voltage and passes the required test"
        ],
        "knowledgeRefs": [
          "NAI-AUT-009"
        ]
      },
      {
        "id": "circuit",
        "title": "Charging-circuit resistance",
        "mechanism": "Cable or ground resistance prevents charging current from reaching the battery.",
        "baseScore": 28,
        "supports": [
          "drop"
        ],
        "tests": [
          "Perform positive and negative voltage-drop tests",
          "Inspect terminals and links"
        ],
        "verification": [
          "Voltage drop is within specification"
        ],
        "knowledgeRefs": [
          "NAI-AUT-009"
        ]
      },
      {
        "id": "parasitic",
        "title": "Excessive key-off electrical draw",
        "mechanism": "A load remains active after shutdown and discharges a serviceable battery.",
        "baseScore": 24,
        "supports": [
          "draw",
          "alt-ok"
        ],
        "tests": [
          "Measure stabilized key-off current",
          "Isolate circuits by fuse"
        ],
        "verification": [
          "Key-off current returns to an acceptable level"
        ],
        "knowledgeRefs": [
          "NAI-AUT-009"
        ]
      }
    ]
  },
  {
    "id": "overcharging",
    "domain": "Electrical",
    "title": "Charging voltage is excessively high",
    "summary": "Ranks regulator, sensing, ground and alternator-control faults.",
    "symptoms": [
      "32 volts",
      "overcharging",
      "battery heats"
    ],
    "evidence": [
      {
        "id": "high-voltage",
        "label": "Charging voltage is measured near 28–32 V",
        "weight": 32
      },
      {
        "id": "meter-ok",
        "label": "High reading is confirmed with a known-good meter",
        "weight": 18
      },
      {
        "id": "sense-fault",
        "label": "Voltage-sense wiring fault is found",
        "weight": 26
      },
      {
        "id": "ground-fault",
        "label": "Alternator or battery ground resistance is high",
        "weight": 22
      },
      {
        "id": "regulator-fail",
        "label": "Regulator test fails",
        "weight": 30
      }
    ],
    "causes": [
      {
        "id": "regulator",
        "title": "Alternator voltage-regulator failure",
        "mechanism": "The regulator cannot limit field current and system voltage.",
        "baseScore": 36,
        "supports": [
          "high-voltage",
          "meter-ok",
          "regulator-fail"
        ],
        "tests": [
          "Confirm voltage at alternator and battery",
          "Test regulation according to service instructions"
        ],
        "verification": [
          "Charging voltage remains stable within the specified range"
        ],
        "knowledgeRefs": [
          "NAI-AUT-010"
        ]
      },
      {
        "id": "sense",
        "title": "Voltage-sense circuit fault",
        "mechanism": "Incorrect sensed voltage causes excessive output.",
        "baseScore": 28,
        "supports": [
          "high-voltage",
          "sense-fault"
        ],
        "tests": [
          "Inspect sense wiring and connections",
          "Compare sensed and actual voltage"
        ],
        "verification": [
          "Sense and battery voltages agree"
        ],
        "knowledgeRefs": [
          "NAI-AUT-010"
        ]
      },
      {
        "id": "ground",
        "title": "Charging-system ground fault",
        "mechanism": "Ground resistance distorts the regulator reference.",
        "baseScore": 22,
        "supports": [
          "ground-fault",
          "high-voltage"
        ],
        "tests": [
          "Perform loaded ground voltage-drop test",
          "Inspect engine and chassis grounds"
        ],
        "verification": [
          "Ground voltage drop is within specification"
        ],
        "knowledgeRefs": [
          "NAI-AUT-010"
        ]
      }
    ]
  },
  {
    "id": "turbo-failure",
    "domain": "Engine air system",
    "title": "Turbocharger seizure or oil carryover",
    "summary": "Separates lubrication failure, drain restriction, foreign-object damage and blow-by.",
    "symptoms": [
      "turbo seized",
      "oil in intercooler",
      "low power"
    ],
    "evidence": [
      {
        "id": "shaft-seized",
        "label": "Turbo shaft is seized or heavily restricted",
        "weight": 32
      },
      {
        "id": "oil-pipes",
        "label": "Oil is present in charge-air pipes",
        "weight": 22
      },
      {
        "id": "wheel-damage",
        "label": "Compressor or turbine wheel damage is present",
        "weight": 26
      },
      {
        "id": "feed-fault",
        "label": "Oil-feed restriction or low supply is found",
        "weight": 28
      },
      {
        "id": "drain-fault",
        "label": "Oil-drain restriction is found",
        "weight": 24
      }
    ],
    "causes": [
      {
        "id": "lubrication",
        "title": "Turbocharger lubrication failure",
        "mechanism": "Insufficient oil supply damages the shaft and bearing system.",
        "baseScore": 34,
        "supports": [
          "shaft-seized",
          "feed-fault"
        ],
        "tests": [
          "Inspect and verify oil feed",
          "Check engine oil pressure and contamination"
        ],
        "verification": [
          "Oil supply is confirmed before replacement"
        ],
        "knowledgeRefs": [
          "NAI-AUT-013"
        ]
      },
      {
        "id": "drain",
        "title": "Turbocharger oil-drain restriction",
        "mechanism": "Restricted return flow causes oil retention and leakage into the air path.",
        "baseScore": 26,
        "supports": [
          "oil-pipes",
          "drain-fault"
        ],
        "tests": [
          "Inspect drain line and crankcase pressure",
          "Check drain routing"
        ],
        "verification": [
          "Drain flow and crankcase pressure are normal"
        ],
        "knowledgeRefs": [
          "NAI-AUT-013"
        ]
      },
      {
        "id": "foreign-object",
        "title": "Foreign-object or wheel damage",
        "mechanism": "Debris impact damages wheel balance and shaft rotation.",
        "baseScore": 24,
        "supports": [
          "wheel-damage",
          "shaft-seized"
        ],
        "tests": [
          "Inspect intake and exhaust paths",
          "Identify debris origin"
        ],
        "verification": [
          "Air and exhaust paths are clean"
        ],
        "knowledgeRefs": [
          "NAI-AUT-013"
        ]
      }
    ]
  },
  {
    "id": "overheating",
    "domain": "Engine cooling",
    "title": "Severe overheating with reservoir bubbles",
    "summary": "Ranks combustion leakage, coolant-flow failure and external cooling faults.",
    "symptoms": [
      "overheating",
      "bubbles in tank",
      "head gasket"
    ],
    "evidence": [
      {
        "id": "bubbles",
        "label": "Continuous bubbles appear in the expansion tank",
        "weight": 28
      },
      {
        "id": "gasket-mark",
        "label": "Head-gasket burn or leakage path is visible",
        "weight": 30
      },
      {
        "id": "pressure-rise",
        "label": "Cooling pressure rises rapidly from cold",
        "weight": 24
      },
      {
        "id": "flow-fault",
        "label": "Coolant-flow restriction or pump fault is found",
        "weight": 24
      },
      {
        "id": "external-leak",
        "label": "External coolant leakage is found",
        "weight": 18
      }
    ],
    "causes": [
      {
        "id": "combustion-leak",
        "title": "Combustion leakage through the head gasket or sealing surface",
        "mechanism": "Cylinder pressure enters the cooling system and displaces coolant.",
        "baseScore": 36,
        "supports": [
          "bubbles",
          "gasket-mark",
          "pressure-rise"
        ],
        "tests": [
          "Pressure-test cooling system",
          "Test for combustion gases",
          "Check head and block flatness"
        ],
        "verification": [
          "No bubbles or combustion leakage remain",
          "Temperature stays controlled under load"
        ],
        "knowledgeRefs": [
          "NAI-AUT-014"
        ]
      },
      {
        "id": "flow",
        "title": "Coolant-flow failure",
        "mechanism": "Pump, thermostat or radiator restriction prevents heat removal.",
        "baseScore": 26,
        "supports": [
          "flow-fault"
        ],
        "tests": [
          "Check thermostat operation",
          "Inspect pump flow and radiator condition"
        ],
        "verification": [
          "Coolant circulation and temperature control are normal"
        ],
        "knowledgeRefs": [
          "NAI-AUT-014"
        ]
      },
      {
        "id": "external",
        "title": "External coolant loss or pressure-control fault",
        "mechanism": "Coolant loss or cap failure reduces heat-transfer capacity.",
        "baseScore": 20,
        "supports": [
          "external-leak"
        ],
        "contradicts": [
          "gasket-mark"
        ],
        "tests": [
          "Inspect leaks and cap",
          "Pressure-test the circuit"
        ],
        "verification": [
          "System holds pressure and coolant level remains stable"
        ],
        "knowledgeRefs": [
          "NAI-AUT-014"
        ]
      }
    ]
  },
  {
    "id": "starter-no-crank",
    "domain": "Starting system",
    "title": "No crank with starter pinion non-engagement",
    "summary": "Separates battery/cable faults, control-circuit faults and starter-solenoid failure.",
    "symptoms": [
      "no crank",
      "starter clicks",
      "pinion not engaging"
    ],
    "evidence": [
      {
        "id": "battery-ok",
        "label": "Battery condition is serviceable",
        "weight": 18
      },
      {
        "id": "command-ok",
        "label": "Start-command voltage reaches the solenoid",
        "weight": 24
      },
      {
        "id": "drop-ok",
        "label": "Positive and ground voltage drops are acceptable",
        "weight": 20
      },
      {
        "id": "solenoid-no-move",
        "label": "Solenoid does not move the pinion correctly",
        "weight": 30
      },
      {
        "id": "engine-free",
        "label": "Engine rotates freely by the approved check",
        "weight": 16
      }
    ],
    "causes": [
      {
        "id": "solenoid",
        "title": "Starter-solenoid or engagement-mechanism failure",
        "mechanism": "The pinion is not moved into engagement despite an available command.",
        "baseScore": 36,
        "supports": [
          "command-ok",
          "drop-ok",
          "solenoid-no-move",
          "engine-free"
        ],
        "tests": [
          "Check solenoid movement and starter current",
          "Inspect engagement mechanism"
        ],
        "verification": [
          "Pinion engages consistently and cranking speed is normal"
        ],
        "knowledgeRefs": [
          "NAI-AUT-012"
        ]
      },
      {
        "id": "supply",
        "title": "Battery or high-current cable fault",
        "mechanism": "Insufficient current reaches the starter.",
        "baseScore": 26,
        "supports": [],
        "contradicts": [
          "battery-ok",
          "drop-ok"
        ],
        "tests": [
          "Load-test battery",
          "Perform cable voltage-drop tests"
        ],
        "verification": [
          "Cranking voltage and current are acceptable"
        ],
        "knowledgeRefs": [
          "NAI-AUT-009",
          "NAI-AUT-012"
        ]
      },
      {
        "id": "control",
        "title": "Start-control circuit fault",
        "mechanism": "The solenoid does not receive a valid command through the interlock circuit.",
        "baseScore": 24,
        "supports": [],
        "contradicts": [
          "command-ok"
        ],
        "tests": [
          "Check start relay, switch and interlocks",
          "Trace control voltage"
        ],
        "verification": [
          "Reliable command reaches the solenoid"
        ],
        "knowledgeRefs": [
          "NAI-AUT-012"
        ]
      }
    ]
  }
];
