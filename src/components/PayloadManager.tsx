import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the standardized payload structure
export interface StagePayload {
  ideaData: {
    id: string;
    title: string;
    description: string;
    targetPlatforms: string[];
    hashtags: string[];
    bannedWords: string[];
    voiceTone: string;
    targetAudience: string;
    musicMood: string;
    colorScheme: string;
    contentStyle: string;
    captionStyle: string;
    narrativePOV: string;
    narratorType: string;
    visualStyle: string;
    videoLength: string;
    characterAppearance?: string;
    characterPersonality?: string;
    characterBackground?: string;
    characterClothing?: string;
  };
  scriptData: {
    id: string;
    version: string;
    locked: boolean;
    hook: {
      text: string;
      duration: number;
      stageDirections: string;
    };
    beats: Array<{
      id: string;
      text: string;
      duration: number;
      stageDirections: string;
    }>;
    cta: {
      text: string;
      duration: number;
      stageDirections: string;
    };
    totalDuration: number;
    qualityScore: number;
  };
  assetManifest: {
    scriptId: string;
    voice: {
      status: 'idle' | 'generating' | 'ready' | 'failed';
      url?: string;
      style: string;
      accent: string;
      pacing: number;
    };
    music: {
      status: 'idle' | 'generating' | 'ready' | 'failed';
      url?: string;
      bpm: number;
      mood: string;
    };
    captions: {
      status: 'idle' | 'generating' | 'ready' | 'failed';
      url?: string;
      format: string;
      style: string;
    };
    broll: Array<{
      beatId: string;
      status: 'pending' | 'generating' | 'approved' | 'stale' | 'failed';
      clips: Array<{
        id: string;
        url: string;
        thumbnail: string;
        source: string;
        title: string;
      }>;
    }>;
    graphics: Array<{
      id: string;
      type: string;
      status: 'idle' | 'generating' | 'ready' | 'failed';
      url?: string;
    }>;
    overallProgress: number;
  };
  productionConfig: {
    scenes: Array<{
      id: string;
      name: string;
      startTime: number;
      duration: number;
      status: 'ready' | 'stale' | 'rendering';
      tracks: Array<{
        type: 'voice' | 'broll' | 'captions' | 'music';
        content: string;
        status: 'ready' | 'stale' | 'failed';
        locked: boolean;
      }>;
    }>;
    audioMix: {
      voice: number;
      music: number;
      sfx: number;
    };
    renderStatus: {
      status: 'draft' | 'rendering' | 'ready' | 'failed';
      progress: number;
      previewUrl?: string;
      finalUrl?: string;
    };
    qaReport: {
      overallScore: number;
      issues: Array<{
        scene: string;
        type: string;
        severity: 'low' | 'medium' | 'high';
        suggestion: string;
        autoFixable: boolean;
      }>;
    };
  };
  publishingPlan: {
    platforms: Array<{
      id: string;
      name: string;
      handle: string;
      status: 'connected' | 'pending' | 'failed';
      videoFile: string;
      scheduledTime?: string;
      caption?: string;
      hashtags?: string[];
    }>;
    globalCaption: string;
    globalHashtags: string[];
    autoSchedule: boolean;
    estimatedReach: string;
    engagementRate: string;
  };
}

// Completion requirements for each stage
interface BaseRequirement {
  minimumCompletion: number;
}

interface FieldRequirement extends BaseRequirement {
  requiredFields: string[];
}

interface QualityRequirement extends BaseRequirement {
  minimumQualityScore: number;
}

interface AssetRequirement extends BaseRequirement {
  requiredStatuses: string[];
  minimumBrollApproved: number;
}

interface PlatformRequirement extends BaseRequirement {
  requiredFields: string[];
  minimumPlatformsConnected: number;
}

interface AnalyticsRequirement {
  requiredCondition: string;
  minimumHoursAfterPublish: number;
}

export const COMPLETION_REQUIREMENTS = {
  idea: {
    requiredFields: ['description', 'targetPlatforms', 'voiceTone', 'targetAudience', 'videoLength'],
    minimumCompletion: 100
  } as FieldRequirement,
  script: {
    requiredFields: ['hook.text', 'beats', 'cta.text'],
    minimumCompletion: 100,
    minimumQualityScore: 7.0
  } as FieldRequirement & QualityRequirement,
  assets: {
    requiredStatuses: ['voice.ready', 'music.ready', 'captions.ready'],
    minimumBrollApproved: 4,
    minimumCompletion: 100
  } as AssetRequirement,
  production: {
    requiredStatuses: ['renderStatus.ready'],
    minimumQualityScore: 8.0,
    minimumCompletion: 100
  } as AssetRequirement & QualityRequirement,
  publishing: {
    requiredFields: ['globalCaption', 'platforms'],
    minimumPlatformsConnected: 1,
    minimumCompletion: 90
  } as PlatformRequirement,
  analytics: {
    requiredCondition: 'publishedContent',
    minimumHoursAfterPublish: 24
  } as AnalyticsRequirement
};

