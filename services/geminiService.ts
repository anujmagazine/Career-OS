
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, CareerOption, CareerRoadmap, PersonalityAnalysis } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Career Path Finder," an intelligent career counseling engine designed specifically for 10th-grade students (approx. 15-16 years old).
Your tone should be simple, direct, encouraging, and free of corporate jargon.
You are knowledgeable about both traditional stable careers and modern "new age" digital/emerging career paths.
Always customize your advice based on the user's specific Country of Residence.
Strictly adhere to the user's "Dislikes" to filter out unsuitable careers.
`;

const careerListSchema: Schema = {
  type: Type.ARRAY,
  description: "A list of 5 distinct career paths based on user profile.",
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: "A unique identifier (1-5)" },
      title: { type: Type.STRING, description: "The name of the career path" },
      summary: { type: Type.STRING, description: "A 1-sentence summary of what the job looks like." },
      popularPersonalities: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING }, 
        description: "Names of 1-2 famous personalities (real people) from the user's country (preferred) or globally who are successful in this field." 
      }
    },
    required: ["id", "title", "summary", "popularPersonalities"]
  }
};

const roadmapSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    academicRoute: {
      type: Type.OBJECT,
      properties: {
        highSchool: { type: Type.STRING, description: "Subjects/streams for 11th-12th grade relevant to the country." },
        entranceExams: { type: Type.STRING, description: "Specific tests to prepare for." },
        undergraduateDegree: { type: Type.STRING, description: "Specific college degrees required." }
      },
      required: ["highSchool", "entranceExams", "undergraduateDegree"]
    },
    skills: {
      type: Type.OBJECT,
      properties: {
        hardSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Technical tools or knowledge." },
        softSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Personality traits." }
      },
      required: ["hardSkills", "softSkills"]
    },
    studyTimeline: { type: Type.STRING, description: "Rough estimate of years of study after 10th grade." },
    fitReason: { type: Type.STRING, description: "Brief sentence connecting to interests and confirming avoidance of dislikes." }
  },
  required: ["title", "academicRoute", "skills", "studyTimeline", "fitReason"]
};

const personalityAnalysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    career: { type: Type.STRING },
    journeySummary: { type: Type.STRING, description: "A brief, inspiring story of how they started (approx 2 sentences)." },
    connectionToUser: { type: Type.STRING, description: "Directly explain how this person's journey relates to the student's specific Interests and Dislikes. Start with 'Like you...'" }
  },
  required: ["name", "career", "journeySummary", "connectionToUser"]
};

export const fetchCareerOptions = async (profile: UserProfile): Promise<CareerOption[]> => {
  const model = "gemini-2.5-flash"; 
  
  const prompt = `
    I am a 10th-grade student living in ${profile.country}.
    
    My Interests: ${profile.interests}
    My Dislikes: ${profile.dislikes}
    
    Based on this, generate a list of 5 distinct career paths. 
    IMPORTANT GUIDELINES:
    1. **Modern Mix:** Explicitly consider and include "new age" or emerging careers (e.g., AI, Sustainability, Digital Media, Green Tech) alongside traditional paths if they fit the interests.
    2. **Strict Filtering:** If I dislike Math, do not suggest Engineering. If I dislike blood, no Medicine. Use the dislikes strictly.
    3. **Localization:** Ensure these are viable in ${profile.country}.
    4. **Inspiration:** For each career, identify 1-2 famous personalities from ${profile.country} (or globally if no local match is famous enough) to inspire the student.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: careerListSchema,
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as CareerOption[];
  } catch (error) {
    console.error("Error fetching career options:", error);
    throw error;
  }
};

export const fetchCareerRoadmap = async (careerTitle: string, profile: UserProfile): Promise<CareerRoadmap> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    I am the same 10th-grade student in ${profile.country}.
    I have selected the career path: "${careerTitle}".
    
    My Interests: ${profile.interests}
    My Dislikes: ${profile.dislikes}
    
    Provide a detailed roadmap.
    Localization Rule: Cite specific degrees, exams, and terminology relevant to ${profile.country} (e.g., if India -> mention streams, JEE/NEET; if USA -> SATs, Majors).
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: roadmapSchema,
        temperature: 0.5,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as CareerRoadmap;
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    throw error;
  }
};

export const fetchPersonalityAnalysis = async (name: string, careerTitle: string, profile: UserProfile): Promise<PersonalityAnalysis> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    I am a 10th-grade student who loves: ${profile.interests}
    and dislikes: ${profile.dislikes}.
    
    I am curious about the career "${careerTitle}" and the famous personality "${name}".
    
    Task:
    1. Briefly tell the story of how ${name} started or succeeded in this field.
    2. Explicitly explain how their journey matches MY interests and avoids my dislikes. Use phrases like "Just like you enjoy [interest]..." or "Since you dislike [dislike], you'll notice ${name} focused on..."
    
    Keep it short, inspiring, and relatable for a 15-year-old.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: personalityAnalysisSchema,
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as PersonalityAnalysis;
  } catch (error) {
    console.error("Error fetching personality analysis:", error);
    throw error;
  }
};
