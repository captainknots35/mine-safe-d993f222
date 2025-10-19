-- Create Lesson 5: Interactive Health & Safety Simulations for Module 4
INSERT INTO lessons (id, module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
VALUES (
  'f5a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c',
  'e8a3c5b2-7d9e-4f1a-8b2c-3e4f5a6b7c8d',
  'Interactive Health & Safety Simulations',
  'Hands-on decision-making scenarios covering HazCom, PPE selection, chemical spills, and emergency response',
  'interactive',
  5,
  45,
  true,
  jsonb_build_object(
    'content', '# Interactive Health & Safety Simulations

## Overview

This interactive lesson contains scenario-based simulations that test your practical application of health and safety principles covered in Module 4. Each simulation presents realistic mining situations where you must make critical decisions about chemical safety, PPE selection, and emergency response.

## Available Simulations

### Simulation 1: Chemical Hazard Assessment
**Duration**: 10 minutes
**Scenario**: You discover an unlabeled chemical container in the maintenance area. Apply HazCom principles to safely assess and handle the situation.

### Simulation 2: PPE Selection Challenge
**Duration**: 10 minutes  
**Scenario**: Select appropriate PPE for various mining tasks, from routine equipment operation to welding and chemical handling.

### Simulation 3: Chemical Spill Response
**Duration**: 15 minutes
**Scenario**: A diesel fuel spill occurs near active equipment. Execute proper spill response procedures following RESCUE-CONFINE-REPORT-SECURE-CLEANUP.

### Simulation 4: Thermal Stress Emergency
**Duration**: 10 minutes
**Scenario**: A coworker shows signs of heat exhaustion on a hot summer day. Provide appropriate first aid and make critical decisions about when to call for medical help.

## Learning Objectives

By completing these simulations, you will:
- Apply HazCom principles to real-world situations
- Demonstrate proper PPE selection based on task hazards
- Execute emergency response procedures correctly
- Recognize and respond to thermal stress emergencies
- Make safety-critical decisions under pressure

## Instructions

Select a simulation from the launcher below to begin. Each simulation tracks your decisions and provides immediate feedback on safety-critical choices. Your performance will be recorded as part of your course progress.

**Remember**: In these simulations, as in real life, safety is paramount. Take your time to think through each decision carefully.',
    'simulations', jsonb_build_array(
      jsonb_build_object(
        'id', 'hazcom_assessment',
        'title', 'Chemical Hazard Assessment',
        'description', 'Apply HazCom principles to assess an unlabeled chemical container',
        'estimatedTime', '10 minutes'
      ),
      jsonb_build_object(
        'id', 'ppe_selection',
        'title', 'PPE Selection Challenge',
        'description', 'Select appropriate PPE for various mining tasks',
        'estimatedTime', '10 minutes'
      ),
      jsonb_build_object(
        'id', 'chemical_spill',
        'title', 'Chemical Spill Response',
        'description', 'Execute proper spill response procedures for a diesel fuel spill',
        'estimatedTime', '15 minutes'
      ),
      jsonb_build_object(
        'id', 'thermal_stress',
        'title', 'Thermal Stress Emergency',
        'description', 'Provide first aid for a coworker showing signs of heat exhaustion',
        'estimatedTime', '10 minutes'
      )
    )
  )
);