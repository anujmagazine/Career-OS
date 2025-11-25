export interface UserProfile {
  interests: string;
  dislikes: string;
  country: string;
}

export interface CareerOption {
  id: string;
  title: string;
  summary: string;
}

export interface AcademicRoute {
  highSchool: string;
  entranceExams: string;
  undergraduateDegree: string;
}

export interface Skills {
  hardSkills: string[];
  softSkills: string[];
}

export interface CareerRoadmap {
  title: string;
  academicRoute: AcademicRoute;
  skills: Skills;
  studyTimeline: string;
  fitReason: string;
}

export enum AppStep {
  INTAKE = 'INTAKE',
  LOADING_LIST = 'LOADING_LIST',
  LIST = 'LIST',
  LOADING_ROADMAP = 'LOADING_ROADMAP',
  ROADMAP = 'ROADMAP',
  ERROR = 'ERROR'
}
