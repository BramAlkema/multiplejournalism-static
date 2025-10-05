# Video/Audio Migration Spec

## Overview
Migrate video and audio embed data from Wayback Machine HTML archives to Eleventy markdown files for the Multiple Journalism static site.

## Status
- ✅ Extracted all video/audio data from 25 WBM HTML files
- ✅ Created master video list (MASTER_VIDEO_LIST.md)
- 🔄 Compare master list with current MD files and fix mismatches
- ⏳ Test build and push fixes

## Goals
1. Ensure all 25 case MD files have correct video/audio embed data
2. Fix any mismatches between master list and current MD files
3. Verify site builds correctly with npx @11ty/eleventy
4. Commit and push all corrections

## Success Criteria
- All MD files match the master video list
- Site builds without errors
- All video and audio embeds work correctly
- Changes committed to git

## Background
The user previously had issues with wrong/duplicate videos in MD files. Videos are stored in `data-video-id` and `data-video-type` attributes in the WBM HTML. Soundcloud tracks are in iframe src URLs. All 25 cases have now been extracted and catalogued in MASTER_VIDEO_LIST.md.
