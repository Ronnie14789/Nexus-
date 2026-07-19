export type ServiceSystem = 'engine' | 'fuel' | 'transmission' | 'clutch' | 'steering' | 'braking' | 'electrical' | 'chassis' | 'body' | 'tyres';
export type ServiceRecordType = 'field-case' | 'fault-code' | 'diagnostic-guide' | 'inspection' | 'reporting-reference';
export type EvidenceStatus = 'measured' | 'field-observed' | 'service-history-supported' | 'requires-specification';

export interface AutomotiveServiceRecord {
  id: string;
  code: string;
  title: string;
  system: ServiceSystem;
  type: ServiceRecordType;
  vehicleClass: string;
  complaint: string;
  operatingContext: string;
  evidence: string[];
  measurements: string[];
  assessment: string;
  testPlan: string[];
  correctiveAction: string[];
  verification: string[];
  safety: string[];
  evidenceStatus: EvidenceStatus[];
  sourceSummary: string;
  keywords: string[];
}

export const serviceSystemLabels: Record<ServiceSystem, string> = {
  engine: 'Engine',
  fuel: 'Fuel & injection',
  transmission: 'Transmission',
  clutch: 'Clutch control',
  steering: 'Steering',
  braking: 'Air & braking',
  electrical: 'Electrical',
  chassis: 'Chassis & driveline',
  body: 'Cab & body',
  tyres: 'Tyres',
};

export const serviceRecordTypeLabels: Record<ServiceRecordType, string> = {
  'field-case': 'Field case',
  'fault-code': 'Fault-code case',
  'diagnostic-guide': 'Diagnostic guide',
  inspection: 'Inspection reference',
  'reporting-reference': 'Reporting reference',
};

export const serviceLibraryMetadata = {
  evidencePolicyVersion: '1.0.0',
  lastReviewed: '19 July 2026',
  owner: 'Ecatu Ronald',
} as const;

