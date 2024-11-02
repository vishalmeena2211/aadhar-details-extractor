// import AadhaarInfo from '../interfaces/iAadhar'

// export const extractAadhaarInfo = (frontText: string, backText: string): AadhaarInfo => {
//   const info: AadhaarInfo = {
//     dob: null,
//     aadhaarNumber: null,
//     gender: null,
//     name: null,
//     address: null,
//   };


//   const cleanText = (text: string) => text.replace(/\s+/g, ' ').trim();
//   const cleanFrontText = cleanText(frontText);
//   const cleanBackText = cleanText(backText);

//   console.log(cleanFrontText);


//   // Extract DOB
//   const dobPattern = /(?:Date of Birth|DOB) ?:? *(\d{2}\/\d{2}\/\d{4})/i;
//   const dobMatch = cleanFrontText.match(dobPattern);
//   info.dob = dobMatch ? dobMatch[1] : null;

//   // Extract Aadhaar Number
//   const aadhaarPattern = /(\d{4} \d{4} \d{4})/;
//   const aadhaarMatch = cleanFrontText.match(aadhaarPattern);
//   info.aadhaarNumber = aadhaarMatch ? aadhaarMatch[1] : null;

//   // Extract Gender
//   const genderPattern = /\b(Male|Female)\b/i;
//   const genderMatch = cleanFrontText.match(genderPattern);
//   info.gender = genderMatch ? genderMatch[1] : null;

//   // Extract Name
//   const namePattern = /(?:Govt\.? of India|Government of India)\s+([A-Z][a-zA-Z\s]+(?: [A-Z][a-zA-Z\s]+)*)/i;
//   const nameMatch = cleanFrontText.match(namePattern);
//   console.log(nameMatch)
//   if (nameMatch) {
//     info.name = nameMatch[1].trim();
//   } else {
//     const namePatternAlt = /(?:Name|नाम) ?:? *([A-Z][a-zA-Z\s]+(?: [A-Z][a-zA-Z\s]+)*)/i;
//     const nameMatchAlt = cleanFrontText.match(namePatternAlt);
//     if (nameMatchAlt) {
//       info.name = nameMatchAlt[1].trim();
//     } else {
//       const namePatternAlt2 = /(?:fomer)\s+([A-Z][a-zA-Z\s]+(?: [A-Z][a-zA-Z\s]+)*)/i;
//       const nameMatchAlt2 = cleanFrontText.match(namePatternAlt2);
//       info.name = nameMatchAlt2 ? nameMatchAlt2[1].trim() : null;
//     }
//   }

//   // Extract Address
//   const addressPattern = /Address:\s*([\s\S]*?)(?:\d{6}|$)/i;
//   const addressMatch = cleanBackText.match(addressPattern);
//   if (addressMatch) {
//     info.address = cleanText(addressMatch[1])
//       .replace(/[^\w\s,.-]/g, '') // Remove unwanted characters
//       .replace(/\s+/g, ' ')
//       .trim();
//   }
// console.log(info);

//   return info;
// };




import AadhaarInfo from '../interfaces/iAadhar';

export const extractAadhaarInfo = (frontText: string, backText: string): AadhaarInfo => {
  const info: AadhaarInfo = {
    dob: null,
    aadhaarNumber: null,
    gender: null,
    name: null,
    address: null,
  };

  const cleanText = (text: string) => text.replace(/\s+/g, ' ').trim();
  const cleanFrontText = cleanText(frontText);
  const cleanBackText = cleanText(backText);

  // Extract DOB
  const dobPattern = /(?:DOB|Date of Birth) ?:? *(\d{2}\/\d{2}\/\d{4})/i;
  const dobMatch = cleanFrontText.match(dobPattern);
  info.dob = dobMatch ? dobMatch[1] : null;

  // Extract Name (before DOB)
  if (dobMatch) {
    const nameCandidateSection = cleanFrontText.slice(0, dobMatch.index);
    const namePattern = /([A-Z][a-zA-Z]{2,})\b/g;
    const nameMatches = nameCandidateSection.match(namePattern);
    if (nameMatches) {
      info.name = nameMatches[nameMatches.length - 1].trim();
    }
  }

  // Extract Aadhaar Number
  const aadhaarPattern = /(\d{4} \d{4} \d{4})/;
  const aadhaarMatch = cleanFrontText.match(aadhaarPattern);
  info.aadhaarNumber = aadhaarMatch ? aadhaarMatch[1] : null;

  // Extract Gender
  const genderPattern = /\b(MALE|FEMALE)\b/i;
  const genderMatch = cleanFrontText.match(genderPattern);
  info.gender = genderMatch ? genderMatch[1].toUpperCase() : null;

  // Extract Address
  const addressPattern = /Address:\s*([\s\S]*?)(?:\d{6}|$)/i;
  const addressMatch = cleanBackText.match(addressPattern);
  if (addressMatch) {
    info.address = cleanText(addressMatch[1])
      .replace(/[^\w\s,.-]/g, '') // Remove unwanted characters
      .replace(/\s+/g, ' ')
      .trim();
  }

  console.log("Extracted Info:", info);
  return info;
};


