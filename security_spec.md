# Security Specification - Michele Braz Blog

## Data Invariants
1. A blog post cannot be published without a title, slug, and content.
2. Only authenticated users in the `admins` collection can modify posts.
3. Public users can only read posts where `status == 'published'`.
4. Slugs must be unique (enforced by application logic and document IDs).

## The Dirty Dozen Payloads (Attack Vectors)
1. **Unauthenticated Write**: Attempting to create a post without logging in.
2. **Unauthorized Write**: Authenticated user (not admin) trying to create a post.
3. **Draft Leak**: Public user trying to read a post with `status == 'draft'`.
4. **Field Injection**: Admin trying to add a "verified" field not in schema to escalate privileges (though here roles are in a different collection).
5. **ID Poisoning**: Using a 2MB string as a post ID.
6. **Identity Spoofing**: Setting `authorId` to someone else's UID.
7. **Timestamp Fraud**: Setting `createdAt` to a future date instead of `request.time`.
8. **Admin Collection Tampering**: A user trying to write to the `admins` collection to make themselves an admin.
9. **Draft Update**: Public user trying to change a post status to published.
10. **Admin Self-Promotion**: User trying to create their own admin record.
11. **Bulk Read Attack**: Querying all posts (including drafts) without status filter.
12. **System Field Modification**: Attempting to modify `updatedAt` without using `request.time`.

## Test Plan
- Verify public read only for published status.
- Verify admin write only for users in `admins` collection.
- Verify schema validation (required fields, types, string sizes).
