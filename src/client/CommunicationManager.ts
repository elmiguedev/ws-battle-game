export interface CommunicationManager {
  destroy(): void;
  emit(event: string, data?: any): void;
}