-- Update Module 1 lessons to separate mine terminology from virtual stops

-- First, delete the existing Lesson 2 that combined both topics
DELETE FROM lessons 
WHERE module_id = '84ea6e55-bfdb-43d4-a761-8283da7a36ba' 
AND order_index = 2;

-- Insert new Lesson 2: Mine Terminology only
INSERT INTO lessons (id, module_id, title, description, type, order_index, duration_minutes, content_data)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-001122334455',
  '84ea6e55-bfdb-43d4-a761-8283da7a36ba',
  'Anatomy of a Surface Mine: Learning the Language of the Land',
  'Essential mining vocabulary and terminology for understanding mine site operations and communication.',
  'document',
  2,
  20,
  jsonb_build_object(
    'sections', jsonb_build_array(
      jsonb_build_object(
        'heading', 'Learning the Language of the Land',
        'content', 'To work safely, you must be able to understand instructions and communicate accurately with your coworkers. This requires learning the specific vocabulary used to describe the mine''s physical environment. Let''s build a mental map of a typical surface mine.'
      ),
      jsonb_build_object(
        'heading', 'The Pit/Quarry',
        'content', 'This is the heart of the operation—the large, open excavation where the mineral is extracted. These can be vast areas, sometimes hundreds of feet deep.'
      ),
      jsonb_build_object(
        'heading', 'Highwall',
        'content', 'This is the unexcavated, cliff-like face of the pit or quarry. Highwalls can be unstable and are a significant source of ground-fall hazards.'
      ),
      jsonb_build_object(
        'heading', 'Bench',
        'content', 'To mine safely and maintain stability, the highwall is cut into a series of steps or terraces. These are called benches. Each bench provides a flat working level for equipment.'
      ),
      jsonb_build_object(
        'heading', 'Crest and Toe',
        'content', 'The crest is the top edge of a bench or highwall. The toe is the bottom edge where the wall meets the floor.'
      ),
      jsonb_build_object(
        'heading', 'Berm',
        'content', 'This is a raised pile or mound of material, typically built along the outer edge of a haul road or at a dumping location. Its purpose is to act as a safety barrier to help prevent vehicles from going over the edge.'
      ),
      jsonb_build_object(
        'heading', 'Haul Road/Ramp',
        'content', 'These are the primary arteries of the mine, connecting the pit to the processing plant. They are carefully constructed and maintained to handle the weight of massive haul trucks and are often wide enough for two-way traffic.'
      ),
      jsonb_build_object(
        'heading', 'Overburden',
        'content', 'This is the layer of topsoil, clay, and non-valuable rock that sits on top of the mineral deposit. It must be stripped away and stockpiled before mining can begin.'
      ),
      jsonb_build_object(
        'heading', 'Stockpiles',
        'content', 'These are large, cone-shaped piles of either raw material from the pit or finished, processed product waiting to be shipped. The natural slope of these piles is called the "angle of repose," and they can be hazardous to work around.'
      ),
      jsonb_build_object(
        'heading', 'Processing Plant (Mill/Preparation Plant)',
        'content', 'This is the industrial facility where the raw material is taken to be crushed, screened (sized), washed, and sorted into final, saleable products.'
      ),
      jsonb_build_object(
        'heading', 'Water Impoundments/Settling Ponds',
        'content', 'These are engineered dams and ponds used to store water for processing or to contain fine waste materials, known as slurry or tailings. They present unique hazards and are regulated by MSHA.'
      )
    )
  )
);

