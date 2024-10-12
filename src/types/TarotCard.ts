export interface TarotCard {
	tarot_card_id:      string;
	title:              string;
	rank:               number;
	suit:               string;
	astrological_sign:  string;
	element:            string;
	visual_description: string;
	symbolism:          Array<string[]>;
	keywords:           Meanings;
	interpretation:     Interpretation;
	journey_story:      string;
	summary:            string;
}

export interface Interpretation {
	general:      Meanings;
	love:         Meanings;
	career:       Meanings;
	health:       Meanings;
	finance:      Meanings;
	spirituality: Meanings;
}

export interface Meanings {
	upright:  string;
	reversed: string;
}

export enum Suit {
  WANDS = "WANDS",
  CUPS = "CUPS",
  SWORDS = "SWORDS",
  PENTACLES = "PENTACLES",
  MAJOR = "MAJOR"
}
