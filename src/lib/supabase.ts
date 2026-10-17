import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables for Vite (Client-side)
const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env || {};
const SUPABASE_URL = metaEnv.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = metaEnv.VITE_SUPABASE_ANON_KEY || '';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  // Check env vars first, or check localStorage for easy testing/local setup
  const url = SUPABASE_URL || localStorage.getItem('supabase_url') || '';
  const key = SUPABASE_ANON_KEY || localStorage.getItem('supabase_anon_key') || '';

  if (!url || !key) {
    return null;
  }

  try {
    supabaseInstance = createClient(url, key);
    return supabaseInstance;
  } catch (err) {
    console.warn('Could not initialize Supabase client:', err);
    return null;
  }
}

export interface SubmissionPayload {
  type: 'wish' | 'letter' | 'bucket_goal' | 'guestbook';
  content: string;
  author?: string;
  partner?: string;
  metadata?: Record<string, any>;
}

/**
 * Saves any note, wish, or message to Supabase so you can view it live in your dashboard.
 * Supports:
 * - Table "anniversary_messages" (columns: type, content, author, created_at, metadata)
 * - Table "wishes" (columns: content or wish, author, created_at)
 */
export async function recordSubmission({
  type,
  content,
  author = 'Tafeha',
  partner = 'Tafeh',
  metadata = {}
}: SubmissionPayload): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    console.log(
      `[Supabase Note] Received ${type}: "${content}". To sync to your database, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.`
    );
    return { success: false, error: 'Supabase credentials not configured' };
  }

  try {
    // 1. Try inserting into primary unified table "anniversary_messages"
    const { error: primaryError } = await supabase.from('anniversary_messages').insert([
      {
        type,
        content,
        author,
        metadata: {
          ...metadata,
          partner,
          timestamp: new Date().toISOString()
        }
      }
    ]);

    if (!primaryError) {
      console.log(`[Supabase] Successfully saved ${type} to anniversary_messages!`);
      return { success: true };
    }

    // 2. Fallback: If table is named "wishes", try inserting there
    if (type === 'wish') {
      const { error: wishError } = await supabase.from('wishes').insert([
        {
          wish: content,
          content,
          author
        }
      ]);
      if (!wishError) {
        console.log('[Supabase] Successfully saved wish to wishes table!');
        return { success: true };
      }
    }

    console.warn('[Supabase] Insert notice:', primaryError.message);
    return { success: false, error: primaryError.message };
  } catch (err: any) {
    console.error('[Supabase Error]', err);
    return { success: false, error: err?.message || 'Unknown error' };
  }
}

/**
 * Helper to record an anniversary cake candle wish
 */
export async function saveAnniversaryWish(wishText: string, author = 'Tafeha') {
  return recordSubmission({
    type: 'wish',
    content: wishText,
    author,
    metadata: { occasion: '1st Anniversary Cake Candle Wish' }
  });
}

/**
 * Helper to record an anniversary letter / note update
 */
export async function saveAnniversaryLetter(letterText: string, author = 'Tafeha') {
  return recordSubmission({
    type: 'letter',
    content: letterText,
    author,
    metadata: { occasion: 'Friendship Letter / Custom Note' }
  });
}

/**
 * Helper to record a new bucket list goal
 */
export async function saveBucketGoal(goalText: string, author = 'Tafeha') {
  return recordSubmission({
    type: 'bucket_goal',
    content: goalText,
    author,
    metadata: { occasion: 'Year 2 Bucket List Goal' }
  });
}

/**
 * Helper to record a guestbook message
 */
export async function saveGuestbookMessage(author: string, message: string) {
  return recordSubmission({
    type: 'guestbook',
    content: message,
    author,
    metadata: { occasion: 'Sweet Cafe Guestbook' }
  });
}
