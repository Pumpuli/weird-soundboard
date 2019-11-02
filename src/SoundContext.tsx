import { createContext } from 'react';
import { SoundBoard } from './soundboard';

export const SoundContext = createContext<SoundBoard>(new SoundBoard());
