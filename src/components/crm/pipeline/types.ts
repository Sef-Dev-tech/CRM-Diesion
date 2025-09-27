export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  order: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface StageFormData {
  name: string;
  description?: string;
  color: string;
}