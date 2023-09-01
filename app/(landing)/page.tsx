import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function LandingPage() {
  return (
    <div>
      LandingPage
      <div>
        <Link href="/sign-in">
          <Button>
            Login
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button>
            Register
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage