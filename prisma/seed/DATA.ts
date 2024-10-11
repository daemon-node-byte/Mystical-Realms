import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

import { MAJOR_CARDS as MAJOR } from "./data/MAJOR_CARDS";
import { WANDS } from "./data/WANDS";
import { PENTACLES } from "./data/PENTACLES";
import { SWORDS } from "./data/SWORDS";
import { CUPS } from "./data/CUPS";
import type { TarotCard as CardT, MajorArcana, MinorArcana, Zodiac as ZodiacType, CourtCard } from "./types";

const ROOTDIR = path.resolve(process.cwd());
const yamlParser = (fileName: string) => yaml.parse(fs.readFileSync(path.join(ROOTDIR, 'prisma/seed/data', `${fileName}.yaml`), 'utf8'));

export const ARCH_MAJOR = yamlParser('ARCH_MAJOR') as MajorArcana;
export const ARCH_MINOR = yamlParser('ARCH_MINOR') as MinorArcana;
export const ZODIAC = yamlParser('ZODIAC') as ZodiacType;
export const COURT = yamlParser('COURT') as CourtCard[];

export default [...MAJOR, ...WANDS, ...PENTACLES, ...SWORDS, ...CUPS ] as CardT[];