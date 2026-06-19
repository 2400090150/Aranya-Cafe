
CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT coalesce((auth.jwt() ->> 'email') = 'rupeshravu@gmail.com', false);
$$;
