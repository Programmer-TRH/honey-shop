"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Zap } from "lucide-react"
import Link from "next/link"

export function CallToActionBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 md:py-24 bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="destructive" className="mb-4 animate-pulse">
            <Zap className="h-3 w-3 mr-1" />
            Limited Time Offer
          </Badge>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Only 20 Jars Left This Season!
          </h2>

          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Don't miss out on our premium honey harvest. Order now and get free delivery plus a complimentary wooden
            honey dipper with every purchase.
          </p>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Offer ends in:</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded font-mono font-bold">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <span className="text-muted-foreground">:</span>
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded font-mono font-bold">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <span className="text-muted-foreground">:</span>
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded font-mono font-bold">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/shop">Order Now - ৳850</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Learn More
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Free wooden honey dipper • Free delivery in Dhaka • Cash on Delivery available
          </p>
        </div>
      </div>
    </section>
  )
}
