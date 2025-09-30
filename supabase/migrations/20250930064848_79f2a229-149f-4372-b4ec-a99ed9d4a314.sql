-- Fix the score column to accept decimal values instead of just integers
ALTER TABLE public.ideas 
ALTER COLUMN score TYPE DECIMAL(3,1) USING score::DECIMAL(3,1);