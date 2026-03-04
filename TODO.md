# Phase 5: Gallery Backend CRUD + Frontend Modal

## Steps

- [ ] 1. Create `data/gallery.json` — seed data (6 batches with gallery arrays)
- [ ] 2. Create `lib/gallery.ts` — GalleryBatch interface + CRUD functions
- [ ] 3. Create `app/api/gallery/route.ts` — GET all + POST new batch
- [ ] 4. Create `app/api/gallery/[id]/route.ts` — DELETE batch by id
- [ ] 5. Create `app/api/gallery/[id]/images/route.ts` — POST add image + DELETE remove image
- [ ] 6. Rewrite `components/Gallery.tsx` — Server Component fetching from lib + client modal for viewing images
- [ ] 7. Update `app/admin/page.tsx` — Wire Gallery tab to LIVE API (remove mock, add CRUD)
- [ ] 8. Run `npx tsc --noEmit` — verify no type errors
- [ ] 9. curl test all gallery API endpoints
- [ ] 10. Verify homepage and admin page load (HTTP 200)
