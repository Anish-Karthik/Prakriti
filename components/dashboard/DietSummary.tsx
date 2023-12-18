import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DietSummary() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">At School</p>
          <p className="text-sm text-muted-foreground">Monday</p>
        </div>
        <div className="ml-auto font-medium">+190 calories</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">At School Camp</p>
          <p className="text-sm text-muted-foreground">Tuesday</p>
        </div>
        <div className="ml-auto font-medium">+39 calories</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">At Home</p>
          <p className="text-sm text-muted-foreground">Wednesday</p>
        </div>
        <div className="ml-auto font-medium">+99 calories</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">At Home</p>
          <p className="text-sm text-muted-foreground">Thursday</p>
        </div>
        <div className="ml-auto font-medium">+76 calories</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            At Aunt&rsquo;s Home
          </p>
          <p className="text-sm text-muted-foreground">Friday</p>
        </div>
        <div className="ml-auto font-medium">+39 calories</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">At Home</p>
          <p className="text-sm text-muted-foreground">Saturday</p>
        </div>
        <div className="ml-auto font-medium">+86 calories</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">At Restaurent</p>
          <p className="text-sm text-muted-foreground">Sunday</p>
        </div>
        <div className="ml-auto font-medium">+68 calories</div>
      </div>
    </div>
  )
}