interface PayloadContextType {
  payload: StagePayload;
  updatePayload: (updates: Partial<StagePayload>) => void;
  getStageCompletion: (stage: keyof typeof COMPLETION_REQUIREMENTS) => number;
  getStageBlockers: (stage: keyof typeof COMPLETION_REQUIREMENTS) => string[];
  canAdvanceToStage: (stage: keyof typeof COMPLETION_REQUIREMENTS) => boolean;
  triggerAutoGeneration: (fromStage: string, toStage: string) => Promise<void>;
}

const PayloadContext = createContext<PayloadContextType | undefined>(undefined);

interface PayloadManagerProps {
  children: ReactNode;
  projectId: string;
  ideaId: string;
}

export const PayloadManager = ({ children, projectId, ideaId }: PayloadManagerProps) => {
  const [payload, setPayload] = useState<StagePayload>({
    ideaData: {
      id: ideaId,
      title: '',
      description: '',
      targetPlatforms: ['TikTok'],
      hashtags: [],
      bannedWords: [],
      voiceTone: '',
      targetAudience: '',
      musicMood: '',
      colorScheme: '',
      contentStyle: '',
      captionStyle: '',
      narrativePOV: '',
      narratorType: '',
      visualStyle: '',
      videoLength: ''
    },
    scriptData: {
      id: '',
      version: 'v1',
      locked: false,
      hook: { text: '', duration: 0, stageDirections: '' },
      beats: [],
      cta: { text: '', duration: 0, stageDirections: '' },
      totalDuration: 0,
      qualityScore: 0
    },
    assetManifest: {
      scriptId: '',
      voice: { status: 'idle', style: '', accent: '', pacing: 150 },
      music: { status: 'idle', bpm: 120, mood: '' },
      captions: { status: 'idle', format: 'srt', style: '' },
      broll: [],
      graphics: [],
      overallProgress: 0
    },
    productionConfig: {
      scenes: [],
      audioMix: { voice: 80, music: 60, sfx: 40 },
      renderStatus: { status: 'draft', progress: 0 },
      qaReport: { overallScore: 0, issues: [] }
    },
    publishingPlan: {
      platforms: [],
      globalCaption: '',
      globalHashtags: [],
      autoSchedule: true,
      estimatedReach: '',
      engagementRate: ''
    }
  });

  const updatePayload = (updates: Partial<StagePayload>) => {
    setPayload(prev => ({ ...prev, ...updates }));
    
    // Persist to localStorage for recovery
    localStorage.setItem(`payload_${projectId}_${ideaId}`, JSON.stringify({ ...payload, ...updates }));
  };

  const getStageCompletion = (stage: keyof typeof COMPLETION_REQUIREMENTS): number => {
    const requirements = COMPLETION_REQUIREMENTS[stage];
    
    switch (stage) {
      case 'idea': {
        const ideaReq = requirements as FieldRequirement;
        const requiredFields = ideaReq.requiredFields as (keyof StagePayload['ideaData'])[];
        const completedFields = requiredFields.filter(field => {
          const value = payload.ideaData[field];
          return Array.isArray(value) ? value.length > 0 : Boolean(value);
        });
        return (completedFields.length / requiredFields.length) * 100;
      }
      
      case 'script': {
        const scriptReq = requirements as FieldRequirement & QualityRequirement;
        const hasHook = Boolean(payload.scriptData.hook.text);
        const hasBeats = payload.scriptData.beats.length > 0;
        const hasCTA = Boolean(payload.scriptData.cta.text);
        const meetsQuality = payload.scriptData.qualityScore >= scriptReq.minimumQualityScore;
        
        const completed = [hasHook, hasBeats, hasCTA, meetsQuality].filter(Boolean).length;
        return (completed / 4) * 100;
      }
      
      case 'assets': {
        const assetReq = requirements as AssetRequirement;
        const voiceReady = payload.assetManifest.voice.status === 'ready';
        const musicReady = payload.assetManifest.music.status === 'ready';
        const captionsReady = payload.assetManifest.captions.status === 'ready';
        const brollApproved = payload.assetManifest.broll.filter(b => b.status === 'approved').length;
        
        const assetScore = [voiceReady, musicReady, captionsReady].filter(Boolean).length / 3;
        const brollScore = Math.min(brollApproved / assetReq.minimumBrollApproved, 1);
        
        return ((assetScore + brollScore) / 2) * 100;
      }
      
      case 'production': {
        const prodReq = requirements as AssetRequirement & QualityRequirement;
        const renderReady = payload.productionConfig.renderStatus.status === 'ready';
        const qualityMet = payload.productionConfig.qaReport.overallScore >= prodReq.minimumQualityScore;
        
        const completed = [renderReady, qualityMet].filter(Boolean).length;
        return (completed / 2) * 100;
      }
      
      case 'publishing': {
        const pubReq = requirements as PlatformRequirement;
        const hasCaption = Boolean(payload.publishingPlan.globalCaption);
        const hasConnectedPlatforms = payload.publishingPlan.platforms.filter(p => p.status === 'connected').length;
        const meetsMinPlatforms = hasConnectedPlatforms >= pubReq.minimumPlatformsConnected;
        
        const completed = [hasCaption, meetsMinPlatforms].filter(Boolean).length;
        return (completed / 2) * 100;
      }
      
      default:
        return 0;
    }
  };

  const getStageBlockers = (stage: keyof typeof COMPLETION_REQUIREMENTS): string[] => {
    const blockers: string[] = [];
    const completion = getStageCompletion(stage);
    
    if (completion < 100) {
      switch (stage) {
        case 'idea':
          if (!payload.ideaData.description) blockers.push('Video description required');
          if (payload.ideaData.targetPlatforms.length === 0) blockers.push('Target platforms required');
          if (!payload.ideaData.voiceTone) blockers.push('Voice tone selection required');
          break;
          
        case 'script':
          if (!payload.scriptData.hook.text) blockers.push('Hook content required');
          if (payload.scriptData.beats.length === 0) blockers.push('Script beats required');
          if (!payload.scriptData.cta.text) blockers.push('Call-to-action required');
          if (payload.scriptData.qualityScore < 7.0) blockers.push('Improve script quality score');
          break;
          
        case 'assets':
          if (payload.assetManifest.voice.status !== 'ready') blockers.push('Voice generation incomplete');
          if (payload.assetManifest.music.status !== 'ready') blockers.push('Music track not ready');
          if (payload.assetManifest.captions.status !== 'ready') blockers.push('Captions generation incomplete');
          break;
      }
    }
    
    return blockers;
  };

  const canAdvanceToStage = (stage: keyof typeof COMPLETION_REQUIREMENTS): boolean => {
    const stageOrder = ['idea', 'script', 'assets', 'production', 'publishing', 'analytics'];
    const targetIndex = stageOrder.indexOf(stage);
    
    // Check all previous stages are completed
    for (let i = 0; i < targetIndex; i++) {
      const prevStage = stageOrder[i] as keyof typeof COMPLETION_REQUIREMENTS;
      const requirement = COMPLETION_REQUIREMENTS[prevStage];
      const minCompletion = 'minimumCompletion' in requirement ? requirement.minimumCompletion : 100;
      
      if (getStageCompletion(prevStage) < minCompletion) {
        return false;
      }
    }
    
    return true;
  };

  const triggerAutoGeneration = async (fromStage: string, toStage: string): Promise<void> => {
    // Auto-generation logic based on stage transitions
    switch (`${fromStage}->${toStage}`) {
      case 'idea->script':
        // Trigger script generation from DNA
        console.log('Auto-generating script from idea DNA');
        break;
        
      case 'script->assets':
        // Trigger asset generation from locked script
        console.log('Auto-generating assets from locked script');
        break;
        
      case 'assets->production':
        // Trigger timeline assembly
        console.log('Auto-assembling production timeline');
        break;
        
      case 'production->publishing':
        // Trigger platform formatting
        console.log('Auto-formatting for publishing platforms');
        break;
    }
  };

  // Load payload from localStorage on mount
  useEffect(() => {
    const savedPayload = localStorage.getItem(`payload_${projectId}_${ideaId}`);
    if (savedPayload) {
      try {
        const parsed = JSON.parse(savedPayload);
        setPayload(parsed);
      } catch (error) {
        console.error('Failed to parse saved payload:', error);
      }
    }
  }, [projectId, ideaId]);

  const value: PayloadContextType = {
    payload,
    updatePayload,
    getStageCompletion,
    getStageBlockers,
    canAdvanceToStage,
    triggerAutoGeneration
  };

  return (
    <PayloadContext.Provider value={value}>
      {children}
    </PayloadContext.Provider>
  );
};

export const usePayload = () => {
  const context = useContext(PayloadContext);
  if (context === undefined) {
    throw new Error('usePayload must be used within a PayloadManager');
  }
  return context;
};