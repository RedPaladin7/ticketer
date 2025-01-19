'use client'

import { useRouter } from "next/navigation"
import { useUser } from "@clerk/clerk-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

const PurchaseTicket = ({eventId}: {eventId: Id<'events'>}) => {
  const router = useRouter()
  const {user} = useUser()
  const queuePosition = useQuery(api.waitingList.getQueuePosition, {
    eventId,
    userId: user?.id ?? ''
  })
  return (
    <div>

    </div>
  )
}

export default PurchaseTicket