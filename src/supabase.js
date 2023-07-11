import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vwpxpctmhlcfsfntobdd.supabase.co';
const supabaseanonkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3cHhwY3RtaGxjZnNmbnRvYmRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg2NDg2MzUsImV4cCI6MjAwNDIyNDYzNX0.QkppTl8UgQsoorJ00gshX9cIvDMybYGm3vDfNrdRMow';

export const supabase = createClient(supabaseUrl, supabaseanonkey);