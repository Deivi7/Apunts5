/** 18 targetes oficials H5P «Classifica els elements a les 5 etapes». */
export const H5P_AGES_ITEMS = [
  { id: 'h1', label: 'Trueque', zone: 'antiga' },
  { id: 'h2', label: 'Descobriment del foc', zone: 'prehistoria' },
  { id: 'h3', label: 'Piràmides', zone: 'antiga' },
  { id: 'h4', label: 'Monuments megalítics', zone: 'prehistoria' },
  { id: 'h5', label: 'Art Gòtic', zone: 'mitjana' },
  { id: 'h6', label: 'Bombeta', zone: 'contemporania' },
  { id: 'h7', label: 'Roda', zone: 'prehistoria' },
  { id: 'h8', label: 'Cubisme', zone: 'contemporania' },
  { id: 'h9', label: 'Romànic', zone: 'mitjana' },
  { id: 'h10', label: 'Vivien en coves', zone: 'prehistoria' },
  { id: 'h11', label: 'Euro', zone: 'contemporania' },
  { id: 'h12', label: 'Pintures rupestres', zone: 'prehistoria' },
  { id: 'h13', label: 'Feudalisme', zone: 'mitjana' },
  { id: 'h14', label: 'Edat dels metalls', zone: 'prehistoria' },
  { id: 'h15', label: 'Impremta', zone: 'moderna' },
  { id: 'h16', label: 'Nòmades', zone: 'prehistoria' },
  { id: 'h17', label: 'Pólvora', zone: 'moderna' },
  { id: 'h18', label: 'Penicil·lina', zone: 'contemporania' },
]

export const AGES_ZONES = [
  { id: 'prehistoria', title: 'Prehistòria', color: '#d97706' },
  { id: 'antiga', title: 'Edat Antiga', color: '#2563eb' },
  { id: 'mitjana', title: 'Edat Mitjana', color: '#7c3aed' },
  { id: 'moderna', title: 'Edat Moderna', color: '#059669' },
  { id: 'contemporania', title: 'Edat Contemporània', color: '#dc2626' },
]

/** Taller romans (fitxa oficial): activitats I–III. */
export const ROMAN_WORKSHOP_ROMAN_TO_DEC = [
  { id: 'a1', prompt: 'CMLXII', answer: '962', accept: ['962'] },
  { id: 'a2', prompt: 'XCV', answer: '95', accept: ['95'] },
  { id: 'a3', prompt: 'MMDCCVI', answer: '2706', accept: ['2706'] },
  { id: 'a4', prompt: 'XXII', answer: '22', accept: ['22'] },
  { id: 'a5', prompt: 'CXCIII', answer: '193', accept: ['193'] },
  { id: 'a6', prompt: 'CDXL', answer: '440', accept: ['440'] },
]

export const ROMAN_WORKSHOP_DEC_TO_ROMAN = [
  { id: 'b1', prompt: '54', answer: 'LIV', accept: ['LIV', 'liv'] },
  { id: 'b2', prompt: '63', answer: 'LXIII', accept: ['LXIII', 'lxiii'] },
  { id: 'b3', prompt: '99', answer: 'XCIX', accept: ['XCIX', 'xcix'] },
  { id: 'b4', prompt: '245', answer: 'CCXLV', accept: ['CCXLV', 'ccxlv'] },
  { id: 'b5', prompt: '467', answer: 'CDLXVII', accept: ['CDLXVII', 'cdlxvii'] },
  { id: 'b6', prompt: '690', answer: 'DCXC', accept: ['DCXC', 'dcxc'] },
  { id: 'b7', prompt: '1204', answer: 'MCCIV', accept: ['MCCIV', 'mcciv'] },
  { id: 'b8', prompt: '2023', answer: 'MMXXIII', accept: ['MMXXIII', 'mmxxiii'] },
  { id: 'b9', prompt: '2601', answer: 'MMDCI', accept: ['MMDCI', 'mmdci'] },
]

export const ROMAN_WORKSHOP_CHOICES = [
  { id: 'c1', prompt: 'Quin valor té XCIX?', options: ['90', '99', '89'], correct: '99' },
  { id: 'c2', prompt: 'Quin valor té LXIV?', options: ['64', '54', '45'], correct: '64' },
  { id: 'c3', prompt: 'Quin valor té XXVIII?', options: ['28', '38', '24'], correct: '28' },
  { id: 'c4', prompt: 'Quin valor té LXXXVIII?', options: ['89', '88', '87'], correct: '88' },
  { id: 'c5', prompt: 'Com s\'escriu 258?', options: ['CCLDIII', 'CCLVIII', 'CLLVIII'], correct: 'CCLVIII' },
  { id: 'c6', prompt: 'Com s\'escriu 88?', options: ['LXXXCIII', 'LXXVIII', 'LXXXVIII'], correct: 'LXXXVIII' },
  { id: 'c7', prompt: 'Com s\'escriu 107?', options: ['CLII', 'CVII', 'CIIX'], correct: 'CVII' },
  { id: 'c8', prompt: 'Com s\'escriu 688?', options: ['DCLXXXVIII', 'DCLXXCVIII', 'CCCDXVIII'], correct: 'DCLXXXVIII' },
]
