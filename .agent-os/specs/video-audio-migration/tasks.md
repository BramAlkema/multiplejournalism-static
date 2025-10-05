# Spec Tasks

## Tasks

- [ ] 1. Compare master video list with all 25 MD files and document discrepancies
  - [ ] 1.1 Read master list (MASTER_VIDEO_LIST.md) and parse video/audio data structure
  - [ ] 1.2 For each of 25 cases, extract current video/audio from MD frontmatter
  - [ ] 1.3 Compare master list vs MD file and document all mismatches
  - [ ] 1.4 Create discrepancy report showing which files need updates

- [ ] 2. Fix all video/audio mismatches in MD files
  - [ ] 2.1 Update intro videos where they don't match master list
  - [ ] 2.2 Update body videos where they don't match master list
  - [ ] 2.3 Update soundcloud embeds where they don't match master list
  - [ ] 2.4 Verify all 25 MD files now match master list

- [ ] 3. Test and validate the build
  - [ ] 3.1 Run `npx @11ty/eleventy` to test build
  - [ ] 3.2 Check build output for any errors or warnings
  - [ ] 3.3 Verify generated HTML includes correct video embeds
  - [ ] 3.4 Fix any build errors and re-test until clean

- [ ] 4. Commit and push changes
  - [ ] 4.1 Review all changed MD files
  - [ ] 4.2 Stage changes with `git add`
  - [ ] 4.3 Create descriptive commit message
  - [ ] 4.4 Push changes to repository
