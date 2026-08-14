/* ============================================================
   0. IMPORTS
   ============================================================ */

import { Join } from '@/features/join';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * The `/participar` page: the participation slip and nothing else. The bar's
 * one action lands here, so the page is the form — anything above it would
 * be a second thing to read before the reader can answer.
 */
export default function JoinPage() {
  return <Join />;
}
