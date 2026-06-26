export interface EmergencyResponse {
  emergencyType: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  immediateDanger: string;
  immediateActions: string[];
  safetyInstructions: string[];
  recommendedEmergencyService: string;
  questions: string[];
  emergencyKitItems: string[];
  emergencyReport: string;
}
