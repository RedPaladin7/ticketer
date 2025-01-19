'use client'

import { Id } from '@/convex/_generated/dataModel'
import { useToast } from '@/hooks/use-toast'

const JoinQueue = ({
    eventId,
    userId,
}: {
    eventId: Id<'events'>,
    userId: string
}) => {
    const {toast} = useToast()
  return (
    <div>JoinQueue</div>
  )
}

export default JoinQueue