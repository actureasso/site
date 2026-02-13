export const MODAL_TEMPLATES = [
  {
    id: 'default',
    name: 'Classique',
    description: 'Carte centrée avec titre, texte et bouton. Propre et lisible.',
    hasImage: false,
    preview: 'bg-white rounded-xl shadow-lg p-6 border border-slate-100',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Très épuré : fond semi-transparent, texte centré, un seul CTA.',
    hasImage: false,
    preview: 'bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8 border border-white/50',
  },
  {
    id: 'hero',
    name: 'Bandeau hero',
    description: 'Bandeau coloré en haut, puis titre et message. Impact visuel fort.',
    hasImage: false,
    preview: 'overflow-hidden rounded-xl shadow-lg border border-slate-100',
  },
  {
    id: 'split',
    name: 'Split image',
    description: 'Image à gauche (ou bloc coloré), contenu à droite. Idéal avec une photo.',
    hasImage: true,
    preview: 'flex rounded-xl shadow-lg overflow-hidden border border-slate-100',
  },
] as const

export type ModalTemplateId = (typeof MODAL_TEMPLATES)[number]['id']
