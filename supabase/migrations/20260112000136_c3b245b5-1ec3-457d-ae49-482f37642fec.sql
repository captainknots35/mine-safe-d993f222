-- Add price_cents column to courses table
ALTER TABLE public.courses 
ADD COLUMN price_cents integer NOT NULL DEFAULT 0;

-- Set prices for each course
-- Part 46 New Miner: $108 = 10800 cents
UPDATE public.courses 
SET price_cents = 10800 
WHERE id = 'ec6419f3-8cee-4fba-b7ed-9cfcaa418afc';

-- Part 46 Annual Refresher: $65 = 6500 cents
UPDATE public.courses 
SET price_cents = 6500 
WHERE id = 'a42cee83-c982-4e02-bd7d-ef0fee3bfc1e';

-- Part 48 New Miner (Underground): $400 = 40000 cents
UPDATE public.courses 
SET price_cents = 40000 
WHERE id = 'e260ddda-71c5-40dc-bb04-656d493ddc1b';

-- Part 48 Annual Refresher: $200 = 20000 cents
UPDATE public.courses 
SET price_cents = 20000 
WHERE id = '1a36f9b6-108e-4bc4-916f-440c5fdd955c';

-- Add comment for documentation
COMMENT ON COLUMN public.courses.price_cents IS 'Course price in cents (e.g., 10800 = $108.00)';