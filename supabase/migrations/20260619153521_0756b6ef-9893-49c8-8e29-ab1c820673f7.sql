
-- helper: check if current user is the owner
CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce((auth.jwt() ->> 'email') = 'rupeshravu@gmail.com', false);
$$;

-- updated_at trigger fn
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- DISHES
CREATE TABLE public.dishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT 'Mains',
  description text,
  price numeric(10,2),
  image_url text,
  available boolean NOT NULL DEFAULT true,
  position int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.dishes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.dishes TO authenticated;
GRANT ALL ON public.dishes TO service_role;

ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view available dishes" ON public.dishes
  FOR SELECT USING (available = true OR public.is_owner());

CREATE POLICY "Owner can insert dishes" ON public.dishes
  FOR INSERT TO authenticated WITH CHECK (public.is_owner());

CREATE POLICY "Owner can update dishes" ON public.dishes
  FOR UPDATE TO authenticated USING (public.is_owner()) WITH CHECK (public.is_owner());

CREATE POLICY "Owner can delete dishes" ON public.dishes
  FOR DELETE TO authenticated USING (public.is_owner());

CREATE TRIGGER trg_dishes_updated BEFORE UPDATE ON public.dishes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- INQUIRIES
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry" ON public.inquiries
  FOR INSERT TO anon, authenticated WITH CHECK (
    length(name) BETWEEN 1 AND 100
    AND length(message) BETWEEN 1 AND 2000
    AND (email IS NULL OR length(email) <= 255)
    AND (phone IS NULL OR length(phone) <= 30)
  );

CREATE POLICY "Owner can read inquiries" ON public.inquiries
  FOR SELECT TO authenticated USING (public.is_owner());

CREATE POLICY "Owner can delete inquiries" ON public.inquiries
  FOR DELETE TO authenticated USING (public.is_owner());

-- Storage bucket policies (bucket created via storage_create_bucket tool)
CREATE POLICY "Public read dish images" ON storage.objects
  FOR SELECT USING (bucket_id = 'dish-images');

CREATE POLICY "Owner can upload dish images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'dish-images' AND public.is_owner());

CREATE POLICY "Owner can update dish images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'dish-images' AND public.is_owner());

CREATE POLICY "Owner can delete dish images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'dish-images' AND public.is_owner());
