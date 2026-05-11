UPDATE public.events
SET date = REPLACE(date, '2025-', '2026-')
WHERE venue = 'Tivoli'
  AND link ILIKE 'https://www.tivoli.dk/program/fredagsrock/%'
  AND date LIKE '2025-%';