
CREATE OR REPLACE FUNCTION public.increment_rsvp_count(guest_count INTEGER)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.rsvp_counter SET total_guests = total_guests + guest_count WHERE id = 1;
$$;
