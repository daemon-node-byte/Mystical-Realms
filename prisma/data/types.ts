export interface TarotDataSeed {
  id:                     string;
  name:                   string;
  arcana:                 string;
  number:                 number;
  upright_keywords:       string[];
  reversed_keywords:      string[];
  description:            Description;
  element:                string;
  astrological_rulership: string;
  themes:                 string[];
  symbolism:              Symbolism[];
  numerology:             number;
  core_emotions:          string[];
  reflection_prompts:     string[];
  practical_advice:       string;
  fools_journey?:         string;
  suit?:                  string;
}

export interface Description {
  upright:  string;
  reversed: string;
}

export interface Symbolism {
  symbol:  string;
  meaning: string;
}
