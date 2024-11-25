export interface Clip {
  id: string;
  name: string;
  url: string;
  startTime: number;
  duration: number;
  color?: string;
}

export interface Effect {
  id: string;
  clipId: string;
  name: string;
  type: string;
  params: Record<string, any>;
}

export interface Transition {
  id: string;
  clipId: string;
  type: string;
  duration: number;
  options: Record<string, any>;
}

export interface AudioTrack {
  id: string;
  clipId: string;
  url: string;
  volume: number;
  startTime: number;
  duration: number;
}