export const automotiveServiceRecords: AutomotiveServiceRecord[] = [
  {
    "id": "journal-no-2",
    "code": "NAI-AUT-001",
    "title": "No. 2 connecting-rod journal bearing rotation and localized overheating",
    "system": "engine",
    "type": "field-case",
    "vehicleClass": "Commercial vehicle diesel engine",
    "complaint": "Abnormal crankcase knock increased when the engine was under load.",
    "operatingContext": "Periodic servicing was reported as followed; oil level was at the recommended mark and no external oil leakage was observed.",
    "evidence": [
      "Bearing rotation and seizure evidence were localized at connecting-rod journal No. 2.",
      "Heat discoloration was present at the affected connecting-rod big end.",
      "Other bearings were less damaged, although some heat marks were present.",
      "Main journals were comparatively undamaged."
    ],
    "measurements": [
      "Measure journal diameter, taper and out-of-round against the exact engine specification.",
      "Measure connecting-rod big-end bore and alignment before reuse."
    ],
    "assessment": "The evidence supports a localized connecting-rod bearing failure that caused abnormal contact, heat and journal wear. It does not by itself prove the first initiating event.",
    "testPlan": [
      "Confirm the noise source before dismantling.",
      "Compare every connecting-rod and main bearing.",
      "Inspect oil drillings and supply passages.",
      "Measure the journal and connecting rod."
    ],
    "correctiveAction": [
      "Replace or recondition parts only after dimensional assessment.",
      "Clean and verify the lubrication circuit before assembly."
    ],
    "verification": [
      "Oil pressure meets specification.",
      "No abnormal crankcase noise remains.",
      "Clearances and tightening procedure are documented."
    ],
    "safety": [
      "Use approved engine-support and lifting equipment."
    ],
    "evidenceStatus": [
      "field-observed",
      "service-history-supported",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized field inspection and service-history information supplied by Ecatu Ronald.",
    "keywords": [
      "crankshaft",
      "connecting rod",
      "bearing rotation",
      "engine knock",
      "heat marks"
    ]
  },
  {
    "id": "high-low-range",
    "code": "NAI-AUT-002",
    "title": "High and low range engagement failure with synchronizer damage",
    "system": "transmission",
    "type": "diagnostic-guide",
    "vehicleClass": "Commercial vehicle range-change transmission",
    "complaint": "High and low range gears did not engage smoothly and shifting became difficult.",
    "operatingContext": "External gearbox components appeared serviceable before dismantling.",
    "evidence": [
      "Synchro cone surfaces were damaged and could not provide the required speed synchronization.",
      "Damage extended to sleeves, rings, cones, planetary gears, bearings and shaft components.",
      "Metallic debris and misalignment evidence were present."
    ],
    "measurements": [
      "Measure shaft end float, bearing fits and housing bores against transmission specifications.",
      "Inspect synchronizer cone contact and engagement clearances."
    ],
    "assessment": "Damaged synchronization surfaces prevented clean speed matching. Continued operation transferred load into related range-unit components.",
    "testPlan": [
      "Verify clutch release and external selector operation.",
      "Confirm whether high range, low range or both are affected.",
      "Inspect oil for debris.",
      "Inspect synchronization surfaces and shaft support."
    ],
    "correctiveAction": [
      "Replace confirmed damaged components.",
      "Correct bearing support or alignment before fitting new gears."
    ],
    "verification": [
      "Both ranges engage smoothly.",
      "No grinding, delay or abnormal noise remains.",
      "Oil level and leakage condition are correct."
    ],
    "safety": [
      "Support the transmission with rated equipment."
    ],
    "evidenceStatus": [
      "field-observed",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized gearbox dismantling findings supplied by Ecatu Ronald.",
    "keywords": [
      "high range",
      "low range",
      "synchro cone",
      "planetary gear",
      "gearbox"
    ]
  },
  {
    "id": "clutch-return",
    "code": "NAI-AUT-003",
    "title": "Clutch pedal non-return caused by booster leakage and master-cylinder sticking",
    "system": "clutch",
    "type": "field-case",
    "vehicleClass": "Pneumatic-assisted hydraulic clutch system",
    "complaint": "The clutch pedal did not return to its original position after driver operation.",
    "operatingContext": "The complaint was reproduced during pedal operation.",
    "evidence": [
      "Air leakage was observed from clutch-booster side joints.",
      "The master-cylinder piston did not return freely.",
      "The two failed components contributed to the same complaint."
    ],
    "measurements": [
      "Confirm system pressure and fluid condition using the applicable service procedure."
    ],
    "assessment": "Booster leakage reduced actuation integrity while the sticking master-cylinder piston prevented proper hydraulic recovery.",
    "testPlan": [
      "Inspect pedal pivot and return spring.",
      "Leak-test booster joints.",
      "Observe master-cylinder piston recovery.",
      "Check fluid level and leakage."
    ],
    "correctiveAction": [
      "Repair or replace the leaking booster.",
      "Replace the master cylinder when piston recovery remains defective."
    ],
    "verification": [
      "Pedal returns fully after repeated operation.",
      "No pneumatic or hydraulic leakage remains.",
      "Clutch release and gear engagement are normal."
    ],
    "safety": [
      "Depressurize the pneumatic circuit before disconnection."
    ],
    "evidenceStatus": [
      "field-observed"
    ],
    "sourceSummary": "Anonymized clutch-control inspection supplied by Ecatu Ronald.",
    "keywords": [
      "clutch pedal",
      "booster leak",
      "master cylinder",
      "piston return"
    ]
  },
  {
    "id": "rail-0559",
    "code": "NAI-AUT-004",
    "title": "Reported fault 0559 with a major commanded-versus-measured rail-pressure gap",
    "system": "fuel",
    "type": "fault-code",
    "vehicleClass": "Common-rail commercial vehicle diesel",
    "complaint": "Hard starting, low pulling power and unstable fuel pressure were reported.",
    "operatingContext": "The code number is application-specific and must be confirmed with the correct diagnostic documentation.",
    "evidence": [
      "Commanded rail pressure remained far above measured rail pressure.",
      "The pressure gap confirmed that the system could not achieve the control target.",
      "Potential areas included supply restriction, air ingress, injector leak-off, metering control, regulator condition and pump performance."
    ],
    "measurements": [
      "Recorded commanded pressure: 19,294 psi.",
      "Recorded measured pressure: 1,996 psi.",
      "Confirm units and scaling in the diagnostic tool for the exact application."
    ],
    "assessment": "The measured pressure was insufficient relative to the command. The gap proves a system-performance fault but not one failed component without isolation.",
    "testPlan": [
      "Verify clean low-pressure fuel supply.",
      "Check priming integrity and air ingress.",
      "Compare injector return flow.",
      "Check IMV power, ground and command.",
      "Inspect regulator and pump only after supply checks."
    ],
    "correctiveAction": [
      "Repair the confirmed restriction, leakage or control fault.",
      "Do not replace the high-pressure pump solely from the code."
    ],
    "verification": [
      "Measured pressure follows commanded pressure.",
      "Starting and pulling performance return to normal.",
      "The code does not return."
    ],
    "safety": [
      "Never open a pressurized common-rail connection."
    ],
    "evidenceStatus": [
      "measured",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized diagnostic-tool values and field complaint supplied by Ecatu Ronald.",
    "keywords": [
      "0559",
      "rail pressure",
      "19294 psi",
      "1996 psi",
      "IMV",
      "hard starting"
    ]
  },
  {
    "id": "priming-air",
    "code": "NAI-AUT-005",
    "title": "Priming-pump seal wear allowing air into the fuel system",
    "system": "fuel",
    "type": "field-case",
    "vehicleClass": "Diesel low-pressure fuel supply",
    "complaint": "The engine was difficult to start and the primer did not deliver fuel consistently.",
    "operatingContext": "The concern was associated with loss of fuel-system prime.",
    "evidence": [
      "Priming-pump seals were worn.",
      "Air entered the low-pressure circuit.",
      "Fuel delivery became unstable."
    ],
    "measurements": [
      "Use the approved low-pressure supply and restriction test for the application."
    ],
    "assessment": "Seal wear allowed air ingress, preventing stable delivery and delaying rail-pressure build-up.",
    "testPlan": [
      "Inspect primer, filter head, hoses and unions.",
      "Observe bubbles and primer resistance.",
      "Confirm that prime is retained after shutdown."
    ],
    "correctiveAction": [
      "Replace the defective primer or seal assembly and repair associated leaks."
    ],
    "verification": [
      "The system remains primed.",
      "No air is observed by the approved method.",
      "Starting time is normal."
    ],
    "safety": [
      "Protect open fuel connections from contamination."
    ],
    "evidenceStatus": [
      "field-observed"
    ],
    "sourceSummary": "Anonymized fuel-system inspection supplied by Ecatu Ronald.",
    "keywords": [
      "priming pump",
      "air ingress",
      "hard starting",
      "fuel seals"
    ]
  },
  {
    "id": "hard-steering",
    "code": "NAI-AUT-006",
    "title": "Steering remains very hard after bleeding",
    "system": "steering",
    "type": "diagnostic-guide",
    "vehicleClass": "Hydraulic power steering",
    "complaint": "Steering effort remained very high after the system was bled.",
    "operatingContext": "Bleeding alone did not restore assistance.",
    "evidence": [
      "The complaint remained after air-removal attempts.",
      "Pump delivery, suction-side air entry and mechanical restriction required separation."
    ],
    "measurements": [
      "Test pressure and flow using the correct equipment and limits for the steering system."
    ],
    "assessment": "Persistent hard steering requires measured separation of pump-output failure, suction-side air entry, steering-gear restriction and linkage binding.",
    "testPlan": [
      "Check fluid and suction hose integrity.",
      "Inspect pump drive and cavitation.",
      "Isolate mechanical linkage resistance.",
      "Perform pressure and flow testing."
    ],
    "correctiveAction": [
      "Repair the confirmed hydraulic or mechanical fault rather than replacing the pump from effort alone."
    ],
    "verification": [
      "Steering effort is normal through full travel.",
      "No foaming, leakage or abnormal noise remains.",
      "Pressure and flow meet specification."
    ],
    "safety": [
      "Keep hands clear of moving steering linkage."
    ],
    "evidenceStatus": [
      "field-observed",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized steering complaint supplied by Ecatu Ronald.",
    "keywords": [
      "hard steering",
      "steering pump",
      "bleeding",
      "hydraulic pressure"
    ]
  },
  {
    "id": "unloader-leak",
    "code": "NAI-AUT-007",
    "title": "DDU or unloader-valve leakage causing low air-pressure build-up",
    "system": "braking",
    "type": "field-case",
    "vehicleClass": "Commercial vehicle compressed-air system",
    "complaint": "System pressure built slowly or remained low.",
    "operatingContext": "Leakage was traced to the air-processing or unloading section.",
    "evidence": [
      "Continuous leakage was observed at the DDU or unloader assembly.",
      "Air loss prevented normal pressure accumulation."
    ],
    "measurements": [
      "Record pressure build time and governor cut-in/cut-out values.",
      "Compare readings with the exact vehicle specification."
    ],
    "assessment": "Air discharged through the leaking unloader path faster than the system could build and retain pressure.",
    "testPlan": [
      "Perform an external leak test.",
      "Check unloader and governor control lines.",
      "Measure compressor output if needed.",
      "Inspect dryer and delivery piping."
    ],
    "correctiveAction": [
      "Repair or replace the confirmed leaking component."
    ],
    "verification": [
      "Pressure build time meets specification.",
      "Cut-in and cut-out are correct.",
      "No leakage remains."
    ],
    "safety": [
      "Chock the vehicle and release stored air safely."
    ],
    "evidenceStatus": [
      "field-observed",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized compressed-air inspection supplied by Ecatu Ronald.",
    "keywords": [
      "DDU",
      "unloader valve",
      "air leak",
      "low air pressure"
    ]
  },
  {
    "id": "brake-actuator",
    "code": "NAI-AUT-008",
    "title": "Brake-actuator leakage with unstable service and spring-brake operation",
    "system": "braking",
    "type": "field-case",
    "vehicleClass": "Commercial vehicle service and spring-brake actuator",
    "complaint": "Braking became inconsistent and abrupt spring-brake engagement occurred with a rapid pressure drop.",
    "operatingContext": "The event affected vehicle balance and stability.",
    "evidence": [
      "Internal actuator sealing failure allowed pressure leakage.",
      "Pushrod operation became inconsistent with driver command.",
      "Uneven brake force was observed.",
      "Pressure loss contributed to uncommanded spring-brake engagement."
    ],
    "measurements": [
      "Measure chamber stroke, circuit pressure and pressure-loss rate using the approved procedure."
    ],
    "assessment": "Loss of actuator integrity caused unstable force transmission and circuit pressure loss.",
    "testPlan": [
      "Leak-test the actuator and circuit.",
      "Compare pushrod travel across the axle.",
      "Inspect mounting, linkage and foundation brakes.",
      "Confirm spring-brake release pressure."
    ],
    "correctiveAction": [
      "Replace the defective actuator and inspect the paired axle components."
    ],
    "verification": [
      "No leakage remains.",
      "Pushrod strokes are balanced and within specification.",
      "Service and parking brakes operate predictably."
    ],
    "safety": [
      "Follow the approved spring-brake caging procedure."
    ],
    "evidenceStatus": [
      "field-observed",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized brake-actuator investigation supplied by Ecatu Ronald.",
    "keywords": [
      "brake actuator",
      "spring brake",
      "pressure drop",
      "pushrod"
    ]
  },
  {
    "id": "battery-retention",
    "code": "NAI-AUT-009",
    "title": "Battery does not retain voltage while alternator output tests normal",
    "system": "electrical",
    "type": "diagnostic-guide",
    "vehicleClass": "24 V commercial vehicle electrical system",
    "complaint": "The battery repeatedly lost charge although alternator operation appeared normal.",
    "operatingContext": "Charging output, battery condition, cable resistance and key-off load required separation.",
    "evidence": [
      "Alternator output was reported normal.",
      "The battery failed to retain voltage."
    ],
    "measurements": [
      "Record stabilized open-circuit voltage.",
      "Perform a load or conductance test.",
      "Measure charging-circuit voltage drop under load."
    ],
    "assessment": "Normal alternator output combined with failed retention supports internal battery deterioration after cable resistance and parasitic draw are checked.",
    "testPlan": [
      "Inspect terminals and case condition.",
      "Fully charge and retest.",
      "Perform positive and negative voltage-drop tests.",
      "Measure key-off current if the battery passes."
    ],
    "correctiveAction": [
      "Replace the battery only after confirming failed capacity or retention."
    ],
    "verification": [
      "Charge is retained.",
      "Cranking voltage is acceptable.",
      "No abnormal key-off draw remains."
    ],
    "safety": [
      "Use eye protection and avoid sparks near batteries."
    ],
    "evidenceStatus": [
      "field-observed",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized battery and alternator inspection supplied by Ecatu Ronald.",
    "keywords": [
      "battery",
      "alternator normal",
      "not retaining voltage",
      "charging"
    ]
  },
  {
    "id": "overcharging",
    "code": "NAI-AUT-010",
    "title": "Charging-system overvoltage reaching approximately 28–32 V",
    "system": "electrical",
    "type": "field-case",
    "vehicleClass": "24 V commercial vehicle charging system",
    "complaint": "Charging voltage rose excessively and risked damage to batteries and electronic equipment.",
    "operatingContext": "Observed values required immediate isolation and confirmation.",
    "evidence": [
      "Charging voltage was observed near 28 V and at times near 32 V.",
      "The condition indicated loss of regulation or incorrect sensing."
    ],
    "measurements": [
      "Observed range: approximately 28–32 V.",
      "Confirm meter accuracy and measure at alternator and battery terminals."
    ],
    "assessment": "The high voltage supports a regulator, sensing, ground or wiring fault. Battery condition alone should not be assumed to create output near 32 V.",
    "testPlan": [
      "Confirm with a known-good meter.",
      "Check battery and alternator grounds.",
      "Inspect sense wiring and regulator connections.",
      "Test alternator regulation."
    ],
    "correctiveAction": [
      "Repair the sensing or connection fault, or replace the confirmed defective regulated alternator."
    ],
    "verification": [
      "Voltage remains stable within the applicable regulated range.",
      "Battery temperature and condition are checked.",
      "No damaged loads remain."
    ],
    "safety": [
      "Stop prolonged operation during confirmed overvoltage."
    ],
    "evidenceStatus": [
      "measured",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized charging measurements supplied by Ecatu Ronald.",
    "keywords": [
      "32 volts",
      "28 volts",
      "overcharging",
      "voltage regulator"
    ]
  },
  {
    "id": "wiper-gear",
    "code": "NAI-AUT-011",
    "title": "Wiper motor unable to transfer motion because plastic gear teeth are broken",
    "system": "electrical",
    "type": "field-case",
    "vehicleClass": "Commercial vehicle cab electrical system",
    "complaint": "The windscreen wipers did not sweep correctly.",
    "operatingContext": "Supply, fuse and relay checks were completed before condemning the motor.",
    "evidence": [
      "Internal plastic gear teeth were broken.",
      "Motor rotation could not be transferred correctly to the linkage."
    ],
    "measurements": [
      "Confirm supply voltage and ground integrity under load."
    ],
    "assessment": "Mechanical failure inside the motor prevented torque transmission despite an available electrical command.",
    "testPlan": [
      "Check fuse, relay, supply and ground.",
      "Inspect arms, pivots and linkage for seizure.",
      "Confirm motor output movement."
    ],
    "correctiveAction": [
      "Replace the motor assembly and repair any linkage resistance."
    ],
    "verification": [
      "All speeds operate.",
      "Parking position is correct.",
      "Arms move without binding."
    ],
    "safety": [
      "Switch ignition off before working near the linkage."
    ],
    "evidenceStatus": [
      "field-observed"
    ],
    "sourceSummary": "Anonymized wiper inspection supplied by Ecatu Ronald.",
    "keywords": [
      "wiper motor",
      "plastic gear",
      "broken teeth",
      "linkage"
    ]
  },
  {
    "id": "starter-solenoid",
    "code": "NAI-AUT-012",
    "title": "Starter-solenoid failure preventing pinion engagement",
    "system": "electrical",
    "type": "field-case",
    "vehicleClass": "Commercial vehicle starting system",
    "complaint": "The engine did not crank when the start command was applied.",
    "operatingContext": "The concern was isolated to the starter engagement mechanism.",
    "evidence": [
      "The solenoid did not move the pinion correctly.",
      "The engine was not identified as seized from this observation."
    ],
    "measurements": [
      "Measure control voltage at the solenoid during cranking.",
      "Perform positive and ground voltage-drop tests."
    ],
    "assessment": "Failure of the solenoid or engagement mechanism prevented pinion engagement and cranking.",
    "testPlan": [
      "Confirm battery condition.",
      "Check command voltage and interlocks.",
      "Measure cable voltage drop.",
      "Confirm solenoid movement and current draw."
    ],
    "correctiveAction": [
      "Repair the control circuit or replace the confirmed defective starter/solenoid."
    ],
    "verification": [
      "Pinion engages consistently.",
      "Cranking speed is normal.",
      "No abnormal starter noise remains."
    ],
    "safety": [
      "Secure the vehicle and select neutral before testing."
    ],
    "evidenceStatus": [
      "field-observed",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized no-crank diagnosis supplied by Ecatu Ronald.",
    "keywords": [
      "starter solenoid",
      "no crank",
      "pinion",
      "starter motor"
    ]
  },
  {
    "id": "turbo-seizure",
    "code": "NAI-AUT-013",
    "title": "Turbocharger shaft seizure with oil in the charge-air pipes",
    "system": "engine",
    "type": "field-case",
    "vehicleClass": "Turbocharged commercial vehicle diesel engine",
    "complaint": "Low power and abnormal turbocharger operation were reported.",
    "operatingContext": "Inspection included the turbocharger and charge-air system.",
    "evidence": [
      "Turbo shaft rotation was seized or severely restricted.",
      "Oil was present in intercooler or charge-air pipes.",
      "Wheel damage was associated with some inspections."
    ],
    "measurements": [
      "Check oil supply, drain condition and shaft clearances against specification.",
      "Inspect the charge-air system for retained oil."
    ],
    "assessment": "The turbocharger failed mechanically, but oil supply, drain restriction, foreign-object entry and engine blow-by must be assessed before replacement.",
    "testPlan": [
      "Inspect compressor and turbine wheels.",
      "Check oil feed and drain.",
      "Inspect intake integrity.",
      "Check exhaust restriction and blow-by.",
      "Clean charge-air pipes."
    ],
    "correctiveAction": [
      "Replace the confirmed failed turbocharger.",
      "Correct the initiating lubrication, air-path or exhaust fault."
    ],
    "verification": [
      "Boost develops correctly.",
      "No oil remains pooled in charge-air pipes.",
      "No abnormal smoke or noise remains."
    ],
    "safety": [
      "Do not run the engine with significant oil retained in the charge-air system."
    ],
    "evidenceStatus": [
      "field-observed",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized turbocharger findings supplied by Ecatu Ronald.",
    "keywords": [
      "turbocharger",
      "seized shaft",
      "intercooler oil",
      "low power"
    ]
  },
  {
    "id": "head-gasket",
    "code": "NAI-AUT-014",
    "title": "Severe overheating with bubbles in the expansion tank and gasket burn evidence",
    "system": "engine",
    "type": "field-case",
    "vehicleClass": "Liquid-cooled commercial vehicle diesel engine",
    "complaint": "The engine overheated and bubbles appeared in the expansion tank.",
    "operatingContext": "The reported case occurred at low mileage before the expected service period.",
    "evidence": [
      "Continuous bubbles were observed in the reservoir.",
      "Burn or leakage marks were found at the head gasket.",
      "Severe overheating was followed by internal heat distress."
    ],
    "measurements": [
      "Pressure-test the cooling system.",
      "Test for combustion-gas leakage.",
      "Measure head and block flatness against specification."
    ],
    "assessment": "Combustion leakage is strongly supported when bubbling, pressure rise and gasket-path evidence agree. Cooling-flow and sealing-surface causes still require checks.",
    "testPlan": [
      "Confirm coolant level and leaks.",
      "Pressure-test circuit and cap.",
      "Check thermostat, pump and radiator.",
      "Test for combustion gases.",
      "Inspect gasket, head and block."
    ],
    "correctiveAction": [
      "Replace the gasket and repair confirmed head, block or cooling-system causes.",
      "Assess heat-damaged internal parts."
    ],
    "verification": [
      "No bubbling or combustion leakage remains.",
      "Temperature stays controlled under load.",
      "Coolant level remains stable."
    ],
    "safety": [
      "Never open a pressurized hot cooling system."
    ],
    "evidenceStatus": [
      "field-observed",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized overheating and dismantling findings supplied by Ecatu Ronald.",
    "keywords": [
      "overheating",
      "head gasket",
      "bubbles",
      "expansion tank"
    ]
  },
  {
    "id": "front-bearing",
    "code": "NAI-AUT-015",
    "title": "Front-housing bearing failure causing input-shaft misalignment and gear damage",
    "system": "transmission",
    "type": "field-case",
    "vehicleClass": "Commercial vehicle manual transmission",
    "complaint": "Gear shifting became difficult and internal noise or damage developed.",
    "operatingContext": "Clutch, pressure plate and release bearing were reported serviceable.",
    "evidence": [
      "The front-support bearing was damaged.",
      "Loss of support allowed input-shaft misalignment.",
      "Front housing and related gears were damaged."
    ],
    "measurements": [
      "Measure housing bore, shaft seats, end float and alignment.",
      "Check the main-shaft tip for taper or loss of bearing retention."
    ],
    "assessment": "Loss of bearing retention or housing support displaced shaft alignment and produced abnormal gear contact.",
    "testPlan": [
      "Inspect clutch release.",
      "Check oil and debris.",
      "Inspect bearing fit and housing.",
      "Measure shaft and housing damage.",
      "Trace secondary damage."
    ],
    "correctiveAction": [
      "Replace confirmed damaged parts.",
      "Correct bearing retention before assembly."
    ],
    "verification": [
      "Alignment and end float meet specification.",
      "All gears engage smoothly.",
      "No abnormal noise remains."
    ],
    "safety": [
      "Use rated transmission support equipment."
    ],
    "evidenceStatus": [
      "field-observed",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized transmission findings supplied by Ecatu Ronald.",
    "keywords": [
      "input shaft",
      "front housing",
      "bearing fit",
      "misalignment"
    ]
  },
  {
    "id": "cab-cracks",
    "code": "NAI-AUT-016",
    "title": "Cab-front structural cracking during cab lifting",
    "system": "body",
    "type": "inspection",
    "vehicleClass": "Tilt-cab commercial vehicle",
    "complaint": "Cracks developed at the cab front or mounting structure during lifting.",
    "operatingContext": "The lift cylinder operated, but the surrounding structure showed distress.",
    "evidence": [
      "Cracks were visible around the front mounting or cross-member area.",
      "Damage became apparent during repeated cab lifting.",
      "The cylinder was not identified as the primary failed item."
    ],
    "measurements": [
      "Check cab alignment, hinge geometry and mounting dimensions.",
      "Inspect welds and material around the crack path."
    ],
    "assessment": "The cracking indicates stress concentration, weakened material or alignment/loading concerns around the cab lifting path.",
    "testPlan": [
      "Inspect hinges, locks, mounts and cross-members.",
      "Check alignment and collision evidence.",
      "Inspect crack origin and deformation.",
      "Observe lift geometry safely."
    ],
    "correctiveAction": [
      "Repair or replace the affected structure using an approved body-repair method."
    ],
    "verification": [
      "Cab raises and lowers without abnormal movement.",
      "Locks and mounts align.",
      "No crack growth occurs after controlled cycles."
    ],
    "safety": [
      "Use the approved cab safety prop."
    ],
    "evidenceStatus": [
      "field-observed",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized cab photographs and observations supplied by Ecatu Ronald.",
    "keywords": [
      "cab crack",
      "cab lifting",
      "cross member",
      "mounting"
    ]
  },
  {
    "id": "tyre-failure",
    "code": "NAI-AUT-017",
    "title": "Repeated tyre failure investigation under documented urban operation",
    "system": "tyres",
    "type": "reporting-reference",
    "vehicleClass": "Commercial vehicle using 8.25R20 tyres",
    "complaint": "Two tyres on different sides developed a similar failure pattern.",
    "operatingContext": "The vehicle operated mainly on tarmac in city service carrying agricultural food loads such as bananas.",
    "evidence": [
      "The operator reported maintaining 125 psi.",
      "Wear was not described as concentrated only at the tread centre.",
      "A similar failure occurred on more than one tyre."
    ],
    "measurements": [
      "Reported pressure: 125 psi.",
      "Confirm required cold pressure from placard, tyre/load table or approved specification.",
      "Record axle loads and tyre temperatures where possible."
    ],
    "assessment": "A sound conclusion requires tread-depth mapping, casing inspection, pressure verification, load evidence, wheel condition and road-damage assessment. Inflation or overload should not be concluded from one photograph alone.",
    "testPlan": [
      "Verify cold pressure with a calibrated gauge.",
      "Map tread and casing damage.",
      "Inspect rim, alignment, suspension and bearings.",
      "Confirm axle load and tyre rating.",
      "Compare both failed tyres."
    ],
    "correctiveAction": [
      "Correct the confirmed pressure, load, alignment, rim or product issue and document evidence."
    ],
    "verification": [
      "Replacement tyres wear evenly.",
      "Pressure and axle-load records are maintained.",
      "No repeat pattern develops."
    ],
    "safety": [
      "Follow damaged-tyre and split-rim safety procedures."
    ],
    "evidenceStatus": [
      "field-observed",
      "service-history-supported",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized tyre photographs, duty description and pressure report supplied by Ecatu Ronald.",
    "keywords": [
      "8.25R20",
      "125 psi",
      "tyre failure",
      "bananas",
      "tarmac"
    ]
  },
  {
    "id": "differential-seal",
    "code": "NAI-AUT-018",
    "title": "Differential oil-seal leakage and recurrence prevention",
    "system": "chassis",
    "type": "diagnostic-guide",
    "vehicleClass": "Commercial vehicle drive axle",
    "complaint": "Gear oil leaked around the differential or pinion sealing area.",
    "operatingContext": "Oil loss and nearby brake contamination were possible depending on seal location.",
    "evidence": [
      "Oil was visible around the seal area.",
      "The leak path required cleaning and confirmation."
    ],
    "measurements": [
      "Check axle oil level.",
      "Measure pinion or shaft play.",
      "Inspect breather operation."
    ],
    "assessment": "A leaking seal may be the failed part, but shaft wear, bearing play, blocked breather pressure and installation damage must be checked.",
    "testPlan": [
      "Clean and identify the exact source.",
      "Check the breather.",
      "Inspect sealing surface and bearing play.",
      "Confirm oil level and condition."
    ],
    "correctiveAction": [
      "Replace the seal and repair any shaft, bearing or breather cause."
    ],
    "verification": [
      "No leak appears after road test.",
      "Oil level remains correct.",
      "Nearby brakes remain clean."
    ],
    "safety": [
      "Secure the vehicle and axle before working underneath."
    ],
    "evidenceStatus": [
      "field-observed",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized differential leakage cases supplied by Ecatu Ronald.",
    "keywords": [
      "differential",
      "oil seal",
      "pinion",
      "axle leak"
    ]
  },
  {
    "id": "centre-bearing",
    "code": "NAI-AUT-019",
    "title": "Propeller-shaft centre-bearing failure and driveline vibration investigation",
    "system": "chassis",
    "type": "diagnostic-guide",
    "vehicleClass": "Multi-piece commercial vehicle propeller shaft",
    "complaint": "Driveline vibration, noise or visible centre-bearing damage was reported.",
    "operatingContext": "The centre bearing supports propeller-shaft alignment between transmission and axle.",
    "evidence": [
      "Rubber support or bearing deterioration was visible.",
      "Loss of support allowed shaft movement."
    ],
    "measurements": [
      "Check shaft runout, universal joints and driveline angles.",
      "Confirm mounting alignment and fastener torque."
    ],
    "assessment": "Centre-bearing failure can be primary or secondary to imbalance, incorrect phasing, joint wear, mounting misalignment or excessive angle.",
    "testPlan": [
      "Inspect bearing and rubber support.",
      "Check shaft phasing and balance evidence.",
      "Inspect joints and splines.",
      "Measure alignment and angles."
    ],
    "correctiveAction": [
      "Replace the failed assembly and correct alignment, joint or balance causes."
    ],
    "verification": [
      "No vibration remains through the road-speed range.",
      "Mountings remain secure.",
      "Shaft movement is normal."
    ],
    "safety": [
      "Do not work under a vehicle supported only by a jack."
    ],
    "evidenceStatus": [
      "field-observed",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized centre-bearing inspection supplied by Ecatu Ronald.",
    "keywords": [
      "centre bearing",
      "propeller shaft",
      "vibration",
      "driveline"
    ]
  },
  {
    "id": "cluster-air-gauge",
    "code": "NAI-AUT-020",
    "title": "Dashboard air-pressure gauges fail to indicate normal system build-up",
    "system": "electrical",
    "type": "diagnostic-guide",
    "vehicleClass": "Commercial vehicle cluster and pressure sensing",
    "complaint": "Dashboard pressure indications did not respond correctly while the air system charged.",
    "operatingContext": "Actual pneumatic pressure had to be separated from sensor, wiring, network and display faults.",
    "evidence": [
      "Displayed values did not respond as expected.",
      "Actual pressure required independent verification with an approved gauge."
    ],
    "measurements": [
      "Measure reservoir pressures mechanically.",
      "Compare sensor supply, signal and live data.",
      "Check network and cluster fault codes."
    ],
    "assessment": "A non-responsive dashboard gauge does not prove the air system is low. Actual pressure must be measured before diagnosing the display path.",
    "testPlan": [
      "Verify actual pressure.",
      "Check sensor supply, ground and signal.",
      "Inspect harness and connectors.",
      "Compare live data with display.",
      "Check CAN communication."
    ],
    "correctiveAction": [
      "Repair the confirmed pneumatic, sensor, wiring, network or cluster fault."
    ],
    "verification": [
      "Displayed and measured pressure agree within tolerance.",
      "Warnings operate correctly.",
      "No related faults return."
    ],
    "safety": [
      "Do not operate the vehicle until brake-system pressure is confirmed safe."
    ],
    "evidenceStatus": [
      "field-observed",
      "requires-specification"
    ],
    "sourceSummary": "Anonymized cluster and air-pressure complaint supplied by Ecatu Ronald.",
    "keywords": [
      "air pressure gauge",
      "cluster",
      "sensor",
      "CAN",
      "dashboard"
    ]
  }
];
