export interface IdeaSeed {
  title: string;
  description?: string;
  source: 'manual' | 'research_agent' | 'competitor' | 'import';
  tags: string[];
}

export interface IdeaConcept {
  value_proposition: string;
  references?: { type: 'link' | 'upload'; url: string; title?: string }[];
}

export interface IdeaTargeting {
  platforms: string[];
  audience: string;
  banned_words: string[];
}

export interface CreativeDNA {
  voice_tone: string;
  music_mood: string;
  content_style: string;
  narrative_pov: 'first' | 'second' | 'third';
  visual_style: string;
  caption_style: string;
  narrator_type: string;
  length: 'short' | 'medium' | 'long';
  hashtags: string[];
}

export interface IdeaProgress {
  completion: number;
  quality_score: number;
}

export interface IdeaSetup {
  idea_id: string;
  project_id: string;
  seed?: IdeaSeed;
  concept?: IdeaConcept;
  targeting?: IdeaTargeting;
  creative_dna?: CreativeDNA;
  progress: IdeaProgress;
  status: 'seed' | 'concept' | 'targeting' | 'dna' | 'validated' | 'failed';
}

export type DNAStage = 'seed' | 'concept' | 'targeting' | 'dna';

export interface DNAStageConfig {
  id: DNAStage;
  title: string;
  description: string;
  fields: string[];
  validation: (data: any) => boolean;
  minQualityScore: number;
}