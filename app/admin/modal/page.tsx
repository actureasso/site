import { prisma } from '@/lib/prisma'
import ModalAdminClient from './ModalAdminClient'

export const metadata = {
  title: 'Message aux visiteurs',
  description: 'Annonce ou message affiché à la visite du site. Les visiteurs revoient le message si vous le modifiez.',
}

export default async function AdminModalPage() {
  const settings = await prisma.siteSetting.findMany()
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]))

  return (
    <ModalAdminClient
      initial={{
        modal_enabled: map.modal_enabled ?? '0',
        modal_template: map.modal_template ?? 'default',
        modal_title: map.modal_title ?? '',
        modal_body: map.modal_body ?? '',
        modal_button_text: map.modal_button_text ?? 'Découvrir',
        modal_button_url: map.modal_button_url ?? '',
        modal_image_url: map.modal_image_url ?? '',
      }}
    />
  )
}
