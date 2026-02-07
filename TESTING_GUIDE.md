# 🧪 Testing Guide

## Sample Prescription

A sample prescription image is provided in `test-samples/sample_prescription.png` for testing the application.

### Sample Prescription Details

**Doctor**: Dr. Sarah Johnson, M.D.  
**Patient**: John Doe  
**Date**: Feb 4, 2026

**Medicines**:
1. **Paracetamol 500mg**
   - Dosage: 1 tablet
   - Frequency: BD (Twice daily)
   - Duration: 5 days
   - Instructions: After food

2. **Amoxicillin 250mg**
   - Dosage: 1 capsule
   - Frequency: TDS (Three times daily)
   - Duration: 7 days
   - Instructions: Before food

3. **Cetirizine 10mg**
   - Dosage: 1 tablet
   - Frequency: OD (Once daily)
   - Duration: 3 days
   - Instructions: At bedtime

## Expected AI Output

### English
```json
{
  "medicines": [
    {
      "name": "Paracetamol 500mg",
      "dosage": "1 tablet",
      "frequency": "Twice daily",
      "duration": "5 days",
      "instructions": "Take after food"
    },
    {
      "name": "Amoxicillin 250mg",
      "dosage": "1 capsule",
      "frequency": "Three times daily",
      "duration": "7 days",
      "instructions": "Take before food"
    },
    {
      "name": "Cetirizine 10mg",
      "dosage": "1 tablet",
      "frequency": "Once daily",
      "duration": "3 days",
      "instructions": "Take at bedtime"
    }
  ]
}
```

### Hindi (Expected Translation)
```json
{
  "medicines": [
    {
      "name": "Paracetamol 500mg",
      "dosage": "1 गोली",
      "frequency": "दिन में दो बार",
      "duration": "5 दिन",
      "instructions": "खाने के बाद लें"
    },
    {
      "name": "Amoxicillin 250mg",
      "dosage": "1 कैप्सूल",
      "frequency": "दिन में तीन बार",
      "duration": "7 दिन",
      "instructions": "खाने से पहले लें"
    },
    {
      "name": "Cetirizine 10mg",
      "dosage": "1 गोली",
      "frequency": "दिन में एक बार",
      "duration": "3 दिन",
      "instructions": "सोने से पहले लें"
    }
  ]
}
```

## Testing Checklist

### ✅ Functional Testing

- [ ] **Image Upload**
  - [ ] Drag and drop works
  - [ ] Click to browse works
  - [ ] Image preview displays correctly
  - [ ] Remove image button works
  - [ ] Only accepts image files (JPG, PNG, WEBP)

- [ ] **Analysis**
  - [ ] Analyze button is enabled when image is uploaded
  - [ ] Loading spinner appears during analysis
  - [ ] Analysis completes within 10 seconds
  - [ ] Results display correctly

- [ ] **Results Display**
  - [ ] Medicine cards show all information
  - [ ] Confidence score is displayed
  - [ ] Language tabs work (English/Hindi)
  - [ ] Original prescription image is shown

- [ ] **Voice Output**
  - [ ] Play button works
  - [ ] Voice speaks in correct language
  - [ ] Pause button works
  - [ ] Voice stops when switching languages

- [ ] **Actions**
  - [ ] "Scan New Prescription" clears results
  - [ ] Print button opens print dialog

### ✅ UI/UX Testing

- [ ] **Design**
  - [ ] Glassmorphism effects visible
  - [ ] Animations smooth (300ms)
  - [ ] Hover effects work on buttons
  - [ ] Colors match design system

- [ ] **Responsiveness**
  - [ ] Works on mobile (< 768px)
  - [ ] Works on tablet (768px - 1024px)
  - [ ] Works on desktop (> 1024px)
  - [ ] Images scale properly

- [ ] **Accessibility**
  - [ ] Keyboard navigation works
  - [ ] Focus indicators visible
  - [ ] Alt text on images
  - [ ] ARIA labels present

### ✅ Error Handling

- [ ] **Invalid Image**
  - [ ] Shows error for non-image files
  - [ ] Shows error for corrupted images
  - [ ] Shows error for too large files (>10MB)

- [ ] **API Errors**
  - [ ] Shows error for missing API key
  - [ ] Shows error for invalid API key
  - [ ] Shows error for network issues
  - [ ] Shows error for timeout

- [ ] **No Text Detected**
  - [ ] Shows appropriate message
  - [ ] Suggests trying clearer image
  - [ ] Allows retry

### ✅ Performance Testing

- [ ] **Speed**
  - [ ] Page loads in < 2 seconds
  - [ ] Analysis completes in < 10 seconds
  - [ ] UI remains responsive during analysis

- [ ] **Memory**
  - [ ] No memory leaks on repeated use
  - [ ] Images are properly cleaned up

## Manual Testing Steps

### Test 1: Basic Flow
1. Start the application
2. Upload `test-samples/sample_prescription.png`
3. Click "Analyze Prescription"
4. Verify results match expected output
5. Switch to Hindi tab
6. Verify translation is correct
7. Click voice play button
8. Verify voice output works

### Test 2: Error Handling
1. Upload a non-image file (e.g., PDF)
2. Verify error message appears
3. Upload a very blurry image
4. Verify low confidence score or error

### Test 3: Multiple Scans
1. Analyze first prescription
2. Click "Scan New Prescription"
3. Upload different prescription
4. Verify previous results are cleared
5. Verify new results display correctly

### Test 4: Mobile Experience
1. Open on mobile device or resize browser
2. Test drag and drop (may not work on mobile)
3. Test camera upload (mobile only)
4. Verify responsive layout
5. Test all features work on mobile

## Common Medical Abbreviations to Test

| Abbreviation | Meaning | Expected Output |
|--------------|---------|-----------------|
| OD | Once daily | "Once daily" |
| BD | Twice daily | "Twice daily" |
| TDS | Three times daily | "Three times daily" |
| QID | Four times daily | "Four times daily" |
| HS | At bedtime | "At bedtime" |
| AC | Before meals | "Before meals" |
| PC | After meals | "After meals" |
| PRN | As needed | "As needed" |
| SOS | If needed | "If needed" |

## Performance Benchmarks

| Metric | Target | Acceptable |
|--------|--------|------------|
| Page Load | < 2s | < 3s |
| Image Upload | < 1s | < 2s |
| OCR Processing | < 5s | < 10s |
| Translation | < 2s | < 5s |
| Total Analysis | < 8s | < 15s |

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Known Limitations

1. **Handwriting Quality**: Very poor handwriting may not be recognized
2. **Image Quality**: Low resolution or blurry images reduce accuracy
3. **Language Support**: Currently only English and Hindi
4. **Voice Support**: May not work in all browsers (requires Web Speech API)
5. **Offline**: Requires internet connection for AI processing

## Reporting Issues

When reporting bugs, include:
1. Browser and version
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots if applicable
5. Console errors (F12 → Console)

---

**Happy Testing! 🧪**
