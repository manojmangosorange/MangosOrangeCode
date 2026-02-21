import * as mammoth from 'mammoth';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// Set worker source for PDF.js
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

interface ParsedJobData {
  title?: string;
  description?: string;
  responsibilities?: string;
  requirements?: string;
  department?: string;
  location?: string;
  experience?: string;
  salary?: string;
}

export const parseJobDescriptionFile = async (file: File): Promise<ParsedJobData> => {
  let textContent = '';

  try {
    if (file.type === 'application/pdf') {
      textContent = await parsePDF(file);
    } else if (file.type === 'application/msword' || 
               file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      textContent = await parseDocx(file);
    } else {
      throw new Error('Unsupported file type');
    }

    return extractJobFields(textContent);
  } catch (error) {
    console.error('Error parsing file:', error);
    throw new Error('Failed to parse job description file');
  }
};

const parsePDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument(arrayBuffer).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
};

const parseDocx = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

const extractJobFields = (text: string): ParsedJobData => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  const lowerText = text.toLowerCase();

  // Extract title (usually the first significant line or contains "title", "position", "role")
  const title = extractTitle(lines);
  
  // Extract department
  const department = extractField(lowerText, [
    'department:', 'team:', 'division:', 'group:',
    'department', 'team', 'division'
  ]);

  // Extract location
  const location = extractField(lowerText, [
    'location:', 'based in:', 'office:', 'city:',
    'remote', 'hybrid', 'on-site', 'onsite'
  ]);

  // Extract experience
  const experience = extractField(lowerText, [
    'experience:', 'years of experience:', 'experience required:',
    'minimum experience:', 'required experience:'
  ]) || extractExperiencePattern(text);

  // Extract salary
  const salary = extractSalary(text);

  // Extract sections
  const description = extractSection(text, [
    'job description', 'description', 'overview', 'about the role',
    'role overview', 'position summary', 'summary'
  ]);

  const responsibilities = extractSection(text, [
    'responsibilities', 'duties', 'key responsibilities',
    'main responsibilities', 'role responsibilities', 'what you will do',
    'what you\'ll do', 'your responsibilities'
  ]);

  const requirements = extractSection(text, [
    'requirements', 'qualifications', 'skills required',
    'required skills', 'must have', 'essential skills',
    'minimum requirements', 'required qualifications'
  ]);

  return {
    title,
    department,
    location,
    experience,
    salary,
    description: description || text.substring(0, 500) + '...',
    responsibilities,
    requirements
  };
};

const extractTitle = (lines: string[]): string => {
  // Look for the first meaningful line that could be a title
  for (const line of lines.slice(0, 5)) {
    if (line.length > 5 && line.length < 100 && 
        !line.toLowerCase().includes('job description') &&
        !line.toLowerCase().includes('company') &&
        !line.toLowerCase().includes('location')) {
      return line;
    }
  }
  return lines[0] || '';
};

const extractField = (text: string, keywords: string[]): string | undefined => {
  for (const keyword of keywords) {
    const regex = new RegExp(`${keyword}\\s*:?\\s*([^\\n.]+)`, 'i');
    const match = text.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return undefined;
};

const extractExperiencePattern = (text: string): string | undefined => {
  // Look for patterns like "3+ years", "5-7 years", "2 to 4 years"
  const experiencePatterns = [
    /(\d+)\+?\s*(?:to|\-)\s*(\d+)\s*years?/i,
    /(\d+)\+\s*years?/i,
    /(\d+)\s*years?\s*(?:of\s*)?experience/i
  ];

  for (const pattern of experiencePatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0];
    }
  }
  return undefined;
};

const extractSalary = (text: string): string | undefined => {
  // Look for salary patterns
  const salaryPatterns = [
    /[$₹£€]\s*\d+(?:,\d{3})*(?:\s*-\s*[$₹£€]?\s*\d+(?:,\d{3})*)?(?:\s*(?:per\s*)?(?:year|annum|annually|month|monthly)?)?/i,
    /\d+(?:,\d{3})*\s*(?:to|-)\s*\d+(?:,\d{3})*\s*(?:lpa|lakhs?|k|thousand)/i,
    /salary:\s*([^\n.]+)/i,
    /compensation:\s*([^\n.]+)/i
  ];

  for (const pattern of salaryPatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0].trim();
    }
  }
  return undefined;
};

const extractSection = (text: string, sectionHeaders: string[]): string | undefined => {
  const lines = text.split('\n');
  
  for (const header of sectionHeaders) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase().trim();
      
      if (line.includes(header)) {
        // Found the section header, now extract content until next section
        const sectionContent: string[] = [];
        let j = i + 1;
        
        while (j < lines.length) {
          const nextLine = lines[j].trim();
          
          // Stop if we hit another major section header
          if (isLikelySectionHeader(nextLine.toLowerCase())) {
            break;
          }
          
          if (nextLine) {
            sectionContent.push(nextLine);
          }
          
          j++;
          
          // Limit section length
          if (sectionContent.length > 20) break;
        }
        
        if (sectionContent.length > 0) {
          return sectionContent.join('\n');
        }
      }
    }
  }
  
  return undefined;
};

const isLikelySectionHeader = (line: string): boolean => {
  const commonHeaders = [
    'responsibilities', 'requirements', 'qualifications', 'skills',
    'experience', 'education', 'benefits', 'salary', 'compensation',
    'location', 'about', 'company', 'description', 'overview',
    'what we offer', 'perks', 'culture'
  ];
  
  return commonHeaders.some(header => 
    line.includes(header) && line.length < 50
  );
};