-- Insert new Lesson 3: Virtual Stops (was previously combined with terminology)
INSERT INTO lessons (id, module_id, title, description, type, order_index, duration_minutes, content_data)
VALUES (
  'b2c3d4e5-f6a7-8901-bcde-112233445566',
  '84ea6e55-bfdb-43d4-a761-8283da7a36ba',
  'Immersive Journey Through Mining Operations',
  'Virtual tour of five different types of surface mining operations: sand & gravel, limestone quarry, clay mine, shell dredging, and colloidal phosphate.',
  'document',
  3,
  25,
  jsonb_build_object(
    'sections', jsonb_build_array(
      jsonb_build_object(
        'heading', 'Immersive Journey Through Mining Operations (30 CFR § 46.5(b)(1))',
        'content', 'Now, we will take a virtual journey through the different types of mining operations covered by Part 46. The purpose is to observe the distinct methods used to extract and process each commodity. Pay close attention to how the process itself creates a unique set of hazards—a concept we will explore in greater detail later.'
      ),
      jsonb_build_object(
        'heading', 'Virtual Stop 1: The Sand & Gravel Operation',
        'content', 'We are now standing at the edge of a large, relatively shallow open pit. You see a front-end loader digging directly into a bank of sand and gravel. This is known as dry mining. The loader then transports the material and dumps it into a large haul truck. In other operations, especially those near a river or lake, the process is different. Look out over the water. That floating platform is a dredge, which uses a powerful pump and suction line to excavate sand and gravel from the bottom of the water body. For operations in active streams, a method called "bar skimming" is used, where machinery removes material only from the exposed portion of a gravel bar, staying out of the flowing water to protect the stream environment.

Regardless of how it is extracted, the material''s journey continues to the processing plant. The haul truck dumps its load into a hopper, which feeds a series of conveyor belts. You can hear the loud, vibrating noise of the screen decks, which act like giant sieves to separate the material by size. Larger rocks are sent to crushers to be broken down, while the sand and gravel are washed to remove clay and silt before being sorted into various stockpiles of finished product. Because these operations often involve large open pits and water-filled dredges, the primary hazards are related to mobile equipment traffic, the stability of water impoundments, and the mechanical dangers of the processing plant.'
      ),
      jsonb_build_object(
        'heading', 'Virtual Stop 2: The Surface Stone (Limestone) Quarry',
        'content', 'The scale of this operation is immediately different. We are looking at a deep quarry with massive highwalls organized into distinct benches. To get to this limestone, the first step was to use dozers and scrapers to remove the overburden and expose the solid rock deposit.

Unlike sand and gravel, this hard rock cannot simply be dug out. The extraction process here is a cycle of drilling and blasting. A large drill rig moves onto a bench and drills a precise pattern of deep holes into the rock. These holes are then carefully loaded with explosives. After the area is cleared and warning signals are sounded, the blast occurs, fracturing thousands of tons of rock. This fragmented rock is then scooped up by a massive hydraulic shovel or front-end loader and placed into haul trucks for transport out of the pit. The dominant hazards in this environment are directly related to this process: the stability of the highwalls (ground control), the dangers of handling and using explosives (flyrock), and the operation of heavy equipment on steep haul roads.'
      ),
      jsonb_build_object(
        'heading', 'Virtual Stop 3: The Surface Clay Mine',
        'content', 'This open pit looks similar to the sand and gravel operation, but the material is much different. Clay is a soft, fine-grained material. After the overburden is scraped away, you will see equipment like draglines, power shovels, or scrapers easily excavating the clay and loading it into trucks.

At the processing plant, the raw clay is first sent through crushers and mills to grind it into a fine powder. It is then often mixed with water and washed to remove impurities like sand. A critical step is drying; the wet clay slurry is fed into large, rotating dryers to remove moisture. Finally, it is screened or classified by particle size to meet the specifications for its end use, such as in ceramics or construction materials. The fine, powdery nature of this material means that a primary hazard is respiratory; the creation and control of airborne dust is a major safety and health concern.'
      ),
      jsonb_build_object(
        'heading', 'Virtual Stop 4: The Shell Dredging Operation',
        'content', 'We are now on a floating vessel, a hydraulic dredge. The entire mining operation takes place on the water. You can feel the constant hum of the engines and pumps. A long frame called a "ladder" is lowered from the dredge to the seabed. At the end of the ladder is a rotating cutterhead and a suction intake. The cutterhead breaks up and agitates the shells and sediment on the bottom, mixing them with water to create a "slurry." This slurry is then drawn into the intake by a powerful pump located on the dredge. From the dredge, the slurry is pumped through a large, flexible pipeline, often floated on pontoons, which carries the material all the way to a processing facility on the shore. This environment is fundamentally different from a land-based mine. The most significant and immediate hazards are water-based: the risk of drowning, slips and falls on wet decks, the stability of the vessel itself, and exposure to rapidly changing weather conditions.'
      ),
      jsonb_build_object(
        'heading', 'Virtual Stop 5: The Colloidal Phosphate Site',
        'content', 'This location is unique. Instead of a newly excavated pit, we are in an old settling basin from a previous mining operation. The material here is soft rock phosphate, also known as colloidal phosphate. It is a fine, clay-like material that was a byproduct of historical hard rock phosphate mining.

Because the material is soft and already at the surface, the extraction method is straightforward. Loaders and trucks are used to mine the clay-like material and move it to a stockpile, much like a surface clay mine. Processing is also minimal compared to other commodities. It typically involves drying and grinding the material before it is packaged and sold as a slow-release organic fertilizer. Similar to clay mining, the fine and dusty nature of the material makes respiratory protection a key health and safety consideration.'
      )
    )
  )
);

-- Update order_index for remaining lessons (shift them down by 1)
UPDATE lessons 
SET order_index = 4
WHERE module_id = '84ea6e55-bfdb-43d4-a761-8283da7a36ba' 
AND order_index = 3;

UPDATE lessons 
SET order_index = 5
WHERE module_id = '84ea6e55-bfdb-43d4-a761-8283da7a36ba' 
AND order_index = 4;

UPDATE lessons 
SET order_index = 6
WHERE module_id = '84ea6e55-bfdb-43d4-a761-8283da7a36ba' 
AND order_index = 5;