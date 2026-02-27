
CREATE TABLE public.rsvp_counter (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_guests INTEGER NOT NULL DEFAULT 0
);

INSERT INTO public.rsvp_counter (id, total_guests) VALUES (1, 0);

ALTER TABLE public.rsvp_counter ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow edge functions to read/update rsvp_counter"
  ON public.rsvp_counter
  FOR ALL
  USING (true)
  WITH CHECK (true);
